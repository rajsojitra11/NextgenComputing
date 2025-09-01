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

const list: RequestHandler = async (_req, res) => {
  if (process.env.USE_MYSQL === "true") {
    try {
      const { getPool } = await import("../utils/mysql");
      const pool = await getPool();
      const [rows] = await pool.query<any[]>("SELECT slug, title, body, meta, updatedAt FROM pages");
      const items = (rows as any[]).map((r) => ({ ...r, meta: r.meta ? JSON.parse(r.meta) : {} }));
      if ((items?.length ?? 0) > 0) return res.json(items);
    } catch (_) {}
  }
  const items = readJson<Page[]>(file, []);
  res.json(items);
};

const getBySlug: RequestHandler = async (req, res) => {
  const { slug } = req.params;
  if (process.env.USE_MYSQL === "true") {
    try {
      const { getPool } = await import("../utils/mysql");
      const pool = await getPool();
      const [rows] = await pool.query<any[]>("SELECT slug, title, body, meta, updatedAt FROM pages WHERE slug=?", [slug]);
      if ((rows as any[]).length > 0) {
        const r = (rows as any[])[0];
        return res.json({ ...r, meta: r.meta ? JSON.parse(r.meta) : {} });
      }
    } catch (_) {}
  }
  const items = readJson<Page[]>(file, []);
  const page = items.find((p) => p.slug === slug);
  if (!page) return res.status(404).json({ error: "Not found" });
  res.json(page);
};

const upsert: RequestHandler = async (req, res) => {
  const body = req.body as Partial<Page>;
  if (!body || !body.slug) return res.status(400).json({ error: "Missing slug" });
  const now = new Date().toISOString();
  const next: Page = {
    slug: String(body.slug),
    title: body.title ?? "",
    body: body.body ?? "",
    meta: body.meta ?? {},
    updatedAt: now,
  };
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    await pool.execute(
      "INSERT INTO pages (slug, title, body, meta, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), ?) ON DUPLICATE KEY UPDATE title=VALUES(title), body=VALUES(body), meta=VALUES(meta), updatedAt=VALUES(updatedAt)",
      [next.slug, next.title, next.body, JSON.stringify(next.meta || {}), now]
    );
    return res.status(200).json(next);
  }
  const items = readJson<Page[]>(file, []);
  const idx = items.findIndex((p) => p.slug === body.slug);
  if (idx === -1) {
    items.push(next);
  } else {
    items[idx] = { ...items[idx], ...next, updatedAt: now };
  }
  writeJson(file, items);
  res.status(200).json(next);
};

const remove: RequestHandler = async (req, res) => {
  const { slug } = req.params;
  if (process.env.USE_MYSQL === "true") {
    const { getPool } = await import("../utils/mysql");
    const pool = await getPool();
    await pool.execute("DELETE FROM pages WHERE slug=?", [slug]);
    return res.status(204).end();
  }
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
