import { createContext } from "react";
import { URLState } from "sidestate";

export const URLContext = createContext(new URLState());
