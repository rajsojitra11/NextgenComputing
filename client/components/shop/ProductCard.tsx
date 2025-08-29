import { useEffect, useState } from "react";

type Props = {
  name: string;
  brand: string;
  price: number;
  image: string;
  features?: string[];
  buyLink?: string;
};

const formatINR = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ name, brand, price, image, features, buyLink }: Props) {
  const wa = `https://wa.me/918469283448?text=${encodeURIComponent(
    `Hi Nextgen Computing, I'm interested in buying ${name} by ${brand} for ${formatINR(price)}.`
  )}`;
  const link = buyLink || wa;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={`${brand} ${name}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {features && features.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow hover:bg-white"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={`View key features of ${brand} ${name}`}
          >
            Features
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            {name}
          </h3>
          <span className="text-xs text-slate-500">{brand}</span>
        </div>
        <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-bold tracking-tight text-green-600">{formatINR(price)}</div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <a href={link} target="_blank" rel="noreferrer" className="inline-flex w-full justify-center md:w-auto items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow shadow-blue-500/20 transition-all duration-300 hover:shadow-glow whitespace-nowrap min-w-[110px]">
              Buy Now
            </a>
          </div>
        </div>
      </div>
      {open && features && (
        <>
          <div className="absolute inset-0 z-20 bg-black/30 cursor-pointer" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="dialog"
            aria-label={`Key features of ${brand} ${name}`}
            className="absolute inset-3 z-30 relative rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-200"
          >
            <div className="flex items-start justify-between gap-4 pr-10">
              <h4 className="text-base font-bold">Key Features</h4>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-40 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Close"
            >
              ×
            </button>
            <ul className="mt-3 max-h-[60vh] overflow-auto list-disc space-y-2 pl-5 text-sm text-slate-700">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
