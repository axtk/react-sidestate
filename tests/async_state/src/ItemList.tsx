import { type CSSProperties, useCallback, useEffect, useState } from "react";
import { useTransientState } from "../../../index.ts";
import { fetchItems as fetchItemsOriginal, type Item } from "./fetchItems.ts";

export let ItemList = () => {
  let [items, setItems] = useState<Item[]>([]);
  let {
    call: fetchItems,
    initial,
    pending,
    error,
  } = useTransientState(fetchItemsOriginal, "fetch-items");

  let loadItems = useCallback(() => {
    fetchItems().then(setItems);
  }, [fetchItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  if (initial || pending) return <p>Loading...</p>;

  if (error)
    return (
      <div className="error">
        <p>Failed to load items</p>
        <p>
          <button onClick={loadItems}>Reload items</button>
        </p>
      </div>
    );

  return (
    <>
      <p>
        <button onClick={loadItems}>Reload items</button>
      </p>
      <ul>
        {items.map(({ id, text, color }) => (
          <li key={id} style={{ "--color": color } as CSSProperties}>
            <span className="badge" />
            {text}
          </li>
        ))}
      </ul>
    </>
  );
};
