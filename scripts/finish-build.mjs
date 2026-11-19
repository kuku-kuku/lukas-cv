/**
 * Post-build steps for the prerendered HTML.
 *
 *   node scripts/finish-build.mjs
 *
 * 1. Turns the prerendered /404 into build/client/404.html. Vercel serves
 *    404.html, with a 404 status, for any path that matches no file and no
 *    rewrite. Before this, every unknown URL was rewritten to the SPA
 *    fallback and answered 200 - a "soft 404" that Google may index as a
 *    thin duplicate of the site.
 *
 * 2. Removes NUL bytes from every HTML file. react-dom 18.2's server
 *    renderer writes in 2048-byte chunks; when a multi-byte character
 *    (š, ž, ū...) does not fit at the end of a chunk it flushes the whole
 *    buffer, unused zero byte included. The text around it is intact, so the
 *    NUL is pure padding: in the HTML it shows up in crawled text and makes
 *    hydration see a text mismatch. Fixed upstream in react-dom 18.3; this
 *    step can go once the project is on it.
 *
 * Runs as part of `npm run build`.
 */
import { existsSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "build/client";
const from = `${ROOT}/404/index.html`;
const to = `${ROOT}/404.html`;

if (!existsSync(from)) {
  console.error(`finish-build: ${from} missing - is "/404" in prerender?`);
  process.exit(1);
}
renameSync(from, to);
rmSync(`${ROOT}/404`, { recursive: true, force: true });
console.log("finish-build: 404.html written");

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "assets" ? [] : htmlFiles(p);
    return p.endsWith(".html") ? [p] : [];
  });
}

let fixed = 0;
for (const file of htmlFiles(ROOT)) {
  const buf = readFileSync(file);
  if (!buf.includes(0)) continue;
  writeFileSync(file, Buffer.from(buf.filter((b) => b !== 0)));
  fixed++;
}
console.log(`finish-build: NUL bytes removed from ${fixed} file(s)`);
