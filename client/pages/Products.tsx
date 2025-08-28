import ProductCard from "../components/shop/ProductCard";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const laptops: Product[] = [
  { id: "l1", name: "MacBook Pro 14", brand: "Apple", price: 1999, image: "https://picsum.photos/id/180/800/600" },
  { id: "l2", name: "XPS 13", brand: "Dell", price: 1299, image: "https://picsum.photos/id/0/800/600" },
  { id: "l3", name: "Spectre x360", brand: "HP", price: 1399, image: "https://picsum.photos/id/1/800/600" },
  { id: "l4", name: "ThinkPad X1 Carbon", brand: "Lenovo", price: 1499, image: "https://picsum.photos/id/10/800/600" },
  { id: "l5", name: "ROG Zephyrus G14", brand: "ASUS", price: 1599, image: "https://picsum.photos/id/20/800/600" },
  { id: "l6", name: "Swift 3", brand: "Acer", price: 899, image: "https://picsum.photos/id/30/800/600" },
  { id: "l7", name: "Surface Laptop 5", brand: "Microsoft", price: 1299, image: "https://picsum.photos/id/40/800/600" },
  { id: "l8", name: "Blade 15", brand: "Razer", price: 1999, image: "https://picsum.photos/id/50/800/600" },
  { id: "l9", name: "Prestige 14", brand: "MSI", price: 1199, image: "https://picsum.photos/id/60/800/600" },
  { id: "l10", name: "Galaxy Book3 Pro", brand: "Samsung", price: 1499, image: "https://picsum.photos/id/70/800/600" },
];

const desktops: Product[] = [
  { id: "d1", name: "Mac Studio", brand: "Apple", price: 1999, image: "https://picsum.photos/id/80/800/600" },
  { id: "d2", name: "OptiPlex 7000", brand: "Dell", price: 1099, image: "https://picsum.photos/id/90/800/600" },
  { id: "d3", name: "EliteDesk 800 G6", brand: "HP", price: 999, image: "https://picsum.photos/id/100/800/600" },
  { id: "d4", name: "ThinkCentre M90", brand: "Lenovo", price: 949, image: "https://picsum.photos/id/110/800/600" },
  { id: "d5", name: "ROG Strix G15", brand: "ASUS", price: 1499, image: "https://picsum.photos/id/120/800/600" },
  { id: "d6", name: "Aspire TC", brand: "Acer", price: 699, image: "https://picsum.photos/id/130/800/600" },
  { id: "d7", name: "NUC 13", brand: "Intel", price: 799, image: "https://picsum.photos/id/140/800/600" },
  { id: "d8", name: "MAG Infinite", brand: "MSI", price: 1199, image: "https://picsum.photos/id/150/800/600" },
  { id: "d9", name: "Aurora R15", brand: "Alienware", price: 2299, image: "https://picsum.photos/id/160/800/600" },
  { id: "d10", name: "One i300", brand: "Corsair", price: 2499, image: "https://picsum.photos/id/170/800/600" },
];

export default function Products() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shop Products</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">Browse our curated selection of premium laptops and powerful desktop computers from top brands.</p>
        </header>

        <h2 className="mt-6 mb-4 text-2xl font-bold">Laptops</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {laptops.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Desktop Computers</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {desktops.map((p) => (
            <ProductCard key={p.id} name={p.name} brand={p.brand} price={p.price} image={p.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
