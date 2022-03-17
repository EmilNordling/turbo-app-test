import type { ServiceLifetimes } from '../service_lifetimes';
import type { Token } from '../_common';

export interface Dependencies {
	parentId: Token | null;
	registrationId: Token;
	lifetime: ServiceLifetimes;
}

export interface StackElement {
	id: Token;
	parentId: Token | null;
	registrationId: Token;
	lifetime: ServiceLifetimes;
	dependencies: Token[];
}
