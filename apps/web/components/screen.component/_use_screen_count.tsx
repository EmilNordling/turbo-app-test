import { useContext } from 'react';
import { ScreenContext } from './_screen.context';

export function useScreenContext() {
	const semanticViewContext = useContext(ScreenContext);
	if (semanticViewContext === undefined) {
		throw new Error('useScreenContext must be used within a ScreenProvider');
	}

	return semanticViewContext;
}
