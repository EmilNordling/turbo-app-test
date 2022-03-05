import { BrowserRouter, Route, Routes as RRoutes } from "react-router-dom";
import { IndexPage } from "../pages/index.page";

interface Props {}

export function Routes(_: Props): JSX.Element {
  return (
    <BrowserRouter>
      <RRoutes>
        <Route path="/" element={<IndexPage />} />
      </RRoutes>
    </BrowserRouter>
  );
}
