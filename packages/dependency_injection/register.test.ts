import { Injectable } from './attributes';
import { __registerMetaData } from './meta';
import { resolve } from './resolve/mod';
import { flushAll } from './flush';
import { getRegisteredService, register } from './register';
import { ServiceLifetimes } from './service_lifetimes';
import { afterEach, expect, test } from 'vitest';

afterEach(() => {
	flushAll();
});

test('asserts that it registers services', () => {
	@Injectable({
		lifetimes: ServiceLifetimes.Singleton,
	})
	class SingletonService {}

	@Injectable()
	class ScopedService {}

	@Injectable({
		lifetimes: ServiceLifetimes.Transient,
	})
	class TransientService {}

	const registered_singleton = getRegisteredService(SingletonService) ?? {
		ctor: undefined,
	};
	const registered_scoped = getRegisteredService(ScopedService) ?? {
		ctor: undefined,
	};
	const registered_transient = getRegisteredService(TransientService) ?? {
		ctor: undefined,
	};
	const registered_null = getRegisteredService(class {});
	expect(registered_singleton.ctor).toEqual(SingletonService);
	expect(registered_scoped.ctor).toEqual(ScopedService);
	expect(registered_transient.ctor).toEqual(TransientService);
	expect(registered_null).toEqual(null);
});

test('asserts that it replace services', () => {
	@Injectable({
		lifetimes: ServiceLifetimes.Singleton,
	})
	class A {
		public data = 'og';
	}

	@Injectable()
	class B {
		public data = 'og';
	}

	@Injectable({
		lifetimes: ServiceLifetimes.Transient,
	})
	class C {
		public data = 'og';
	}

	register(A, {
		useClass: class Mock {
			public data = 'a';
		},
	});
	const a = resolve(A);
	expect(a.data).toEqual('a');

	register(B, {
		useClass: class Mock {
			public data = 'b';
		},
	});
	const b = resolve(B);
	expect(b.data).toEqual('b');

	register(C, {
		useClass: class Mock {
			public data = 'c';
		},
	});
	const c = resolve(C);
	expect(c.data).toEqual('c');

	@Injectable({
		lifetimes: ServiceLifetimes.Singleton,
	})
	class D {
		public data = 'og';
	}

	register(D, {
		lifeTimes: ServiceLifetimes.Transient,
		useClass: class Mock {
			public data = 'd';
		},
	});
	const d = resolve(D);
	expect(d.data).toEqual('d');
});

test('asserts that it resolve singleton with mocked dependency', () => {
	@Injectable({
		lifetimes: ServiceLifetimes.Singleton,
	})
	class A {
		public data = 'og';
	}

	@Injectable({
		lifetimes: ServiceLifetimes.Singleton,
	})
	class B {
		public data = 'og';

		constructor(public readonly a: A) {}
	}
	__registerMetaData(B, [A]);

	register(A, {
		useClass: class Mock {
			public data = 'replaced';
		},
	});

	const b = resolve(B);
	expect(b.data).toBe('og');
	expect(b.a.data).toBe('replaced');
});

test('asserts that it resolve scoped with mocked dependency', () => {
	@Injectable()
	class A {
		public data = 'og';
	}

	@Injectable()
	class B {
		public data = 'og';

		constructor(public readonly a: A) {}
	}
	__registerMetaData(B, [A]);

	register(A, {
		useClass: class Mock {
			public data = 'replaced';
		},
	});

	const b = resolve(B);
	expect(b.data).toBe('og');
	expect(b.a.data).toBe('replaced');
});

test('asserts that it resolve transient with mocked dependency', () => {
	@Injectable({
		lifetimes: ServiceLifetimes.Transient,
	})
	class A {
		public data = 'og';
	}

	@Injectable({
		lifetimes: ServiceLifetimes.Transient,
	})
	class B {
		public data = 'og';

		constructor(public a: A) {}
	}
	__registerMetaData(B, [A]);

	register(A, {
		useClass: class Mock {
			public data = 'replaced';
		},
	});

	const b = resolve(B);
	expect(b.data).toBe('og');
	expect(b.a.data).toBe('replaced');
});
