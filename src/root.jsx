import React, { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "react-router";
import "./styles.css";
import "./i18n";
import BackgroundImage from "./components/BackgroundImage";
import { localeFromPath } from "./design/locale";
import { initGA, trackPageview } from "./ga";
import criticalCss from "./critical.css?inline";

/**
 * The document shell.
 *
 * This replaces public/index.html. Everything that used to be hand-written
 * there now lives here, which means it is built per route rather than being
 * one fixed file: <html lang> follows the locale, and <Meta /> emits whatever
 * the matched route's meta() returned.
 */

export const links = () => [
  { rel: "icon", type: "image/jpeg", href: "/logo.jpg" },
  { rel: "apple-touch-icon", href: "/logo192.png" },
  { rel: "manifest", href: "/manifest.json" },
  /*
   * The display faces are deliberately NOT preloaded.
   *
   * Preloading them put ~67 kB in front of the render-blocking stylesheet
   * and pushed first paint out: measured on the live domain, FCP 2.7s with
   * the preloads. font-display: swap means the text paints immediately in
   * the fallback either way, so the preloads bought a slightly earlier
   * swap at the cost of a later first paint. Not a good trade.
   */
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Beneta - Lukas Beneta",
  url: "https://www.beneta.lt",
  image: "https://www.beneta.lt/og.png",
  description:
    "Independent software engineering practice: web applications, backend systems, API integrations, automation and performance work.",
  areaServed: "LT",
  availableLanguage: ["lt", "en"],
  priceRange: "20-300 EUR",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Klaipeda",
    addressCountry: "LT",
  },
  founder: {
    "@type": "Person",
    name: "Lukas Beneta",
    jobTitle: "Software Engineer",
  },
  knowsAbout: [
    "Web application development",
    "REST API development",
    "Node.js",
    "React",
    "Workflow automation",
    "Technical SEO",
    "Web performance",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      ["One-page website", { minPrice: "200" }],
      ["Full website", { minPrice: "300" }],
      ["Backend and API development", { minPrice: "300" }],
      ["Server maintenance", { price: "60", unitText: "MONTH" }],
      ["Website updates and maintenance", { price: "20", unitText: "HOUR" }],
    ].map(([name, price]) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        ...price,
      },
    })),
  },
};

export function Layout({ children }) {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0B" />
        <meta name="color-scheme" content="dark" />
        <meta name="author" content="Lukas Beneta" />
        <Meta />
        <Links />
        {/* Self-hosted faces and the page shell, inline so the first paint
            needs no stylesheet round trip. */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          src="https://cdn.counter.dev/script.js"
          data-id="05e3ca4a-ce8b-4051-b562-0053dab1612c"
          data-utcoffset="3"
          defer
        />
      </body>
    </html>
  );
}

export default function Root() {
  const { pathname } = useLocation();
  const isDemo = pathname.startsWith("/demo");

  // gtag is ~176 kB of third-party JavaScript - larger than this app - and
  // around 570ms of main-thread work. It waits for the first real
  // interaction (or 8s), and page views are queued in src/ga until it is
  // ready. counter.dev already counts visits that never interact.
  useEffect(() => {
    let timer = 0;
    let done = false;
    const EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"];
    const start = () => {
      if (done) return;
      done = true;
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      initGA();
    };
    EVENTS.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    );
    timer = window.setTimeout(start, 8000);
    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      {/* The photographic background belongs to the demo sandbox only. */}
      {isDemo && <BackgroundImage />}
      <Outlet />
    </div>
  );
}

/**
 * Framework-mode error boundary. Without one, a thrown route error renders
 * React Router's default developer screen in production.
 */
export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;

  return (
    <div className="flex min-h-screen flex-col justify-center px-5 md:px-10">
      <span className="label" style={{ color: "var(--signal)" }}>
        HTTP {status}
      </span>
      <h1 className="display-l mt-5">Something broke</h1>
      <p className="lede mt-6 max-w-[48ch]">
        That is on me, not on you. Reload the page, or go back to the start.
      </p>
      <a
        href="/"
        className="mt-10 inline-flex w-fit items-center gap-3 border px-6 py-4 text-sm font-semibold"
        style={{ borderColor: "var(--signal)" }}
      >
        beneta.lt
      </a>
    </div>
  );
}
