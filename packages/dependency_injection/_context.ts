import type { Token } from './_common';

export class Context<T> {
	private readonly instances = new Map<Token, T>();

	public drop(): void {
		this.instances.clear();
	}

	public isInstantiated(token: Token): boolean {
		return this.instances.has(token);
	}

	public retrieve(token: Token): T | undefined {
		return this.instances.get(token);
	}

	public add(key: Token, value: T): void {
		this.instances.set(key, value);
	}
}

export const globalContext = new Context<any>();
