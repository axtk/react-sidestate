import { useTransientState } from "../../../index.ts";

export let Status = () => {
  // The hook accesses the async action state updated in the `ItemList`
  // component by using the same string key
  let [{ initial, pending, error }] = useTransientState("items");

  // if (initial) return <>⚪ Initial</>;

  if (initial || pending) return <>⏳ Busy</>;

  if (error) return <>❌ Error</>;

  return <>✔️ OK</>;
};
