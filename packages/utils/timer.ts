export type Disposer = () => void;
type GetArgumentTypes<T> = T extends (...x: infer argumentsType) => any ? argumentsType : never;
type Callback = (args?: any) => any;

export class Timer {
	private disposers = new Map<symbol, Disposer>();

	public static async delay(duration: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, duration);
		});
	}

	public static wait(...args: GetArgumentTypes<Timer['wait']>): Disposer {
		const time = new Timer();
		time.wait(...args);

		return time.flush.bind(time);
	}

	public static repeat(...args: GetArgumentTypes<Timer['repeat']>): Disposer {
		const time = new Timer();
		time.repeat(...args);

		return time.flush.bind(time);
	}

	public wait(duration: number, callback: Callback): Disposer {
		const timeout = setTimeout(callback, duration);
		const disposer = (): void => {
			clearTimeout(timeout);
		};

		return this.registerDisposer(disposer);
	}

	public repeat(duration: number, callback: Callback, callOnceOnInvoke = false): Disposer {
		if (callOnceOnInvoke) {
			callback();
		}

		const interval = setInterval(callback, duration);
		const disposer = (): void => {
			clearInterval(interval);
		};

		return this.registerDisposer(disposer);
	}

	public flush(): void {
		this.disposers.forEach((disposer) => disposer());
		this.disposers = new Map();
	}

	private registerDisposer(disposer: Disposer): Disposer {
		const localId = Symbol();

		this.disposers.set(localId, disposer);

		return () => {
			this.disposers.delete(localId);

			disposer();
		};
	}
}
