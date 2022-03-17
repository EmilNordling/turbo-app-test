import { createContext, SetStateAction, Dispatch } from 'react';

type Stack = string[];

interface State {
	readonly index: number;
	readonly setIndex: Dispatch<SetStateAction<number>>;
	readonly screenStack: Readonly<Stack>;
}

export const ScreenContext = createContext<State>(undefined as unknown as State);
