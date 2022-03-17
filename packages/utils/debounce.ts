/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

type ArgumentsType<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never;

/**
 * Runs a behavior that should only happen after a repeated action has completed.
 */
export function debounce<T extends (...args: any) => any>(callback: T, ms: number): (...args: ArgumentsType<T>) => void {
	let timeout: ReturnType<typeof setTimeout>;

	return function debouncer(...args: any[]): void {
		// @ts-ignore
		const functionCall = (): void => callback.apply(this, args);

		clearTimeout(timeout);
		timeout = setTimeout(functionCall, ms);
	};
}
