import { RequestHandler, Router } from "express";
import { readJson, writeJson } from "../utils/jsondb";
import { randomUUID } from "crypto";

export type Service = {
  id: string;
  title: string;
  desc: string;
  priceFrom?: number;
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

const file = "services.json";

const list: RequestHandler = (_req, res) => {
  const items = readJson<Service[]>(file, []);
  res.json(items);
};

const create: RequestHandler = (req, res) => {
  const body = req.body as Partial<Service>;
  if (!body || !body.title || !body.desc) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const now = new Date().toISOString();
  const items = readJson<Service[]>(file, []);
  const item: Service = {
    id: body.id || randomUUID(),
    title: body.title,
    desc: body.desc,
    priceFrom: body.priceFrom ? Number(body.priceFrom) : undefined,
    image: body.image,
    active: body.active ?? true,
    createdAt: now,
    updatedAt: now,
  } as Service;
  items.push(item);
  writeJson(file, items);
  res.status(201).json(item);
};

const update: RequestHandler = (req, res) => {
  const { id } = req.params;
  const body = req.body as Partial<Service>;
  const items = readJson<Service[]>(file, []);
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const now = new Date().toISOString();
  const updated = { ...items[idx], ...body, updatedAt: now } as Service;
  items[idx] = updated;
  writeJson(file, items);
  res.json(updated);
};

const remove: RequestHandler = (req, res) => {
  const { id } = req.params;
  const items = readJson<Service[]>(file, []);
  const next = items.filter((p) => p.id !== id);
  writeJson(file, next);
  res.status(204).end();
};

export function servicesRouter() {
  const r = Router();
  r.get("/", list);
  r.post("/", create);
  r.put("/:id", update);
  r.delete("/:id", remove);
  return r;
}
