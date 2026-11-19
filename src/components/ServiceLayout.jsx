import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import PageShell, { BulletList, FaqList } from "./PageShell";
import Contact from "./sections/Contact";
import Reveal from "./motion/Reveal";
import Rich from "./Rich";
import { CARE, HOURLY, PACKAGES, PROJECTS } from "../design/content";
import { PRICE_PAGE, SERVICE_PAGES } from "../design/pages";

/**
 * The layout shared by the service pages and the price page: opening with
 * the H1 and trust row, the content sections, evidence, FAQ, related
 * services, and the contact section. Everything a page says comes from its
 * entry in src/design/pages.js.
 *
 * Section blocks (all optional, rendered in this order):
 *   { h, p: [..], list: [..], sub: [{ h, p: [..] }], table: { head, rows },
 *     prices: true, plans: true, after: [..] }
 * Copy strings may contain [anchor](/path) links (see design/text.js).
 */

const pricesPath = `/${PRICE_PAGE.slug}`;

export default function ServiceLayout({ page }) {
  const { t } = useTranslation();
  const isPricePage = page.slug === PRICE_PAGE.slug;
  const related = page.related.map((s) => SERVICE_PAGES.find((p) => p.slug === s));

  return (
    <PageShell current={page.slug}>
      {/* ---- opening ---- */}
      <section className="shell pb-16 pt-12 md:pb-24 md:pt-20" aria-labelledby="page-title">
        <nav aria-label="Kelias" className="label">
          <Link data-track="cta_brief" data-track-label="service_page" to="/" className="signal-link">
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
              {!isPricePage && (
                <Link
                  to={pricesPath}
                  className="inline-flex items-center gap-2 border-b px-1 py-4 text-sm font-medium"
                  style={{ borderColor: "var(--line-strong)" }}
                >
                  Visos kainos
                </Link>
              )}
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
            <div className="min-w-0 md:col-span-8">
              {s.p?.map((para) => (
                <p key={para} className="copy mb-4 last:mb-0">
                  <Rich>{para}</Rich>
                </p>
              ))}
              {s.prices && <PriceTable />}
              {s.list && <BulletList items={s.list} className={s.p ? "mt-5" : ""} />}
              {s.sub?.map((sub, i) => (
                <div key={sub.h} className={i === 0 && !s.p && !s.list ? "" : "mt-8"}>
                  <h3 className="text-xl font-semibold tracking-display">{sub.h}</h3>
                  {sub.p.map((para) => (
                    <p key={para} className="copy mt-3">
                      <Rich>{para}</Rich>
                    </p>
                  ))}
                </div>
              ))}
              {s.table && <Table {...s.table} className={s.p ? "mt-6" : ""} />}
              {s.after?.map((para) => (
                <p key={para} className="copy mt-5">
                  <Rich>{para}</Rich>
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
            {page.faqTitle || "Dažni klausimai"}
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

/** A plain bordered table. Scrolls inside itself on a narrow phone. */
function Table({ head, rows, className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--line-strong)" }}>
            {head.map((h, i) => (
              <th key={h || i} scope="col" className="label py-3 pr-4 align-bottom font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b" style={{ borderColor: "var(--line)" }}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="py-4 pr-4 align-top text-base font-semibold">
                    <Rich>{cell}</Rich>
                  </th>
                ) : (
                  <td key={i} className="copy-sm py-4 pr-4 align-top">
                    <Rich>{cell}</Rich>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The build prices by type, read from PACKAGES and the same i18n keys the
 * home page cards use, so the two can never disagree.
 */
function PriceTable() {
  const { t } = useTranslation();
  const pkg = (id) => PACKAGES.find((p) => p.id === id);
  const eur = (n) => `nuo ${n.toLocaleString("lt-LT").replace(/\s/g, " ")} €`;
  const rows = [
    [t("pkg_onepage_title"), eur(pkg("onepage").price), t("pkg_onepage_time"), t("pkg_onepage_for")],
    [t("pkg_business_title"), eur(pkg("business").price), t("pkg_business_time"), t("pkg_business_for")],
    [
      "[El. parduotuvė](/elektroniniu-parduotuviu-kurimas)",
      eur(pkg("custom").price),
      t("pkg_custom_time"),
      "Prekės, krepšelis, apmokėjimas ir pristatymas.",
    ],
    [
      "[Individuali sistema](/individualus-programavimas)",
      eur(pkg("custom").price),
      t("pkg_custom_time"),
      "Rezervacijos, registracijos, klientų paskyros, integracijos.",
    ],
  ];
  return (
    <>
      <Table head={["Tipas", "Kaina", "Terminas", "Kam tinka"]} rows={rows} />
      <p className="copy-sm mt-5">{t("rate_note")}</p>
    </>
  );
}
