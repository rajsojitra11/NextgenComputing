import ProductCard from "../components/shop/ProductCard";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const laptops: Product[] = [
  { id: "l1", name: "MacBook Pro 14", brand: "Apple", price: 189900, image: "https://images.pexels.com/photos/986772/pexels-photo-986772.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l2", name: "XPS 13", brand: "Dell", price: 129990, image: "https://images.pexels.com/photos/2473183/pexels-photo-2473183.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l3", name: "Spectre x360", brand: "HP", price: 139990, image: "https://images.pexels.com/photos/5474285/pexels-photo-5474285.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l4", name: "ThinkPad X1 Carbon", brand: "Lenovo", price: 149990, image: "https://images.pexels.com/photos/986774/pexels-photo-986774.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l5", name: "ROG Zephyrus G14", brand: "ASUS", price: 159990, image: "https://images.pexels.com/photos/2473183/pexels-photo-2473183.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l6", name: "Swift 3", brand: "Acer", price: 69990, image: "https://images.pexels.com/photos/5908729/pexels-photo-5908729.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l7", name: "Surface Laptop 5", brand: "Microsoft", price: 129990, image: "https://images.pexels.com/photos/7222952/pexels-photo-7222952.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l8", name: "Blade 15", brand: "Razer", price: 179990, image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l9", name: "Modern 14", brand: "MSI", price: 74990, image: "https://images.pexels.com/photos/6894013/pexels-photo-6894013.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l10", name: "Galaxy Book3 Pro", brand: "Samsung", price: 149990, image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "l11", name: "INBook X2 Plus", brand: "Infinix", price: 45990, image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800" },
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
    <section className="relative py-12 md:py-16">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shop Products</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">India‑ready catalog with laptops, monitors, CPUs and peripherals at INR prices.</p>
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

        <h2 className="mt-12 mb-4 text-2xl font-bold">CPUs</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cpus.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
