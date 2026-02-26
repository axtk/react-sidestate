import { useContext, useEffect } from "react";
import { EventCallback, NavigationOptions } from "sidestate";
import { RouteContext } from "./RouteContext.ts";

export function useNavigationStart(callback: EventCallback<NavigationOptions>) {
  let route = useContext(RouteContext);

  useEffect(() => route.on("navigationstart", callback), [route, callback]);
}
