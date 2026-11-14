import React from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import PageShell, { BulletList, FaqList } from "../components/PageShell";
import Contact from "../components/sections/Contact";
import Reveal from "../components/motion/Reveal";
import Rule from "../components/motion/Rule";
import { CARE, HOURLY, PROJECTS } from "../design/content";
import { servicePage, SERVICE_PAGES } from "../design/pages";
import { useLocale } from "../design/locale";
import {
  breadcrumbJsonLd,
  buildMeta,
  faqJsonLdFrom,
  serviceJsonLd,
} from "../design/seo";

/**
 * One module for every service page. Each is registered in routes.js under
 * its own path and id; the page is picked by the path, and everything it
 * says comes from src/design/pages.js.
 */

const slugOf = (pathname = "") => pathname.replace(/^\/+|\/+$/g, "");

export const meta = ({ location }) => {
  const page = servicePage(slugOf(location.pathname));
  if (!page) return [];
  return [
    ...buildMeta({
      locale: "lt",
      title: page.title,
      description: page.description,
      path: page.slug,
      translated: false,
    }),
    serviceJsonLd(page),
    breadcrumbJsonLd(page.nav, page.slug),
    faqJsonLdFrom(page.faq),
  ];
};

export default function ServiceRoute() {
  useLocale("lt");
  const { pathname } = useLocation();
  const page = servicePage(slugOf(pathname));
  if (!page) return null;
  return <ServicePage page={page} />;
}

function ServicePage({ page }) {
  const { t } = useTranslation();
  const related = page.related.map((s) => SERVICE_PAGES.find((p) => p.slug === s));

  return (
    <PageShell current={page.slug}>
      {/* ---- opening ---- */}
      <section className="shell pb-16 pt-12 md:pb-24 md:pt-20" aria-labelledby="page-title">
        <nav aria-label="Kelias" className="label">
          <Link to="/" className="signal-link">
            Pradžia
          </Link>{" "}
          / {page.nav}
        </nav>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-9">
            <span className="label" style={{ color: "var(--signal)" }}>
              - {page.eyebrow}
            </span>
            <h1 id="page-title" className="display-l mt-5 text-balance">
              {page.h1}
              <span style={{ color: "var(--signal)" }}>.</span>
            </h1>
            <p className="lede mt-8">{page.lede}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden border px-6 py-4 text-sm font-semibold"
                style={{ borderColor: "var(--signal)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[300ms] ease-expo group-hover:scale-x-100"
                  style={{ background: "var(--signal)" }}
                />
                <span className="relative transition-colors duration-200 group-hover:text-ground">
                  {t("cta_brief")}
                </span>
                <span
                  aria-hidden="true"
                  className="relative font-mono text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ground"
                >
                  →
                </span>
              </a>
              <Link
                to="/#pricing"
                className="inline-flex items-center gap-2 border-b px-1 py-4 text-sm font-medium"
                style={{ borderColor: "var(--line-strong)" }}
              >
                Visos kainos
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full" style={{ background: "var(--line)" }} />
        <ul className="grid grid-cols-1 sm:grid-cols-3">
          {["trust_price", "trust_free", "trust_response"].map((key) => (
            <li
              key={key}
              className="flex items-center gap-3 border-b py-4 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0"
              style={{ borderColor: "var(--line)" }}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0" style={{ background: "var(--signal)" }} />
              <span className="text-base font-medium">{t(key)}</span>
            </li>
          ))}
        </ul>
        <div className="h-px w-full" style={{ background: "var(--line)" }} />
      </section>

      {/* ---- body ---- */}
      <div className="shell">
        {page.sections.map((s) => (
          <Reveal
            as="section"
            key={s.h}
            className="grid gap-6 border-t py-12 md:grid-cols-12 md:gap-10 md:py-16"
            style={{ borderColor: "var(--line)" }}
          >
            <h2 className="display-m md:col-span-4">{s.h}</h2>
            <div className="md:col-span-8">
              {s.p?.map((para) => (
                <p key={para} className="copy mb-4 last:mb-0">
                  {para}
                </p>
              ))}
              {s.list && <BulletList items={s.list} className={s.p ? "mt-5" : ""} />}
              {s.after?.map((para) => (
                <p key={para} className="copy mt-5">
                  {para}
                </p>
              ))}
              {s.plans && <CarePlans />}
            </div>
          </Reveal>
        ))}

        {page.evidence.length > 0 && (
          <Reveal
            as="section"
            className="grid gap-6 border-t py-12 md:grid-cols-12 md:gap-10 md:py-16"
            style={{ borderColor: "var(--line)" }}
          >
            <h2 className="display-m md:col-span-4">Kur tai jau padaryta</h2>
            <ul className="md:col-span-8">
              {page.evidence.map(({ project: id, text }) => {
                const project = PROJECTS.find((p) => p.id === id);
                return (
                  <li key={id} className="border-b py-5 first:pt-0" style={{ borderColor: "var(--line)" }}>
                    <h3 className="text-xl font-semibold tracking-display">
                      <Link to={`/darbai#${id}`} className="signal-link">
                        {t(`projects.${id}.title`)}
                      </Link>
                    </h3>
                    <p className="copy-sm mt-2">{text}</p>
                    {project?.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label mt-3 inline-block hover:text-ink"
                      >
                        {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "")} ↗
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}

        <section
          className="grid gap-6 border-t py-12 md:grid-cols-12 md:gap-10 md:py-16"
          style={{ borderColor: "var(--line)" }}
          aria-labelledby="duk-title"
        >
          <h2 id="duk-title" className="display-m md:col-span-4">
            Dažni klausimai
          </h2>
          <div className="md:col-span-8">
            <FaqList items={page.faq} />
          </div>
        </section>

        <section
          className="grid gap-6 border-t py-12 md:grid-cols-12 md:gap-10 md:py-16"
          style={{ borderColor: "var(--line)" }}
          aria-labelledby="related-title"
        >
          <h2 id="related-title" className="display-m md:col-span-4">
            Susijusios paslaugos
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 md:col-span-8">
            <li>
              <RelatedCard to="/" title="Svetainių kūrimas verslui" body="Nauja svetainė nuo idėjos iki paleidimo, su fiksuota kaina." />
            </li>
            {related.map((r) => (
              <li key={r.slug}>
                <RelatedCard to={`/${r.slug}`} title={r.h1} body={r.description} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Contact />
    </PageShell>
  );
}

function RelatedCard({ to, title, body }) {
  return (
    <Link
      to={to}
      className="group block h-full border p-6 transition-colors hover:border-[color:var(--signal)]"
      style={{ borderColor: "var(--line-strong)" }}
    >
      <span className="text-lg font-semibold tracking-display">{title}</span>
      <p className="copy-sm mt-3">{body}</p>
      <span aria-hidden="true" className="label mt-4 inline-block transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

function CarePlans() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {CARE.map((plan) => (
          <div key={plan.id} className="border p-6" style={{ borderColor: "var(--line-strong)" }}>
            <h3 className="text-xl font-semibold tracking-display">{t(plan.titleKey)}</h3>
            <p className="mt-3">
              <span className="nums text-3xl font-bold">{plan.price} €</span>
              <span className="label ml-2">{t("care_month")}</span>
            </p>
            <p className="copy-sm mt-4">{t(plan.bodyKey)}</p>
          </div>
        ))}
      </div>
      <p className="copy-sm mt-5">
        Vienkartiniai darbai be plano - {HOURLY} €/val. {t("rate_note")}
      </p>
    </div>
  );
}
