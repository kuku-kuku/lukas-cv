/**
 * CRA ignored this file and wired Tailwind up itself. Vite does not, so the
 * plugins are declared here properly.
 *
 * @tailwindcss/postcss is the Tailwind v4 plugin and this project is on
 * Tailwind 3.4 with a v3 config and v3 directives - under CRA that mismatch
 * was invisible because the file was never read. Using the v3 plugin.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
