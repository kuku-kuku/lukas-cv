import React from "react";
import Home from "../pages/Home";
import i18n from "../i18n";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { homeFaq } from "../design/homeFaq";
import { faqJsonLd, webPageJsonLd } from "../design/schema";

const TITLE = "Website development for business from EUR 490 | Beneta";
const DESCRIPTION =
  "I build websites, online shops and custom systems for businesses. A fixed price, progress every week and direct contact with the developer. From EUR 490.";

/* Same business entity as / (by @id, from root.jsx); an English WebPage. */
export const meta = () => [
  ...buildMeta({ locale: "en", title: TITLE, description: DESCRIPTION }),
  webPageJsonLd({ locale: "en", name: TITLE, description: DESCRIPTION }),
  faqJsonLd(homeFaq(i18n.getFixedT("en"), "en"), { locale: "en" }),
];

export default function EnHome() {
  useLocale("en");
  return <Home />;
}
