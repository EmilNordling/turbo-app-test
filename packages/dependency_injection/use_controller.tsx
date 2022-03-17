import { useEffect, useMemo } from 'react';
import { resolve } from './resolve/mod';

export interface ReactLifetime {
	onMount?(): void;
	onUnmount?(): void;
}

export type ControllerCtor<T> = {
	new (...args: any[]): T & ReactLifetime;
};

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function useController<T extends ReactLifetime>(ctor: ControllerCtor<T>): T {
	const controller = useMemo(() => resolve(ctor), [ctor]);

	useEffect(() => {
		controller.onMount?.();

		return () => {
			controller.onUnmount?.();
		};
	}, [controller]);

	return controller;
}
