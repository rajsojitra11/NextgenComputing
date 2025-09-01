import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";

type Testimonial = {
  name: string;
  role: string;
  rating: number; // 1-5
  photo: string;
  quote: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Patel",
    role: "Gaming Laptop Buyer",
    rating: 5,
    photo:
      "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Fantastic experience! They helped me choose the perfect laptop and set everything up. Super fast delivery.",
  },
  {
    name: "Sophia Lee",
    role: "MacBook Repair",
    rating: 5,
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "My keyboard was replaced the same day. Transparent pricing and excellent communication.",
  },
  {
    name: "Daniel Kim",
    role: "Monitor Upgrade",
    rating: 4,
    photo:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Love the new 4K monitor. The team explained everything and recommended the right size for my desk.",
  },
  {
    name: "Mia Rodriguez",
    role: "Custom Build",
    rating: 5,
    photo:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Built a workstation for video editing—performance is incredible. Highly recommend Nextgen Computing!",
  },
  {
    name: "Noah Williams",
    role: "Annual Maintenance",
    rating: 5,
    photo:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Quick tune-up and dust cleaning made my PC feel brand new. Friendly and professional service.",
  },
  {
    name: "Emily Chen",
    role: "Business Purchase",
    rating: 5,
    photo:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Great bulk pricing for our office laptops and monitors. Seamless procurement and setup.",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${n} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < n ? "text-yellow-400" : "text-slate-300"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
        </svg>
      ))}
    </div>
  );
}

function StarInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1" role="radiogroup" aria-label="Select rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-checked={active}
            role="radio"
            className="p-1"
            aria-label={`${n} star`}
          >
            <svg viewBox="0 0 24 24" className={`h-6 w-6 sm:h-5 sm:w-5 ${active ? "text-yellow-400" : "text-slate-300"}`} fill="currentColor" aria-hidden="true">
              <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const options: EmblaOptionsType = { loop: true, align: "start", skipSnaps: false };
  const [viewportRef, embla] = useEmblaCarousel(options);

  const [items, setItems] = useState<Testimonial[]>(() => {
    const stored = localStorage.getItem("user_testimonials");
    const parsed: Testimonial[] = stored ? (() => { try { return JSON.parse(stored); } catch { return []; } })() : [];
    return [...DEFAULT_TESTIMONIALS, ...parsed];
  });

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [saving, setSaving] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const id = setInterval(() => embla.scrollNext(), 4500);
    return () => clearInterval(id);
  }, [embla]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;
    setSaving(true);
    const t: Testimonial = {
      name: name.trim(),
      role: role.trim() || "Customer",
      rating: Math.min(5, Math.max(1, rating)),
      photo: "/placeholder.svg",
      quote: quote.trim(),
    };
    setItems((prev) => {
      const userList = [t, ...prev.filter((x) => !DEFAULT_TESTIMONIALS.some((d) => d.name === x.name && d.quote === x.quote))];
      const onlyUser = userList.filter((x) => !DEFAULT_TESTIMONIALS.some((d) => d.name === x.name && d.quote === x.quote));
      localStorage.setItem("user_testimonials", JSON.stringify(onlyUser));
      return [t, ...prev];
    });
    setName("");
    setRole("");
    setRating(5);
    setQuote("");
    setSaving(false);
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">What our customers say</h1>
          <p className="mt-4 text-slate-600">Real reviews from happy clients who bought devices or booked repairs with Nextgen Computing.</p>
        </header>

        <div className="mt-10">
          <div className="relative">
            <div className="overflow-hidden" ref={viewportRef}>
              <div className="flex -ml-4">
                {items.map((t, idx) => (
                  <div key={`${t.name}-${idx}`} className="pl-4 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3">
                    <article className="h-full rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6 shadow-sm hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-4">
                        <img src={t.photo} alt={`${t.name} photo`} className="h-14 w-14 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-slate-900">{t.name}</div>
                          <div className="text-xs text-slate-500">{t.role}</div>
                          <Stars n={t.rating} />
                        </div>
                      </div>
                      <p className="mt-4 text-slate-700">“{t.quote}”</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={scrollPrev} className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">Prev</button>
              <button onClick={scrollNext} className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>

        {/* Review form */}
        <div className="mt-12 max-w-2xl mx-auto">
          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6">
            <h2 className="text-xl font-bold">Share your review</h2>
            <p className="text-sm text-slate-600">Your feedback helps others choose with confidence.</p>
            <div className="mt-4 grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input className="rounded-lg border px-3 py-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="rounded-lg border px-3 py-2" placeholder="Service (e.g. Laptop Purchase, Repair)" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Rating</label>
                <StarInput value={rating} onChange={setRating} />
              </div>
              <textarea className="rounded-lg border px-3 py-2" rows={4} placeholder="Write your review..." value={quote} onChange={(e) => setQuote(e.target.value)} required />
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Submitting..." : "Submit Review"}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
