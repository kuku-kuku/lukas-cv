# beneta.lt

Single-page site for an independent software engineering practice (Klaipėda, LT).
Create React App + React 18 + Tailwind + Framer Motion + i18next (LT/EN).

## Scripts

| command | what it does |
| --- | --- |
| `npm start` | dev server on http://localhost:3000 |
| `npm run build` | production build into `build/` |
| `npm test` | CRA test runner |

Vercel sets `CI=true`, which makes CRA treat ESLint warnings as errors - keep the
build warning-free.

## Routes

`/` is the whole site (one page, seven sections). `/demo`, `/demo/admin`,
`/demo/cart` and `/demo/admin-panel` are the e-commerce demo and are code-split;
anything else renders the 404 page.

## Design system

The art direction is "instrument": near-black ground, bone ink, hairline rules
and exactly one signal colour (`#FF4A1C`), with Archivo for display and
JetBrains Mono for technical labels.

- `src/styles.css` - tokens (`:root`), base layer, the `.label` / `.display-*` /
  `.shell` / `.mask-line` component classes, and the global reduced-motion
  switch. Colour, spacing and motion values live here first.
- `tailwind.config.js` - the same palette and type stack exposed as utilities.
- `src/design/motion.js` - duration, easing, stagger and variant tokens. Any new
  animation should compose these rather than invent its own timing.
- `src/design/useMotionPrefs.js` - `useReducedMotion`, `useFinePointer`,
  `useCompactViewport`, `useMediaFlag`. Effects are scaled down by these rather
  than switched off wholesale.
- `src/design/content.js` - page structure: sections, capabilities, the method
  graph, projects, stack groups, process steps and the rate card. Only
  identifiers and facts; every string is an i18n key.
- `src/i18n.js` - all LT/EN copy, and the `<html lang>` sync.

### Editing the content

Adding a capability, project or process step means adding an entry in
`src/design/content.js` plus its keys in both language blocks of `src/i18n.js`.
Nothing else needs to change - the rail, the section indices and the
cross-links between capabilities and work derive from that data.

Project entries deliberately carry no marketing metrics: scope, role, stack and
status only.

### Motion rules

1. Entrances travel upward on an expo-out curve; nothing bounces or spins.
2. Anything that loops is reporting live state (the clock, the availability
   dot, packets in the diagram) - otherwise it runs once.
3. Every scroll-linked or rAF loop stops when its element leaves the viewport
   or the tab is hidden (`LatticeField`, `SystemDiagram`, `LiveClock`).
4. `prefers-reduced-motion` removes choreography, never content or structure.

## Images

Screenshots are WebP with a JPEG fallback and a small `-sm.webp` variant for
the hover preview, inside fixed-ratio boxes so they cannot shift layout.
Regenerate with ffmpeg:

```bash
ffmpeg -i source.png -vf "scale='min(1400,iw)':-2:flags=lanczos" -quality 80 public/name.webp
```

## Environment

`REACT_APP_EMAILJS_SERVICE_ID`, `REACT_APP_EMAILJS_TEMPLATE_ID` and
`REACT_APP_EMAILJS_PUBLIC_KEY` drive the contact form. The form posts the
fields `name`, `email` and `message` - the EmailJS template depends on those
names, so do not rename them.
