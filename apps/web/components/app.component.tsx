import { Fragment } from "react";
import { Routes } from "./routes.component";
import type { Resolution } from "dependency_injection";

interface Props {
  resolutionContext: Resolution;
}

export function App(_: Props): JSX.Element {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
}
