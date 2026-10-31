import React from "react";
import NotFound from "../pages/NotFound";
import { useLocale } from "../design/locale";
import { localeFromPath } from "../design/locale";
import { buildMeta } from "../design/seo";
import { useLocation } from "react-router";

export const meta = () =>
  buildMeta({
    locale: "lt",
    title: "Puslapis nerastas - Beneta",
    description: "Tokio puslapio nėra.",
    noIndex: true,
  });

export default function NotFoundRoute() {
  const { pathname } = useLocation();
  useLocale(localeFromPath(pathname));
  return <NotFound />;
}
