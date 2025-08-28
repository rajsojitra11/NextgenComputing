import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated gradient and tech lines */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15)_0%,transparent_45%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
          <img
            src="https://images.pexels.com/photos/29457406/pexels-photo-29457406.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Modern workspace with laptops and computers"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="glow" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.02)" />
              </linearGradient>
            </defs>
            <g stroke="url(#glow)" strokeWidth="1">
              {Array.from({ length: 20 }).map((_, i) => (
                <path
                  key={i}
                  className="animate-dash"
                  d={`M0 ${i * 40} C 200 ${i * 40 + 20}, 400 ${i * 40 - 20}, 800 ${i * 40}`}
                  fill="none"
                  strokeDasharray="6 6"
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="container relative py-28 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/40 bg-white/40 backdrop-blur px-3 py-1 text-xs font-medium text-blue-900 dark:text-white">
              ⚡ Fast repairs • 🔒 Trusted service • 💻 Quality products
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-in">
              Nextgen Computing – Your Trusted Partner in Technology
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl animate-slide-up" style={{animationDelay:'0.1s'}}>
              We sell cutting-edge computers and laptops and provide expert repairing services. Modern, reliable, and built for performance.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/products" className="btn-primary animate-slide-up" style={{animationDelay:'0.15s'}}>Shop Now</Link>
              <Link to="/contact" className="btn-outline animate-slide-up" style={{animationDelay:'0.2s'}}>Book Repair Service</Link>
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
    </div>
  );
}
