import React from "react";

/**
 * Section numbers (00, 01, 02...) that roll into place like an odometer
 * when the Reveal around them plays.
 *
 * Each digit is the real character, so the DOM text is just "03". The
 * rolling column of digits is a CSS ::after (generated content, never in
 * textContent), and it only exists while an ancestor carries
 * data-reveal="armed" / "shown". Outside a reveal - prerender, on screen at
 * load, reduced motion - it is plain text.
 */
export default function Odometer({ value, className = "", style }) {
  const chars = Array.from(String(value));
  return (
    <span className={`odo ${className}`} style={style}>
      {chars.map((ch, k) =>
        /\d/.test(ch) ? (
          <span key={k} className="odo-d" style={{ "--n": Number(ch), "--k": k }}>
            {ch}
          </span>
        ) : (
          <React.Fragment key={k}>{ch}</React.Fragment>
        )
      )}
    </span>
  );
}
