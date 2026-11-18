import React from "react";

/**
 * A hairline. It used to draw itself as it entered, which added one more
 * separate effect to every block; it now arrives with whatever Reveal it
 * sits in, like the rest of the content.
 */
export default function Rule({ className = "", tone = "line" }) {
  const background =
    tone === "signal"
      ? "var(--signal)"
      : tone === "strong"
      ? "var(--line-strong)"
      : "var(--line)";

  return (
    <div
      aria-hidden="true"
      className={`h-px w-full ${className}`}
      style={{ background }}
    />
  );
}
