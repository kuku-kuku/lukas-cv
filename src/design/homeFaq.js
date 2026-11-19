import { FAQ } from "./content.js";

/**
 * The home page FAQ as { id, q, a } in one language. The visible accordion
 * (components/sections/Faq.jsx) and the FAQPage JSON-LD (routes/home*.jsx)
 * both read this, so they cannot drift apart.
 *
 * On Lithuanian the price answer ends with a link to the price page; the
 * link markup is rendered by <Rich> and stripped in the JSON-LD.
 */
export function homeFaq(t, lng) {
  return FAQ.map((f) => ({
    id: f.id,
    q: t(f.qKey),
    a: f.id === "price" && lng === "lt" ? `${t(f.aKey)} ${t("faq_price_more")}` : t(f.aKey),
  }));
}
