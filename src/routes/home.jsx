import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { faqJsonLd } from "../design/seo";

export const meta = () => [
  ...buildMeta({
    locale: "lt",
    // "svetainių kūrimas verslui" is the query this page owns; the price in
    // the title is what every competitor on page one shows, and the one
    // fact a searcher is scanning for.
    title: "Svetainių kūrimas verslui nuo 490 € | Beneta",
    description:
      "Internetinių svetainių kūrimas verslui: nuo 490 €, per 1-2 savaites. Fiksuota kaina iš anksto, progresas kas savaitę, pirma konsultacija nemokama.",
  }),
  faqJsonLd("lt"),
];

export default function LtHome() {
  useLocale("lt");
  return <Home />;
}
