import ProductCard from "../components/shop/ProductCard";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  features?: string[];
  buyLink?: string;
  category?: "laptops" | "monitors" | "keyboards" | "mice" | "cpus";
}

const laptops: Product[] = [
  {
    id: "l1",
    name: "MacBook Air M4 – 16GB/256GB (13.6″, Sky Blue)",
    brand: "Apple",
    price: 114900,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
    features: ["Apple M4","16GB unified memory","256GB SSD","13.6″ Liquid Retina","Wi‑Fi 6E","macOS"],
    buyLink: "https://www.flipkart.com/apple-macbook-air-m4-16-gb-256-gb-ssd-macos-sequoia-mc6t4hn-a/p/itm7c1831ce25509"
  },
  {
    id: "l2",
    name: "MacBook Air M4 – 16GB/256GB (13.6″, Midnight)",
    brand: "Apple",
    price: 114900,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
    features: ["Apple M4","16GB memory","256GB SSD","13.6″ Liquid Retina","1080p camera","macOS"],
    buyLink: "https://www.flipkart.com/apple-macbook-air-m4-16-gb-256-gb-ssd-macos-sequoia-mw123hn-a/p/itm08069ed2395aa"
  },
  {
    id: "l3",
    name: "MacBook Air M4 – 16GB/256GB (13.6″, Starlight)",
    brand: "Apple",
    price: 114900,
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
    features: ["Apple M4","16GB memory","256GB SSD","Silent fanless design","Touch ID","macOS"],
    buyLink: "https://www.flipkart.com/apple-macbook-air-m4-16-gb-256-gb-ssd-macos-sequoia-mw0y3hn-a/p/itmad81d112ad068"
  },
  {
    id: "l4",
    name: "ASUS ExpertBook P1 – i5‑13420H / 32GB / 512GB",
    brand: "ASUS",
    price: 67990,
    image: "https://images.pexels.com/photos/8960464/pexels-photo-8960464.jpeg?auto=compress&cs=tinysrgb&w=1200",
    features: ["Intel Core i5‑13420H","32GB RAM","512GB NVMe SSD","15.6″ FHD","MIL‑STD 810H","Windows 11 Home"],
    buyLink: "https://www.flipkart.com/asus-expertbook-p1-intel-core-i5-13th-gen-13420h-32-gb-512-gb-ssd-windows-11-home-p1403cva-s60939ws-thin-light-laptop/p/itm50988c1fc56e6"
  },
  {
    id: "l5",
    name: "ASUS ExpertBook P1 – i3‑1315U / 8GB / 512GB (15.6″, Misty Grey)",
    brand: "ASUS",
    price: 42990,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    features: ["Intel Core i3‑1315U","8GB RAM","512GB SSD","15.6″ FHD","Light 1.7kg","Windows 11 Home"],
    buyLink: "https://www.flipkart.com/asus-expertbook-p1-intel-core-i3-13th-gen-1315u-8-gb-512-gb-ssd-windows-11-home-p1503cva-s70501ws-thin-light-laptop/p/itm5b59a30b4c016"
  },
  {
    id: "l6",
    name: "ASUS ExpertBook P1 – i3‑1315U / 16GB / 512GB (15.6″, Misty Grey)",
    brand: "ASUS",
    price: 46990,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
    features: ["Intel Core i3‑1315U","16GB RAM","512GB SSD","15.6″ FHD","TPM 2.0","Windows 11 Home"],
    buyLink: "https://www.flipkart.com/asus-expertbook-p1-intel-core-i3-13th-gen-1315u-16-gb-512-gb-ssd-windows-11-home-p1503cva-s71074ws-thin-light-laptop/p/itmf84b442d31b6b"
  },
  {
    id: "l7",
    name: "Lenovo IdeaPad 3 – i3 11th Gen (8GB/256GB)",
    brand: "Lenovo",
    price: 35990,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    features: ["Intel Core i3 11th Gen","8GB RAM","256GB SSD","14″ FHD","1.5kg","Windows 11"],
    buyLink: "https://www.flipkart.com/lenovo-ideapad-3-intel-core-i3-11th-gen-8-gb-256-gb-ssd-windows-11-home-14itl05-thin-light-laptop/p/itme5d4463121c64"
  },
  {
    id: "l8",
    name: "Lenovo IdeaPad Slim 3 – i5 11th Gen (16GB/512GB)",
    brand: "Lenovo",
    price: 46990,
    image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1200&q=80",
    features: ["Intel Core i5 11th Gen","16GB RAM","512GB SSD","15.6″ FHD","Wi‑Fi 6","Windows 11"],
    buyLink: "https://www.flipkart.com/lenovo-intel-core-i5-11th-gen-16-gb-512-gb-ssd-windows-11-home-15itl6-thin-light-laptop/p/itm3a8a423a53c02"
  },
  {
    id: "l9",
    name: "Lenovo Yoga Slim 7 AI PC – Core Ultra 5 (16GB/512GB)",
    brand: "Lenovo",
    price: 99990,
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1200&q=80",
    features: ["Intel Core Ultra 5","16GB RAM","512GB SSD","14″ OLED/IPS options","Aluminum build","Windows 11 Home"],
    buyLink: "https://www.flipkart.com/lenovo-yoga-slim-7-intel-core-ultra-155h-32-gb-1-tb-ssd-windows-11-home-14imh9-thin-light-laptop/p/itm77304edff3814"
  },
];

// Removed desktops category per request

const monitors: Product[] = [
  { id: "m1", name: "UltraFine 5K", brand: "LG", price: 99990, image: "https://images.pexels.com/photos/28955771/pexels-photo-28955771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m2", name: "Odyssey G7", brand: "Samsung", price: 54990, image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m3", name: "UltraSharp U2720Q", brand: "Dell", price: 45990, image: "https://images.pexels.com/photos/4064830/pexels-photo-4064830.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m4", name: "ProArt PA278QV", brand: "ASUS", price: 34990, image: "https://images.pexels.com/photos/11382771/pexels-photo-11382771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m5", name: "Nitro XV272U", brand: "Acer", price: 32990, image: "https://images.pexels.com/photos/6177567/pexels-photo-6177567.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m6", name: "PD2700U", brand: "BenQ", price: 36990, image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m7", name: "Z27 4K", brand: "HP", price: 39990, image: "https://images.pexels.com/photos/11382771/pexels-photo-11382771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m8", name: "Optix MAG274QRF", brand: "MSI", price: 34990, image: "https://images.pexels.com/photos/28955771/pexels-photo-28955771.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m9", name: "24G2 144Hz", brand: "AOC", price: 19990, image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "m10", name: "Momentum 279M1", brand: "Philips", price: 47990, image: "https://images.pexels.com/photos/4064830/pexels-photo-4064830.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const keyboards: Product[] = [
  { id: "k1", name: "Redgear Shadow Blade", brand: "Redgear", price: 2999, image: "https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k2", name: "Zebronics Max", brand: "Zebronics", price: 1999, image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k3", name: "Logitech K380", brand: "Logitech", price: 2999, image: "https://images.pexels.com/photos/399161/pexels-photo-399161.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k4", name: "Cosmic Byte CB-GK", brand: "Cosmic Byte", price: 2499, image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k5", name: "HP 230 Wireless", brand: "HP", price: 1499, image: "https://images.pexels.com/photos/8534244/pexels-photo-8534244.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k6", name: "Dell KB216", brand: "Dell", price: 999, image: "https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k7", name: "iBall Winner", brand: "iBall", price: 699, image: "https://images.pexels.com/photos/399161/pexels-photo-399161.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k8", name: "TVS Gold", brand: "TVS", price: 3499, image: "https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k9", name: "Keychron K2", brand: "Keychron", price: 8999, image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "k10", name: "Lenovo 300 Wireless", brand: "Lenovo", price: 1299, image: "https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const mice: Product[] = [
  { id: "mm1", name: "Logitech M90 Wired USB Mouse", brand: "Logitech", price: 5499, image: "https://images.pexels.com/photos/6044925/pexels-photo-6044925.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm2", name: "HP X1000 Wired USB Mouse", brand: "HP", price: 4999, image: "https://images.pexels.com/photos/2857477/pexels-photo-2857477.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm3", name: "Dell MS116 Wired USB Mouse", brand: "Dell", price: 7999, image: "https://images.pexels.com/photos/4672741/pexels-photo-4672741.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm4", name: "Logitech M235 Wireless Mouse", brand: "Logitech", price: 3499, image: "https://images.pexels.com/photos/7430757/pexels-photo-7430757.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm5", name: "Microsoft Wireless Mouse 1850", brand: "Microsoft", price: 8990, image: "https://images.pexels.com/photos/2861984/pexels-photo-2861984.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm6", name: "Redragon M908 RGB Wireless Mouse", brand: "Redragon", price: 3999, image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm7", name: "Razer DeathAdder Elite Gaming Mouse", brand: "Razer", price: 1999, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm8", name: "Logitech G502 HERO Gaming Mouse", brand: "Logitech", price: 5499, image: "https://images.pexels.com/photos/8176505/pexels-photo-8176505.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm9", name: "SteelSeries Rival 110 Gaming Mouse", brand: "SteelSeries", price: 6999, image: "https://images.pexels.com/photos/28779689/pexels-photo-28779689.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const cpus: Product[] = [
  { id: "c1", name: "Intel Core i3 12100F", brand: "Intel", price: 8990, image: "https://www.google.com/imgres?q=computer%20mouse&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71%2B4ffKj54L.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FLogitech-M90-Mouse-Dark-Grey%2Fdp%2FB003D8ZT0C&docid=oI796XpGqmCMQM&tbnid=Va6ffSrtEPfxyM&vet=12ahUKEwj48_nk27GPAxXhlK8BHQRBF04QM3oECBgQAA..i&w=2560&h=2560&hcb=2&ved=2ahUKEwj48_nk27GPAxXhlK8BHQRBF04QM3oECBgQAA" },
  { id: "c2", name: "Intel Core i5 13400", brand: "Intel", price: 20990, image: "https://www.intel.com/content/dam/www/central-libraries/us/en/images/i5-13400-box.jpg" },
  { id: "c3", name: "Intel Core i7 13700K", brand: "Intel", price: 37990, image: "https://www.intel.com/content/dam/www/central-libraries/us/en/images/i7-13700k-box.jpg" },
  { id: "c4", name: "AMD Ryzen 5 5600", brand: "AMD", price: 12990, image: "https://www.amd.com/system/files/2021-01/ryzen5-5600-box.jpg" },
  { id: "c5", name: "AMD Ryzen 7 5800X", brand: "AMD", price: 22990, image: "https://www.amd.com/system/files/2021-01/ryzen7-5800x-box.jpg" },
  { id: "c6", name: "AMD Ryzen 9 5900X", brand: "AMD", price: 37990, image: "https://www.amd.com/system/files/2021-01/ryzen9-5900x-box.jpg" },
  { id: "c7", name: "Intel Core i9 14900K", brand: "Intel", price: 49990, image: "https://www.intel.com/content/dam/www/central-libraries/us/en/images/i9-14900k-box.jpg" },
  { id: "c8", name: "AMD Ryzen 5 7600", brand: "AMD", price: 20990, image: "https://www.amd.com/system/files/2021-01/ryzen5-7600-box.jpg" },
  { id: "c9", name: "Intel Core i5 12400F", brand: "Intel", price: 14990, image: "https://www.intel.com/content/dam/www/central-libraries/us/en/images/i5-12400f-box.jpg" },
  { id: "c10", name: "AMD Ryzen 7 7700X", brand: "AMD", price: 32990, image: "https://www.amd.com/system/files/2021-01/ryzen7-7700x-box.jpg" },
];


export default function Products() {
  const [dynamic, setDynamic] = useState<Product[] | null>(null);
  const ENABLE_API = import.meta.env.VITE_ENABLE_API === "true";

  useEffect(() => {
    if (!ENABLE_API) return;
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Product[]) => setDynamic(Array.isArray(data) ? data : null))
      .catch(() => setDynamic(null));
  }, [ENABLE_API]);
  return (
    <section className="relative py-12 md:py-16 pb-28 md:pb-16">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shop Products</h1>
          <nav className="mt-4 flex flex-wrap gap-3">
            <a href="#laptops" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">Laptops</a>
            <a href="#monitors" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">Monitors</a>
            <a href="#keyboards" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">Keyboards</a>
            <a href="#mouse" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">Mouse</a>
          </nav>
        </header>

        <h2 id="laptops" className="mt-6 mb-4 text-2xl font-bold">Laptops</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {(dynamic || []).filter((p) => p.category === "laptops").map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} features={p.features} buyLink={p.buyLink} />
          ))}
          {dynamic && (dynamic.filter((p) => p.category === "laptops").length === 0) && (
            <div className="col-span-full text-slate-500">No laptops yet. Add products in Admin.</div>
          )}
        </div>

        <h2 id="monitors" className="mt-12 mb-4 text-2xl font-bold">Monitors</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {(dynamic || []).filter((p) => p.category === "monitors").map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 id="keyboards" className="mt-12 mb-4 text-2xl font-bold">Keyboards</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {(dynamic || []).filter((p) => p.category === "keyboards").map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 id="mouse" className="mt-12 mb-4 text-2xl font-bold">Mouse</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {(dynamic || []).filter((p) => p.category === "mice").map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">CPUs</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {(dynamic || []).filter((p) => p.category === "cpus").map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
