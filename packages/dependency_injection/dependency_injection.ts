import { resolve } from './resolve/mod';
import { register } from './register';

export * from './attributes';
export * from './meta';
export * from './flush';
export * from './service_lifetimes';
export * from './resolution_context';
export * from './use_injectable';
export * from './use_controller';

export const Instantiation = Object.freeze({
	resolve,
	register,
});
