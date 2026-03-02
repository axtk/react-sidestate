import { createContext } from "react";
import { Route } from "sidestate";

export const RouteContext = createContext(new Route(null, { autoStart: false }));
