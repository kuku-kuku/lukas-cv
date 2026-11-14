import { SERVICE_PAGES } from "./src/design/pages.js";

/** @type {import('@react-router/dev/config').Config} */
export default {
  /**
   * No server. The output is static files, exactly as before - the only
   * change is that the content routes arrive as real HTML instead of an
   * empty div that JavaScript has to fill in.
   */
  ssr: false,

  /**
   * Routes rendered to HTML at build time. The demo area is a client-side
   * sandbox with localStorage state and nothing to index, so it stays a SPA
   * and is served through the rewrite in vercel.json.
   *
   * "/404" matches the catch-all route; scripts/finish-build.mjs moves its
   * HTML to build/client/404.html, which Vercel serves - with a real 404
   * status - for any path that has no file. It is not a page of its own and
   * never reaches the sitemap.
   */
  prerender: [
    "/",
    "/en",
    ...SERVICE_PAGES.map((p) => `/${p.slug}`),
    "/darbai",
    "/privatumas",
    "/404",
  ],

  /** Keeps the app where it already lives rather than moving it to app/. */
  appDirectory: "src",
};
