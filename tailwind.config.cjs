/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Instrument palette - monochrome ink on near-black, one signal colour.
        // Bound to the CSS tokens rather than fixed hexes, so the inverted
        // spread (.invert-section) re-tones every `text-ink-*` utility along
        // with everything else instead of staying light-on-light.
        // No opacity modifiers are used with these.
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          4: "var(--ink-4)",
        },
        base: {
          DEFAULT: "#0A0A0B",
          elev: "#101012",
          sunk: "#060607",
        },
        bone: "#F1EFEA",
        signal: {
          DEFAULT: "#FF4A1C",
          dim: "#C23814",
        },
      },
      fontFamily: {
        // Poppins kept as an alias so legacy `font-poppins` usages stay valid.
        poppins: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['Archivo', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: "-0.045em",
        display: "-0.03em",
        label: "0.12em",
      },
      fontSize: {
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        grid: "96rem",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        inout: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        "rule-draw": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "signal-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        ticker: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        "signal-pulse": "signal-pulse 2.4s cubic-bezier(0.76, 0, 0.24, 1) infinite",
        ticker: "ticker 44s linear infinite",
      },
    },
  },
  plugins: [],
};
