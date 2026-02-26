import { useContext } from "react";
import { useExternalState } from "../../../index.ts";
import { AppContext } from "./AppContext.ts";

export const PlusButton = () => {
  const [, setState] = useExternalState(useContext(AppContext), false);

  const handleClick = () => {
    setState((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));
  };

  return <button onClick={handleClick}>+</button>;
};
