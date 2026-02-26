import { type ReactNode, useMemo, useRef } from "react";
import { State } from "sidestate";
import { TrackableActionState } from "./types/TrackableActionState.ts";
import { TrackableActionStateContext } from "./TrackableActionStateContext.ts";

export type TrackableActionStateProviderProps = {
  value?:
    | Record<string, TrackableActionState>
    | Map<string, State<TrackableActionState>>
    | null
    | undefined;
  children?: ReactNode;
};

export const TrackableActionStateProvider = ({
  value,
  children,
}: TrackableActionStateProviderProps) => {
  let defaultValueRef = useRef<Map<string, State<TrackableActionState>> | null>(null);

  let stateMap = useMemo(() => {
    if (value instanceof Map) return value;

    if (typeof value === "object" && value !== null)
      return new Map(
        Object.entries(value).map(([key, value]) => [key, new State(value)]),
      );

    if (defaultValueRef.current === null)
      defaultValueRef.current = new Map<string, State<TrackableActionState>>();

    return defaultValueRef.current;
  }, [value]);

  return (
    <TrackableActionStateContext.Provider value={stateMap}>
      {children}
    </TrackableActionStateContext.Provider>
  );
};
