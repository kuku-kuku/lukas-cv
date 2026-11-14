import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";

/*
 * No FAQPage markup. Since 2023 Google shows FAQ rich results only for
 * well-known government and health sites, so this site is not eligible.
 * The answers are in the prerendered HTML, which is what matters.
 */
export const meta = () =>
  buildMeta({
    locale: "lt",
    // Matches the H1 word for word; the price is the one fact a searcher
    // scans the results for, and every competitor on page one shows it.
    title: "Internetinių svetainių kūrimas verslui nuo 490 € | Beneta",
    description:
      "Kuriu internetines svetaines, el. parduotuves ir individualias sistemas verslui. Fiksuota kaina, progresas kas savaitę, tiesioginis bendravimas. Nuo 490 €.",
  });

export default function LtHome() {
  useLocale("lt");
  return <Home />;
}
