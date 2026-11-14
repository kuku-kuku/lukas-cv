import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { faqJsonLd } from "../design/seo";

export const meta = () => [
  ...buildMeta({
    locale: "en",
    title: "Website development for business from EUR 490 | Beneta",
    description:
      "Website development for businesses: from EUR 490, ready in 1-2 weeks. A fixed price agreed up front, progress every week, a free first conversation.",
  }),
  faqJsonLd("en"),
];

export default function EnHome() {
  useLocale("en");
  return <Home />;
}
