import { useMemo } from 'react';
import { resolve } from './resolve/mod';
import type { Ctor } from './_common';

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function useInjectable<T>(ctor: Ctor<T>): T {
	return useMemo(() => resolve(ctor), [ctor]);
}
