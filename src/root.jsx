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
import { CARE, CHANNELS, HOURLY, PACKAGES } from "./design/content";
import { ORG_ID, SITE } from "./design/seo";
import ConsentBanner from "./components/ConsentBanner";
import { CONSENT_BOOT } from "./design/analytics";
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

/*
 * One business node for the whole site, with a stable @id that the service
 * pages point at as their provider. Prices are read from content.js - this
 * block used to hard-code the old 200 / 300 / 60 / 20 EUR list, so Google
 * was told one set of prices while the page showed another.
 */
const offer = (name, spec) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Service", name },
  priceSpecification: {
    "@type": spec.unitCode ? "UnitPriceSpecification" : "PriceSpecification",
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
    ...spec,
  },
});

const pkgPrice = (id) => String(PACKAGES.find((p) => p.id === id).price);

const BUSINESS = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "Beneta",
  alternateName: "Beneta - Lukas Beneta",
  url: `${SITE}/`,
  image: `${SITE}/og.png`,
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
    "Internetinių svetainių, el. parduotuvių ir verslo sistemų kūrimas, atnaujinimas ir priežiūra Lietuvos verslui. Fiksuota kaina iš anksto, darbas nuotoliniu būdu.",
  email: CHANNELS.email,
  // A remote practice serves an area, not an address. No street address is
  // published; Google treats this as a service-area business.
  areaServed: { "@type": "Country", name: "Lietuva" },
  availableLanguage: ["lt", "en"],
  priceRange: `${HOURLY}-${pkgPrice("custom")}+ EUR`,
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
    "Svetainių kūrimas",
    "Elektroninių parduotuvių kūrimas",
    "WordPress",
    "WooCommerce",
    "React",
    "Node.js",
    "Verslo procesų automatizavimas",
    "Techninis SEO",
    "Svetainių greitis",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paslaugos ir kainos",
    itemListElement: [
      offer("Vieno puslapio svetainė", { minPrice: pkgPrice("onepage") }),
      offer("Verslo svetainė", { minPrice: pkgPrice("business") }),
      offer("El. parduotuvė arba individualus sprendimas", { minPrice: pkgPrice("custom") }),
      ...CARE.map((c) =>
        offer(`Svetainės priežiūra: ${c.id === "calm" ? "Ramybė" : "Augimas"}`, {
          price: String(c.price),
          unitCode: "MON",
        })
      ),
      offer("Vienkartiniai darbai", { price: String(HOURLY), unitCode: "HUR" }),
    ],
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    BUSINESS,
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Beneta",
      inLanguage: ["lt", "en"],
      publisher: { "@id": ORG_ID },
    },
  ],
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
        {/* Consent Mode v2 defaults: everything denied until the visitor
            says yes. Must run before gtag.js - see design/analytics.js. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOT }} />
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

  // Google Analytics loads only after consent (ConsentBanner +
  // design/analytics.js). counter.dev, in the Layout above, keeps counting
  // visits without cookies for everyone, including people who say no.

  return (
    <div className="relative min-h-screen">
      {/* The photographic background belongs to the demo sandbox only. */}
      {isDemo && <BackgroundImage />}
      <Outlet />
      {!isDemo && <ConsentBanner />}
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
