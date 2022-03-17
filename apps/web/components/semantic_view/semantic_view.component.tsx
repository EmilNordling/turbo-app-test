import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { SemanticViewProvider } from './semantic_view.provider';

interface Props {
	header: ReactNode;
	footer?: ReactNode;
}

const Header = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	height: var(--header-height);
	width: 100%;
	z-index: 1;
`;

const Main = styled.main`
	position: relative;
	width: 100%;
	top: var(--header-height);
	min-height: calc(100vh - var(--header-height) - 50px);
	display: flex;
	flex-direction: column;
	margin-bottom: var(--header-height);
	overflow: hidden;
	padding-bottom: var(--header-height);
`;

const Footer = styled.footer`
	height: var(--footer-height);
	width: 100%;
	overflow: hidden;
	min-height: 332px;
`;

export function SemanticView({ footer, header }: Props): JSX.Element {
	return (
		<SemanticViewProvider>
			<Header>{header}</Header>
			<Main>
				<Outlet />
			</Main>
			{footer ? <Footer>{footer}</Footer> : null}
		</SemanticViewProvider>
	);
}
