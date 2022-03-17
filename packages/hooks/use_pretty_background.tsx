import { useLayoutEffect } from 'react';

/**
 * <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
 */
export function useStatusBarColor(color: string): void {
	useLayoutEffect(() => {
		const doc = document.body;
		const prev = doc.style.backgroundColor;

		console.log(doc);

		doc.style.backgroundColor = color;

		return () => {
			doc.style.backgroundColor = prev;
		};
	}, []);
}
