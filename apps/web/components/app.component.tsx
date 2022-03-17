import { Routes } from './routes.component';
import { ScreenProvider } from './screen.component/mod';
import type { ResolutionContext } from 'dependency_injection';

interface Props {
	resolutionContext: ResolutionContext;
}

export function App(_: Props): JSX.Element {
	return (
		<ScreenProvider>
			<Routes />
		</ScreenProvider>
	);
}
