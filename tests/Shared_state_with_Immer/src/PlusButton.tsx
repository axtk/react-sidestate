import { produce } from "immer";
import { useContext } from "react";
import { useExternalState } from "../../../index.ts";
import { AppContext } from "./AppContext.ts";

export const PlusButton = () => {
  const [, setState] = useExternalState(useContext(AppContext), false);

  const handleClick = () => {
    setState(
      produce((draft) => {
        // Immer makes the code of immutable state updates look like
        // direct mutations, which can facilitate manipulation of nested data.
        draft.counter++;
      }),
    );
  };

  return <button onClick={handleClick}>+</button>;
};
