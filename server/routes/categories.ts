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

const list: RequestHandler = (_req, res) => {
  const items = readJson<Category[]>(file, []);
  res.json(items);
};

const create: RequestHandler = (req, res) => {
  const body = req.body as Partial<Category>;
  if (!body || !body.name) return res.status(400).json({ error: "Missing name" });
  const now = new Date().toISOString();
  const items = readJson<Category[]>(file, []);
  const item: Category = { id: body.id || randomUUID(), name: String(body.name), createdAt: now, updatedAt: now };
  items.push(item);
  writeJson(file, items);
  res.status(201).json(item);
};

const update: RequestHandler = (req, res) => {
  const { id } = req.params;
  const body = req.body as Partial<Category>;
  const items = readJson<Category[]>(file, []);
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const now = new Date().toISOString();
  items[idx] = { ...items[idx], ...body, updatedAt: now } as Category;
  writeJson(file, items);
  res.json(items[idx]);
};

const remove: RequestHandler = (req, res) => {
  const { id } = req.params;
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
