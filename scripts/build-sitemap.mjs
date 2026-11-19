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
 *
 * lastmod is the date the page's source last changed, not the build date:
 *   1. a source file has uncommitted changes -> today (it is changing now);
 *   2. otherwise the date of the last commit touching its source files;
 *   3. no git (Vercel builds have no .git) -> the value already in the
 *      committed public/sitemap.xml, which step 1/2 wrote on the last local
 *      build.
 * Stamping every URL with the build date tells Google nothing and teaches it
 * to ignore the field.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import config from "../react-router.config.js";

const SITE = "https://www.beneta.lt";
const OUT = "public/sitemap.xml";

// Routes the crawler should see. The demo sandbox is client-side only and
// is not in `prerender`, so it never reaches this list.
// "/404" is prerendered only to become 404.html; it is not a page.
const NOT_PAGES = new Set(["/404"]);
const paths = (config.prerender || []).filter(
  (p) => typeof p === "string" && !NOT_PAGES.has(p)
);

const locOf = (p) => (p === "/" ? `${SITE}/` : `${SITE}${p}`);

/*
 * hreflang pairs. Only the home page exists in both languages; every other
 * page is Lithuanian only and declares no alternates (same rule as
 * buildMeta's `translated: false`).
 */
const ALTERNATES = {
  "/": true,
  "/en": true,
};
const altLinks = () =>
  [
    ["lt", `${SITE}/`],
    ["en", `${SITE}/en`],
    ["x-default", `${SITE}/`],
  ]
    .map(
      ([lang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`
    )
    .join("\n");

/* The files whose change changes what a page says. */
const SHARED = ["src/root.jsx", "src/design/content.js", "src/design/schema.js"];
const HOME = [
  "src/pages/Home.jsx",
  "src/components/sections",
  "src/i18n.js",
];
const SERVICE = [
  "src/design/pages.js",
  "src/routes/service.jsx",
  "src/components/ServiceLayout.jsx",
];
const SOURCES = {
  "/": ["src/routes/home.jsx", ...HOME],
  "/en": ["src/routes/home.en.jsx", ...HOME],
  "/darbai": ["src/routes/work.jsx", "src/design/pages.js", "src/i18n.js"],
  "/privatumas": ["src/routes/privacy.jsx"],
  "/svetainiu-kurimo-kaina": [
    "src/routes/price.jsx",
    "src/design/pages.js",
    "src/components/ServiceLayout.jsx",
  ],
};
const sourcesOf = (p) => [...(SOURCES[p] || SERVICE), ...SHARED].filter(existsSync);

const today = new Date().toISOString().slice(0, 10);

const git = (args) => {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
};
const hasGit = git(["rev-parse", "--is-inside-work-tree"]) === "true";

const previous = {};
if (existsSync(OUT)) {
  const xml = readFileSync(OUT, "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    previous[m[1]] = m[2];
  }
}

function lastmodOf(p) {
  if (hasGit) {
    const files = sourcesOf(p);
    if (git(["status", "--porcelain", "--", ...files])) return today;
    const date = git(["log", "-1", "--format=%cs", "--", ...files]);
    if (date) return date;
  }
  return previous[locOf(p)] || today;
}

const urls = paths
  .map((p) => {
    const lines = [`    <loc>${locOf(p)}</loc>`, `    <lastmod>${lastmodOf(p)}</lastmod>`];
    if (ALTERNATES[p]) lines.push(altLinks());
    return `  <url>\n${lines.join("\n")}\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`sitemap.xml: ${paths.length} urls${hasGit ? "" : " (no git: lastmod kept from previous sitemap)"}`);
