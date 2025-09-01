import ProductCard from "../components/shop/ProductCard";
import { useEffect, useMemo, useState } from "react";

interface Product {
  id?: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  features?: string[];
  buyLink?: string;
  category?: string;
}

interface Category { id: string; name: string }

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function Products() {
  const ENABLE_API = import.meta.env.VITE_ENABLE_API === "true";
  const HOST_OK = typeof window !== "undefined" && (location.hostname === "localhost" || location.hostname.endsWith(".netlify.app"));
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [bg, setBg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!ENABLE_API || !HOST_OK) {
      // Load static fallback bundled with the app
      fetch("/products.json").then(r=>r.ok?r.json():Promise.reject()).then((p: Product[])=>{ if(!cancelled) setItems(Array.isArray(p)?p:[]); }).catch(()=>{});
      return;
    }
    const timeout = (ms: number) => new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms));
    const safeFetchJson = async (url: string, ms = 4000) => {
      const res: Response = await Promise.race([
        fetch(url, { cache: "no-store" }),
        timeout(ms),
      ]) as Response;
      if (!res || !res.ok) throw new Error("bad_status");
      return res.json();
    };
    (async () => {
      try {
        await safeFetchJson("/api/ping", 2500);
      } catch {
        return; // API not available; skip without errors
      }
      try {
        const [p, c] = await Promise.all([
          safeFetchJson("/api/products", 5000).catch(() => []),
          safeFetchJson("/api/categories", 5000).catch(() => []),
        ]);
        if (!cancelled) {
          setItems(Array.isArray(p) ? p as Product[] : []);
          setCategories(Array.isArray(c) ? c as Category[] : []);
        }
      } catch {}
      try {
        const pg = await safeFetchJson("/api/pages/products", 4000);
        if (!cancelled) setBg(pg?.meta?.backgroundUrl || null);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [ENABLE_API, HOST_OK]);

  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim().replace(/s\b/, "");

  const matchesQuery = (p: Product, q: string) => {
    if (!q.trim()) return true;
    const needle = normalize(q);
    const hay = [p.name, p.brand, p.category || "", Array.isArray(p.features) ? p.features.join(" ") : ""]
      .filter(Boolean)
      .map((x) => normalize(String(x)))
      .join(" ");
    return hay.includes(needle);
  };

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((p) => matchesQuery(p, query));
  }, [items, query]);

  const sourceItems = query.trim() ? filteredItems : items;

  const derivedFromItems = useMemo(() => {
    const set = new Map<string, string>();
    for (const p of sourceItems) {
      if (!p.category) continue;
      set.set(normalize(p.category), p.category);
    }
    return Array.from(set.values());
  }, [sourceItems]);

  const combinedCategories = useMemo(() => {
    const existingNorms = new Set(categories.map((c) => normalize(c.name)));
    const extras = derivedFromItems.filter((n) => !existingNorms.has(normalize(n))).map((name, i) => ({ id: `item-${i}-${slugify(name)}`, name }));
    return [...categories, ...extras];
  }, [categories, derivedFromItems]);

  const byCategory = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const c of combinedCategories) map.set(c.name, []);
    for (const p of sourceItems) {
      if (!p.category) continue;
      const match = combinedCategories.find((c) => normalize(c.name) === normalize(p.category!));
      const key = match ? match.name : p.category;
      map.set(key, [...(map.get(key) || []), p]);
    }
    return map;
  }, [sourceItems, combinedCategories]);

  const totalResults = sourceItems.length;
  const hasQuery = query.trim().length > 0;

  return (
    <section className="relative py-12 md:py-16 pb-28 md:pb-16">
      <div className="absolute inset-0 -z-10">
        {bg && <img src={bg} alt="Products background" className="h-full w-full object-cover opacity-20" referrerPolicy="no-referrer" />}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      </div>
      <div className="container">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shop Products</h1>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                aria-label="Search products"
                className="w-full rounded-full border border-slate-300 bg-white py-2 pl-10 pr-10 text-sm outline-none ring-0 transition focus:border-slate-400 focus:ring-0"
              />
              {hasQuery && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z"/></svg>
                </button>
              )}
            </div>

            {combinedCategories.length > 0 && (
              <nav className="flex flex-wrap gap-3">
                {combinedCategories.map((c) => (
                  <a key={c.id} href={`#${slugify(c.name)}`} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                    {c.name}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </header>

        {hasQuery && totalResults === 0 && (
          <div className="text-slate-500">No products match “{query}”.</div>
        )}

        {combinedCategories.map((c) => {
          const list = byCategory.get(c.name) || [];
          if (hasQuery && list.length === 0) return null;
          return (
            <div key={c.id}>
              <h2 id={slugify(c.name)} className="mt-6 mb-4 text-2xl font-bold">{c.name}</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {list.map((p) => (
                  <ProductCard key={p.id || `${c.id}-${p.name}`} id={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} features={p.features} buyLink={p.buyLink} />
                ))}
                {!hasQuery && ENABLE_API && list.length === 0 && (
                  <div className="col-span-full text-slate-500">No products in {c.name} yet. Add products in Admin.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
