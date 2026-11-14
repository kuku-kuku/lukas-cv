import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";

/* No FAQPage markup - see routes/home.jsx. */
export const meta = () =>
  buildMeta({
    locale: "en",
    title: "Website development for business from EUR 490 | Beneta",
    description:
      "I build websites, online shops and custom systems for businesses. A fixed price, progress every week and direct contact with the developer. From EUR 490.",
  });

export default function EnHome() {
  useLocale("en");
  return <Home />;
}
