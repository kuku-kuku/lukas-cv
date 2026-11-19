/**
 * Inline links in copy.
 *
 * Copy in pages.js and i18n.js is plain strings. A link inside a sentence is
 * written the Markdown way - [anchor text](/path) - and this splits it into
 * segments: the page renders them with <Rich> (components/Rich.jsx), the
 * JSON-LD uses plainText() so the structured data says exactly what the
 * visitor reads, minus the markup.
 */

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** "a [b](/c) d" -> ["a ", { text: "b", href: "/c" }, " d"] */
export function segments(str = "") {
  const out = [];
  let last = 0;
  for (const m of str.matchAll(LINK)) {
    if (m.index > last) out.push(str.slice(last, m.index));
    out.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push(str.slice(last));
  return out;
}

/** The same string with the link markup removed. */
export const plainText = (str = "") => str.replace(LINK, "$1");
