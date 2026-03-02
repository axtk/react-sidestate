import { useContext } from "react";
import { useExternalState } from "../../../index.ts";
import { AppContext } from "./AppContext.ts";

export const PlusButton = () => {
  const [, setCounter] = useExternalState(useContext(AppContext), false);

  const handleClick = () => {
    setCounter((value) => value + 1);
  };

  return <button onClick={handleClick}>+</button>;
};
