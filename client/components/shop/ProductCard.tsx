type Props = {
  name: string;
  brand: string;
  price: number;
  image: string;
  buyLink?: string;
};

const formatINR = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ name, brand, price, image, buyLink }: Props) {
  const wa = `https://wa.me/918469283448?text=${encodeURIComponent(
    `Hi Nextgen Computing, I'm interested in buying ${name} by ${brand} for ${formatINR(price)}.`
  )}`;
  const link = buyLink || wa;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={`${brand} ${name}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            {name}
          </h3>
          <span className="text-xs text-slate-500">{brand}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight text-green-600">{formatINR(price)}</div>
          <div className="flex items-center gap-2">
            <a href={link} target="_blank" rel="noreferrer" className="inline-flex w-full justify-center md:w-auto items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow shadow-blue-500/20 transition-all duration-300 hover:shadow-glow">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
