import { DispatchWithoutAction, useReducer } from 'react';

export function useMisbehavedForceUpdate(): DispatchWithoutAction {
	// It's much nicer than `setState`, no need to pass an empty object to get it
	// to update
	// https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	return forceUpdate;
}
