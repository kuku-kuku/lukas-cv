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
6. Only `transform` and `opacity` are animated. No width, height, top or
   filter in a loop. (`height: auto` on the work panel is the one exception,
   and it is a one-shot on a collapsed element.)
7. `will-change` is never set permanently. A CSS transform animation already
   gets its own layer.
8. Anything driven by a rAF loop stops when its element leaves the viewport
   (IntersectionObserver) and when the tab is hidden (`visibilitychange`).

## Inventory

| What | Trigger | Motion | Duration / easing | Reduced motion |
| --- | --- | --- | --- | --- |
| Masthead | — | no entrance. The page is prerendered, so the hero is already painted in the first frame; animating it in would mean hiding content that has arrived | — | — |
| Masthead parallax | scroll | y 0 → −60px, opacity 1 → 0 between 50% and 100% of the fold | scroll-linked | transform not applied |
| Lattice field | idle callback after first paint | canvas: pointer displacement, scan band, packets | continuous rAF | one static frame, no loop |
| Section head | in view | index + eyebrow fade-rise, rule draws left→right, title words rise through masks | DUR.base / DUR.reveal, EASE | no travel |
| Capability rows | in view | fade + 14px rise, staggered | DUR.base, STAGGER | no travel |
| Capability marker | selection | `layoutId` spring between rows | spring 420/36 | instant |
| Diagram nodes | selection / focus | fill + stroke colour | 0.32s, EASE | unchanged (colour only) |
| Diagram packets | section in view | dots ride the active edges via `getPointAtLength` | continuous rAF | not rendered |
| Work rows | in view | fade + 16px rise, staggered | DUR.base, STAGGER | no travel |
| Work row hover | pointer | number → signal, title +8px, rule scaleX 0→1 | 250ms, ease-expo | hover effects unaffected; preview disabled |
| Work preview | pointer over a row | fixed plate follows the cursor, spring 150/20, cross-fade by project | 0.2s in, DUR.fast out | not rendered |
| Work panel | toggle | height 0 → auto, children fade + 8px rise, staggered | DUR.base, STAGGER | height only, no child travel |
| Stack groups / items | in view | fade + rise, then items fade + 6px from the left | DUR.base / DUR.fast | no travel |
| Process strip rule | scroll through the section | scaleX bound to scroll progress, full while the last step shows | scroll-linked spring | drawn full |
| Process steps | in view | fade + 18px rise, staggered by column | DUR.base, STAGGER | no travel |
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
