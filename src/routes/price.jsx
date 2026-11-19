import React from "react";
import ServiceLayout from "../components/ServiceLayout";
import { PRICE_PAGE } from "../design/pages";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { breadcrumbJsonLd, CATALOG_ID, faqJsonLd, webPageJsonLd } from "../design/schema";

/**
 * /svetainiu-kurimo-kaina - the price page. Same layout as the service
 * pages; content in PRICE_PAGE (design/pages.js). Its structured data points
 * at the one OfferCatalog defined in design/schema.js instead of repeating
 * the prices.
 */
export const meta = () => [
  ...buildMeta({
    locale: "lt",
    title: PRICE_PAGE.title,
    description: PRICE_PAGE.description,
    path: PRICE_PAGE.slug,
    translated: false,
  }),
  webPageJsonLd({
    path: PRICE_PAGE.slug,
    name: PRICE_PAGE.title,
    description: PRICE_PAGE.description,
    extra: { mainEntity: { "@id": CATALOG_ID } },
  }),
  breadcrumbJsonLd(PRICE_PAGE.nav, PRICE_PAGE.slug),
  faqJsonLd(PRICE_PAGE.faq, { path: PRICE_PAGE.slug }),
];

export default function PriceRoute() {
  useLocale("lt");
  return <ServiceLayout page={PRICE_PAGE} />;
}
