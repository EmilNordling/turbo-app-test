import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

interface Props {}

const Main = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

export function FixedView(_: Props): JSX.Element {
	return (
		<Main>
			<Outlet />
		</Main>
	);
}
