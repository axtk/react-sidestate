import { createContext } from "react";
import { State } from "../../../index.ts";

export const AppContext = createContext(new State(0));
