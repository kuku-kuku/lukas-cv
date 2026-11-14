import React from "react";
import { Link } from "react-router";
import Footer from "./sections/Footer";
import { PRACTICE } from "../design/content";
import { SERVICE_PAGES } from "../design/pages";

/**
 * The frame for every page that is not the home page.
 *
 * The home page navigates by sections, so its command rail is a scroll
 * instrument and makes no sense here. These pages get a slim top bar in the
 * same chrome instead: the mark (home), the services as real links, and the
 * one call to action. The rail offset is zeroed so .shell sits centred.
 *
 * Every link here is an <a href>, not a button with scrollIntoView - this is
 * the internal linking a crawler follows from one service to the next.
 */
export default function PageShell({ children, current }) {
  return (
    <div className="relative min-h-screen" style={{ "--rail": "0px" }}>
      <a
        href="#turinys"
        className="sr-only-focusable fixed left-4 top-4 z-[90] bg-ground px-4 py-2 text-sm"
      >
        Pereiti prie turinio
      </a>

      <header
        className="chrome chrome-line sticky top-0 z-50 border-b"
        style={{ backdropFilter: "none" }}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" aria-label={`${PRACTICE.mark} - pradžia`}>
            <img
              src="/logo-mark.webp"
              alt=""
              width="30"
              height="30"
              className="h-[30px] w-[30px] rounded-[3px]"
            />
            <span className="text-base font-extrabold tracking-tightest">{PRACTICE.mark}</span>
          </Link>

          <nav aria-label="Paslaugos" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {SERVICE_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${p.slug}`}
                    aria-current={current === p.slug ? "page" : undefined}
                    className="signal-link text-sm font-medium"
                    style={current === p.slug ? { color: "var(--signal)" } : undefined}
                  >
                    {p.nav}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/darbai"
                  aria-current={current === "darbai" ? "page" : undefined}
                  className="signal-link text-sm font-medium"
                  style={current === "darbai" ? { color: "var(--signal)" } : undefined}
                >
                  Darbai
                </Link>
              </li>
            </ul>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-semibold"
            style={{ borderColor: "var(--signal)" }}
          >
            Gauti pasiūlymą
            <span aria-hidden="true" className="font-mono text-xs">→</span>
          </a>
        </div>
      </header>

      <main id="turinys">{children}</main>

      <Footer />
    </div>
  );
}

/** A square signal bullet list, the same mark the privacy page uses. */
export function BulletList({ items, className = "" }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="copy flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.6em] h-1.5 w-1.5 shrink-0"
            style={{ background: "var(--signal)" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * FAQ as native <details>. The answers are in the HTML whether or not a
 * question is open, which is what lets the FAQPage data on the same page
 * be honest: Google is shown exactly the text a visitor can read.
 */
export function FaqList({ items }) {
  return (
    <div>
      <div className="h-px w-full" style={{ background: "var(--line-strong)" }} />
      {items.map(({ q, a }) => (
        <details key={q} className="group border-b" style={{ borderColor: "var(--line)" }}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-semibold tracking-display md:text-xl">{q}</h3>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 font-mono text-lg leading-none transition-transform duration-[250ms] ease-expo group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="copy pb-6">{a}</p>
        </details>
      ))}
    </div>
  );
}
