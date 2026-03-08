import { createContext, useContext } from "react";
import { State, useExternalState } from "../../../index.ts";

let AppContext = createContext(new State(0));
// `new State(value)` can contain any kind of value,
// of primitive or nonprimitive type

let Counter = () => {
  let [counter, setCounter] = useExternalState(useContext(AppContext));

  let handleClick = () => {
    // Same as with setters from `useState()`
    setCounter((value) => value + 1);
  };

  return <button onClick={handleClick}>+ {counter}</button>;
};

let ResetButton = () => {
  // This component doesn't make use of the state value, so we are
  // opting out from subscription to its updates by adding `false`
  let [, setCounter] = useExternalState(useContext(AppContext), false);

  let handleClick = () => {
    setCounter(0);
  };

  return <button onClick={handleClick}>×</button>;
};

export let App = () => (
  // Instances of `State` can be provided by regular React Contexts
  // like any other data in a React app
  <AppContext.Provider value={new State(42)}>
    <Counter /> <ResetButton />
  </AppContext.Provider>
);
