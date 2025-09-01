import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Page = { slug: string; title: string; body?: string };

export default function About() {
  const [page, setPage] = useState<Page | null>(null);
  const ENABLE_API = import.meta.env.VITE_ENABLE_API === "true";

  useEffect(() => {
    if (!ENABLE_API) return;
    fetch("/api/pages/about").then((r) => (r.ok ? r.json() : Promise.reject())).then(setPage).catch(() => {});
  }, [ENABLE_API]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {page?.title || (
              <>About <span className="text-blue-600">Nextgen Computing</span></>
            )}
          </h1>
          <p className="mt-5 text-slate-600 leading-relaxed">
            {page?.body || "We are a team of technology enthusiasts dedicated to providing cutting-edge computers and laptops, backed by expert repair and maintenance services. Our mission is to keep you productive and secure with fast turnaround and honest pricing."}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200/70 p-4 text-center bg-white/60 backdrop-blur animate-fade-in" style={{animationDelay:'0.05s'}}>
              <div className="mx-auto h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center animate-float">🏆</div>
              <div className="mt-3 font-semibold">10+ Years</div>
              <div className="text-xs text-slate-500">Experience</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 p-4 text-center bg-white/60 backdrop-blur animate-fade-in" style={{animationDelay:'0.15s'}}>
              <div className="mx-auto h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center animate-float">🔒</div>
              <div className="mt-3 font-semibold">Trusted</div>
              <div className="text-xs text-slate-500">Secure & Transparent</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 p-4 text-center bg-white/60 backdrop-blur animate-fade-in" style={{animationDelay:'0.25s'}}>
              <div className="mx-auto h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center animate-float">💬</div>
              <div className="mt-3 font-semibold">5-Star Support</div>
              <div className="text-xs text-slate-500">Customer Service</div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={(page?.meta as any)?.backgroundUrl || "https://i.pinimg.com/736x/7a/36/49/7a36493b5b4273c69d0d05f05b077c2d.jpg"}
              alt="Technicians repairing laptops in a professional workshop"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container pb-10">
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[{k:"Devices Repaired",v:"5,000+"},{k:"Happy Customers",v:"3,500+"},{k:"Avg. Rating",v:"4.9/5"},{k:"Years in Business",v:"10+"}].map((s)=> (
            <div key={s.k} className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-5 text-center shadow-sm">
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{s.k}</div>
            </div>
          ))}
        </div>

        {/* Our Process */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { title: "1. Free Consultation", desc: "Tell us your issue or need. We advise the best solution upfront.", emoji: "💬" },
            { title: "2. Diagnosis & Quote", desc: "Transparent pricing with no surprises. We only proceed with your approval.", emoji: "🔎" },
            { title: "3. Fix & Deliver", desc: "Certified repairs and quality checks. Pickup or doorstep delivery available.", emoji: "🚚" },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl">{p.emoji}</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Brands & CTA */}
        <div className="mt-12 rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Trusted by leading brands</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Apple","Dell","HP","Lenovo","Asus","Acer","Logitech","Samsung"].map((b)=> (
                <span key={b} className="rounded-full border border-blue-200/60 bg-white px-3 py-1 text-sm text-blue-900">{b}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <Link to="/products" className="btn-outline">Shop Products</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
