import { useState } from "react";

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

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={`${brand} ${name}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {features && features.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow hover:bg-white"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={`View key features of ${brand} ${name}`}
          >
            Features
          </button>
        )}
        {open && features && (
          <>
            <button
              type="button"
              aria-label="Close features"
              className="absolute inset-0 z-20 cursor-default bg-black/0"
              onClick={() => setOpen(false)}
            />
            <div
              role="dialog"
              aria-label={`Key features of ${brand} ${name}`}
              className="absolute right-3 top-3 z-30 w-80 max-w-[calc(100%-24px)] rounded-xl bg-white p-4 shadow-xl ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-bold">Key Features</h4>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-slate-600 hover:bg-slate-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <ul className="mt-3 max-h-64 overflow-auto list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                {features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </>
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
    </div>
  );
}
