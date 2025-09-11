import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createServer } from "../server";

const app = createServer();

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Delegate handling to our Express app
  return (app as any)(req, res);
}
