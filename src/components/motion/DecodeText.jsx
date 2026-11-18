import React, { useEffect, useRef } from "react";

/**
 * The hero's signature: each letter flickers through a few code glyphs and
 * then "compiles" into the real character, left to right, once.
 *
 * Contract (this is why it is built the way it is):
 *  - The real characters are the DOM text. Spaces between words are real
 *    text nodes, so textContent, crawlers, copy-paste and screen readers get
 *    the sentence exactly once, with its spaces.
 *  - The flicker glyphs live in data attributes and are painted by a CSS
 *    ::after (content: attr()). Generated content is not part of
 *    textContent, so nothing decorative ever reaches Google.
 *  - The glyphs are derived from the character index, never Math.random, so
 *    the prerendered HTML and the first client render are identical: no
 *    hydration mismatch, nothing is re-split after hydration.
 *  - The whole effect is CSS keyframes declared in critical.css. It starts
 *    on the first paint, needs no JavaScript, cannot double-run under
 *    StrictMode, and plays once per page load.
 *  - The real glyph always occupies its box, so the line never reflows
 *    (no CLS). The overlay is absolutely positioned.
 *  - prefers-reduced-motion: the overlay is removed and the text is simply
 *    there.
 *
 * `lines` are rendered as block lines; `tail` is a short string appended to
 * the last word (the signal-coloured full stop), decoded like the rest.
 */

const POOL = "01<>/{}[]#_*+=%$&;:ABCDEFHKMNPRSTVXZ";
const STEP_MS = 12; // left-to-right wave
const START_MS = 40;
const LETTER_MS = 200; // keep in step with .dc in critical.css

function glyph(i, k) {
  // Cheap deterministic scatter; prime multipliers keep neighbours different.
  return POOL[(i * 7919 + k * 104729 + 13) % POOL.length];
}

export default function DecodeText({ lines, tail = null, className = "" }) {
  const ref = useRef(null);
  let n = 0;

  /*
   * Belt and braces for WebKit (every browser on iOS). Mobile Safari can
   * leave some letters frozen on a code glyph: the discrete steps finish
   * but the inline spans are never repainted. Once the wave is over we
   * flip a data attribute that turns the animations off outright, which
   * forces a fresh style and paint of the finished text. Written straight
   * to the DOM, not React state, so nothing re-renders.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const count = el.querySelectorAll(".dc").length;
    const total = START_MS + count * STEP_MS + LETTER_MS + 60;
    const left = Math.max(0, total - performance.now());
    const timer = setTimeout(() => el.setAttribute("data-done", ""), left);
    return () => clearTimeout(timer);
  }, []);

  const renderChars = (word, extra = "") =>
    Array.from(word).map((ch) => {
      const i = n++;
      return (
        <span
          key={i}
          className={`dc${extra}`}
          data-a={glyph(i, 1)}
          data-b={glyph(i, 2)}
          data-c={glyph(i, 3)}
          style={{ "--d": `${START_MS + i * STEP_MS}ms` }}
        >
          {ch}
        </span>
      );
    });

  return (
    <p ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <React.Fragment key={li}>
            {/* A real space between block lines: invisible in layout,
                but it keeps "Svetainės, kurios" apart in textContent. */}
            {li > 0 && " "}
            <span className="dc-line">
              {words.map((w, wi) => (
                <React.Fragment key={wi}>
                  {wi > 0 && " "}
                  <span className="dc-word">
                    {renderChars(w)}
                    {li === lines.length - 1 && wi === words.length - 1 && tail
                      ? renderChars(tail, " dc-tail")
                      : null}
                  </span>
                </React.Fragment>
              ))}
            </span>
          </React.Fragment>
        );
      })}
    </p>
  );
}
