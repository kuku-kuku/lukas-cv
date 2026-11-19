import React from "react";
import Home from "../pages/Home";
import i18n from "../i18n";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { homeFaq } from "../design/homeFaq";
import { faqJsonLd, webPageJsonLd } from "../design/schema";

const TITLE = "Internetinių svetainių kūrimas verslui nuo 490 € | Beneta";
const DESCRIPTION =
  "Svetainių ir el. parduotuvių kūrimas verslui: fiksuota kaina nuo 490 €, progresas kas savaitę ir tiesioginis darbas su programuotoju. Nemokama konsultacija.";

/*
 * WebSite, the business and its founder are emitted site-wide from root.jsx;
 * this page adds its own WebPage node and the FAQPage built from the same
 * items the visible FAQ renders.
 */
export const meta = () => [
  ...buildMeta({
    locale: "lt",
    // Matches the H1 word for word; the price is the one fact a searcher
    // scans the results for, and every competitor on page one shows it.
    title: TITLE,
    description: DESCRIPTION,
  }),
  webPageJsonLd({ name: TITLE, description: DESCRIPTION }),
  faqJsonLd(homeFaq(i18n.getFixedT("lt"), "lt")),
];

export default function LtHome() {
  useLocale("lt");
  return <Home />;
}
