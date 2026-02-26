import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { isState, State } from "sidestate";
import { TrackableActionState } from "./types/TrackableActionState.ts";
import { TrackableActionStateContext } from "./TrackableActionStateContext.ts";
import { SetExternalStateValue, useExternalState } from "./useExternalState.ts";

function createState(
  initial = true,
  pending = false,
  error?: unknown,
): TrackableActionState {
  return {
    initial,
    pending,
    error,
    time: Date.now(),
  };
}

export type ActionTrackingOptions = {
  /**
   * Whether to track the action state silently (e.g. with a background
   * action or an optimistic update).
   *
   * When set to `true`, the state's `pending` property doesn't switch
   * to `true` in the pending state.
   */
  silent?: boolean;
  /**
   * Delays switching the action state's `pending` property to `true`
   * in the pending state by the given number of milliseconds.
   *
   * Use case: to avoid flashing a process indicator if the action is
   * likely to complete by the end of a short delay.
   */
  delay?: number;
  /**
   * Allows the async action to reject explicitly, along with exposing
   * the action state's `error` property that goes by default.
   */
  throws?: boolean;
};

/**
 * Returns `[trackableAction, state, setState]`, where `trackableAction` is a
 * version of the given `action` whose progression state can be tracked,
 * `state: { initial, pending, error }` is the current action state value, and
 * `setState(nextState | ((state) => nextState))` is a function allowing to
 * directly update the action state.
 *
 * The hook's optional `state` parameter is a unique string key or an instance
 * of `State`. Providing a key or a shared state allows to share the action
 * state across multiple components. If omitted, the pending state stays
 * locally scoped to the component where the hook is used.
 */
export function useTrackableAction<F extends (...args: unknown[]) => unknown>(
  action: F,
  state?: string | State<TrackableActionState> | null,
): [
  (...args: [...Parameters<F>, ActionTrackingOptions]) => ReturnType<F>,
  TrackableActionState,
  SetExternalStateValue<TrackableActionState>,
] {
  let stateMap = useContext(TrackableActionStateContext);
  let stateRef = useRef<State<TrackableActionState> | null>(null);
  let [stateItemInited, setStateItemInited] = useState(false);

  let resolvedState = useMemo(() => {
    if (isState<TrackableActionState>(state)) return state;

    if (typeof state === "string") {
      let stateItem = stateMap.get(state);

      if (!stateItem) {
        stateItem = new State(createState());
        stateMap.set(state, stateItem);

        if (!stateItemInited) setStateItemInited(true);
      }

      return stateItem;
    }

    if (!stateRef.current) stateRef.current = new State(createState());

    return stateRef.current;
  }, [state, stateMap, stateItemInited]);

  let [actionState, setActionState] = useExternalState(resolvedState);

  let trackableAction = useCallback((...args: [...Parameters<F>, ActionTrackingOptions]) => {
    let options = args.at(-1) as ActionTrackingOptions | undefined;
    let originalArgs = args.slice(0, -1) as Parameters<F>;
    let result: unknown;

    try {
      result = action(...originalArgs);
    }
    catch (error) {
      setActionState((prevState) => ({
        ...prevState,
        ...createState(false, false, error),
      }));

      if (options?.throws) throw error;
    }

    if (result instanceof Promise) {
      let delayedTracking: ReturnType<typeof setTimeout> | null = null;

      if (!options?.silent) {
        let delay = options?.delay;

        if (delay === undefined)
          setActionState((prevState) => ({
            ...prevState,
            ...createState(false, true),
          }));
        else
          delayedTracking = setTimeout(() => {
            setActionState((prevState) => ({
              ...prevState,
              ...createState(false, true),
            }));

            delayedTracking = null;
          }, delay);
      }

      return result
        .then((value) => {
          if (delayedTracking !== null) clearTimeout(delayedTracking);

          setActionState((prevState) => ({
            ...prevState,
            ...createState(false, false),
          }));

          return value;
        })
        .catch((error) => {
          if (delayedTracking !== null) clearTimeout(delayedTracking);

          setActionState((prevState) => ({
            ...prevState,
            ...createState(false, false, error),
          }));

          if (options?.throws) throw error;
        }) as ReturnType<F>;
    }

    setActionState((prevState) => ({
      ...prevState,
      ...createState(false, false),
    }));

    return result as ReturnType<F>;
  }, [setActionState]);

  return [
    trackableAction,
    actionState,
    setActionState,
  ];
}
