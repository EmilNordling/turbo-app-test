import { Injectable, useController, ReactLifetime } from 'dependency_injection';
import { Fragment } from 'react';

interface Props {}

export function AppPage(_: Props): JSX.Element {
	const _controller = useController(Controller);

	return <Fragment>here</Fragment>;
}

@Injectable()
class Controller implements ReactLifetime {
	onMount() {
		console.log('on mount');
	}

	onUnmount() {
		console.log('on unmount');
	}
}
