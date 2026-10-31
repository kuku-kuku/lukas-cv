import React from "react";
import AdminPanel from "../pages/AdminPanel";
import { buildMeta } from "../design/seo";

/** Client-side sandbox: no content to index, so it is kept out of search. */
export const meta = () =>
  buildMeta({
    locale: "lt",
    title: "Demo - Beneta",
    description: "Demonstracinė parduotuvės sąsaja.",
    path: "demo/admin-panel",
    noIndex: true,
  });

export default function Route() {
  return <AdminPanel />;
}
