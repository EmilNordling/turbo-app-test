import "./_reset.css";
import "./main.css";
import { render } from "react-dom";
import { App } from "./components/app.component";
import { createResolutionContext } from "dependency_injection";

render(
  <App resolutionContext={createResolutionContext()} />,
  document.getElementById("root")
);
