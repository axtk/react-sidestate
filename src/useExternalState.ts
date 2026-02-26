import { useEffect, useMemo, useRef, useState } from "react";
import { type EventPayloadMap, isState, type State } from "sidestate";
import type { RenderCallback } from "./types/RenderCallback.ts";

export type SetExternalStateValue<
  T,
  P extends EventPayloadMap<T> = EventPayloadMap<T>,
> = State<T, P>["setValue"];

const defaultRenderCallback = (render: () => void) => render();

export function useExternalState<T, P extends EventPayloadMap<T>>(
  state: State<T, P>,
  callback?: RenderCallback<P["update"]> | boolean,
): [T, SetExternalStateValue<T, P>];

export function useExternalState<
  T,
  P extends EventPayloadMap<T>,
  E extends keyof P,
>(
  state: State<T, P>,
  callback?: RenderCallback<P[E]> | boolean,
  event?: E,
): [T, SetExternalStateValue<T, P>];

export function useExternalState<
  T,
  P extends EventPayloadMap<T>,
  E extends string,
>(
  state: State<T, P>,
  callback: RenderCallback<P[E]> | boolean = defaultRenderCallback,
  event?: E,
): [T, SetExternalStateValue<T, P>] {
  if (!isState<T, P>(state))
    throw new Error("'state' is not an instance of PortableState");

  let [, setRevision] = useState(-1);

  let setValue = useMemo(() => state.setValue.bind(state), [state]);
  let initialStateRevision = useRef(state.revision);
  let shouldUpdate = useRef(false);

  useEffect(() => {
    // Allow state instances to hook into the effect
    state.emit("effect");

    if (callback === false) return;

    shouldUpdate.current = true;

    let render = () => {
      // Use `setRevision()` as long as the component is mounted
      if (shouldUpdate.current) setRevision(Math.random());
    };

    let resolvedCallback =
      typeof callback === "function" ? callback : defaultRenderCallback;

    let unsubscribe = state.on(event ?? "update", (payload) => {
      resolvedCallback(render, payload as P[E]);
    });

    if (state.revision !== initialStateRevision.current)
      setRevision(Math.random());

    return () => {
      unsubscribe();
      initialStateRevision.current = state.revision;
      shouldUpdate.current = false;
    };
  }, [state, callback, event]);

  return [state.getValue(), setValue];
}
