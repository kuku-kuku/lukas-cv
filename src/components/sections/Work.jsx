import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
import { PROJECTS } from "../../design/content";
import { DUR, EASE, STAGGER, VIEWPORT } from "../../design/motion";
import {
  useCompactViewport,
  useFinePointer,
  useReducedMotion,
} from "../../design/useMotionPrefs";

/**
 * 03 - WORK
 *
 * An index, not a card grid. Each row carries number, name, type, a measured
 * result and status, and expands in place into the engineering notes.
 *
 * Three things worth knowing about the markup:
 *
 * 1. The heading holds only the project name. Type, result and status are
 *    siblings of it, so a screen reader announces "beneta.lt" rather than
 *    reading the entire row as one run-on heading.
 * 2. The whole row is still clickable: the toggle carries an ::after overlay
 *    that covers the row. One control, one accessible name, full hit area.
 * 3. The hover preview is fixed to the pointer, never to the list. Anchoring
 *    it inside the list is what used to park it on top of rows 01 and 02.
 */

const PREVIEW_W = 320;
const PREVIEW_H = 200;
const PREVIEW_OFFSET = 24;

export default function Work({ openId, onOpen }) {
  const { t } = useTranslation();
  const compact = useCompactViewport();
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const [hovered, setHovered] = useState(null);
  const listRef = useRef(null);

  const previewEnabled = fine && !compact && !reduced;

  // Pointer position in viewport space. The preview is position: fixed, so
  // clientX/clientY map straight onto it with no scroll maths to go stale.
  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const x = useSpring(px, { stiffness: 150, damping: 20, mass: 0.4 });
  const y = useSpring(py, { stiffness: 150, damping: 20, mass: 0.4 });

  const hoveredProject = PROJECTS.find((p) => p.id === hovered);
  const showPreview = previewEnabled && !!hoveredProject && openId !== hovered;

  const onMove = (e) => {
    if (!previewEnabled) return;
    // Clamped so the plate never hangs off the edge of the window.
    px.set(Math.min(e.clientX + PREVIEW_OFFSET, window.innerWidth - PREVIEW_W - 16));
    py.set(Math.min(e.clientY + PREVIEW_OFFSET, window.innerHeight - PREVIEW_H - 16));
  };

  const toggle = (id) => onOpen?.(openId === id ? null : id);

  // Esc closes the open row, wherever focus happens to be.
  useEffect(() => {
    if (!openId) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onOpen?.(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, onOpen]);

  // Warm the preview images once the browser is idle, so the first hover is
  // never an empty frame.
  useEffect(() => {
    if (!previewEnabled) return undefined;
    const idle =
      window.requestIdleCallback || ((fn) => window.setTimeout(fn, 1500));
    const cancel = window.cancelIdleCallback || window.clearTimeout.bind(window);
    const handle = idle(
      () => {
        PROJECTS.forEach((p) => {
          if (!p.thumb) return;
          const img = new Image();
          img.src = p.thumb;
        });
      },
      { timeout: 5000 }
    );
    return () => cancel(handle);
  }, [previewEnabled]);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="shell section relative z-10"
    >
      <SectionHead
        id="work"
        index="03"
        eyebrow={t("nav_work", "Work")}
        title={t("work_title_new")}
        lede={t("work_lede")}
      />

      <div ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        <div className="h-px w-full" style={{ background: "var(--line-strong)" }} />

        {PROJECTS.map((project, i) => {
          const open = openId === project.id;
          const name = t(`projects.${project.id}.title`);
          const kind = t(`projects.${project.id}.kind`);
          const lit = open || hovered === project.id;

          return (
            <motion.article
              key={project.id}
              id={`work-${project.id}`}
              className="group border-b"
              style={{ borderColor: "var(--line)" }}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: DUR.base,
                ease: EASE,
                delay: reduced ? 0 : i * STAGGER,
              }}
              onMouseEnter={() => setHovered(project.id)}
            >
              <div className="relative grid grid-cols-[2.25rem_minmax(0,1fr)_1.5rem] items-center gap-x-4 py-5 md:grid-cols-[3.5rem_minmax(0,1fr)_9rem_10rem_6rem_1.5rem] md:gap-x-6 md:py-7">
                <span
                  className="self-start font-mono text-label transition-colors duration-200 md:self-center"
                  style={{ color: lit ? "var(--signal)" : "var(--ink-3)" }}
                >
                  {project.index}
                </span>

                <div className="flex min-w-0 items-center gap-3">
                  {/* Touch devices get no hover preview, so the thumbnail
                      travels with the row instead. */}
                  {project.thumb && (
                    <img
                      src={project.thumb}
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-16 shrink-0 border object-cover object-top md:hidden"
                      style={{ borderColor: "var(--line)" }}
                    />
                  )}

                  <div className="min-w-0">
                    <h3 className="m-0 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggle(project.id)}
                        aria-expanded={open}
                        aria-controls={`work-panel-${project.id}`}
                        className="block w-full truncate text-left text-[1.25rem] font-semibold tracking-display transition-transform duration-[250ms] ease-expo after:absolute after:inset-0 after:content-[''] md:text-[1.75rem] md:group-hover:translate-x-2"
                      >
                        {name}
                      </button>
                    </h3>
                    <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-3 md:hidden">
                      {kind}
                    </span>
                  </div>
                </div>

                <span className="hidden truncate text-sm text-ink-2 md:block">
                  {kind}
                </span>

                {/* A measured, checkable number - never a marketing claim. */}
                <span className="nums hidden font-mono text-label normal-case text-ink-3 md:block">
                  {project.metric || ""}
                </span>

                <span className="hidden items-center gap-2 md:flex">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0"
                    style={{
                      background:
                        project.statusKey === "live"
                          ? "var(--signal)"
                          : "var(--ink-3)",
                    }}
                  />
                  <span className="label">{t(`status.${project.statusKey}`)}</span>
                </span>

                <span
                  aria-hidden="true"
                  className="justify-self-end self-start font-mono text-lg leading-none transition-transform duration-[250ms] ease-expo md:self-center"
                  style={{ transform: open ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>

                {/* The row answers the pointer even where no preview shows. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 transition-transform duration-[250ms] ease-expo group-hover:scale-x-100"
                  style={{ background: "var(--signal)" }}
                />
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`work-panel-${project.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : DUR.base, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      variants={{
                        hidden: {},
                        show: {
                          transition: { staggerChildren: reduced ? 0 : STAGGER },
                        },
                      }}
                      initial="hidden"
                      animate="show"
                      className="grid gap-8 pb-10 md:grid-cols-12 md:gap-10"
                    >
                      <PanelItem reduced={reduced} className="md:col-span-5">
                        <ProjectPlate project={project} name={name} kind={kind} />
                        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                            <dt className="label">{t("role", "Role")}</dt>
                            <dd className="mt-2 text-sm">{t(project.roleKey)}</dd>
                          </div>
                          {project.year && (
                            <div>
                              <dt className="label">{t("year", "Year")}</dt>
                              <dd className="nums mt-2 font-mono text-sm">
                                {project.year}
                              </dd>
                            </div>
                          )}
                          {project.metricNote && (
                            <div className="col-span-2">
                              <dt className="label">{t("measured", "Measured")}</dt>
                              <dd className="nums mt-2 font-mono text-sm text-ink-2">
                                {project.metricNote}
                                {project.metricDate && (
                                  <span className="ml-2 text-ink-3">
                                    · {project.metricDate}
                                  </span>
                                )}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </PanelItem>

                      <div className="md:col-span-7">
                        {[
                          { k: "scope", label: t("scope", "Scope") },
                          { k: "problem", label: t("challenge", "Problem") },
                          { k: "approach", label: t("solution", "Approach") },
                        ].map((block) => (
                          <PanelItem reduced={reduced} key={block.k} className="mb-6">
                            <span className="label">{block.label}</span>
                            <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">
                              {t(`projects.${project.id}.${block.k}`)}
                            </p>
                          </PanelItem>
                        ))}

                        <PanelItem reduced={reduced}>
                          <ul className="flex flex-wrap gap-x-4 gap-y-2">
                            {project.stack.map((item) => (
                              <li key={item} className="font-mono text-label text-ink-2">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </PanelItem>

                        {project.liveUrl && (
                          <PanelItem reduced={reduced}>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="signal-link relative z-10 mt-7 inline-flex items-center gap-2 text-sm font-semibold"
                            >
                              {t("visit_live", "Open the site")}
                              <span aria-hidden="true" className="font-mono text-xs">
                                ↗
                              </span>
                            </a>
                          </PanelItem>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>

      {/* Pointer-tracked preview: fixed to the viewport, never interactive,
          desktop only. The same image is in the expanded panel, so nothing
          is reachable by hover alone. */}
      {previewEnabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ x, y, width: PREVIEW_W }}
        >
          <AnimatePresence>
            {showPreview && (
              <motion.div
                key={hoveredProject.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: DUR.fast } }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute left-0 top-0 w-full"
              >
                <ProjectPlate project={hoveredProject} thumb />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

/** One staggered child of the expanded panel. */
function PanelItem({ children, reduced, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A project plate: a real screenshot in a fixed 16:10 box, so it cannot shift
 * layout while it loads and cannot be mistaken for a broken image.
 */
function ProjectPlate({ project, name, kind, thumb = false }) {
  const src = thumb ? project.thumb || project.image : project.image;

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden border"
      style={{ borderColor: "var(--line)", background: "var(--bg-sunk)" }}
    >
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          src={project.imageFallback || src}
          alt={thumb ? "" : `${name} - ${kind}`}
          aria-hidden={thumb ? "true" : undefined}
          width={thumb ? "560" : "1400"}
          height={thumb ? "350" : "875"}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </picture>
    </div>
  );
}
