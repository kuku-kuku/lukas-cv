import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import PageShell from "../components/PageShell";
import Contact from "../components/sections/Contact";
import Reveal from "../components/motion/Reveal";
import { PROJECTS } from "../design/content";
import { PROJECT_SERVICE, SERVICE_PAGES, WORK_PAGE } from "../design/pages";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { breadcrumbJsonLd, webPageJsonLd } from "../design/schema";

/**
 * /darbai - the whole work index as readable HTML.
 *
 * On the home page each project's notes live inside an accordion that only
 * mounts when opened, so none of them reached the prerendered document. This
 * page carries all of them, open, on one indexable URL.
 *
 * Deliberately one page rather than eight thin case studies: most projects
 * have a type and a stack but no written problem/approach yet. When a
 * project gets a full write-up (brief, what was built, a measured result) it
 * can graduate to /darbai/:slug - see the note in routes.js.
 */

export const meta = () => [
  ...buildMeta({
    locale: "lt",
    title: WORK_PAGE.title,
    description: WORK_PAGE.description,
    path: WORK_PAGE.slug,
    translated: false,
  }),
  webPageJsonLd({
    type: "CollectionPage",
    path: WORK_PAGE.slug,
    name: WORK_PAGE.title,
    description: WORK_PAGE.description,
  }),
  breadcrumbJsonLd("Darbai", WORK_PAGE.slug),
];

const NOTES = [
  { k: "scope", label: "Ką padariau" },
  { k: "problem", label: "Užduotis" },
  { k: "approach", label: "Sprendimas" },
];

export default function WorkRoute() {
  useLocale("lt");
  const { t, i18n } = useTranslation();

  return (
    <PageShell current="darbai">
      <section className="shell pb-12 pt-12 md:pb-16 md:pt-20" aria-labelledby="page-title">
        <nav aria-label="Kelias" className="label">
          <Link to="/" className="signal-link">
            Pradžia
          </Link>{" "}
          / Darbai
        </nav>
        <h1 id="page-title" className="display-l mt-10">
          {WORK_PAGE.h1}
          <span style={{ color: "var(--signal)" }}>.</span>
        </h1>
        <p className="lede mt-8">{WORK_PAGE.lede}</p>
      </section>

      <div className="shell">
        {PROJECTS.map((project) => {
          const name = t(`projects.${project.id}.title`);
          const kind = t(`projects.${project.id}.kind`);
          const service = SERVICE_PAGES.find((s) => s.slug === PROJECT_SERVICE[project.id]);

          return (
            <Reveal
              as="article"
              key={project.id}
              id={project.id}
              className="grid scroll-mt-24 gap-8 border-t py-12 md:grid-cols-12 md:gap-10 md:py-16"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="md:col-span-5">
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden border"
                  style={{ borderColor: "var(--line)", background: "var(--bg-sunk)" }}
                >
                  <picture>
                    <source srcSet={project.image} type="image/webp" />
                    <img
                      src={project.imageFallback || project.image}
                      alt={`${name} - ${kind}, svetainės ekrano nuotrauka`}
                      width="1400"
                      height="875"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </picture>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="flex items-baseline gap-4">
                  <span className="label" style={{ color: "var(--signal)" }}>
                    {project.index}
                  </span>
                  <span className="label">{t(`status.${project.statusKey}`)}</span>
                </div>
                <h2 className="display-m mt-4">{name}</h2>
                <p className="mt-2 text-lg text-ink-2">{kind}</p>
                <p className="copy mt-5">{t(`projects.${project.id}.description`)}</p>

                {NOTES.filter((n) => i18n.exists(`projects.${project.id}.${n.k}`))
                  // beneta.lt's "scope" is a label, not a description.
                  .filter((n) => !(project.id === "beneta" && n.k === "scope"))
                  .map((n) => (
                    <div key={n.k} className="mt-6">
                      <h3 className="label">{n.label}</h3>
                      <p className="copy mt-2">{t(`projects.${project.id}.${n.k}`)}</p>
                    </div>
                  ))}

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <dt className="label">{t("role")}</dt>
                    <dd className="mt-2 text-base">{t(project.roleKey)}</dd>
                  </div>
                  {project.metricNote && (
                    <div>
                      <dt className="label">{t("measured")}</dt>
                      <dd className="nums mt-2 font-mono text-sm text-ink-2">
                        {project.metricNote} · {project.metricDate}
                      </dd>
                    </div>
                  )}
                  <div className="col-span-2">
                    <dt className="label">Technologijos</dt>
                    <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-label text-ink-2">
                      {project.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="signal-link text-sm font-semibold"
                    >
                      {t("visit_live")} ↗
                    </a>
                  )}
                  {service && (
                    <Link to={`/${service.slug}`} className="signal-link text-sm font-semibold">
                      Paslauga: {service.nav} →
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Contact />
    </PageShell>
  );
}
