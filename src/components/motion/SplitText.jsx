import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { DUR, EASE, STAGGER, VIEWPORT } from "../../design/motion";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * Masked type reveal.
 *
 * Accessibility & SEO contract:
 *  - the complete string is exposed once via aria-label on the element,
 *  - the split fragments are aria-hidden, so assistive tech never spells
 *    the sentence out word by word,
 *  - the text is real DOM text either way, so crawlers and
 *    JS-disabled visitors see it.
 *
 * Words are the atomic unit so native line breaking still decides where
 * lines fall: each word carries its own clipping mask, which means the
 * reveal stays correct at any viewport width without measuring anything.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  mode = "word",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = STAGGER.base,
  duration = DUR.l,
  trigger = "inView",
}) {
  const reduced = useReducedMotion();

  const words = useMemo(
    () => String(text ?? "").split(/(\s+)/).filter((w) => w.length > 0),
    [text]
  );

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[Tag] || motion.span;
  const animateProps =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: VIEWPORT };

  let index = 0;

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      {...animateProps}
    >
      {words.map((word, i) => {
        if (/^\s+$/.test(word)) {
          return (
            <span key={`s-${i}`} aria-hidden="true">
              {" "}
            </span>
          );
        }

        const units = mode === "char" ? Array.from(word) : [word];

        return (
          <span
            key={`w-${i}`}
            aria-hidden="true"
            className={`inline-block overflow-hidden align-baseline ${wordClassName}`}
            style={{ padding: "0.16em 0", margin: "-0.16em 0" }}
          >
            {units.map((unit, u) => {
              const own = index++;
              return (
                <motion.span
                  key={`u-${u}`}
                  className="inline-block"
                  variants={{
                    hidden: { y: "108%" },
                    show: {
                      y: "0%",
                      transition: {
                        duration,
                        ease: EASE,
                        delay: delay + own * stagger,
                      },
                    },
                  }}
                >
                  {unit}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </MotionTag>
  );
}
