import { BrowserRouter, Route, Routes as DomRoutes } from 'react-router-dom';
import { IndexPage } from '../pages/index.page';
import { NotFoundPage } from '../pages/404.page';
import { AppPage } from '../pages/app.page';
import { FixedView } from './fixed_view.component/mod';
import { ViewDashboard } from './view_dashboard.component/view_dashboard.component';

interface Props {}

export function Routes(_: Props): JSX.Element {
	return (
		<BrowserRouter>
			<DomRoutes>
				<Route path='/' element={<FixedView />}>
					<Route index element={<IndexPage />} />
				</Route>
				<Route path='/app/*'>
					<Route element={<ViewDashboard />}>
						<Route index element={<AppPage />} />
					</Route>
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</DomRoutes>
		</BrowserRouter>
	);
}
