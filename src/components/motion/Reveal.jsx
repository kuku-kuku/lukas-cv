import React, { useEffect, useRef } from "react";
import { observeReveal } from "../../design/reveal";

/**
 * The one entrance on the site: a clip-path wipe from the top edge down
 * with a short lift, played once when the element first scrolls in.
 *
 * Use it on the unit that should arrive together - a section header, a list
 * item, a card - not on every line inside it. `i` staggers siblings (capped
 * in CSS so a long list never trails).
 *
 * It renders a plain element. All state is a data attribute managed by
 * src/design/reveal.js, so the prerendered HTML is the finished page and
 * nothing re-renders to animate. See MOTION.md.
 */
export default function Reveal({
  as: Tag = "div",
  i = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => observeReveal(ref.current), []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={i ? { ...style, "--i": i } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
