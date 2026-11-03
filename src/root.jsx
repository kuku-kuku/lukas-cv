import React from "react";
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
import { CHANNELS } from "./design/content";
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
  // The brand mark, in every size something asks for it. favicon.ico holds
  // 16, 32 and 48 for the tab and for Google, which reads the 48 for the
  // icon beside a search result and ignores anything under it. The explicit
  // PNGs are what modern browsers take when both are offered; the .ico stays
  // for the clients that only ever look at /favicon.ico.
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
  // 180 is what iOS wants; anything else it rescales badly.
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/manifest.json" },
  // The two display faces, started in parallel with the stylesheet.
  // Lithuanian needs latin-ext, so both subsets are preloaded.
  {
    rel: "preload",
    as: "font",
    type: "font/woff2",
    href: "/fonts/archivo-latin.woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "font",
    type: "font/woff2",
    href: "/fonts/archivo-latin-ext.woff2",
    crossOrigin: "anonymous",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Beneta - Lukas Beneta",
  url: "https://www.beneta.lt",
  image: "https://www.beneta.lt/og.png",
  // The mark, declared as the organisation's logo. This is the field Google
  // reads for the knowledge panel and the logo beside a result; the square
  // 512 is the one it asks for, not the 1200x630 share card above.
  logo: {
    "@type": "ImageObject",
    url: "https://www.beneta.lt/logo512.png",
    width: 512,
    height: 512,
  },
  // Same mark, same name, on every profile that links back here - that is
  // how a search engine ties the accounts to the site.
  sameAs: [CHANNELS.linkedin, CHANNELS.facebook, CHANNELS.instagram],
  description:
    "Independent software engineering practice: web applications, backend systems, API integrations, automation and performance work.",
  // A remote practice serves an area, not an address. No street address is
  // published; Google treats this as a service-area business.
  areaServed: ["LT", "EU"],
  availableLanguage: ["lt", "en"],
  priceRange: "20-300 EUR",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
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
        <meta name="theme-color" content="#111113" />
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

  // No Google Analytics here, deliberately. gtag sets cookies and ships
  // data to Google, which under the GDPR needs a consent banner before it
  // may load - and a banner is a worse trade than the numbers are worth for
  // a site this size. counter.dev, in the Layout above, counts visits
  // without cookies and without identifying anyone, so the privacy policy
  // can say "no tracking cookies" and have it be true.

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
