import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useWishlist } from "@/hooks/use-wishlist";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const { items, remove, clear } = useWishlist();
  const count = items.length;
  const formatINR = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all ${
      scrolled ? "backdrop-blur bg-white/75 shadow-sm" : "bg-transparent"
    }`}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="group inline-flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">N</div>
          <span className="text-lg sm:text-xl font-bold tracking-tight">
            Nextgen <span className="text-blue-600">Computing</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `relative font-medium text-sm hover:text-blue-700 transition-colors ${
                  isActive ? "text-blue-700" : "text-slate-700"
                }`
              }
            >
              <span className="px-1">
                {n.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all group-hover:w-full" />
              </span>
            </NavLink>
          ))}
          <details className="relative order-2" ref={wishlistRef} onToggle={() => { const o = !!wishlistRef.current?.open; setWishOpen(o); if (o && menuRef.current) menuRef.current.open = false; }}>
            <summary aria-label="Wishlist" className="list-none cursor-pointer rounded-full border border-slate-200/60 p-2 bg-white/80 backdrop-blur inline-flex items-center justify-center relative">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {count > 0 && <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 rounded-full bg-pink-600 text-white text-[10px] leading-5 text-center px-1">{count}</span>}
            </summary>
            <div className="fixed top-16 right-3 w-[92vw] z-50 md:absolute md:top-auto md:right-0 md:w-80 max-w-[92vw] md:max-w-none rounded-lg border border-slate-200/60 bg-white shadow-lg p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Wishlist</h3>
                {count > 0 && <button className="text-xs text-slate-500 hover:text-slate-700" onClick={() => clear()}>Clear</button>}
              </div>
              {count === 0 ? (
                <div className="text-sm text-slate-500">No items yet.</div>
              ) : (
                <ul className="max-h-64 overflow-auto divide-y">
                  {items.map((it) => (
                    <li key={it.id} className="py-2 flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="h-12 w-12 rounded object-cover bg-slate-100" onError={(e:any)=>{e.currentTarget.src='/placeholder.svg'}} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{it.name}</div>
                        <div className="text-xs text-slate-500">{it.brand}</div>
                      </div>
                      <button className="text-xs text-red-600 hover:underline" onClick={() => remove(it.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/products" className="btn-primary w-full">Shop Products</Link>
            </div>
          </details>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <details className="relative order-2" ref={wishlistRef} onToggle={() => { const o = !!wishlistRef.current?.open; setWishOpen(o); if (o && menuRef.current) menuRef.current.open = false; }}>
            <summary aria-label="Wishlist" className="list-none cursor-pointer rounded-full border border-slate-200/60 p-2 bg-white/80 backdrop-blur inline-flex items-center justify-center relative">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {count > 0 && <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 rounded-full bg-pink-600 text-white text-[10px] leading-5 text-center px-1">{count}</span>}
            </summary>
            <div className="fixed top-16 right-3 w-[92vw] z-50 md:absolute md:top-auto md:right-0 md:w-80 max-w-[92vw] md:max-w-none rounded-lg border border-slate-200/60 bg-white shadow-lg p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Wishlist</h3>
                {count > 0 && <button className="text-xs text-slate-500 hover:text-slate-700" onClick={() => clear()}>Clear</button>}
              </div>
              {count === 0 ? (
                <div className="text-sm text-slate-500">No items yet.</div>
              ) : (
                <ul className="max-h-64 overflow-auto divide-y">
                  {items.map((it) => (
                    <li key={it.id} className="py-2 flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="h-12 w-12 rounded object-cover bg-slate-100" onError={(e:any)=>{e.currentTarget.src='/placeholder.svg'}} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{it.name}</div>
                        <div className="text-xs text-slate-500">{it.brand}</div>
                      </div>
                      <button className="text-xs text-red-600 hover:underline" onClick={() => remove(it.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/products" className="btn-primary w-full">Shop Products</Link>
            </div>
          </details>

          <details ref={menuRef} className="order-1">
            <summary aria-label="Open menu" className="list-none cursor-pointer rounded-md border border-slate-200/60 p-2 bg-white/80 backdrop-blur flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </summary>
            <div className="mt-3 rounded-lg border border-slate-200/60 bg-white shadow-lg p-3 flex flex-col gap-2">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} className="px-2 py-2 rounded hover:bg-slate-50" onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>
                  {n.label}
                </NavLink>
              ))}
              <a href="https://wa.me/918469283448?text=Hello%20Nextgen%20Computing%20%E2%80%94%20I%20want%20to%20book%20a%20repair%20service" target="_blank" rel="noreferrer" className="btn-primary w-full" onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>Book Repair</a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
