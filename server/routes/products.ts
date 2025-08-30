import { RequestHandler, Router } from "express";
import { readJson, writeJson } from "../utils/jsondb";
import { randomUUID } from "crypto";

export type Product = {
  id: string;
  category: "laptops" | "monitors" | "keyboards" | "mice" | "cpus";
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

const list: RequestHandler = (_req, res) => {
  const items = readJson<Product[]>(file, []);
  res.json(items);
};

const create: RequestHandler = (req, res) => {
  const body = req.body as Partial<Product>;
  if (!body || !body.name || !body.brand || !body.price || !body.image || !body.category) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const now = new Date().toISOString();
  const items = readJson<Product[]>(file, []);
  const item: Product = {
    id: body.id || randomUUID(),
    category: body.category,
    name: body.name,
    brand: body.brand,
    price: Number(body.price),
    image: body.image,
    features: body.features || [],
    buyLink: body.buyLink,
    createdAt: now,
    updatedAt: now,
  } as Product;
  items.push(item);
  writeJson(file, items);
  res.status(201).json(item);
};

const update: RequestHandler = (req, res) => {
  const { id } = req.params;
  const body = req.body as Partial<Product>;
  const items = readJson<Product[]>(file, []);
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const now = new Date().toISOString();
  const updated = { ...items[idx], ...body, updatedAt: now } as Product;
  items[idx] = updated;
  writeJson(file, items);
  res.json(updated);
};

const remove: RequestHandler = (req, res) => {
  const { id } = req.params;
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
