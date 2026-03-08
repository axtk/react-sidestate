import { createContext, useContext } from "react";
import { State, useExternalState } from "../../../index.ts";

let AppContext = createContext(new State({ counter: 0 }));
// `new State(value)` can contain any kind of value,
// of primitive or nonprimitive type

let Display = () => {
  let [state] = useExternalState(useContext(AppContext));

  return <span>{state.counter}</span>;
};

let PlusButton = () => {
  // This component doesn't make use of the state value, so we are
  // opting out from subscription to its updates by adding `false`
  let [, setState] = useExternalState(useContext(AppContext), false);

  let handleClick = () => {
    // Same as with setters from `useState()`
    setState((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));
  };

  return <button onClick={handleClick}>+</button>;
};

export let App = () => (
  // Instances of `State` can be provided by regular React Contexts
  // like any other data in a React app
  <AppContext.Provider value={new State({ counter: 42 })}>
    <PlusButton /> <Display />
  </AppContext.Provider>
);
