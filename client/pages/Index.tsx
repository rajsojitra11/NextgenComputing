import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/shop/ProductCard";

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

export default function Index() {
  const ENABLE_API = import.meta.env.VITE_ENABLE_API === "true";
  const FEATURED_ON_HOME = import.meta.env.VITE_FEATURED_ON_HOME === "true";
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (!ENABLE_API || !FEATURED_ON_HOME) return;
    (async () => {
      try {
        const r = await fetch("/api/products");
        if (!r.ok) return;
        const p: Product[] = await r.json();
        setItems(Array.isArray(p) ? p : []);
      } catch (_) {
        setItems([]);
      }
    })();
  }, [ENABLE_API, FEATURED_ON_HOME]);

  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
  const featured = FEATURED_ON_HOME ? (() => {
    const seen = new Set<string>();
    const out: Product[] = [];
    for (const p of items) {
      const key = normalize(p.category || "");
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(p);
      if (out.length >= 4) break;
    }
    return out;
  })() : [];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Premium animated background */}
        <div className="absolute inset-0 -z-10">
          {/* gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18)_0%,transparent_45%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.12)_0%,transparent_55%)]" />
          {/* hero photo */}
          <img
            src="https://i.pinimg.com/1200x/ba/07/07/ba070712b889d1dc569f189e59294511.jpg"
            alt="Premium desk setup with monitor and laptop"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          {/* dark wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/75 to-slate-900/65" />
          {/* soft orbs */}
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
          {/* grid overlay with radial mask */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:36px_36px]" />
          {/* animated tech lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="glow" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.03)" />
              </linearGradient>
            </defs>
            <g stroke="url(#glow)" strokeWidth="1">
              {Array.from({ length: 24 }).map((_, i) => (
                <path
                  key={i}
                  className="animate-dash"
                  d={`M0 ${i * 36} C 220 ${i * 36 + 18}, 420 ${i * 36 - 18}, 1200 ${i * 36}`}
                  fill="none"
                  strokeDasharray="6 6"
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="container relative py-28 md:py-36">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium text-white">
              ⚡ Fast repairs • 🔒 Trusted service ��� 💻 Quality products
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-in text-white">
              Nextgen Computing — Your Trusted Partner in Technology
            </h1>
            <p className="mt-5 text-lg text-slate-200 max-w-2xl animate-slide-up" style={{animationDelay:'0.1s'}}>
              Premium laptops, monitors and pro repairs. Smooth, reliable and performance‑ready for work or play.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/products" className="btn-primary animate-slide-up" style={{animationDelay:'0.15s'}}>Shop Now</Link>
              <Link to="/contact" className="btn-outline animate-slide-up text-white border-white/30 hover:bg-white/10" style={{animationDelay:'0.2s'}}>Book Repair Service</Link>
            </div>

          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { title: "Premium Laptops", desc: "Top brands, latest-gen CPUs, and fast delivery.", emoji: "💻" },
            { title: "Expert Repairs", desc: "Diagnostics, board-level fixes, and upgrades.", emoji: "🛠️" },
            { title: "Great Support", desc: "Friendly team with 5-star customer service.", emoji: "🤝" },
          ].map((c, i) => (
            <div key={c.title} className="rounded-2xl border border-slate-200/70 p-6 bg-white/70 backdrop-blur hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl animate-float" style={{animationDelay: `${i * 0.1}s`}}>{c.emoji}</div>
              <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <Link to="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all</Link>
            </div>
            <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id || p.name} name={p.name} brand={p.brand} price={p.price} image={p.image} features={p.features} buyLink={p.buyLink} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services CTA */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-2xl border border-slate-200/70 p-6 md:p-8 bg-white/70 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Repair & Upgrade Services</h3>
              <p className="mt-1 text-slate-600">Screen repairs, SSD/RAM upgrades, OS installs, data recovery and more.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/services" className="btn-primary">Explore Services</Link>
              <Link to="/contact" className="btn-outline">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
