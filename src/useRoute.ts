import { useContext } from "react";
import { NavigationOptions } from "sidestate";
import { RenderCallback } from "./types/RenderCallback.ts";
import { useExternalState } from "./useExternalState.ts";
import { RouteContext } from "./RouteContext.ts";

export function useRoute(callback?: RenderCallback<NavigationOptions>) {
  let route = useContext(RouteContext);

  useExternalState(route, callback, "navigation");

  return route;
}
