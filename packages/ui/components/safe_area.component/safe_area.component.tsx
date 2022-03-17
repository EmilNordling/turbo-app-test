import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode | ReactNode[] | null;
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: min(100% - 16px * 2, 1320px);
	margin-inline: auto;
`;

export function SafeArea({ children }: Props): JSX.Element {
	return <Container>{children}</Container>;
}
