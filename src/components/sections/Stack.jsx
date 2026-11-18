import React from "react";
import { useTranslation } from "react-i18next";
import Reveal from "../motion/Reveal";
import SectionHead from "../SectionHead";
import { STACK_GROUPS } from "../../design/content";

/**
 * 04 - STACK
 *
 * A specification table, not a logo wall: four groups, set as a dense
 * hairline matrix in the same mono voice as the rest of the instrumentation.
 * Everything listed is in use in the work indexed in section 03 or in the
 * services on offer - nothing is here to pad the list.
 */
export default function Stack() {
  const { t } = useTranslation();

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="shell section relative z-10"
    >
      <SectionHead
        id="stack"
        eyebrow={t("nav_stack", "Stack")}
        title={t("stack_title")}
        lede={t("stack_lede")}
      />

      <div className="h-px w-full" style={{ background: "var(--line-strong)" }} />
      <div className="grid md:grid-cols-4">
        {STACK_GROUPS.map((group, gi) => (
          <Reveal as="div" i={gi}
            key={group.id}
            className="border-b md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="py-6">
              <div className="flex items-baseline justify-between">
                <span className="label">{group.index}</span>
                <span
                  aria-hidden="true"
                  className="h-1 w-1"
                  style={{ background: "var(--signal)" }}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-display">
                {t(group.titleKey)}
              </h3>
              <ul className="mt-5 space-y-2">
                {group.items.map((item, ii) => (
                  <li
                    key={item}
                    className="font-mono text-[0.8125rem] text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="h-px w-full" style={{ background: "var(--line)" }} />
    </section>
  );
}
