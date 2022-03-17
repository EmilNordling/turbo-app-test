import { registeredServices, Registration } from './_registration';
import { ServiceLifetimes } from './service_lifetimes';
import type { Ctor } from './_common';

interface Options<T> {
	useClass: Ctor<Partial<T>>;
	lifeTimes?: ServiceLifetimes;
	keepOldRegistration?: boolean;
}

/**
 * Register a class to be used as a service. If the replace parameter is
 * passed it'll override any previously registered service (works for any lifetime).
 */
export function register<T>(token: Ctor<T>, opts: Options<T>): void {
	const registeredService = registeredServices.get(token);

	if (opts?.keepOldRegistration == null) {
		registeredServices.set(token, new Registration(token, opts.useClass, { lifeTime: opts.lifeTimes ?? ServiceLifetimes.Singleton }));

		return;
	}

	if (registeredService == null) {
		registeredServices.set(token, new Registration(token, opts.useClass, { lifeTime: opts?.lifeTimes ?? ServiceLifetimes.Singleton }));
	}
}

/**
 * Retrieves the Registration instance for given registered service.
 */
export function getRegisteredService<T>(service: Ctor<T>): Registration<T> | null {
	const reg = registeredServices.get(service);

	return reg ?? null;
}
