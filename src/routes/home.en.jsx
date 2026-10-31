import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { faqJsonLd } from "../design/seo";

export const meta = () => [
  ...buildMeta({
    locale: "en",
    title: "Websites for small business | Beneta",
    description:
      "Websites for small businesses, from EUR 490 and ready in 1-2 weeks. Fast, clear, and findable on Google. Working remotely across Lithuania and the EU.",
  }),
  faqJsonLd("en"),
];

export default function EnHome() {
  useLocale("en");
  return <Home />;
}
