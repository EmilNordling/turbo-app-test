import { Context, globalContext } from '../_context';
import { ServiceLifetimes } from '../service_lifetimes';
import { registeredServices } from '../_registration';
import type { Token } from '../_common';
import type { Resolution, ResolutionContext, ResolutionDeps } from './_resolution';

// ----------------------------- Producer step -----------------------------
// This step's responsibility is to either instantiate a service or retrieve
// an already instantiated service from a context:
// Singelton -> Global context, one instance per registration
// Scoped    -> Context within this scope, one instance per registration
// Transient -> Context within this scope, many instances per registration

function retrieveArgs(id: Token, [deps, context]: readonly [deps: ResolutionDeps, context: ResolutionContext]): unknown[] {
	const [dependenciesForEachDependency] = deps;
	const [, scopedContext, [, transientContext]] = context;

	const args: unknown[] = [];
	const lookupDependencies = dependenciesForEachDependency.get(id);
	if (lookupDependencies === undefined) {
		return args;
	}

	for (const lookupDependency of lookupDependencies) {
		if (lookupDependency.lifetime === ServiceLifetimes.Singleton) {
			const dependency = globalContext.retrieve(lookupDependency.registrationId);
			if (dependency === undefined) {
				throw new Error(`Singleton ${'anonymous'} service has not been resolved yet`);
			}

			args.push(dependency);

			continue;
		}

		if (lookupDependency.lifetime === ServiceLifetimes.Scoped) {
			const alreadyResolvedDependency = scopedContext.retrieve(lookupDependency.registrationId);
			if (alreadyResolvedDependency === undefined) {
				throw new Error(`Singleton ${'anonymous'} service has not been resolved yet`);
			}

			args.push(alreadyResolvedDependency);

			continue;
		}

		if (lookupDependency.lifetime === ServiceLifetimes.Transient) {
			const parentId = lookupDependency.parentId;
			if (parentId === null) {
				throw new Error('No parentId was found and it should not go through root at this point');
			}

			const transientInstances = transientContext.retrieve(parentId) ?? [];
			const registeredCtorBasedOnLookupDependency = registeredServices.get(lookupDependency.registrationId);
			if (registeredCtorBasedOnLookupDependency === undefined) {
				throw new Error(`${'anonymous'} is not registered`);
			}

			const findFirstMatchingCtorIndex = transientInstances.findIndex((transientInstance) => {
				if (transientInstance instanceof registeredCtorBasedOnLookupDependency.ctor) return true;

				return false;
			});

			args.push(transientInstances.splice(findFirstMatchingCtorIndex, 1)[0]);

			continue;
		}

		throw new Error(`Argument could not be resolved, no lifetime could be found `);
	}

	return args;
}

export function producerStep<T>(resolution: Resolution<T>): void {
	if (resolution.deps == null) throw new Error('steps order are wrong, expected branch -> produce -> retrieve');

	const [, resolvingDependenciesBranch] = resolution.deps;
	const transientRoot = Symbol('transient_root');
	const resolvedScopedServices = new Context<any>();
	const resolvedTransientServices = new Context<Array<any>>();
	resolution.contexts = [globalContext, resolvedScopedServices, [transientRoot, resolvedTransientServices]];

	// Need to recursively go through the branch, from bottom to it has reached
	// the top
	let cycleCount = 0;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (cycleCount++ > 10_000) {
			throw new Error('Recursion in producer step');
		}

		const edges = resolvingDependenciesBranch.edges();

		if (edges.length === 0) {
			if (!resolvingDependenciesBranch.isEmpty()) {
				throw new Error('Graph contains nodes which never got removed');
			}

			break;
		}

		for (const { data } of edges) {
			const lookupRegistered = registeredServices.get(data.registrationId);
			if (lookupRegistered === undefined) {
				throw new Error(`${'anonymous'} is not registered`);
			}

			switch (data.lifetime) {
				case ServiceLifetimes.Singleton: {
					// Check if dependency is already resolved
					const alreadyResolvedService = globalContext.retrieve(data.id);
					if (alreadyResolvedService === undefined) {
						globalContext.add(
							data.id,
							new lookupRegistered.ctor(...retrieveArgs(data.registrationId, [resolution.deps, resolution.contexts])),
						);
					}

					break;
				}
				case ServiceLifetimes.Scoped: {
					// Check if dependency is already resolved
					const alreadyResolvedService = resolvedScopedServices.retrieve(data.id);
					if (alreadyResolvedService === undefined) {
						resolvedScopedServices.add(
							data.id,
							new lookupRegistered.ctor(...retrieveArgs(data.registrationId, [resolution.deps, resolution.contexts])),
						);
					}

					break;
				}
				case ServiceLifetimes.Transient: {
					const parentId = data.parentId ?? transientRoot;
					const shouldCreateStorage = !resolvedTransientServices.isInstantiated(parentId);
					const resolvedTransientInstance = new lookupRegistered.ctor(
						...retrieveArgs(data.registrationId, [resolution.deps, resolution.contexts]),
					);

					if (shouldCreateStorage) {
						resolvedTransientServices.add(parentId, [resolvedTransientInstance]);
						break;
					}

					// The check has already been done above so it's fine to cast this
					// as a non null
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					resolvedTransientServices.retrieve(parentId)!.push(resolvedTransientInstance);

					break;
				}
				default:
					throw new Error(`The service lacks a lifetime`);
			}

			resolvingDependenciesBranch.removeNode(data.id);
		}
	}
}
