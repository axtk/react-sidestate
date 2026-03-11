import { createContext } from "react";
import { URLState } from "stateshape";

export const URLContext = createContext(
  new URLState(null, { autoStart: false }),
);
