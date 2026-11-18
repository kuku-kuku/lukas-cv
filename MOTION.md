# Motion spec

Every animation on beneta.lt is described here. If something moves and is not
in this file, it is a bug — either the motion is undocumented or it should not
exist.

Tokens live in `src/design/motion.js` (JS) and `src/styles.css` (`--dur-*`,
`--ease`). The two must agree.

```
EASE         [0.22, 1, 0.36, 1]    expo-out, the house curve
EASE_IN_OUT  [0.65, 0, 0.35, 1]    things that leave and come back
DUR.fast     0.18s                 exits, micro-feedback
DUR.base     0.3s                  the default
DUR.slow     0.6s                  entrances with distance to travel
DUR.reveal   0.8s                  masked type, drawn rules
STAGGER      0.06s                 one step; a list must stay under DUR.reveal
VIEWPORT     { once: true, amount: 0.2 }
```

## Rules

1. Things enter from below, along the reading direction. Nothing bounces,
   spins or overshoots.
2. Anything that loops is reporting live state — the clock, the availability
   dot, packets moving along the diagram's active edges. Everything else runs
   once and stops.
3. Nothing rests below `opacity: 1`. A finished reveal is invisible as an
   effect; the content just looks normal.
4. Every reveal finishes within `DUR.reveal` of entering the viewport.
5. Exits run at roughly 60–70% of the matching entrance.
6. Only `transform`, `opacity` and `clip-path` are animated (plus the hero
   decode's discrete colour step, which never interpolates). No width, height, top or
   filter in a loop. (`height: auto` on the work panel is the one exception,
   and it is a one-shot on a collapsed element.)
7. `will-change` is never set permanently. A CSS transform animation already
   gets its own layer.
8. Anything driven by a rAF loop stops when its element leaves the viewport
   (IntersectionObserver) and when the tab is hidden (`visibilitychange`).

## The reveal

There is one scroll entrance on the site: `Reveal` (`src/components/motion/Reveal.jsx`,
state in `src/design/reveal.js`, CSS under `[data-reveal]` in `src/styles.css`).
A clip-path wipe from the top edge down plus a 14px lift, 900ms, once.

- One shared IntersectionObserver. State is a `data-reveal` attribute written
  on the DOM node, never React state, so prerendered HTML carries no motion
  styles and hydration re-renders nothing.
- An element is judged from its first observer report (after layout and
  scroll restoration). On screen then: left alone for good. Off screen:
  `armed` (hidden) until it scrolls in, then `shown`, then the attribute is
  removed when the clip-path transition ends.
- Use it on the unit that arrives together (a header, a card, a list item),
  never on lines inside it. No text is split anywhere on the site.
- Why, FAQ, pricing, method and the service/work pages use the same
  component; there is no per-section variant.

## Inventory

| What | Trigger | Motion | Duration / easing | Reduced motion |
| --- | --- | --- | --- | --- |
| Masthead decode (signature) | first paint, CSS only | each letter of the statement flicks through three mono code glyphs (CSS `::after` from data attributes, never in the text) and lands on the real letter, left to right, once | 240ms per letter, 16ms wave, done in ~0.75s | overlay removed, text static |
| Masthead parallax | scroll | y 0 → −60px, opacity 1 → 0 between 50% and 100% of the fold | scroll-linked | transform not applied |
| Lattice field | idle callback after first paint | canvas: pointer displacement, scan band, packets | continuous rAF | one static frame, no loop |
| Section head | in view, once | ONE reveal for the whole header (wipe + 14px lift); the number rolls one full turn into place like an odometer (CSS `::after` digit column) | 900ms `--ease`; odometer 700ms, 90ms per digit | static |
| Capability rows | in view, once | shared reveal, staggered | 900ms, 70ms step, capped at 280ms | static |
| Capability marker | selection | `layoutId` spring between rows | spring 420/36 | instant |
| Diagram nodes | selection / focus | fill + stroke colour | 0.32s, EASE | unchanged (colour only) |
| Diagram packets | section in view | dots ride the active edges via `getPointAtLength` | continuous rAF | not rendered |
| Work rows | in view, once | shared reveal, staggered | 900ms, 70ms step | static |
| Work row hover | pointer | number → signal, title +8px, rule scaleX 0→1 | 250ms, ease-expo | hover effects unaffected; preview disabled |
| Work preview | pointer over a row | fixed plate follows the cursor, spring 150/20, cross-fade by project | 0.2s in, DUR.fast out | not rendered |
| Work panel | toggle | height 0 → auto, children fade + 8px rise, staggered | DUR.base, STAGGER | height only, no child travel |
| Stack groups | in view, once | shared reveal per group (items arrive with their group) | 900ms, 70ms step | static |
| Process strip rule | scroll through the section | scaleX bound to scroll progress, full while the last step shows | scroll-linked spring | drawn full |
| Process steps | in view, once | shared reveal, staggered by column | 900ms, 70ms step | static |
| Contact field focus | focus | underline scaleX 0→1 in the signal colour | 300ms, ease-expo | unchanged |
| Contact submit | submit | spinner rotates; form cross-fades to a confirmation | 1.2s linear loop / DUR.base | no spin |
| Rail marker | active section change | `layoutId` spring | spring 420/34 | instant |
| Rail progress | scroll | scaleY bound to page progress | scroll-linked spring | unchanged |
| Chrome theme | light section at viewport centre | background / ink / line cross-fade | `--dur-s`, `--ease` | unchanged |
| Persistent CTA | scrolled past the fold | fade + 8px | DUR.base | no travel |
| Footer ticker | always | CSS translate, 44s linear loop | linear | stopped |
| Route change | navigation | opacity cross-fade | DUR.base | unchanged (opacity only) |

## prefers-reduced-motion

A global rule in `src/styles.css` cuts every CSS animation and transition to
0.01ms. Components additionally check `useReducedMotion()` and swap variants
rather than markup, so the DOM — and therefore the content and the layout —
is identical either way.

Specifically disabled, not merely shortened: the boot curtain, the lattice
canvas loop (one static frame instead), the diagram packets, the
cursor-following preview, the magnetic button, and the footer ticker.

Nothing is reachable only through motion, and no information is carried by
animation alone.
