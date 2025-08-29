import ProductCard from "../components/shop/ProductCard";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  features?: string[];
  buyLink?: string;
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
    image: "https://images.unsplash.com/photo-1587825140400-52459d4eb6b7?auto=format&fit=crop&w=1200&q=80",
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
  { id: "mm1", name: "Logitech G502 X", brand: "Logitech", price: 5499, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm2", name: "Razer Basilisk V3", brand: "Razer", price: 4999, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm3", name: "Logitech MX Master 3S", brand: "Logitech", price: 7999, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm4", name: "Logitech M720 Triathlon", brand: "Logitech", price: 3499, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm5", name: "Apple Magic Mouse 2", brand: "Apple", price: 8990, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm6", name: "Razer DeathAdder V2", brand: "Razer", price: 3999, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm7", name: "Logitech M650", brand: "Logitech", price: 1999, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm8", name: "Logitech Lift Vertical", brand: "Logitech", price: 5499, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm9", name: "Razer Viper 8K", brand: "Razer", price: 6999, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "mm10", name: "Logitech Pebble M350", brand: "Logitech", price: 1999, image: "https://images.pexels.com/photos/7047612/pexels-photo-7047612.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const cpus: Product[] = [
  { id: "c1", name: "Intel Core i3 12100F", brand: "Intel", price: 8990, image: "https://images.pexels.com/photos/3665442/pexels-photo-3665442.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c2", name: "Intel Core i5 13400", brand: "Intel", price: 20990, image: "https://images.pexels.com/photos/1432680/pexels-photo-1432680.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c3", name: "Intel Core i7 13700K", brand: "Intel", price: 37990, image: "https://images.pexels.com/photos/2588756/pexels-photo-2588756.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c4", name: "AMD Ryzen 5 5600", brand: "AMD", price: 12990, image: "https://images.pexels.com/photos/5206323/pexels-photo-5206323.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c5", name: "AMD Ryzen 7 5800X", brand: "AMD", price: 22990, image: "https://images.pexels.com/photos/6755087/pexels-photo-6755087.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c6", name: "AMD Ryzen 9 5900X", brand: "AMD", price: 37990, image: "https://images.pexels.com/photos/3665444/pexels-photo-3665444.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c7", name: "Intel Core i9 14900K", brand: "Intel", price: 49990, image: "https://images.pexels.com/photos/7596370/pexels-photo-7596370.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c8", name: "AMD Ryzen 5 7600", brand: "AMD", price: 20990, image: "https://images.pexels.com/photos/11047218/pexels-photo-11047218.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c9", name: "Intel Core i5 12400F", brand: "Intel", price: 14990, image: "https://images.pexels.com/photos/1432680/pexels-photo-1432680.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "c10", name: "AMD Ryzen 7 7700X", brand: "AMD", price: 32990, image: "https://images.pexels.com/photos/3665442/pexels-photo-3665442.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

export default function Products() {
  return (
    <section className="relative py-12 md:py-16 pb-28 md:pb-16">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shop Products</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">India‑ready catalog with laptops, monitors, CPUs and peripherals at INR prices.</p>
        </header>

        <h2 className="mt-6 mb-4 text-2xl font-bold">Laptops</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {laptops.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} features={p.features} buyLink={p.buyLink} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Monitors</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {monitors.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Keyboards</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {keyboards.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Mice</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {mice.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">CPUs</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {cpus.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
