import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { METHOD_EDGES, METHOD_NODES } from "../design/content";
import { DUR, EASE } from "../design/motion";
import { useMediaFlag, useReducedMotion } from "../design/useMotionPrefs";

/**
 * SYSTEM DIAGRAM - an explorable model of how work moves through the practice.
 *
 * It is the argument of the Method section, not an illustration of it:
 * inputs on the left, the engineering spine in the middle, delivery on the
 * right, and a feedback bus that runs operations back into the model.
 *
 * Interaction
 *  - click / Enter / Space selects a node; the panel below carries the real
 *    text, so the explanation is readable without ever using the diagram,
 *  - arrow keys walk the graph in reading order,
 *  - selecting a node lights only its incident edges, which is how you read
 *    a dependency out of it.
 *
 * Motion
 *  - packets ride the live edges via getPointAtLength on a single rAF loop,
 *  - the loop is created only when the diagram is on screen, the tab is
 *    visible, and reduced motion is off.
 *
 * Small viewports get a list instead of a 1000px-wide drawing: same data,
 * same panel, no pinch-zooming.
 */

const NODE_W = 160;
const NODE_H = 56;
const VIEW_W = 1000;
const VIEW_H = 520;
const PACKET_SPEED = 170; // px of path length per second, diagram units

const KIND_LABEL = {
  input: "IN",
  core: "MODEL",
  build: "BUILD",
  out: "OUT",
};

function edgePath(a, b) {
  // Backward edge: route it under the graph as an explicit feedback bus.
  if (b.x < a.x) {
    const sy = a.y + NODE_H / 2;
    const ty = b.y + NODE_H / 2;
    return `M ${a.x},${sy} C ${a.x + 40},${sy + 170} ${b.x - 40},${ty + 190} ${b.x},${ty}`;
  }
  const sx = a.x + NODE_W / 2;
  const tx = b.x - NODE_W / 2;
  const dx = Math.max((tx - sx) * 0.48, 40);
  return `M ${sx},${a.y} C ${sx + dx},${a.y} ${tx - dx},${b.y} ${tx},${b.y}`;
}

export default function SystemDiagram() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  // The drawing is 1000 units wide; below ~1024px its labels fall under 10px,
  // so tablets get the list rather than a diagram nobody can read.
  const compact = useMediaFlag("(max-width: 1023px)");

  const [activeId, setActiveId] = useState("model");
  const wrapRef = useRef(null);
  const pathRefs = useRef(new Map());
  const packetRefs = useRef([]);

  const nodeById = useMemo(() => {
    const map = new Map();
    METHOD_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const edges = useMemo(
    () =>
      METHOD_EDGES.map(([from, to]) => {
        const a = nodeById.get(from);
        const b = nodeById.get(to);
        return { id: `${from}--${to}`, from, to, d: edgePath(a, b) };
      }),
    [nodeById]
  );

  const active = nodeById.get(activeId) || METHOD_NODES[0];
  const incident = useMemo(
    () => edges.filter((e) => e.from === activeId || e.to === activeId),
    [edges, activeId]
  );

  /** Edges the packets ride: the selected node's, or the spine at rest. */
  const liveEdges = useMemo(() => {
    const chosen = incident.length ? incident : edges.slice(0, 4);
    return chosen.slice(0, 6);
  }, [incident, edges]);

  const order = useMemo(
    () =>
      [...METHOD_NODES].sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x)),
    []
  );

  const step = useCallback(
    (dir) => {
      const i = order.findIndex((n) => n.id === activeId);
      const next = order[(i + dir + order.length) % order.length];
      setActiveId(next.id);
      const el = wrapRef.current?.querySelector(`[data-node="${next.id}"]`);
      if (el && typeof el.focus === "function") el.focus();
    },
    [activeId, order]
  );

  const onKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(id);
      return;
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      step(1);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      step(-1);
    }
  };

  /* ---------------- packet loop ---------------- */
  useEffect(() => {
    if (reduced || compact) return undefined;
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    let raf = 0;
    let running = false;
    let visible = false;
    let last = 0;
    const progress = liveEdges.map((_, i) => (i / Math.max(liveEdges.length, 1)) * 0.9);

    const frame = (now) => {
      if (!running) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      for (let i = 0; i < liveEdges.length; i += 1) {
        const path = pathRefs.current.get(liveEdges[i].id);
        const dot = packetRefs.current[i];
        if (!path || !dot) continue;
        const len = path.getTotalLength();
        if (!len) continue;
        progress[i] += (PACKET_SPEED * dt) / len;
        if (progress[i] > 1) progress[i] -= 1;
        const p = path.getPointAtLength(progress[i] * len);
        dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
        dot.setAttribute("opacity", String(0.35 + Math.sin(progress[i] * Math.PI) * 0.65));
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [liveEdges, reduced, compact]);

  /* ---------------- shared detail panel ---------------- */
  const panel = (
    <div className="border-t pt-6 hairline" style={{ borderColor: "var(--line)" }}>
      <div className="flex items-baseline gap-4">
        <span className="label" style={{ color: "var(--signal)" }}>
          {KIND_LABEL[active.kind]}
        </span>
        <span className="label">{t("diagram_selected", "Selected")}</span>
      </div>
      <motion.div
        key={active.id}
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.s, ease: EASE }}
        className="mt-3 grid gap-3 md:grid-cols-[minmax(0,22ch)_minmax(0,1fr)] md:gap-10"
      >
        <h3 className="text-xl font-semibold tracking-display md:text-2xl">
          {t(active.titleKey)}
        </h3>
        <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-ink-2">
          {t(active.bodyKey)}
        </p>
      </motion.div>
    </div>
  );

  /* ---------------- compact: list, not drawing ---------------- */
  if (compact) {
    return (
      <div ref={wrapRef} className="mt-10">
        <ul className="mb-8 divide-y" style={{ borderColor: "var(--line)" }}>
          {METHOD_NODES.map((n) => {
            const on = n.id === activeId;
            return (
              <li key={n.id} className="border-t hairline first:border-t-0">
                <button
                  type="button"
                  data-node={n.id}
                  onClick={() => setActiveId(n.id)}
                  aria-pressed={on}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <span
                    className="label w-14 shrink-0"
                    style={{ color: on ? "var(--signal)" : undefined }}
                  >
                    {KIND_LABEL[n.kind]}
                  </span>
                  <span
                    className={`flex-1 text-[0.95rem] font-medium ${
                      on ? "text-ink" : "text-ink-2"
                    }`}
                  >
                    {t(n.titleKey)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0"
                    style={{ background: on ? "var(--signal)" : "var(--ink-4)" }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
        {panel}
      </div>
    );
  }

  /* ---------------- desktop: the drawing ---------------- */
  return (
    <div ref={wrapRef} className="mt-10">
      <div
        className="relative border hairline"
        style={{ borderColor: "var(--line)", background: "var(--bg-sunk)" }}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <span className="label">{t("diagram_title", "System model")}</span>
          <span className="label">{t("diagram_hint", "Click or use arrow keys")}</span>
        </div>
        <div className="h-px w-full" style={{ background: "var(--line)" }} />

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block h-auto w-full"
          role="group"
          aria-label={t("diagram_aria", "Interactive diagram of the engineering model")}
        >
          <defs>
            <pattern id="dgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--line)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} fill="url(#dgrid)" opacity="0.5" />

          {/* column captions */}
          {[
            { x: 90, key: "diagram_col_in" },
            { x: 350, key: "diagram_col_model" },
            { x: 630, key: "diagram_col_build" },
            { x: 890, key: "diagram_col_out" },
          ].map((c) => (
            <text
              key={c.key}
              x={c.x}
              y={34}
              textAnchor="middle"
              className="label"
              fill="var(--ink-3)"
              style={{ fontSize: 11, letterSpacing: "0.18em" }}
            >
              {t(c.key)}
            </text>
          ))}

          {/* edges */}
          {edges.map((e) => {
            const hot = e.from === activeId || e.to === activeId;
            return (
              <path
                key={e.id}
                ref={(el) => {
                  if (el) pathRefs.current.set(e.id, el);
                  else pathRefs.current.delete(e.id);
                }}
                d={e.d}
                fill="none"
                stroke={hot ? "var(--signal)" : "var(--line-strong)"}
                strokeWidth={hot ? 1.4 : 1}
                opacity={hot ? 0.9 : 0.45}
                style={{ transition: "stroke .32s var(--ease), opacity .32s var(--ease)" }}
              />
            );
          })}

          {/* packets */}
          {!reduced &&
            liveEdges.map((e, i) => (
              <rect
                key={`p-${e.id}`}
                ref={(el) => {
                  packetRefs.current[i] = el;
                }}
                x={-2.5}
                y={-2.5}
                width={5}
                height={5}
                fill="var(--signal)"
                opacity="0"
              />
            ))}

          {/* nodes */}
          {METHOD_NODES.map((n) => {
            const on = n.id === activeId;
            return (
              <g
                key={n.id}
                data-node={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${t(n.titleKey)} - ${KIND_LABEL[n.kind]}`}
                onClick={() => setActiveId(n.id)}
                onFocus={() => setActiveId(n.id)}
                onKeyDown={(e) => onKeyDown(e, n.id)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={n.x - NODE_W / 2}
                  y={n.y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  fill={on ? "rgba(255,74,28,0.08)" : "var(--bg-elev)"}
                  stroke={on ? "var(--signal)" : "var(--line-strong)"}
                  strokeWidth="1"
                  style={{ transition: "fill .32s var(--ease), stroke .32s var(--ease)" }}
                />
                <text
                  x={n.x - NODE_W / 2 + 12}
                  y={n.y - 8}
                  fill={on ? "var(--signal)" : "var(--ink-3)"}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 9,
                    letterSpacing: "0.18em",
                  }}
                >
                  {KIND_LABEL[n.kind]}
                </text>
                <text
                  x={n.x - NODE_W / 2 + 12}
                  y={n.y + 14}
                  fill={on ? "var(--ink)" : "var(--ink-2)"}
                  style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {t(n.titleKey)}
                </text>
                {on && (
                  <rect
                    x={n.x + NODE_W / 2 - 7}
                    y={n.y - NODE_H / 2 + 5}
                    width={3}
                    height={3}
                    fill="var(--signal)"
                    className="animate-signal-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-8">{panel}</div>
    </div>
  );
}
