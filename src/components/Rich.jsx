import React from "react";
import { Link } from "react-router";
import { segments } from "../design/text";

/* In running text a link must look like one before it is hovered, so it
   carries the signal underline at rest (.signal-link only draws it on
   hover, which suits nav rows but hides a link inside a sentence). */
const INLINE =
  "font-medium text-ink underline decoration-[color:var(--signal)] decoration-1 underline-offset-4 hover:decoration-2";

/**
 * Renders a copy string with [text](/path) links as real, crawlable links
 * in the site's existing link style. Internal paths become router links;
 * absolute URLs open in a new tab.
 */
export default function Rich({ children }) {
  if (typeof children !== "string") return children ?? null;
  return segments(children).map((s, i) => {
    if (typeof s === "string") return <React.Fragment key={i}>{s}</React.Fragment>;
    if (s.href.startsWith("/")) {
      return (
        <Link key={i} to={s.href} className={INLINE}>
          {s.text}
        </Link>
      );
    }
    return (
      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={INLINE}>
        {s.text}
      </a>
    );
  });
}
