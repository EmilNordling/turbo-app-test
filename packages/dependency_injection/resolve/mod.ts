import { registeredServices } from '../_registration';
import type { Ctor } from '../_common';
import { branchStep } from './_1_branch_step';
import { producerStep } from './_2_producer_step';
import { retrieveStep } from './_3_retrieve_step';
import { Resolution } from './_resolution';

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function resolve<T>(token: Ctor<T>): T {
	if (token === undefined) {
		throw new Error(`
The requested service could not be resolved at import. This happens when the
service is being part of a circular resolve. One service within this circular
chain should be moved into a higher level.

If your project is using cortex:react-bundler, set "circularDependencyCheck"
flag to true to detect where the circular resolving occurs.
		`);
	}

	// Need to check if the ctor has been registered else we'll throw to inform
	// the developer
	const registration = registeredServices.get(token);
	if (registration === undefined) {
		throw new Error(`ctor is not registered`);
	}

	const resolution = new Resolution(token, registration);
	branchStep(resolution);
	producerStep(resolution);
	const final_T_instance = retrieveStep<T>(resolution);

	return final_T_instance;
}
