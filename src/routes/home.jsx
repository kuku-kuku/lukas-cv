import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { faqJsonLd } from "../design/seo";

export const meta = () => [
  ...buildMeta({
    locale: "lt",
    title: "Svetainių kūrimas verslui | Beneta",
    description:
      "Kuriu svetaines smulkiam verslui: nuo 490 EUR, per 1-2 savaites. Greita, aiški svetainė, kurią randa Google. Visą darbą atlieku nuotoliniu būdu.",
  }),
  faqJsonLd("lt"),
];

export default function LtHome() {
  useLocale("lt");
  return <Home />;
}
