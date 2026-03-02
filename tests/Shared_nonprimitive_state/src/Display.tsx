import { useContext } from "react";
import { useExternalState } from "../../../index.ts";
import { AppContext } from "./AppContext.ts";

export const Display = () => {
  const [state] = useExternalState(useContext(AppContext));

  return <span>{state.counter}</span>;
};
