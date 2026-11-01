/** @type {import('@react-router/dev/config').Config} */
export default {
  /**
   * No server. The output is static files, exactly as before - the only
   * change is that the two content routes now arrive as real HTML instead of
   * an empty div that JavaScript has to fill in.
   */
  ssr: false,

  /**
   * Routes rendered to HTML at build time. The demo area is a client-side
   * sandbox with localStorage state and nothing to index, so it stays a SPA
   * and is served through the rewrite in vercel.json.
   *
   * Case study pages will be added here as /darbai/:slug - see src/routes.js.
   */
  prerender: ["/", "/en", "/privatumas"],

  /** Keeps the app where it already lives rather than moving it to app/. */
  appDirectory: "src",
};
