import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          <Link to="/contact" className="btn-primary hidden lg:inline-flex">Book Repair</Link>
        </div>

        <div className="md:hidden">
          <details>
            <summary className="list-none cursor-pointer rounded-md border border-slate-200/60 px-3 py-2 text-sm font-medium">Menu</summary>
            <div className="mt-3 rounded-lg border border-slate-200/60 bg-white shadow-lg p-3 flex flex-col gap-2">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} className="px-2 py-2 rounded hover:bg-slate-50">
                  {n.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary w-full">Book Repair</Link>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
