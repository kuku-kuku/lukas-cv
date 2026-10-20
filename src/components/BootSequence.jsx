import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PRACTICE } from "../design/content";
import { DUR, EASE } from "../design/motion";

/**
 * BOOT SEQUENCE — the opening, deliberately short.
 *
 * Rules it obeys:
 *  - the page is fully rendered underneath from the first paint, so this is a
 *    curtain and never a gate: crawlers, JS-off visitors and anyone who taps
 *    straight away get the content,
 *  - it runs once per browser session, never on prefers-reduced-motion,
 *  - total length is ~0.9s and any click or key press ends it immediately,
 *  - a hard safety timer calls onDone even if a frame is dropped, so the
 *    overlay cannot get stuck in front of the site.
 *
 * It replaces the previous 5-second muted video intro, which blocked the
 * first paint of the real content on every single visit.
 */

const LIFETIME = 620;
const SESSION_KEY = "beneta.boot.seen";

export function shouldBoot() {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return window.sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch (err) {
    // Private mode or blocked storage: show the opening, just do not record it.
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}

export default function BootSequence({ onDone }) {
  const { t } = useTranslation();
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);
  const finishRef = useRef(() => {});

  useEffect(() => {
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch (err) {
        /* storage unavailable — nothing to persist, the opening still ran */
      }
      setLeaving(true);
      window.setTimeout(() => onDone?.(), 300);
    };

    finishRef.current = finish;
    const timer = window.setTimeout(finish, LIFETIME);
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex cursor-pointer flex-col justify-between overflow-hidden px-5 py-6 md:px-10"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 1 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={() => finishRef.current()}
      role="presentation"
    >
      <div className="flex items-baseline justify-between">
        <motion.span
          className="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.s }}
        >
          {PRACTICE.locality} — {PRACTICE.country}
        </motion.span>
        <motion.span
          className="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.s, delay: 0.1 }}
        >
          {t("boot_skip", "Press any key to skip")}
        </motion.span>
      </div>

      {/* The mark arrives through a mask, the rule draws under it. */}
      <div className="flex flex-col items-start">
        <span className="mask-line">
          <motion.span
            className="display-l block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.52, ease: EASE }}
          >
            {PRACTICE.mark}
          </motion.span>
        </span>
        <motion.div
          className="mt-4 h-px w-full origin-left"
          style={{ background: "var(--signal)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.62, ease: EASE, delay: 0.08 }}
        />
      </div>

      <div className="flex items-baseline justify-between">
        <motion.span
          className="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.s, delay: 0.2 }}
        >
          {t("boot_status", "Initialising interface")}
        </motion.span>
        <motion.span
          className="label"
          style={{ color: "var(--signal)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.s, delay: 0.3 }}
        >
          {PRACTICE.domain}
        </motion.span>
      </div>
    </motion.div>
  );
}
