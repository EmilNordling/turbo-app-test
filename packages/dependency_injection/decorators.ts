import { register } from './_token_registry';
import { CtorRepresentation, Lifetime, GenericClassDecorator } from './_common';

interface Options {
	lifetime?: Lifetime;
}

/**
 *
 */
export function injectable(opt?: Options): GenericClassDecorator<CtorRepresentation<any>> {
	return <T>(ctor: CtorRepresentation<T>) => {
		register(ctor, {
			useClass: ctor,
			lifeTimes: opt?.lifetime ?? Lifetime.Transient,
			gentle: true,
		});
	};
}
