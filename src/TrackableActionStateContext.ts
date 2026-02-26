import { createContext } from "react";
import { State } from "sidestate";
import { TrackableActionState } from "./types/TrackableActionState.ts";

export const TrackableActionStateContext = createContext(
  new Map<string, State<TrackableActionState>>(),
);
