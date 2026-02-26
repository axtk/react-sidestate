import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useContext,
} from "react";
import { getNavigationOptions, isRouteEvent } from "sidestate";
import { RouteContext } from "./RouteContext.ts"
import { AProps } from "./types/AProps.ts";
import { AreaProps } from "./types/AreaProps.ts";

export function useLinkClick({ target, onClick }: AProps | AreaProps) {
  let route = useContext(RouteContext);

  return useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement & HTMLAreaElement>) => {
      onClick?.(event);

      if (
        !event.defaultPrevented &&
        isRouteEvent(event) &&
        (!target || target === "_self")
      ) {
        event.preventDefault();
        route.navigate(getNavigationOptions(event.currentTarget));
      }
    },
    [route, target, onClick],
  );
}
