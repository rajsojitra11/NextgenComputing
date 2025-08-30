import { useEffect, useMemo, useState } from "react";

type Product = {
  id?: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  features?: string[];
  buyLink?: string;
};

type Service = {
  id?: string;
  title: string;
  desc: string;
  priceFrom?: number;
  image?: string;
  active?: boolean;
};

const PIN = import.meta.env.VITE_ADMIN_PIN || "2468";

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(() => localStorage.getItem("admin_authed") === "1");
  const [pin, setPin] = useState("");
  const [tab, setTab] = useState<"products" | "services" | "categories">("products");

  // Products state
  const [items, setItems] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const emptyProduct: Product = useMemo(() => ({ category: "laptops", name: "", brand: "", price: 0, image: "", features: [], buyLink: "" }), []);
  const [form, setForm] = useState<Product>(emptyProduct);

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const emptyService: Service = useMemo(() => ({ title: "", desc: "", priceFrom: undefined, image: "", active: true }), []);
  const [serviceForm, setServiceForm] = useState<Service>(emptyService);

  type Category = { id?: string; name: string };
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!authed) return;
    const ENABLE_API = import.meta.env.VITE_ENABLE_API === "true";
    if (!ENABLE_API) return;
    fetch("/api/products").then(r => r.ok ? r.json() : Promise.reject()).then(setItems).catch(() => {});
    fetch("/api/services").then(r => r.ok ? r.json() : Promise.reject()).then(setServices).catch(() => {});
    fetch("/api/categories").then(r => r.ok ? r.json() : Promise.reject()).then(setCategories).catch(() => {});
  }, [authed]);

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!res.ok) return;
    const saved = await res.json();
    if (editingId) {
      setItems((prev) => prev.map((p) => (p.id === editingId ? saved : p)));
    } else {
      setItems((prev) => [saved, ...prev]);
    }
    setForm(emptyProduct);
    setEditingId(null);
  };

  const editProduct = (p: Product) => {
    setEditingId(p.id || null);
    setForm({ ...p, price: Number(p.price) });
    setTab("products");
  };

  const deleteProduct = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const submitService = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingServiceId ? "PUT" : "POST";
    const url = editingServiceId ? `/api/services/${editingServiceId}` : "/api/services";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(serviceForm) });
    if (!res.ok) return;
    const saved = await res.json();
    if (editingServiceId) {
      setServices((prev) => prev.map((s) => (s.id === editingServiceId ? saved : s)));
    } else {
      setServices((prev) => [saved, ...prev]);
    }
    setServiceForm(emptyService);
    setEditingServiceId(null);
  };

  const editService = (s: Service) => {
    setEditingServiceId(s.id || null);
    setServiceForm({ ...s, priceFrom: s.priceFrom ? Number(s.priceFrom) : undefined });
    setTab("services");
  };

  const deleteService = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  if (!authed) {
    return (
      <section className="py-16">
        <div className="container max-w-md">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-slate-600">Enter admin PIN to continue.</p>
          <form className="mt-6 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (pin === String(PIN)) { localStorage.setItem("admin_authed", "1"); setAuthed(true); } }}>
            <input value={pin} onChange={(e) => setPin(e.target.value)} type="password" placeholder="PIN" className="flex-1 rounded-lg border border-slate-300 px-3 py-2" />
            <button className="btn-primary" type="submit">Login</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex flex-wrap gap-2">
            <button className={`px-3 py-2 rounded-lg border ${tab === "products" ? "bg-blue-600 text-white" : "bg-white"}`} onClick={() => setTab("products")}>Products</button>
            <button className={`px-3 py-2 rounded-lg border ${tab === "services" ? "bg-blue-600 text-white" : "bg-white"}`} onClick={() => setTab("services")}>Services</button>
            <button className={`px-3 py-2 rounded-lg border ${tab === "categories" ? "bg-blue-600 text-white" : "bg-white"}`} onClick={() => setTab("categories")}>Categories</button>
            <button className="px-3 py-2 rounded-lg border" onClick={() => { localStorage.removeItem("admin_authed"); setAuthed(false); }}>Log out</button>
          </div>
        </header>

        {tab === "products" && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <form onSubmit={submitProduct} className="md:col-span-1 rounded-2xl border border-slate-200 p-4 bg-white">
              <h2 className="text-lg font-semibold">{editingId ? "Edit Product" : "Add Product"}</h2>
              <div className="mt-3 grid gap-3">
                {categories.length > 0 ? (
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border px-3 py-2">
                    <option value="" disabled>Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  <input className="rounded-lg border px-3 py-2" placeholder="Category (add more in Categories tab)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                )}
                <input className="rounded-lg border px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="rounded-lg border px-3 py-2" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                <input className="rounded-lg border px-3 py-2" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                <input className="rounded-lg border px-3 py-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                <input className="rounded-lg border px-3 py-2" placeholder="Buy Link (optional)" value={form.buyLink || ""} onChange={(e) => setForm({ ...form, buyLink: e.target.value })} />
                <textarea className="rounded-lg border px-3 py-2" placeholder="Features (comma separated)" value={(form.features || []).join(", ")} onChange={(e) => setForm({ ...form, features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                <div className="flex gap-2">
                  <button className="btn-primary" type="submit">{editingId ? "Update" : "Add"}</button>
                  {editingId && <button type="button" className="btn-outline" onClick={() => { setEditingId(null); setForm(emptyProduct); }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Category</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Brand</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Image</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-2 capitalize">{p.category}</td>
                      <td className="p-2">{p.name}</td>
                      <td className="p-2">{p.brand}</td>
                      <td className="p-2">₹{p.price}</td>
                      <td className="p-2 truncate max-w-[12rem] text-blue-700"><a href={p.image} target="_blank" rel="noreferrer">Image</a></td>
                      <td className="p-2 flex gap-2">
                        <button className="btn-outline" onClick={() => editProduct(p)}>Edit</button>
                        <button className="btn-outline" onClick={() => deleteProduct(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "services" && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <form onSubmit={submitService} className="md:col-span-1 rounded-2xl border border-slate-200 p-4 bg-white">
              <h2 className="text-lg font-semibold">{editingServiceId ? "Edit Service" : "Add Service"}</h2>
              <div className="mt-3 grid gap-3">
                <input className="rounded-lg border px-3 py-2" placeholder="Title" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} />
                <textarea className="rounded-lg border px-3 py-2" placeholder="Description" value={serviceForm.desc} onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })} />
                <input className="rounded-lg border px-3 py-2" placeholder="Starting Price (optional)" type="number" value={serviceForm.priceFrom || 0} onChange={(e) => setServiceForm({ ...serviceForm, priceFrom: Number(e.target.value) })} />
                <input className="rounded-lg border px-3 py-2" placeholder="Image URL (optional)" value={serviceForm.image || ""} onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })} />
                <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={serviceForm.active ?? true} onChange={(e) => setServiceForm({ ...serviceForm, active: e.target.checked })} /> Active</label>
                <div className="flex gap-2">
                  <button className="btn-primary" type="submit">{editingServiceId ? "Update" : "Add"}</button>
                  {editingServiceId && <button type="button" className="btn-outline" onClick={() => { setEditingServiceId(null); setServiceForm(emptyService); }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Title</th>
                    <th className="p-2">Active</th>
                    <th className="p-2">Price From</th>
                    <th className="p-2">Image</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="p-2">{s.title}</td>
                      <td className="p-2">{s.active ? "Yes" : "No"}</td>
                      <td className="p-2">{s.priceFrom ? `₹${s.priceFrom}` : "-"}</td>
                      <td className="p-2 truncate max-w-[12rem] text-blue-700">{s.image ? <a href={s.image} target="_blank" rel="noreferrer">Image</a> : "-"}</td>
                      <td className="p-2 flex gap-2">
                        <button className="btn-outline" onClick={() => editService(s)}>Edit</button>
                        <button className="btn-outline" onClick={() => deleteService(s.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const method = editingCategoryId ? "PUT" : "POST";
              const url = editingCategoryId ? `/api/categories/${editingCategoryId}` : "/api/categories";
              const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: categoryName }) });
              if (!res.ok) return;
              const saved = await res.json();
              if (editingCategoryId) {
                setCategories((prev) => prev.map((c) => (c.id === editingCategoryId ? saved : c)));
              } else {
                setCategories((prev) => [saved, ...prev]);
              }
              setCategoryName("");
              setEditingCategoryId(null);
            }} className="md:col-span-1 rounded-2xl border border-slate-200 p-4 bg-white">
              <h2 className="text-lg font-semibold">{editingCategoryId ? "Edit Category" : "Add Category"}</h2>
              <div className="mt-3 grid gap-3">
                <input className="rounded-lg border px-3 py-2" placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                <div className="flex gap-2">
                  <button className="btn-primary" type="submit">{editingCategoryId ? "Update" : "Add"}</button>
                  {editingCategoryId && <button type="button" className="btn-outline" onClick={() => { setEditingCategoryId(null); setCategoryName(""); }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="p-2">{c.name}</td>
                      <td className="p-2 flex gap-2">
                        <button className="btn-outline" onClick={() => { setEditingCategoryId(c.id || null); setCategoryName(c.name); setTab("categories"); }}>Edit</button>
                        <button className="btn-outline" onClick={async () => { if (!c.id) return; await fetch(`/api/categories/${c.id}`, { method: "DELETE" }); setCategories((prev) => prev.filter((x) => x.id !== c.id)); }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const method = editingCategoryId ? "PUT" : "POST";
              const url = editingCategoryId ? `/api/categories/${editingCategoryId}` : "/api/categories";
              const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: categoryName }) });
              if (!res.ok) return;
              const saved = await res.json();
              if (editingCategoryId) {
                setCategories((prev) => prev.map((c) => (c.id === editingCategoryId ? saved : c)));
              } else {
                setCategories((prev) => [saved, ...prev]);
              }
              setCategoryName("");
              setEditingCategoryId(null);
            }} className="md:col-span-1 rounded-2xl border border-slate-200 p-4 bg-white">
              <h2 className="text-lg font-semibold">{editingCategoryId ? "Edit Category" : "Add Category"}</h2>
              <div className="mt-3 grid gap-3">
                <input className="rounded-lg border px-3 py-2" placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                <div className="flex gap-2">
                  <button className="btn-primary" type="submit">{editingCategoryId ? "Update" : "Add"}</button>
                  {editingCategoryId && <button type="button" className="btn-outline" onClick={() => { setEditingCategoryId(null); setCategoryName(""); }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="p-2">{c.name}</td>
                      <td className="p-2 flex gap-2">
                        <button className="btn-outline" onClick={() => { setEditingCategoryId(c.id || null); setCategoryName(c.name); setTab("categories"); }}>Edit</button>
                        <button className="btn-outline" onClick={async () => { if (!c.id) return; await fetch(`/api/categories/${c.id}`, { method: "DELETE" }); setCategories((prev) => prev.filter((x) => x.id !== c.id)); }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
