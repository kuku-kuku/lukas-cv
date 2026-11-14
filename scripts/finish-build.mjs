/**
 * Post-build step: turns the prerendered /404 into build/client/404.html.
 *
 *   node scripts/finish-build.mjs
 *
 * Vercel serves 404.html, with a 404 status, for any path that matches no
 * file and no rewrite. Before this, every unknown URL was rewritten to the
 * SPA fallback and answered 200 - a "soft 404" that Google may index as a
 * thin duplicate of the site. Runs as part of `npm run build`.
 */
import { existsSync, renameSync, rmSync } from "node:fs";

const from = "build/client/404/index.html";
const to = "build/client/404.html";

if (!existsSync(from)) {
  console.error(`finish-build: ${from} missing - is "/404" in prerender?`);
  process.exit(1);
}
renameSync(from, to);
rmSync("build/client/404", { recursive: true, force: true });
console.log("finish-build: 404.html written");
