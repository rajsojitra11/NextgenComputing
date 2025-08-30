import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { productsRouter } from "./routes/products";
import { servicesRouter } from "./routes/services";
import { categoriesRouter } from "./routes/categories";
import { pagesRouter } from "./routes/pages";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.use("/api/products", productsRouter());
  app.use("/api/services", servicesRouter());
  app.use("/api/categories", categoriesRouter());
  app.use("/api/pages", pagesRouter());

  return app;
}
