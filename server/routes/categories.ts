import { RequestHandler, Router } from "express";
import { readJson, writeJson } from "../utils/jsondb";
import { randomUUID } from "crypto";

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const file = "categories.json";

const list: RequestHandler = async (_req, res) => {
  if (process.env.USE_MYSQL === "true") {
    try {
      const { getPool } = await import("../utils/mysql");
      const pool = await getPool();
      const [rows] = await pool.query<any[]>("SELECT id, name, createdAt, updatedAt FROM categories ORDER BY name ASC");
      if ((rows as any[]).length > 0) return res.json(rows);
    } catch (_) {}
  }
  const items = readJson<Category[]>(file, []);
  res.json(items);
};

const create: RequestHandler = async (req, res) => {
  const body = req.body as Partial<Category>;
  if (!body || !body.name) return res.status(400).json({ error: "Missing name" });
  const now = new Date().toISOString();
  const item: Category = { id: (body.id as string) || randomUUID(), name: String(body.name), createdAt: now, updatedAt: now };
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    await pool.execute("INSERT INTO categories (id, name, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [item.id, item.name, now, now]);
    return res.status(201).json(item);
  }
  const items = readJson<Category[]>(file, []);
  items.push(item);
  writeJson(file, items);
  res.status(201).json(item);
};

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const body = req.body as Partial<Category>;
  const now = new Date().toISOString();
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    const [rows] = await pool.query<any[]>("SELECT * FROM categories WHERE id = ?", [id]);
    if ((rows as any[]).length === 0) return res.status(404).json({ error: "Not found" });
    const existing = rows[0];
    const updated = { id, name: body.name ?? existing.name, createdAt: existing.createdAt, updatedAt: now } as Category;
    await pool.execute("UPDATE categories SET name=?, updatedAt=? WHERE id=?", [updated.name, now, id]);
    return res.json(updated);
  }
  const items = readJson<Category[]>(file, []);
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  items[idx] = { ...items[idx], ...body, updatedAt: now } as Category;
  writeJson(file, items);
  res.json(items[idx]);
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    await pool.execute("DELETE FROM categories WHERE id = ?", [id]);
    return res.status(204).end();
  }
  const items = readJson<Category[]>(file, []);
  const next = items.filter((c) => c.id !== id);
  writeJson(file, next);
  res.status(204).end();
};

export function categoriesRouter() {
  const r = Router();
  r.get("/", list);
  r.post("/", create);
  r.put("/:id", update);
  r.delete("/:id", remove);
  return r;
}
