import { useContext } from "react";
import { NavigationOptions } from "sidestate";
import { URLContext } from "./URLContext.ts";
import { useExternalState } from "./useExternalState.ts";
import { RenderCallback } from "./types/RenderCallback.ts";

export function useURL(callback?: RenderCallback<NavigationOptions>) {
  return useExternalState(useContext(URLContext), callback, "navigation");
}
