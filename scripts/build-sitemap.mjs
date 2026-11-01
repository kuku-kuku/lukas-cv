/**
 * Writes public/sitemap.xml from the prerendered route list.
 *
 *   node scripts/build-sitemap.mjs
 *
 * The routes come from react-router.config.js, which is the same list the
 * build actually writes to disk - a sitemap maintained by hand drifts the
 * moment a route is added, and a sitemap listing a 404 is worse than none.
 *
 * Run as part of `npm run build` (see package.json), so it cannot go stale.
 */
import { writeFileSync } from "node:fs";
import config from "../react-router.config.js";

const SITE = "https://www.beneta.lt";

// Routes the crawler should see. The demo sandbox is client-side only and
// is not in `prerender`, so it never reaches this list.
const paths = (config.prerender || []).filter((p) => typeof p === "string");

const today = new Date().toISOString().slice(0, 10);

const urls = paths
  .map((p) => {
    const loc = p === "/" ? `${SITE}/` : `${SITE}${p}`;
    // The home page is the entry point; everything else sits below it.
    const priority = p === "/" ? "1.0" : p === "/en" ? "0.9" : "0.4";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml: ${paths.length} urls`);
