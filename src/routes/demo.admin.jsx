import React from "react";
import AdminLogin from "../pages/AdminLogin";
import { buildMeta } from "../design/seo";

/** Client-side sandbox: no content to index, so it is kept out of search. */
export const meta = () =>
  buildMeta({
    locale: "lt",
    title: "Demo - Beneta",
    description: "Demonstracinė parduotuvės sąsaja.",
    path: "demo/admin",
    noIndex: true,
  });

export default function Route() {
  return <AdminLogin />;
}
