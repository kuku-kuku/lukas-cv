import React from "react";
import { useTranslation } from "react-i18next";
import Rule from "../motion/Rule";
import Reveal from "../motion/Reveal";
import { PRACTICE } from "../../design/content";

/**
 * KAS AS - the one personal block on the page.
 *
 * Round 1 stripped every photograph on a brief that wanted an engineering
 * practice rather than a portfolio. This audience is different: a small
 * business is hiring a person, and one sentence about who that person is
 * does more than another paragraph about capabilities.
 *
 * The portrait slot is built but renders nothing until /lukas.jpg exists,
 * so the layout is already correct whenever a photo is added - no second
 * trip through this file.
 */
const PORTRAIT = "/lukas.jpg";
const HAS_PORTRAIT = false; // flip to true once the file is in /public

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="shell relative z-10 py-16 md:py-24"
    >
      <span className="label">&mdash; {t("about_title")}</span>
      <Rule className="mt-4" />

      <div className="mt-10 grid gap-10 md:grid-cols-12">
        {HAS_PORTRAIT && (
          <div className="md:col-span-3">
            <div
              className="aspect-[4/5] w-full overflow-hidden border"
              style={{ borderColor: "var(--line)", background: "var(--bg-sunk)" }}
            >
              <img
                src={PORTRAIT}
                alt={PRACTICE.name}
                width="480"
                height="600"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        <div className={HAS_PORTRAIT ? "md:col-span-7" : "md:col-span-8"}>
          <Reveal>
            <h2 id="about-title" className="display-m">
              {PRACTICE.name}
            </h2>
            <p className="copy mt-5">{t("about_body")}</p>
            <p className="copy mt-4">{t("about_body_2")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
