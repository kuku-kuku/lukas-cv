/**
 * Serves build/client the way vercel.json does, for checking a production
 * build locally:
 *
 *   npm run build && node scripts/serve-build.mjs   ->  http://localhost:4173
 *
 *  - /path serves /path/index.html, then /path as a file;
 *  - a trailing slash redirects to the bare path (trailingSlash: false);
 *  - /demo and /demo/* get the SPA fallback (the only rewrite);
 *  - anything else answers 404.html with a 404 status.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = "build/client";
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".svg": "image/svg+xml", ".woff2": "font/woff2",
};

const isFile = async (p) => (await stat(p).catch(() => null))?.isFile();

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.length > 1 && path.endsWith("/")) {
    res.writeHead(308, { location: path.slice(0, -1) });
    return res.end();
  }
  const safe = normalize(path).replace(/^([/\\])+/, "");
  const candidates = [join(ROOT, safe, "index.html"), join(ROOT, safe)];
  let file = null;
  for (const c of candidates) if (await isFile(c)) { file = c; break; }
  let status = 200;
  if (!file && (path === "/demo" || path.startsWith("/demo/"))) file = join(ROOT, "__spa-fallback.html");
  if (!file) { file = join(ROOT, "404.html"); status = 404; }
  res.writeHead(status, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
  res.end(await readFile(file));
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
