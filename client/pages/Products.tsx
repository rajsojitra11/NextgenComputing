import ProductCard from "../components/shop/ProductCard";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const laptops: Product[] = [
  { id: "l1", name: "MacBook Pro 14", brand: "Apple", price: 1999, image: "https://images.pexels.com/photos/986772/pexels-photo-986772.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l2", name: "XPS 13", brand: "Dell", price: 1299, image: "https://images.pexels.com/photos/2473183/pexels-photo-2473183.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l3", name: "Spectre x360", brand: "HP", price: 1399, image: "https://images.pexels.com/photos/5474285/pexels-photo-5474285.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l4", name: "ThinkPad X1 Carbon", brand: "Lenovo", price: 1499, image: "https://images.pexels.com/photos/986774/pexels-photo-986774.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l5", name: "ROG Zephyrus G14", brand: "ASUS", price: 1599, image: "https://images.pexels.com/photos/2473183/pexels-photo-2473183.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l6", name: "Swift 3", brand: "Acer", price: 899, image: "https://images.pexels.com/photos/5908729/pexels-photo-5908729.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l7", name: "Surface Laptop 5", brand: "Microsoft", price: 1299, image: "https://images.pexels.com/photos/7222952/pexels-photo-7222952.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l8", name: "Blade 15", brand: "Razer", price: 1999, image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l9", name: "Prestige 14", brand: "MSI", price: 1199, image: "https://images.pexels.com/photos/6894013/pexels-photo-6894013.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l10", name: "Galaxy Book3 Pro", brand: "Samsung", price: 1499, image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

// Removed desktops category per request

const monitors: Product[] = [
  { id: "m1", name: "UltraFine 5K", brand: "LG", price: 1299, image: "https://images.pexels.com/photos/28955771/pexels-photo-28955771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m2", name: "Odyssey G7", brand: "Samsung", price: 699, image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m3", name: "UltraSharp U2720Q", brand: "Dell", price: 549, image: "https://images.pexels.com/photos/4064830/pexels-photo-4064830.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m4", name: "ProArt PA278QV", brand: "ASUS", price: 399, image: "https://images.pexels.com/photos/11382771/pexels-photo-11382771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m5", name: "Nitro XV272U", brand: "Acer", price: 329, image: "https://images.pexels.com/photos/6177567/pexels-photo-6177567.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m6", name: "PD2700U", brand: "BenQ", price: 499, image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m7", name: "Z27 4K", brand: "HP", price: 449, image: "https://images.pexels.com/photos/11382771/pexels-photo-11382771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m8", name: "Optix MAG274QRF", brand: "MSI", price: 399, image: "https://images.pexels.com/photos/28955771/pexels-photo-28955771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m9", name: "24G2 144Hz", brand: "AOC", price: 199, image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m10", name: "Momentum 279M1", brand: "Philips", price: 479, image: "https://images.pexels.com/photos/4064830/pexels-photo-4064830.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const keyboards: Product[] = [
  { id: "k1", name: "Huntsman Mini", brand: "Razer", price: 119, image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k2", name: "K70 RGB", brand: "Corsair", price: 159, image: "https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k3", name: "G915 TKL", brand: "Logitech", price: 229, image: "https://images.pexels.com/photos/8534244/pexels-photo-8534244.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k4", name: "Apex Pro", brand: "SteelSeries", price: 199, image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k5", name: "Alloy Origins", brand: "HyperX", price: 99, image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k6", name: "Magic Keyboard", brand: "Apple", price: 129, image: "https://images.pexels.com/photos/399161/pexels-photo-399161.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k7", name: "MX Keys", brand: "Logitech", price: 119, image: "https://images.pexels.com/photos/8534244/pexels-photo-8534244.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k8", name: "Viper 65%", brand: "Razer", price: 149, image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k9", name: "K380", brand: "Logitech", price: 39, image: "https://images.pexels.com/photos/399161/pexels-photo-399161.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k10", name: "K2", brand: "Keychron", price: 89, image: "https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const mice: Product[] = [
  { id: "mm1", name: "G502 X", brand: "Logitech", price: 99, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm2", name: "Basilisk V3", brand: "Razer", price: 69, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm3", name: "MX Master 3S", brand: "Logitech", price: 129, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm4", name: "M720 Triathlon", brand: "Logitech", price: 59, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm5", name: "Magic Mouse 2", brand: "Apple", price: 99, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm6", name: "DeathAdder V2", brand: "Razer", price: 49, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm7", name: "M650", brand: "Logitech", price: 39, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm8", name: "Lift Vertical", brand: "Logitech", price: 79, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm9", name: "Viper 8K", brand: "Razer", price: 79, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm10", name: "Pebble M350", brand: "Logitech", price: 29, image: "https://images.pexels.com/photos/28779690/pexels-photo-28779690.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

export default function Products() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shop Products</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">Browse our curated selection of premium laptops, crystal‑clear monitors, and essential peripherals.</p>
        </header>

        <h2 className="mt-6 mb-4 text-2xl font-bold">Laptops</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {laptops.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Monitors</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {monitors.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Keyboards</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {keyboards.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Mice</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mice.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
