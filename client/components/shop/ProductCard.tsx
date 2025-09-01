import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import * as React from "react";
import { useWishlist } from "@/hooks/use-wishlist";

type Props = {
  id?: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  features?: string[];
  buyLink?: string;
};

const formatINR = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ id, name, brand, price, image, features, buyLink }: Props) {
  const wa = `https://wa.me/918469283448?text=${encodeURIComponent(
    `Hi Nextgen Computing, I'm interested in buying ${name} by ${brand} for ${formatINR(price)}.`
  )}`;
  const link = buyLink || wa;
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { has, toggle } = useWishlist();
  const idKey = React.useMemo(() => id || `${brand}:${name}`.toLowerCase(), [id, brand, name]);
  const isWished = has(idKey);

  const computeSrc = (val?: string) => {
    let next = (val || "").trim();
    if (next.startsWith("ttps://")) next = "https://" + next.slice(7);
    if (next.startsWith("http//")) next = "http://" + next.slice(6);
    if (next.startsWith("https//")) next = "https://" + next.slice(7);
    const ok = next.startsWith("http://") || next.startsWith("https://") || next.startsWith("/");
    return ok && next ? next : "/placeholder.svg";
  };
  const [src, setSrc] = React.useState<string>(computeSrc(image));

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => setSrc(computeSrc(image)), [image]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      const prevTouch = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouch;
      };
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const detailsList = [
    `Brand: ${brand}`,
    `Price: ${formatINR(price)}`,
    ...(features && features.length ? features : []),
  ];

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={src}
          alt={`${brand} ${name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setSrc("/placeholder.svg")}
          referrerPolicy="no-referrer"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggle({ id: idKey, name, brand, price, image }); }}
          className={`absolute left-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-pink-600 shadow hover:bg-white ${isWished ? 'ring-2 ring-pink-500/40' : ''}`}
          aria-pressed={isWished}
          aria-label={isWished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
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
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            {name}
          </h3>
          <span className="text-xs text-slate-500">{brand}</span>
        </div>
        <div className="mt-auto pt-2 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="text-lg font-bold tracking-tight text-green-600">{formatINR(price)}</div>
          <div className="w-full md:w-auto">
            <a href={link} target="_blank" rel="noreferrer" className="inline-flex w-full md:w-auto items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow shadow-blue-500/20 transition-all duration-300 hover:shadow-glow whitespace-nowrap">
              Buy Now
            </a>
          </div>
        </div>
      </div>
      {mounted && open && createPortal(
        <>
          <div className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Key features of ${brand} ${name}`}
            className="fixed inset-0 z-[100001] flex items-center justify-center p-0"
          >
            <div className="relative w-full h-full md:w-[28rem] md:h-auto rounded-none md:rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 overflow-auto">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Close"
              >
                ×
              </button>
              <h4 className="pr-12 text-base font-bold">Key Features</h4>
              <ul className="mt-3 max-h-[60vh] overflow-auto list-disc space-y-2 pl-5 text-sm text-slate-700">
                {detailsList.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
