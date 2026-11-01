/**
 * Fails the build on en dashes, em dashes and non-breaking spaces in src/.
 *
 *   node scripts/check-dashes.mjs
 *
 * The house rule is a plain hyphen. This has drifted back twice - once by
 * hand, once when a consistency pass counted the existing long dashes and
 * normalised toward the majority instead of toward the rule - so it is
 * checked rather than remembered.
 *
 * Runs as part of `npm run build`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BANNED = [
  ["\u2013", "en dash", "-"],
  ["\u2014", "em dash", "-"],
  ["\u00a0", "non-breaking space", "a normal space"],
  ["&ndash;", "&ndash;", "-"],
  ["&mdash;", "&mdash;", "-"],
];

const EXT = /\.(jsx?|css)$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : EXT.test(p) ? [p] : [];
  });
}

const problems = [];
for (const file of walk("src")) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const [ch, name, fix] of BANNED) {
      if (line.includes(ch)) {
        problems.push(`${file}:${i + 1}  ${name} - use ${fix}\n    ${line.trim().slice(0, 100)}`);
      }
    }
  });
}

if (problems.length) {
  console.error(`\nLong dashes are not the house style. ${problems.length} found:\n`);
  console.error(problems.join("\n"));
  console.error("\nUse a plain hyphen.\n");
  process.exit(1);
}
console.log("dashes: clean");
