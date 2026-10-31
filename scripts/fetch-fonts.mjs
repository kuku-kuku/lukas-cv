/**
 * Refreshes the self-hosted fonts in public/fonts/ and prints the @font-face
 * rules to paste at the top of src/styles.css.
 *
 *   node scripts/fetch-fonts.mjs
 *
 * Why self-hosted: serving these from fonts.gstatic.com put two extra origin
 * handshakes on the critical path and sent every visitor's IP to a third
 * party. Same files, same-origin, no handshake, no question to answer about
 * EU data transfers.
 *
 * Only latin and latin-ext are kept - Lithuanian needs latin-ext, and the
 * site has no Cyrillic, Greek or Vietnamese content. Both families are
 * requested as variable fonts (one file per subset instead of one per
 * weight).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const CSS_URL =
  "https://fonts.googleapis.com/css2?family=Archivo:wght@400..800&family=JetBrains+Mono:wght@400..500&display=swap";

// Google serves woff2 only to browsers that advertise support for it.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const KEEP = new Set(["latin", "latin-ext"]);
const WEIGHTS = { Archivo: "400 800", "JetBrains Mono": "400 500" };
const OUT = join("public", "fonts");

const css = await fetch(CSS_URL, { headers: { "User-Agent": UA } }).then((r) => {
  if (!r.ok) throw new Error(`font css: ${r.status}`);
  return r.text();
});

mkdirSync(OUT, { recursive: true });

const blocks = css.split(/(?=\/\* [a-z-]+ \*\/)/);
const rules = [];

for (const block of blocks) {
  const subset = block.match(/^\/\* ([a-z-]+) \*\//)?.[1];
  if (!subset || !KEEP.has(subset)) continue;

  const family = block.match(/font-family: '([^']+)'/)?.[1];
  const url = block.match(/url\((https:\/\/[^)]+)\)/)?.[1];
  const range = block.match(/unicode-range: ([^;]+);/)?.[1];
  if (!family || !url || !range) continue;

  const file = `${family.toLowerCase().replace(/ /g, "-")}-${subset}.woff2`;
  const bytes = Buffer.from(
    await fetch(url, { headers: { "User-Agent": UA } }).then((r) => r.arrayBuffer())
  );
  writeFileSync(join(OUT, file), bytes);
  console.log(`${file.padEnd(34)} ${bytes.length} bytes`);

  rules.push(
    `@font-face {\n` +
      `  font-family: '${family}';\n` +
      `  font-style: normal;\n` +
      `  font-weight: ${WEIGHTS[family] ?? "400"};\n` +
      `  font-display: swap;\n` +
      `  src: url('/fonts/${file}') format('woff2');\n` +
      `  unicode-range: ${range};\n` +
      `}`
  );
}

console.log("\n--- paste at the top of src/styles.css ---\n");
console.log(rules.join("\n\n"));
