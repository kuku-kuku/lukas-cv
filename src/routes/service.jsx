import React from "react";
import { useLocation } from "react-router";
import ServiceLayout from "../components/ServiceLayout";
import { servicePage } from "../design/pages";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd } from "../design/schema";

/**
 * One module for every service page. Each is registered in routes.js under
 * its own path and id; the page is picked by the path, and everything it
 * says comes from src/design/pages.js. The layout is shared with the price
 * page (components/ServiceLayout.jsx).
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
    webPageJsonLd({ path: page.slug, name: page.title, description: page.description }),
    serviceJsonLd(page),
    breadcrumbJsonLd(page.nav, page.slug),
    faqJsonLd(page.faq, { path: page.slug }),
  ];
};

export default function ServiceRoute() {
  useLocale("lt");
  const { pathname } = useLocation();
  const page = servicePage(slugOf(pathname));
  if (!page) return null;
  return <ServiceLayout page={page} />;
}
