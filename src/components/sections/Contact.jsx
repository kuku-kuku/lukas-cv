import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import SectionHead from "../SectionHead";
import LiveClock from "../LiveClock";
import Reveal from "../motion/Reveal";
import Rule from "../motion/Rule";
import { CHANNELS, PRACTICE } from "../../design/content";
import { DUR, EASE } from "../../design/motion";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 06 - CONTACT
 *
 * The delivery mechanism is unchanged on purpose: the same EmailJS template,
 * the same three field names (name / email / message), the same environment
 * variables. Changing any of those silently breaks a working inbox.
 *
 * What the form does differently now:
 *  - validates inline rather than through browser bubbles, with aria-invalid
 *    and the message tied to its field by aria-describedby,
 *  - shows focus by drawing the underline in the signal colour and lighting
 *    the field's number, so the active field is obvious,
 *  - replaces itself with a confirmation on success instead of leaving the
 *    visitor to guess whether anything happened,
 *  - uses instructional placeholders. The old ones were plausible names and
 *    addresses ("Vardenis Pavardenis"), which read as values already filled.
 */

const FIELDS = [
  {
    index: "01",
    name: "name",
    type: "text",
    autoComplete: "name",
    labelKey: "form_name",
    placeholderKey: "form_name_placeholder",
  },
  {
    index: "02",
    name: "email",
    type: "email",
    autoComplete: "email",
    labelKey: "form_email",
    placeholderKey: "form_email_placeholder",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Vite exposes these through import.meta.env; the REACT_APP_ prefix is
  // kept (see vite.config.js envPrefix) so the Vercel variables and the
  // local .env file carry on working unchanged.
  const SERVICE_ID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  function describe(err) {
    if (!err) return t("form_error_unknown", "Unknown error");
    if (typeof err === "string") return err;
    return (
      err.text ||
      err.message ||
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err.status ||
      t("form_error_unknown", "Unknown error")
    );
  }

  /** Returns a map of field name -> message. Empty means valid. */
  function validate(form) {
    const next = {};
    if (form.name.value.trim().length < 2) {
      next.name = t("err_name", "Please enter your name.");
    }
    if (!EMAIL_RE.test(form.email.value.trim())) {
      next.email = t("err_email", "Enter a valid email address.");
    }
    if (form.message.value.trim().length < 20) {
      next.message = t("err_message", "A sentence or two, please.");
    }
    return next;
  }

  /**
   * The brief box grows with what you type instead of offering a drag
   * handle. `field-sizing: content` does this natively in Chromium; this is
   * the fallback for Safari and Firefox, and it is also what keeps the box
   * correct after a reset or an autofill.
   */
  const autosize = useRef(null);
  const grow = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 360)}px`;
  };
  useEffect(() => {
    grow(autosize.current);
  }, []);

  const clearError = (name) =>
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    const form = formRef.current;
    const invalid = validate(form);
    setFieldErrors(invalid);
    if (Object.keys(invalid).length) {
      form.querySelector(`[name="${Object.keys(invalid)[0]}"]`)?.focus();
      return;
    }

    setSending(true);
    setError("");

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error(t("form_error_config", "The message service is not configured."));
      }
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      form.reset();
      grow(autosize.current);
      setSent(true);
    } catch (err) {
      console.error("Email send error:", err);
      setError(`${t("form_error_prefix", "Could not send the message")}: ${describe(err)}`);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!error) return undefined;
    const timer = setTimeout(() => setError(""), 10000);
    return () => clearTimeout(timer);
  }, [error]);

  const channels = [
    CHANNELS.email && {
      key: "email",
      label: t("channel_email", "Email"),
      value: CHANNELS.email,
      href: `mailto:${CHANNELS.email}`,
      external: false,
    },
    CHANNELS.linkedin && {
      key: "linkedin",
      label: "LinkedIn",
      value: CHANNELS.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: CHANNELS.linkedin,
      external: true,
    },
    CHANNELS.github && {
      key: "github",
      label: "GitHub",
      value: CHANNELS.github.replace(/^https?:\/\/(www\.)?/, ""),
      href: CHANNELS.github,
      external: true,
    },
  ].filter(Boolean);

  const underline = (invalid) => (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: invalid ? "var(--signal)" : "var(--line-strong)" }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-[300ms] ease-expo peer-focus:scale-x-100"
        style={{ background: "var(--signal)" }}
      />
    </>
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="shell section relative z-10"
    >
      <SectionHead
        id="contact"
        index="06"
        eyebrow={t("nav_contact", "Contact")}
        title={t("contact_title_new")}
        lede={t("contact_lede")}
      />

      <div className="grid gap-x-10 gap-y-14 md:grid-cols-12">
        {/* ---- the facts ---- */}
        <div className="md:col-span-4">
          <dl className="space-y-6">
            <div>
              <dt className="label">{t("spec_base", "Based")}</dt>
              <dd className="mt-2 text-base">
                {PRACTICE.locality}, {t("country_lt", "Lithuania")}
              </dd>
            </div>
            <div>
              <dt className="label">{t("local_time", "Local time")}</dt>
              <dd className="mt-2 text-base">
                <LiveClock />
              </dd>
            </div>
            <div>
              <dt className="label">{t("response", "Response")}</dt>
              <dd className="mt-2 text-base">{t("response_value")}</dd>
            </div>
            <div>
              <dt className="label">{t("spec_languages", "Languages")}</dt>
              <dd className="mt-2 text-base">{t("spec_languages_value")}</dd>
            </div>
          </dl>

          {channels.length > 0 && (
            <>
              <Rule className="my-8" />
              <dl className="space-y-4">
                {channels.map((c) => (
                  <div key={c.key}>
                    <dt className="label">{c.label}</dt>
                    <dd className="mt-2">
                      <a
                        href={c.href}
                        className="signal-link text-base"
                        {...(c.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {c.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          <Rule className="my-8" />

          <Reveal>
            <p className="copy-sm max-w-[36ch]">
              {t("contact_note")}
            </p>
          </Reveal>
        </div>

        {/* ---- the brief ---- */}
        <div className="md:col-span-7 md:col-start-6">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.base, ease: EASE }}
                className="border p-8"
                style={{ borderColor: "var(--signal)" }}
                role="status"
              >
                <span className="label" style={{ color: "var(--signal)" }}>
                  {t("state_sent", "Sent")}
                </span>
                <p className="mt-4 text-xl font-semibold tracking-display">
                  {t("form_sent_success")}
                </p>
                <p className="copy-sm mt-3 max-w-[46ch]">
                  {t("form_sent_note")}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="signal-link mt-6 text-sm font-semibold"
                >
                  {t("form_send_another", "Send another")}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                initial={false}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-10">
                  {FIELDS.map((f) => {
                    const invalid = !!fieldErrors[f.name];
                    return (
                      <div key={f.name} className="group">
                        <label
                          htmlFor={`field-${f.name}`}
                          className="label flex items-baseline gap-3"
                        >
                          <span className="transition-colors group-focus-within:text-[color:var(--signal)]">
                            {f.index}
                          </span>
                          {t(f.labelKey)}
                        </label>

                        <div className="relative mt-3">
                          <input
                            id={`field-${f.name}`}
                            name={f.name}
                            type={f.type}
                            autoComplete={f.autoComplete}
                            placeholder={t(f.placeholderKey)}
                            aria-invalid={invalid || undefined}
                            aria-describedby={invalid ? `err-${f.name}` : undefined}
                            onInput={() => clearError(f.name)}
                            className="peer w-full border-0 bg-transparent px-0 py-3 text-[1.0625rem] text-ink outline-none placeholder:text-ink-3"
                          />
                          {underline(invalid)}
                        </div>

                        {invalid && (
                          <p id={`err-${f.name}`} className="copy-sm mt-2 text-ink">
                            {fieldErrors[f.name]}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div className="group">
                    <label
                      htmlFor="field-message"
                      className="label flex items-baseline gap-3"
                    >
                      <span className="transition-colors group-focus-within:text-[color:var(--signal)]">
                        03
                      </span>
                      {t("form_message", "Brief")}
                    </label>
                    <div className="relative mt-3">
                      <textarea
                        id="field-message"
                        name="message"
                        rows={6}
                        placeholder={t("form_brief_placeholder")}
                        aria-invalid={!!fieldErrors.message || undefined}
                        aria-describedby={
                          fieldErrors.message ? "err-message" : "hint-message"
                        }
                        ref={autosize}
                        onInput={(e) => {
                          clearError("message");
                          grow(e.currentTarget);
                        }}
                        className="autogrow peer w-full border-0 bg-transparent px-0 py-3 text-[1.0625rem] text-ink outline-none placeholder:text-ink-3"
                      />
                      {underline(!!fieldErrors.message)}
                    </div>
                    {fieldErrors.message ? (
                      <p id="err-message" className="copy-sm mt-2 text-ink">
                        {fieldErrors.message}
                      </p>
                    ) : (
                      <p id="hint-message" className="copy-sm mt-3">
                        {t("form_brief_hint")}
                      </p>
                    )}
                  </div>

                  <div aria-live="polite" role="status">
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={reduced ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: DUR.base, ease: EASE }}
                          className="border-l-2 py-2 pl-4 text-sm"
                          style={{ borderColor: "var(--signal)" }}
                        >
                          <span className="label mr-3">{t("state_error", "Error")}</span>
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative inline-flex min-w-[14rem] items-center justify-between gap-6 overflow-hidden border px-6 py-4 text-sm font-semibold disabled:cursor-wait"
                      style={{ borderColor: "var(--signal)" }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[300ms] ease-expo group-hover:scale-x-100 group-disabled:scale-x-0"
                        style={{ background: "var(--signal)" }}
                      />
                      <span className="relative transition-colors duration-200 group-hover:text-base">
                        {sending
                          ? t("form_sending", "Sending...")
                          : t("form_send", "Send brief")}
                      </span>
                      {sending ? (
                        <motion.span
                          aria-hidden="true"
                          className="relative block h-3 w-3 border"
                          style={{ borderColor: "var(--signal)" }}
                          animate={reduced ? undefined : { rotate: 360 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="relative font-mono text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:text-base"
                        >
                          →
                        </span>
                      )}
                    </button>

                    <p className="copy-sm max-w-[34ch] text-sm">
                      {t("privacy_note")}
                    </p>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
