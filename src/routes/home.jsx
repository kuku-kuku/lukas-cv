import React from "react";
import Home from "../pages/Home";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";

export const meta = () =>
  buildMeta({
    locale: "lt",
    title: "Beneta - programinės įrangos inžinerijos praktika",
    description:
      "Nepriklausoma inžinerijos praktika Klaipėdoje. Interneto programos, serverių sistemos, API integracijos, automatizavimas ir greičio optimizavimas.",
  });

export default function LtHome() {
  useLocale("lt");
  return <Home />;
}
