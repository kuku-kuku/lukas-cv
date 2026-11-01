import React from "react";
import { useTranslation } from "react-i18next";
import { CHANNELS } from "../design/content";

/**
 * The public channels as icon buttons.
 *
 * Written once and used in both the footer and the contact column, because
 * the two lists had already started to drift: the footer carried GitHub for
 * a while after the contact section stopped.
 *
 * Each icon is a link with a real accessible name - an icon with no name is
 * an unlabelled link to a screen reader, and "Facebook" is the name here,
 * not decoration. The glyphs are inline rather than an icon font or an SVG
 * sprite: four paths do not justify another request or another dependency.
 */

const ICONS = {
  email: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.3 5.8a1.2 1.2 0 0 0 1.4 0L21 7" />
    </>
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21h-4v-5.5c0-1.3-.03-3-1.83-3-1.83 0-2.12 1.43-2.12 2.9V21H9V9Z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.54-1.5h1.65V3.62c-.29-.04-1.27-.12-2.41-.12-2.4 0-4 1.46-4 4.14V9.9H7.6V13h2.78v8h3.12Z"
    />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Built from CHANNELS, so an empty value is simply absent. */
function list(t) {
  return [
    CHANNELS.email && {
      key: "email",
      name: t("channel_email", "El. paštas"),
      href: `mailto:${CHANNELS.email}`,
      external: false,
    },
    CHANNELS.linkedin && {
      key: "linkedin",
      name: "LinkedIn",
      href: CHANNELS.linkedin,
      external: true,
    },
    CHANNELS.facebook && {
      key: "facebook",
      name: "Facebook",
      href: CHANNELS.facebook,
      external: true,
    },
    CHANNELS.instagram && {
      key: "instagram",
      name: "Instagram",
      href: CHANNELS.instagram,
      external: true,
    },
  ].filter(Boolean);
}

/**
 * @param {object} p
 * @param {"page"|"chrome"} [p.tone] "chrome" uses the rail/footer palette,
 *   which stays dark when a light section passes behind it.
 * @param {string} [p.className]
 */
export default function ChannelLinks({ tone = "page", className = "" }) {
  const { t } = useTranslation();
  const items = list(t);
  if (!items.length) return null;

  const line = tone === "chrome" ? "var(--chrome-line)" : "var(--line-strong)";
  const ink = tone === "chrome" ? "var(--chrome-ink)" : "var(--ink-2)";

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((c) => (
        <li key={c.key}>
          <a
            href={c.href}
            aria-label={c.name}
            title={c.name}
            className="group relative flex h-11 w-11 items-center justify-center border transition-colors duration-200"
            style={{ borderColor: line, color: ink }}
            {...(c.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[250ms] ease-expo group-hover:scale-y-100"
              style={{ background: "var(--signal)" }}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative transition-colors duration-200 group-hover:text-ground"
            >
              {ICONS[c.key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
