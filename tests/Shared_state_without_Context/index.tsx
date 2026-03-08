import { createRoot } from "react-dom/client";
import { State, useExternalState } from "../../index.ts";
import "./index.css";

let counterState = new State(0);
// `new State(value)` can contain any kind of value,
// of primitive or nonprimitive type

let Counter = () => {
  let [counter, setCounter] = useExternalState(counterState);

  let handleClick = () => {
    // Same as with setters from `useState()`
    setCounter((value) => value + 1);
  };

  return <button onClick={handleClick}>+ {counter}</button>;
};

let ResetButton = () => {
  // This component doesn't make use of the state value, so we are
  // opting out from subscription to its updates by adding `false`
  let [, setCounter] = useExternalState(counterState, false);

  let handleClick = () => {
    setCounter(0);
  };

  return <button onClick={handleClick}>×</button>;
};

let App = () => (
  <>
    <Counter /> <ResetButton />
  </>
);

createRoot(document.querySelector("#app")!).render(<App />);
