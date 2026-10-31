import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],

  /**
   * The EmailJS keys are already configured in Vercel as REACT_APP_*, so the
   * prefix is kept rather than renaming three environment variables in a
   * dashboard and risking a silently broken contact form.
   */
  envPrefix: ["VITE_", "REACT_APP_"],

  // Output location is owned by react-router.config.js (buildDirectory),
  // which emits the static site into build/client.

  test: {
    // The content/i18n integrity tests are plain modules - no DOM needed.
    globals: true,
    environment: "node",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
