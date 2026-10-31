import React from "react";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
import SystemDiagram from "../SystemDiagram";
import Reveal from "../motion/Reveal";
import Rule from "../motion/Rule";

/**
 * 02 - METHOD
 *
 * The section that has to carry the actual argument: how a vague request
 * becomes a system that can be operated. Three principles in text, then the
 * interactive model. The diagram is the evidence for the text, and both read
 * independently.
 */

const PRINCIPLES = [
  { index: "A", titleKey: "principle_a_title", bodyKey: "principle_a_body" },
  { index: "B", titleKey: "principle_b_title", bodyKey: "principle_b_body" },
  { index: "C", titleKey: "principle_c_title", bodyKey: "principle_c_body" },
];

export default function Method() {
  const { t } = useTranslation();

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="shell section relative z-10"
    >
      <SectionHead
        id="method"
        index="02"
        eyebrow={t("nav_method", "Method")}
        title={t("method_title")}
        lede={t("method_lede")}
      />

      <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.index} delay={i * 0.08}>
            <div className="flex items-baseline justify-between">
              <span className="label" style={{ color: "var(--signal)" }}>
                {p.index}
              </span>
              <span className="label">{`0${i + 1}/03`}</span>
            </div>
            <Rule className="mt-3" delay={i * 0.08 + 0.05} />
            <h3 className="mt-5 text-xl font-semibold tracking-display">
              {t(p.titleKey)}
            </h3>
            <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-2">
              {t(p.bodyKey)}
            </p>
          </Reveal>
        ))}
      </div>

      <SystemDiagram />
    </section>
  );
}
