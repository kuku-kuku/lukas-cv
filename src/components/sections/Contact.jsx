import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import SectionHead from "../SectionHead";
import LiveClock from "../LiveClock";
import Reveal from "../motion/Reveal";
import Rule from "../motion/Rule";
import { PRACTICE } from "../../design/content";
import { DUR, EASE } from "../../design/motion";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 06 - CONTACT
 *
 * The delivery mechanism is unchanged from the previous site on purpose: the
 * same EmailJS template, the same three field names (name / email / message),
 * the same environment variables. Changing any of those would silently break
 * a working inbox, which is not a design decision worth making.
 *
 * What changed is everything around it: the form is framed as a technical
 * brief, state is announced through a polite live region instead of only
 * colour, and the native caret is back (the old global
 * `caret-color: transparent` rule made every input look dead while typing).
 */

const FIELDS = [
  { index: "01", name: "name", type: "text", labelKey: "form_name", placeholderKey: "form_name_placeholder" },
  { index: "02", name: "email", type: "email", labelKey: "form_email", placeholderKey: "form_email_placeholder" },
];

export default function Contact() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    setSuccess("");

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error(t("form_error_config", "The message service is not configured."));
      }
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      formRef.current?.reset();
      setSuccess(t("form_sent_success", "Message sent. I reply within 24 hours."));
    } catch (err) {
      console.error("Email send error:", err);
      setError(`${t("form_error_prefix", "Could not send the message")}: ${describe(err)}`);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!error) return undefined;
    const timer = setTimeout(() => setError(""), 8000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (!success) return undefined;
    const timer = setTimeout(() => setSuccess(""), 8000);
    return () => clearTimeout(timer);
  }, [success]);

  const inputClass =
    "w-full border-0 border-b bg-transparent px-0 py-3 text-[1.0625rem] text-ink outline-none transition-colors duration-200 placeholder:text-ink-3 focus:border-b-[var(--signal)]";

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
              <dd className="mt-2 text-[0.9375rem]">
                {PRACTICE.locality}, {t("country_lt", "Lithuania")}
              </dd>
            </div>
            <div>
              <dt className="label">{t("local_time", "Local time")}</dt>
              <dd className="mt-2 text-[0.9375rem]">
                <LiveClock />
              </dd>
            </div>
            <div>
              <dt className="label">{t("response", "Response")}</dt>
              <dd className="mt-2 text-[0.9375rem]">{t("response_value")}</dd>
            </div>
            <div>
              <dt className="label">{t("spec_languages", "Languages")}</dt>
              <dd className="mt-2 text-[0.9375rem]">{t("spec_languages_value")}</dd>
            </div>
          </dl>

          <Rule className="my-8" />

          <Reveal>
            <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-2">
              {t("contact_note")}
            </p>
          </Reveal>
        </div>

        {/* ---- the brief ---- */}
        <div className="md:col-span-7 md:col-start-6">
          <form ref={formRef} onSubmit={handleSubmit} noValidate={false}>
            <div className="space-y-10">
              {FIELDS.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`field-${field.name}`}
                    className="label flex items-baseline gap-3"
                  >
                    <span style={{ color: "var(--signal)" }}>{field.index}</span>
                    {t(field.labelKey)}
                  </label>
                  <input
                    id={`field-${field.name}`}
                    name={field.name}
                    type={field.type}
                    required
                    autoComplete={field.name === "email" ? "email" : "name"}
                    placeholder={t(field.placeholderKey)}
                    className={`${inputClass} mt-3`}
                    style={{ borderColor: "var(--line-strong)" }}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="field-message" className="label flex items-baseline gap-3">
                  <span style={{ color: "var(--signal)" }}>03</span>
                  {t("form_message", "Brief")}
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={6}
                  required
                  placeholder={t("form_brief_placeholder")}
                  className={`${inputClass} mt-3 resize-y`}
                  style={{ borderColor: "var(--line-strong)" }}
                />
                <p className="mt-3 text-[0.8125rem] text-ink-3">{t("form_brief_hint")}</p>
              </div>

              {/* status: announced, not only coloured */}
              <div aria-live="polite" role="status">
                <AnimatePresence mode="wait">
                  {(error || success) && (
                    <motion.p
                      key={error || success}
                      initial={reduced ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DUR.base, ease: EASE }}
                      className="border-l-2 py-2 pl-4 text-sm"
                      style={{
                        borderColor: error ? "var(--signal)" : "var(--ink)",
                        color: "var(--ink)",
                      }}
                    >
                      <span className="label mr-3">
                        {error ? t("state_error", "Error") : t("state_sent", "Sent")}
                      </span>
                      {error || success}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={sending}
                  className="group relative inline-flex min-w-[14rem] items-center justify-between gap-6 overflow-hidden border px-6 py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ borderColor: "var(--signal)" }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[320ms] ease-expo group-hover:scale-y-100 group-disabled:scale-y-0"
                    style={{ background: "var(--signal)" }}
                  />
                  <span className="relative transition-colors duration-200 group-hover:text-base">
                    {sending ? t("form_sending", "Sending…") : t("form_send", "Send brief")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative font-mono text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:text-base"
                  >
                    {sending ? "···" : "→"}
                  </span>
                </button>

                <p className="max-w-[28ch] text-[0.75rem] leading-relaxed text-ink-3">
                  {t("privacy_note")}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
