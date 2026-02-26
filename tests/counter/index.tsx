import { createRoot } from "react-dom/client";
import { State, useExternalState } from "../../index.ts";
import "./index.css";

let counterState = new State(0);

let Counter = () => {
  let [counter, setCounter] = useExternalState(counterState);

  let handleClick = () => {
    setCounter((value) => value + 1);
  };

  return <button onClick={handleClick}>+ {counter}</button>;
};

let ResetButton = () => {
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
