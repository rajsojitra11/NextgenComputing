import { useCallback, useEffect, useMemo, useState } from "react";

export type WishItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
};

const STORAGE_KEY = "wishlist:v1";

function readStorage(): WishItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeStorage(items: WishItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useWishlist() {
  const [items, setItems] = useState<WishItem[]>(() => readStorage());

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const has = useCallback((id: string) => items.some((x) => x.id === id), [items]);

  const add = useCallback((item: WishItem) => {
    setItems((prev) => {
      if (prev.some((x) => x.id === item.id)) return prev;
      const next = [item, ...prev];
      writeStorage(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((x) => x.id !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  const toggle = useCallback((item: WishItem) => {
    setItems((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      const next = exists ? prev.filter((x) => x.id !== item.id) : [item, ...prev];
      writeStorage(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    writeStorage([]);
    setItems([]);
  }, []);

  return useMemo(() => ({ items, has, add, remove, toggle, clear }), [items, has, add, remove, toggle, clear]);
}
