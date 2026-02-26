import { useContext } from "react";
import { useExternalState } from "../../../index.ts";
import { AppContext } from "./AppContext.ts";

export const Display = () => {
  const [counter] = useExternalState(useContext(AppContext));

  return <span>{counter}</span>;
};
