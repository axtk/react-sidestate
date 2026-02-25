import { createRoot } from "react-dom/client";
import { State } from "sidestate";
import { useExternalState } from "../../src/useExternalState.ts";
import "./index.css";

let counterStore = new State(0);

let Counter = () => {
  let [counter, setCounter] = useExternalState(counterStore);

  let handleClick = () => {
    setCounter((value) => value + 1);
  };

  return <button onClick={handleClick}>+ {counter}</button>;
};

let ResetButton = () => {
  let [, setCounter] = useExternalState(counterStore, false);

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
