import { useContext } from "react";
import type { NavigationOptions } from "sidestate";
import { RouteContext } from "./RouteContext.ts";
import type { RenderCallback } from "./types/RenderCallback.ts";
import { useExternalState } from "./useExternalState.ts";

export function useRoute(callback?: RenderCallback<NavigationOptions>) {
  let route = useContext(RouteContext);

  useExternalState(route, callback, "navigation");

  return route;
}
