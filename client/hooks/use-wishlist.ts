import { useCallback, useEffect, useMemo, useState } from "react";

import * as React from "react";

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

// Simple global store so all components share the same state in real-time
let storeItems: WishItem[] = readStorage();
const subscribers = new Set<() => void>();

function emit() {
  subscribers.forEach((cb) => cb());
}

function setStore(next: WishItem[]) {
  storeItems = next;
  writeStorage(storeItems);
  emit();
}

// sync with other tabs
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      storeItems = readStorage();
      emit();
    }
  });
}

export function useWishlist() {
  const items = React.useSyncExternalStore(
    (cb) => {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
    () => storeItems,
    () => storeItems
  );

  const has = React.useCallback((id: string) => items.some((x) => x.id === id), [items]);

  const add = React.useCallback((item: WishItem) => {
    setStore(storeItems.some((x) => x.id === item.id) ? storeItems : [item, ...storeItems]);
  }, []);

  const remove = React.useCallback((id: string) => {
    setStore(storeItems.filter((x) => x.id !== id));
  }, []);

  const toggle = React.useCallback((item: WishItem) => {
    const exists = storeItems.some((x) => x.id === item.id);
    setStore(exists ? storeItems.filter((x) => x.id !== item.id) : [item, ...storeItems]);
  }, []);

  const clear = React.useCallback(() => setStore([]), []);

  return React.useMemo(() => ({ items, has, add, remove, toggle, clear }), [items, has, add, remove, toggle, clear]);
}
