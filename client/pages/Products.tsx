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
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!ENABLE_API) return;
    fetch("/api/products").then(r => r.ok ? r.json() : Promise.reject()).then((p: Product[]) => setItems(Array.isArray(p) ? p : [])).catch(() => setItems([]));
    fetch("/api/categories").then(r => r.ok ? r.json() : Promise.reject()).then((c: Category[]) => setCategories(Array.isArray(c) ? c : [])).catch(() => setCategories([]));
  }, [ENABLE_API]);

  const byCategory = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const c of categories) map.set(c.name, []);
    for (const p of items) {
      if (!p.category) continue;
      const key = categories.find(c => c.name.toLowerCase() === p.category!.toLowerCase())?.name || p.category;
      map.set(key, [...(map.get(key) || []), p]);
    }
    return map;
  }, [items, categories]);

  return (
    <section className="relative py-12 md:py-16 pb-28 md:pb-16">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shop Products</h1>
          {categories.length > 0 && (
            <nav className="mt-4 flex flex-wrap gap-3">
              {categories.map((c) => (
                <a key={c.id} href={`#${slugify(c.name)}`} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                  {c.name}
                </a>
              ))}
            </nav>
          )}
        </header>

        {categories.map((c) => (
          <div key={c.id}>
            <h2 id={slugify(c.name)} className="mt-6 mb-4 text-2xl font-bold">{c.name}</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {(byCategory.get(c.name) || []).map((p) => (
                <ProductCard key={p.id || `${c.id}-${p.name}`} name={p.name} brand={p.brand} price={p.price} image={p.image} features={p.features} buyLink={p.buyLink} />
              ))}
              {ENABLE_API && (byCategory.get(c.name)?.length ?? 0) === 0 && (
                <div className="col-span-full text-slate-500">No products in {c.name} yet. Add products in Admin.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
