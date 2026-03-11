import { createContext } from "react";
import { Route } from "stateshape";

export const RouteContext = createContext(
  new Route(null, { autoStart: false }),
);
