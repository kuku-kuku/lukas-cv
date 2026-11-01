import { index, prefix, route } from "@react-router/dev/routes";

/**
 * Route table.
 *
 * Locale lives in the path: / is Lithuanian, /en is English. Both are listed
 * in react-router.config.js under `prerender`, so each is written to disk as
 * real HTML at build time.
 *
 * Adding case study pages means adding one line to each locale block and one
 * route module - the shape is already here:
 *
 *   route("darbai/:slug", "routes/case-study.jsx")        // inside the lt block
 *   route("work/:slug",   "routes/case-study.jsx", {      // inside prefix("en")
 *     id: "en-case-study",
 *   })
 *
 * and, because the slugs are known at build time, listing them in `prerender`
 * (or returning them from a prerender function) makes them static too. No
 * restructuring required.
 */
export default [
  // ---- lt (default locale, no prefix) ----
  index("routes/home.jsx"),

  // ---- en ----
  ...prefix("en", [index("routes/home.en.jsx")]),

  route("privatumas", "routes/privacy.jsx"),

  // ---- the demo sandbox: client-side only, not indexed ----
  route("demo", "routes/demo.jsx"),
  route("demo/admin", "routes/demo.admin.jsx"),
  route("demo/cart", "routes/demo.cart.jsx"),
  route("demo/admin-panel", "routes/demo.admin-panel.jsx"),

  // ---- 404 ----
  route("*", "routes/not-found.jsx"),
];
