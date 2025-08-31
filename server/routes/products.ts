import { RequestHandler, Router } from "express";
import { readJson, writeJson } from "../utils/jsondb";
import { randomUUID } from "crypto";

export type Product = {
  id: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  features?: string[];
  buyLink?: string;
  createdAt: string;
  updatedAt: string;
};

const file = "products.json";

const list: RequestHandler = async (_req, res) => {
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    const [rows] = await pool.query<any[]>("SELECT id, category, name, brand, price, image, buyLink, features, createdAt, updatedAt FROM products ORDER BY createdAt DESC");
    const items = (rows as any[]).map((r) => ({ ...r, features: r.features ? JSON.parse(r.features) : [] }));
    return res.json(items);
  }
  const items = readJson<Product[]>(file, []);
  res.json(items);
};

const create: RequestHandler = async (req, res) => {
  const body = req.body as Partial<Product>;
  if (!body || !body.name || !body.brand || body.price == null || !body.image || !body.category) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const now = new Date().toISOString();
  const item: Product = {
    id: (body.id as string) || randomUUID(),
    category: String(body.category),
    name: String(body.name),
    brand: String(body.brand),
    price: Number(body.price),
    image: String(body.image),
    features: body.features || [],
    buyLink: body.buyLink,
    createdAt: now,
    updatedAt: now,
  } as Product;
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    await pool.execute(
      "INSERT INTO products (id, category, name, brand, price, image, features, buyLink, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [item.id, item.category, item.name, item.brand, item.price, item.image, JSON.stringify(item.features || []), item.buyLink || null, now, now]
    );
    return res.status(201).json(item);
  }
  const items = readJson<Product[]>(file, []);
  items.push(item);
  writeJson(file, items);
  res.status(201).json(item);
};

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const body = req.body as Partial<Product>;
  const now = new Date().toISOString();
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    // Fetch existing
    const [rows] = await pool.query<any[]>("SELECT * FROM products WHERE id = ?", [id]);
    if ((rows as any[]).length === 0) return res.status(404).json({ error: "Not found" });
    const existing = rows[0];
    const updated = {
      id,
      category: body.category ?? existing.category,
      name: body.name ?? existing.name,
      brand: body.brand ?? existing.brand,
      price: body.price != null ? Number(body.price) : existing.price,
      image: body.image ?? existing.image,
      features: body.features ?? (existing.features ? JSON.parse(existing.features) : []),
      buyLink: body.buyLink ?? existing.buyLink,
      createdAt: existing.createdAt,
      updatedAt: now,
    } as Product;
    await pool.execute(
      "UPDATE products SET category=?, name=?, brand=?, price=?, image=?, features=?, buyLink=?, updatedAt=? WHERE id=?",
      [updated.category, updated.name, updated.brand, updated.price, updated.image, JSON.stringify(updated.features || []), updated.buyLink || null, now, id]
    );
    return res.json(updated);
  }
  const items = readJson<Product[]>(file, []);
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const updated = { ...items[idx], ...body, updatedAt: now } as Product;
  items[idx] = updated;
  writeJson(file, items);
  res.json(updated);
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    await pool.execute("DELETE FROM products WHERE id = ?", [id]);
    return res.status(204).end();
  }
  const items = readJson<Product[]>(file, []);
  const next = items.filter((p) => p.id !== id);
  writeJson(file, next);
  res.status(204).end();
};

export function productsRouter() {
  const r = Router();
  r.get("/", list);
  r.post("/", create);
  r.put("/:id", update);
  r.delete("/:id", remove);
  return r;
}
