import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

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
          <a href="https://wa.me/918469283448?text=Hello%20Nextgen%20Computing%20%E2%80%94%20I%20want%20to%20book%20a%20repair%20service" target="_blank" rel="noreferrer" className="btn-primary hidden lg:inline-flex">Book Repair</a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <details ref={menuRef}>
            <summary className="list-none cursor-pointer rounded-md border border-slate-200/60 px-3 py-2 text-sm font-medium">Menu</summary>
            <div className="mt-3 rounded-lg border border-slate-200/60 bg-white shadow-lg p-3 flex flex-col gap-2">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} className="px-2 py-2 rounded hover:bg-slate-50" onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>
                  {n.label}
                </NavLink>
              ))}
              <a href="https://wa.me/918469283448?text=Hello%20Nextgen%20Computing%20%E2%80%94%20I%20want%20to%20book%20a%20repair%20service" target="_blank" rel="noreferrer" className="btn-primary w-full" onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>Book Repair</a>
            </div>
          </details>
          <a href="https://wa.me/918469283448?text=Hello%20Nextgen%20Computing%20%E2%80%94%20I%20want%20to%20book%20a%20repair%20service" target="_blank" rel="noreferrer" className="btn-primary px-3 py-2 text-sm">Book</a>
        </div>
      </nav>
    </header>
  );
}
