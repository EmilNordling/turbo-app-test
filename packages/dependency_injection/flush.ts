import { globalContext } from './_context';
import { registeredServices } from './_registration';

/**
 * _Due to its destructive nature, never use this in production. It's only good
 * to ensure a reliable test environment._
 *
 * Flushes the ctor registry and all singleton instances.
 */
export function flushAll(): void {
	globalContext.drop();
	registeredServices.clear();
}

/**
 * _Due to its destructive nature, never use this in production. It's only good
 * to ensure a reliable test environment._
 *
 * Flushes all singleton instances.
 */
export function flushSingletons(): void {
	globalContext.drop();
}

/**
 * _Due to its destructive nature, never use this in production. It's only good
 * to ensure a reliable test environment._
 *
 * Flushes the ctor registry.
 */
export function flushRegisteredServices(): void {
	registeredServices.clear();
}
