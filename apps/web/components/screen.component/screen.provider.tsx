import { ReactNode, useState } from 'react';
import { ScreenContext } from './_screen.context';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useScreenContext } from './_use_screen_count';

interface Props {
	children: ReactNode;
}

const Container = styled(motion.div)`
	display: contents;

	&.is-hidden {
		display: none !important;
	}
`;

export function ScreenProvider({ children }: Props) {
	const [index, setIndex] = useState(0);

	return (
		<ScreenContext.Provider
			value={{
				screenStack: [],
				index,
				setIndex,
			}}
		>
			<ScreenOrigin>{children}</ScreenOrigin>
		</ScreenContext.Provider>
	);
}

interface ScreenOriginProps {
	children: ReactNode;
}

function ScreenOrigin({ children }: ScreenOriginProps) {
	const { index } = useScreenContext();

	return (
		<AnimatePresence>
			<Container className={index > 0 ? 'is-hidden' : undefined}>{children}</Container>
		</AnimatePresence>
	);
}
