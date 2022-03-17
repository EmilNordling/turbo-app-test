import { useScreenContext } from './_use_screen_count';
import styled from '@emotion/styled';
import { Fragment, useLayoutEffect, useRef } from 'react';
import * as Portal from '@radix-ui/react-portal';

interface Props {
	children: React.ReactNode | React.ReactNode[];
	isActivated?: boolean;
}

const Inner = styled(Portal.Root)`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	position: relative;
	top: 0;
	width: 100%;
	z-index: 5;
`;

export function Screen({ children, isActivated = false }: Props): JSX.Element {
	if (isActivated) {
		return <ActivatedScreen>{children}</ActivatedScreen>;
	}

	return <Fragment>{children}</Fragment>;
}

interface ActivatedScreenProps {
	children: React.ReactNode | React.ReactNode[];
}

function ActivatedScreen({ children }: ActivatedScreenProps): JSX.Element {
	const { index, setIndex, screenStack } = useScreenContext();
	const id = useRef<number>(screenStack.length + 1);
	const ref = useRef<HTMLDivElement>(document.getElementById('root') as HTMLDivElement);

	useLayoutEffect(() => {
		setIndex((prev) => prev + 1);
		console.log('mount', id.current);

		return () => {
			console.log('unmount', id.current);
			setIndex((prev) => prev - 1);
		};
	}, []);

	return (
		<Inner container={ref.current}>
			{index}
			{children}
		</Inner>
	);
}
