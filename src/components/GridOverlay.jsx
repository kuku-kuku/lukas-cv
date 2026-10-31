import React from "react";

/**
 * The column grid, left visible.
 *
 * Every measurement on the page is taken from these hairlines, so showing
 * them is honest rather than decorative - and it costs nothing: one fixed
 * element, no JS, a repeating gradient only. Four columns up to md, twelve
 * above it, aligned to the same gutter and rail as .shell.
 *
 * Held at 40% of the hairline alpha (~4% white). At full strength the lines
 * ran straight through paragraphs and measurably hurt reading.
 */
const columns = (count) => ({
  backgroundImage: `repeating-linear-gradient(to right, var(--line) 0 1px, transparent 1px calc(100% / ${count}))`,
});

export default function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden select-none sm:block"
    >
      <div className="mx-auto h-full max-w-grid px-[var(--gutter)] md:pl-[calc(var(--gutter)+var(--rail))]">
        <div className="h-full w-full opacity-40 md:hidden" style={columns(4)} />
        <div className="hidden h-full w-full opacity-40 md:block" style={columns(12)} />
      </div>
    </div>
  );
}
