import { RequestHandler, Router } from "express";
import { readJson, writeJson } from "../utils/jsondb";

export type Page = {
  slug: string; // e.g. 'about', 'contact'
  title: string;
  body?: string;
  meta?: Record<string, any>;
  updatedAt: string;
};

const file = "pages.json";

const list: RequestHandler = (_req, res) => {
  const items = readJson<Page[]>(file, []);
  res.json(items);
};

const getBySlug: RequestHandler = (req, res) => {
  const { slug } = req.params;
  const items = readJson<Page[]>(file, []);
  const page = items.find((p) => p.slug === slug);
  if (!page) return res.status(404).json({ error: "Not found" });
  res.json(page);
};

const upsert: RequestHandler = (req, res) => {
  const body = req.body as Partial<Page>;
  if (!body || !body.slug) return res.status(400).json({ error: "Missing slug" });
  const items = readJson<Page[]>(file, []);
  const idx = items.findIndex((p) => p.slug === body.slug);
  const now = new Date().toISOString();
  const next: Page = {
    slug: String(body.slug),
    title: body.title ?? "",
    body: body.body ?? "",
    meta: body.meta ?? {},
    updatedAt: now,
  };
  if (idx === -1) {
    items.push(next);
  } else {
    items[idx] = { ...items[idx], ...next, updatedAt: now };
  }
  writeJson(file, items);
  res.status(200).json(next);
};

const remove: RequestHandler = (req, res) => {
  const { slug } = req.params;
  const items = readJson<Page[]>(file, []);
  const next = items.filter((p) => p.slug !== slug);
  writeJson(file, next);
  res.status(204).end();
};

export function pagesRouter() {
  const r = Router();
  r.get("/", list);
  r.get("/:slug", getBySlug);
  r.post("/", upsert);
  r.put("/:slug", upsert);
  r.delete("/:slug", remove);
  return r;
}
