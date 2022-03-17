import type { ServiceLifetimes } from './service_lifetimes';
import type { Ctor, Token } from './_common';

export class Registration<T> {
	constructor(
		public readonly id: Token,
		public readonly ctor: Ctor<T>,
		public readonly settings: {
			lifeTime: ServiceLifetimes;
		},
	) {
		// Empty
	}
}

export const registeredServices = new Map<Token, Registration<any>>();
