import React from "react";
import { SECTIONS } from "../design/content";
import Reveal from "./motion/Reveal";
import Rule from "./motion/Rule";
import SplitText from "./motion/SplitText";

/**
 * Every section opens the same way: index, name, a rule that draws itself,
 * then the title and an optional lede. The repetition is the point - it is
 * what makes the page read as one instrument instead of seven templates.
 */
export default function SectionHead({ eyebrow, title, lede, id, index }) {
  /* The number comes from SECTIONS, keyed by the section's own id.
     Every section used to pass its own literal, and three had drifted out
     of step with the running order - the page showed two 03s and two 05s.
     A prop is still accepted for sections that are not in the rail. */
  const derived = SECTIONS.find((s) => s.id === id)?.index ?? index;

  return (
    <header className="mb-12 md:mb-20">
      <Reveal className="flex items-baseline justify-between gap-6" y={10}>
        <span className="label" style={{ color: "var(--signal)" }}>
          {derived}
        </span>
        <span className="label flex-1 text-right md:text-left">{eyebrow}</span>
      </Reveal>

      <Rule className="mt-3" delay={0.05} />

      <div className="mt-6 grid gap-6 md:grid-cols-12 md:gap-10">
        {/* The heading owns the accessible name; SplitText below renders
            only aria-hidden fragments, so the string exists once. */}
        <h2
          id={id ? `${id}-title` : undefined}
          aria-label={title}
          className="display-l md:col-span-7"
        >
          <SplitText text={title} stagger={0.045} />
        </h2>
        {lede && (
          <Reveal
            as="p"
            delay={0.12}
            className="lede md:col-span-5 md:pt-2"
          >
            {lede}
          </Reveal>
        )}
      </div>
    </header>
  );
}
