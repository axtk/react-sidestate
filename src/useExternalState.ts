import { useEffect, useMemo, useRef, useState } from "react";
import { EventPayloadMap, isState, State } from "sidestate";
import { RenderCallback } from "./types/RenderCallback.ts";

export type SetPortableStateValue<T, P extends EventPayloadMap<T>> =
  State<T, P>["setValue"];

const defaultRenderCallback = (render: () => void) => render();

export function useExternalState<T, P extends EventPayloadMap<T>, E extends string>(
  state: State<T, P>,
  callback: RenderCallback<P[E]> = defaultRenderCallback,
  event?: E,
): [T, SetPortableStateValue<T, P>] {
  if (!isState<T, P>(state))
    throw new Error("'state' is not an instance of PortableState");

  let [, setRevision] = useState(-1);

  let setValue = useMemo(() => state.setValue.bind(state), [state]);
  let initialStateRevision = useRef(state.revision);
  let shouldUpdate = useRef(false);

  useEffect(() => {
    // Allow state instances to hook into the effect
    state.emit("effect");

    shouldUpdate.current = true;

    let render = () => {
      // Use `setRevision()` as long as the component is mounted
      if (shouldUpdate.current) setRevision(Math.random());
    };

    let unsubscribe = state.on(event ?? "update", (payload) => {
      callback(render, payload as P[E]);
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
