import { createContext } from "react";
import { State } from "sidestate";
import { TransientState } from "./types/TransientState.ts";

export const TransientStateContext = createContext(
  new Map<string, State<TransientState>>(),
);
