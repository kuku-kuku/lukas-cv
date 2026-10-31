import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
import { PROJECTS } from "../../design/content";
import { DUR, EASE, STAGGER } from "../../design/motion";
import {
  useCompactViewport,
  useFinePointer,
  useReducedMotion,
} from "../../design/useMotionPrefs";

/**
 * 03 - WORK
 *
 * An index, not a card grid. Each project is a row: number, name, role,
 * status. The row expands in place into the engineering notes - scope, what
 * was actually hard, how it was solved, the stack, and a link to go and check.
 *
 * Desktop adds the one hover-only flourish on the page: a plate that tracks
 * the pointer and previews the row under it. It is purely additive - the same
 * image appears inline when the row is expanded, so nothing is reachable only
 * by hovering. It is disabled for coarse pointers and reduced motion.
 *
 * No invented metrics live here. Status, role, scope and stack are all
 * checkable by opening the site.
 */
export default function Work({ openId, onOpen }) {
  const { t } = useTranslation();
  const compact = useCompactViewport();
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const [hovered, setHovered] = useState(null);
  const listRef = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 240, damping: 26, mass: 0.5 });
  const y = useSpring(py, { stiffness: 240, damping: 26, mass: 0.5 });

  const previewEnabled = fine && !compact && !reduced;
  const hoveredProject = PROJECTS.find((p) => p.id === hovered);

  const onMove = (e) => {
    if (!previewEnabled) return;
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(e.clientX - rect.left + 28);
    py.set(e.clientY - rect.top - 90);
  };

  const toggle = (id) => onOpen?.(openId === id ? null : id);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="shell relative z-10 py-24 md:py-32"
    >
      <SectionHead
        id="work"
        index="03"
        eyebrow={t("nav_work", "Work")}
        title={t("work_title_new")}
        lede={t("work_lede")}
      />

      <div
        ref={listRef}
        className="relative"
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="h-px w-full" style={{ background: "var(--line-strong)" }} />

        {PROJECTS.map((project, i) => {
          const open = openId === project.id;
          const name = t(`projects.${project.id}.title`);
          const kind = t(`projects.${project.id}.kind`);

          return (
            <motion.article
              key={project.id}
              id={`work-${project.id}`}
              className="border-b"
              style={{ borderColor: "var(--line)" }}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{
                duration: DUR.m,
                ease: EASE,
                delay: reduced ? 0 : i * STAGGER.tight,
              }}
              onMouseEnter={() => setHovered(project.id)}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  onClick={() => toggle(project.id)}
                  aria-expanded={open}
                  aria-controls={`work-panel-${project.id}`}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 text-left md:grid-cols-[3.5rem_minmax(0,1fr)_10rem_7rem_2rem] md:gap-6 md:py-8"
                >
                  <span
                    className="font-mono text-[0.6875rem] tracking-label transition-colors duration-200"
                    style={{ color: open ? "var(--signal)" : "var(--ink-3)" }}
                  >
                    {project.index}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block truncate text-[1.375rem] font-semibold tracking-display transition-colors duration-200 md:text-[1.75rem] ${
                        open ? "text-ink" : "text-ink group-hover:text-ink"
                      }`}
                    >
                      {name}
                    </span>
                    {kind && (
                      <span className="mt-1 block text-sm text-ink-3 md:hidden">
                        {kind}
                      </span>
                    )}
                  </span>

                  <span className="hidden text-sm text-ink-2 md:block">{kind}</span>

                  <span className="hidden items-center gap-2 md:flex">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5"
                      style={{
                        background:
                          project.statusKey === "live" ? "var(--signal)" : "var(--ink-3)",
                      }}
                    />
                    <span className="label">{t(`status.${project.statusKey}`)}</span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="justify-self-end font-mono text-lg leading-none transition-transform duration-[320ms] ease-expo"
                    style={{ transform: open ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`work-panel-${project.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : DUR.m, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-10">
                      {/* plate */}
                      <div className="md:col-span-5">
                        <ProjectPlate project={project} />
                        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                            <dt className="label">{t("role", "Role")}</dt>
                            <dd className="mt-2 text-sm">{t(project.roleKey)}</dd>
                          </div>
                          <div>
                            <dt className="label">{t("status_label", "Status")}</dt>
                            <dd className="mt-2 text-sm">
                              {t(`status.${project.statusKey}`)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* notes */}
                      <div className="md:col-span-7">
                        <div className="space-y-6">
                          {[
                            { k: "scope", label: t("scope", "Scope") },
                            { k: "problem", label: t("challenge", "Problem") },
                            { k: "approach", label: t("solution", "Approach") },
                          ].map((block) => (
                            <div key={block.k}>
                              <span className="label">{block.label}</span>
                              <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">
                                {t(`projects.${project.id}.${block.k}`)}
                              </p>
                            </div>
                          ))}
                        </div>

                        <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                          {project.stack.map((item) => (
                            <li
                              key={item}
                              className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-2"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="signal-link mt-7 inline-flex items-center gap-2 text-sm font-semibold"
                          >
                            {t("visit_live", "Open the site")}
                            <span aria-hidden="true" className="font-mono text-xs">
                              ↗
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}

        {/* pointer-tracking preview - desktop enhancement only */}
        {previewEnabled && (
          <AnimatePresence>
            {hoveredProject && openId !== hoveredProject.id && (
              <motion.div
                key={hoveredProject.id}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[20rem] md:block"
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: DUR.s, ease: EASE }}
              >
                <ProjectPlate project={hoveredProject} thumb />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

/**
 * A project plate. Screenshots are served as WebP with the original PNG as a
 * fallback, inside a fixed-ratio box so nothing shifts while they load.
 * Projects without a screenshot get a typographic plate instead of a stock
 * photograph.
 */
function ProjectPlate({ project, thumb = false }) {
  const { t } = useTranslation();
  const src = thumb ? project.thumb || project.image : project.image;

  if (!src) {
    return (
      <div
        className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border p-5"
        style={{ borderColor: "var(--line)", background: "var(--bg-sunk)" }}
      >
        <span className="label">{t(`status.${project.statusKey}`)}</span>
        <span className="font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-ink-3">
          {project.stack.slice(0, 4).join(" / ")}
        </span>
        <span className="text-2xl font-semibold tracking-display">
          {t(`projects.${project.id}.title`)}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden border"
      style={{ borderColor: "var(--line)", background: "var(--bg-sunk)" }}
    >
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          src={project.imageFallback || src}
          alt={`${t(`projects.${project.id}.title`)} - ${t(
            `projects.${project.id}.kind`
          )}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,11,0.55), rgba(10,10,11,0) 55%)",
        }}
      />
    </div>
  );
}
