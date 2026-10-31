import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";

export const meta = () =>
  buildMeta({
    locale: "en",
    title: "Beneta - Software Engineering Practice",
    description:
      "An independent engineering practice in Klaipeda, Lithuania. Web applications, backend systems, API integrations, automation and performance work.",
  });

export default function EnHome() {
  useLocale("en");
  return <Home />;
}
