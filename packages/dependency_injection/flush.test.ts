import { Injectable } from './attributes';
import { resolve } from './resolve/mod';
import { flushAll } from './flush';
import { register } from './register';
import { expect, it } from 'vitest';
import { ServiceLifetimes } from './service_lifetimes';

it('should not use same singleton instances after a flush', () => {
	@Injectable({
		lifetimes: ServiceLifetimes.Singleton,
	})
	class A {
		public data = {
			nbr: 1,
		};
	}

	{
		const a = resolve(A);
		expect(a.data.nbr).toBe(1);
		a.data.nbr++;
	}

	{
		const a = resolve(A);
		expect(a.data.nbr).toBe(2);
	}

	{
		flushAll();
		expect(() => resolve(A)).toThrow();
		register(A, { useClass: A });
		const a = resolve(A);
		expect(a.data.nbr).toBe(1);
	}
});
