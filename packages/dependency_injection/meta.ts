import type { Ctor, Token } from './_common';

const metaData = new Map<Token, Ctor<unknown>[]>();

export function __registerMetaData(token: Token, deps: Ctor<unknown>[]): void {
	metaData.set(token, deps);
}

export function __getMetadata(token: Token): Ctor<unknown>[] {
	return metaData.get(token) ?? [];
}

export function __setCustomLookUp(fn: ((token: any) => any) | undefined): void {
	__customLookUp.fn = fn;
}

export const __customLookUp = {
	fn: undefined as ((token: any) => any) | undefined,
};
