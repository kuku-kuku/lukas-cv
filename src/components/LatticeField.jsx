import React, { useEffect, useRef } from "react";
import {
  useCompactViewport,
  useFinePointer,
  useReducedMotion,
} from "../design/useMotionPrefs";

/**
 * LATTICE FIELD — the ambient system behind the masthead.
 *
 * Not a particle field: it is a regular lattice of nodes and links, i.e. the
 * subject matter of the practice (connected systems) rendered as the
 * background. Three things act on it:
 *   1. a slow diagonal scan wave — the resting heartbeat,
 *   2. the pointer — nodes within reach brighten and lean away,
 *   3. scroll — the whole lattice drifts and dims as you leave the masthead.
 * Packets travel along links in the signal colour: visible evidence of flow.
 *
 * Budget discipline:
 *   - DPR capped at 2, canvas resized only on real size changes,
 *   - O(n) links (each node connects right + down only),
 *   - the loop stops entirely when the canvas scrolls out of view or the tab
 *     is hidden, and never starts under prefers-reduced-motion (one static
 *     frame is painted instead),
 *   - density derives from viewport width, so phones draw far fewer nodes.
 */

const SPACING_DESKTOP = 84;
const SPACING_COMPACT = 116;
const MAX_PACKETS = 7;

export default function LatticeField({ className = "" }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const compact = useCompactViewport();
  const fine = useFinePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const spacing = compact ? SPACING_COMPACT : SPACING_DESKTOP;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let nodes = [];
    let packets = [];
    let raf = 0;
    let running = false;
    let visible = true;
    // The field is ambient: it must not compete with the first paint of the
    // masthead, so the loop only begins once the browser is idle.
    let ready = false;
    let startedAt = 0;

    const pointer = { x: -1, y: -1, active: false };
    let scroll = 0;

    // Deterministic jitter, so the lattice reads hand-tuned rather than random.
    const hash = (i, j) => {
      const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };

    function build() {
      cols = Math.ceil(w / spacing) + 2;
      rows = Math.ceil(h / spacing) + 2;
      nodes = [];
      for (let j = 0; j < rows; j += 1) {
        for (let i = 0; i < cols; i += 1) {
          const jx = (hash(i, j) - 0.5) * spacing * 0.42;
          const jy = (hash(j, i) - 0.5) * spacing * 0.42;
          nodes.push({
            bx: i * spacing - spacing + jx,
            by: j * spacing - spacing + jy,
            x: 0,
            y: 0,
            phase: hash(i + 7, j + 3) * Math.PI * 2,
            amp: 0.5 + hash(i + 11, j + 5) * 0.9,
            lift: 0,
            col: i,
            row: j,
          });
        }
      }
      packets = Array.from({ length: compact ? 3 : MAX_PACKETS }, (_, k) => ({
        i: Math.floor(hash(k, 13) * Math.max(cols - 2, 1)),
        j: Math.floor(hash(k, 29) * Math.max(rows - 2, 1)),
        t: hash(k, 41),
        speed: 0.12 + hash(k, 53) * 0.2,
        axis: hash(k, 67) > 0.45 ? 0 : 1,
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const nextW = Math.max(rect.width, 1);
      const nextH = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (Math.abs(nextW - w) < 1 && Math.abs(nextH - h) < 1) return;
      w = nextW;
      h = nextH;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    const nodeAt = (i, j) =>
      i >= 0 && j >= 0 && i < cols && j < rows ? nodes[j * cols + i] : null;

    function frame(now) {
      if (!running) return;
      if (!startedAt) startedAt = now;
      const t = (now - startedAt) / 1000;

      // Leaving the masthead fades the field out instead of hard-cutting it.
      const depart = Math.min(scroll / Math.max(h, 1), 1);
      const alpha = 1 - depart * 0.85;
      const drift = depart * spacing * 0.5;

      ctx.clearRect(0, 0, w, h);
      if (alpha <= 0.02) {
        raf = requestAnimationFrame(frame);
        return;
      }

      for (let k = 0; k < nodes.length; k += 1) {
        const n = nodes[k];
        n.x = n.bx + Math.sin(t * 0.5 + n.phase) * n.amp;
        n.y = n.by + Math.cos(t * 0.42 + n.phase) * n.amp - drift;

        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          const reach = spacing * 2.6;
          if (d2 < reach * reach) {
            const d = Math.sqrt(d2) || 0.001;
            const f = 1 - d / reach;
            n.lift += (f - n.lift) * 0.18;
            n.x += (dx / d) * f * 14;
            n.y += (dy / d) * f * 14;
          } else {
            n.lift += (0 - n.lift) * 0.08;
          }
        } else {
          n.lift += (0 - n.lift) * 0.06;
        }
      }

      // Links. The scan is a diagonal band sweeping the lattice; links inside
      // it are drawn brighter, which is what makes the structure legible.
      const scanX = ((t * 0.1) % 1.6) - 0.3;
      ctx.lineWidth = 1;
      for (let k = 0; k < nodes.length; k += 1) {
        const n = nodes[k];
        const right = nodeAt(n.col + 1, n.row);
        const down = nodeAt(n.col, n.row + 1);
        const u = (n.x / Math.max(w, 1)) * 0.6 + (n.y / Math.max(h, 1)) * 0.4;
        const band = Math.max(0, 1 - Math.abs(u - scanX) * 7);
        const base = 0.055 + band * 0.22 + n.lift * 0.5;

        if (right) {
          ctx.strokeStyle = "rgba(241,239,234," + (base * alpha).toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }
        if (down) {
          ctx.strokeStyle =
            "rgba(241,239,234," + (base * 0.7 * alpha).toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(down.x, down.y);
          ctx.stroke();
        }
      }

      for (let k = 0; k < nodes.length; k += 1) {
        const n = nodes[k];
        const a = (0.1 + n.lift * 0.85) * alpha;
        if (a < 0.02) continue;
        const s = 1 + n.lift * 2.2;
        ctx.fillStyle = "rgba(241,239,234," + a.toFixed(3) + ")";
        ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s);
        if (n.lift > 0.72) {
          const hot = (n.lift - 0.72) * 2.6 * alpha;
          ctx.fillStyle = "rgba(255,74,28," + hot.toFixed(3) + ")";
          ctx.fillRect(n.x - 2, n.y - 2, 4, 4);
        }
      }

      // Packets: data moving through the system.
      for (let k = 0; k < packets.length; k += 1) {
        const p = packets[k];
        p.t += p.speed * 0.016;
        if (p.t >= 1) {
          p.t = 0;
          if (p.axis === 0) p.i += 1;
          else p.j += 1;
          if (p.i >= cols - 1 || p.j >= rows - 1) {
            p.i = Math.floor(hash(k + p.t, now % 97) * Math.max(cols - 2, 1));
            p.j = Math.floor(hash(now % 89, k + 3) * Math.max(rows - 2, 1));
            p.axis = hash(k, now % 61) > 0.45 ? 0 : 1;
          }
        }
        const a = nodeAt(p.i, p.j);
        const b = p.axis === 0 ? nodeAt(p.i + 1, p.j) : nodeAt(p.i, p.j + 1);
        if (!a || !b) continue;
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(255,74,28," + (0.85 * alpha).toFixed(3) + ")";
        ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
        ctx.strokeStyle = "rgba(255,74,28," + (0.2 * alpha).toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    // One static frame: the lattice still reads as structure, just at rest.
    function paintStill() {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(241,239,234,0.075)";
      for (let k = 0; k < nodes.length; k += 1) {
        nodes[k].x = nodes[k].bx;
        nodes[k].y = nodes[k].by;
      }
      for (let k = 0; k < nodes.length; k += 1) {
        const n = nodes[k];
        const right = nodeAt(n.col + 1, n.row);
        const down = nodeAt(n.col, n.row + 1);
        ctx.beginPath();
        if (right) {
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(right.x, right.y);
        }
        if (down) {
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(down.x, down.y);
        }
        ctx.stroke();
        ctx.fillStyle = "rgba(241,239,234,0.14)";
        ctx.fillRect(n.x - 0.5, n.y - 0.5, 1, 1);
      }
    }

    function start() {
      if (running || reduced || !visible || !ready) return;
      running = true;
      startedAt = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    if (reduced) paintStill();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) paintStill();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onScroll = () => {
      scroll = window.scrollY || 0;
    };
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= rect.width &&
        pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (fine) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    onScroll();
    const idle =
      window.requestIdleCallback || ((fn) => window.setTimeout(fn, 400));
    const cancelIdle =
      window.cancelIdleCallback || window.clearTimeout.bind(window);
    const idleHandle = idle(
      () => {
        ready = true;
        start();
      },
      { timeout: 1500 }
    );

    return () => {
      cancelIdle(idleHandle);
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced, compact, fine]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={"block h-full w-full " + className}
    />
  );
}
