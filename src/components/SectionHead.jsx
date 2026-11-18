import React from "react";
import { SECTIONS } from "../design/content";
import Reveal from "./motion/Reveal";
import Odometer from "./motion/Odometer";

/**
 * Every section opens the same way: index, name, a rule, then the title and
 * an optional lede. The repetition is the point - it is what makes the page
 * read as one instrument instead of seven templates.
 *
 * Motion: the whole header is ONE reveal (the wipe uncovers number, rule,
 * title and lede in reading order) and the number rolls in like an
 * odometer. It used to be five separate effects in a row - eyebrow, rule
 * draw, per-word title, lede, then the list - which read as the same
 * animation playing twice. The title is plain text now: one string, real
 * spaces, nothing split.
 */
export default function SectionHead({ eyebrow, title, lede, id, index }) {
  /* The number comes from SECTIONS, keyed by the section's own id.
     Every section used to pass its own literal, and three had drifted out
     of step with the running order - the page showed two 03s and two 05s.
     A prop is still accepted for sections that are not in the rail. */
  const derived = SECTIONS.find((s) => s.id === id)?.index ?? index;

  return (
    <Reveal as="header" className="mb-12 md:mb-20">
      <div className="flex items-baseline justify-between gap-6">
        <Odometer value={derived} className="label" style={{ color: "var(--signal)" }} />
        <span className="label flex-1 text-right md:text-left">{eyebrow}</span>
      </div>

      <div className="mt-3 h-px w-full" style={{ background: "var(--line)" }} />

      <div className="mt-6 grid gap-6 md:grid-cols-12 md:gap-10">
        <h2 id={id ? `${id}-title` : undefined} className="display-l md:col-span-7">
          {title}
        </h2>
        {lede && <p className="lede md:col-span-5 md:pt-2">{lede}</p>}
      </div>
    </Reveal>
  );
}
