import { register } from './register';
import { ServiceLifetimes } from './service_lifetimes';
import type { Ctor, GenericClassDecorator } from './_common';

interface InjectableOptions {
	lifetimes?: ServiceLifetimes;
}

/**
 * Registers a class as a service with a Scoped lifetime.
 */
export function Injectable(options?: InjectableOptions): GenericClassDecorator<Ctor<any>> {
	return <T>(ctor: Ctor<T>) => {
		register(ctor, {
			useClass: ctor,
			lifeTimes: options?.lifetimes ?? ServiceLifetimes.Scoped,
			keepOldRegistration: true,
		});
	};
}
