import { useEffect } from "react";

export const useLocalStorage = (item, setItem) => {
  useEffect(() => {
    const itemLC = JSON.parse(localStorage.getItem(item));
    if (!itemLC) return;
    setItem(itemLC);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}