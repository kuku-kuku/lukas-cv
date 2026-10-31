import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BUDGETS, describeError, sendBrief, validateBrief } from "../design/brief";
import { PACKAGES } from "../design/content";
import { DUR, EASE } from "../design/motion";
import { useCompactViewport, useReducedMotion } from "../design/useMotionPrefs";

/**
 * QUOTE DRAWER
 *
 * Choosing a package used to scroll the visitor down to the contact
 * section - away from the prices they were comparing, with the decision
 * they just made left behind. The drawer keeps them where they are: the
 * chosen package is stated at the top, and the form is four fields.
 *
 * It sends through the same path as the contact section (src/design/brief),
 * so there is one template, one set of field names and one failure mode.
 * The package and the budget are composed into `message` rather than sent
 * as separate fields - see the note in brief.js.
 *
 * Accessibility: a real modal dialog. Focus moves in on open and returns to
 * the button that opened it, Escape closes, the page behind it cannot
 * scroll, and focus is kept inside while it is open.
 */
export default function QuoteDrawer({ packageId, onClose }) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const compact = useCompactViewport();

  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);
  const formRef = useRef(null);
  const returnFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [budget, setBudget] = useState("");

  const open = !!packageId;
  const pkg = PACKAGES.find((p) => p.id === packageId);

  // Remember what to give focus back to, and move focus into the panel.
  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep focus inside the dialog.
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus?.();
    };
    // `open` only: the handler reaches onClose through a ref, so this does
    // not tear down and re-arm on every parent render.
  }, [open]);

  // A fresh panel each time it opens.
  useEffect(() => {
    if (open) {
      setSent(false);
      setError("");
      setFieldErrors({});
      setBudget("");
    }
  }, [open, packageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    const form = formRef.current;
    const values = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    const invalid = validateBrief(values, t);
    setFieldErrors(invalid);
    if (Object.keys(invalid).length) {
      form.querySelector(`[name="${Object.keys(invalid)[0]}"]`)?.focus();
      return;
    }

    // Compose the choices into the message, then send the form as-is.
    const chosen = pkg ? `${t(pkg.titleKey)} (${t("pkg_from")} ${pkg.price} EUR)` : "";
    const band = budget ? t(BUDGETS.find((b) => b.id === budget).key) : "";
    const header = [
      chosen && `${t("pkg_choose")}: ${chosen}`,
      band && `${t("budget_label")}: ${band}`,
    ]
      .filter(Boolean)
      .join("\n");
    const original = form.message.value;
    if (header) form.message.value = `${header}\n\n${original}`;

    setSending(true);
    setError("");
    try {
      await sendBrief(form, t);
      setSent(true);
      form.reset();
    } catch (err) {
      console.error("Email send error:", err);
      form.message.value = original; // let them retry without a doubled header
      setError(`${t("form_error_prefix", "Could not send")}: ${describeError(err, t)}`);
    } finally {
      setSending(false);
    }
  };

  const clearError = (name) =>
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  const field = (name, type, labelKey, placeholderKey, ref) => (
    <div>
      <label htmlFor={`q-${name}`} className="label">
        {t(labelKey)}
      </label>
      <input
        id={`q-${name}`}
        ref={ref}
        name={name}
        type={type}
        autoComplete={name === "email" ? "email" : "name"}
        placeholder={t(placeholderKey)}
        aria-invalid={!!fieldErrors[name] || undefined}
        aria-describedby={fieldErrors[name] ? `q-err-${name}` : undefined}
        onInput={() => clearError(name)}
        className="mt-2 w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink outline-none placeholder:text-ink-3 focus:border-b-[color:var(--signal)]"
        style={{ borderColor: fieldErrors[name] ? "var(--signal)" : "var(--line-strong)" }}
      />
      {fieldErrors[name] && (
        <p id={`q-err-${name}`} className="mt-2 text-sm text-ink">
          {fieldErrors[name]}
        </p>
      )}
    </div>
  );

  const slide = compact ? { y: "100%" } : { x: "100%" };
  const rest = compact ? { y: 0 } : { x: 0 };

  return (
    /* Deliberately NOT wrapped in AnimatePresence.

       With it, the exit animation ran but the subtree was never unmounted,
       leaving a fixed inset-0 container at opacity 0 with pointer-events
       auto - an invisible sheet over the whole page that swallowed every
       click. Several shapes were tried (fragment, keyed array, single
       child, nested exits removed) and the node always survived.

       An exit animation is cosmetic; a page that stops responding is not.
       The drawer now mounts and unmounts plainly, animating only on the way
       in, so closing it cannot leave anything behind. */
    <>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : DUR.base }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            className="fixed z-[71] flex flex-col overflow-y-auto border-l p-6 md:p-8 inset-x-0 bottom-0 max-h-[92vh] md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[30rem]"
            style={{ background: "var(--bg-elev)", borderColor: "var(--line-strong)" }}
            initial={reduced ? false : slide}
            animate={rest}
            /* No exit here on purpose. AnimatePresence waits for every
               nested exit to report completion before it unmounts the
               subtree, and a second one on this panel left the dialog
               mounted after it had animated away - an invisible overlay
               over the whole page. The container's fade is the single
               exit, so removal is guaranteed. */
            transition={{ duration: reduced ? 0 : DUR.slow, ease: EASE }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="label" style={{ color: "var(--signal)" }}>
                  {t("pkg_choose")}
                </span>
                <h2 id="quote-title" className="display-m mt-2">
                  {pkg ? t(pkg.titleKey) : t("contact_title_new")}
                </h2>
                {pkg && (
                  <p className="nums mt-2 font-mono text-base text-ink-2">
                    {t("pkg_from")} {pkg.price} &euro; &middot; {pkg.duration}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("close", "Uždaryti")}
                className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center text-2xl"
              >
                &times;
              </button>
            </div>

            {sent ? (
              <div role="status" className="mt-8 border p-6" style={{ borderColor: "var(--signal)" }}>
                <span className="label" style={{ color: "var(--signal)" }}>
                  {t("state_sent")}
                </span>
                <p className="mt-3 text-xl font-semibold tracking-display">
                  {t("form_sent_success")}
                </p>
                <p className="copy-sm mt-3">{t("form_sent_note")}</p>
                <button type="button" onClick={onClose} className="signal-link mt-6 text-base font-semibold">
                  {t("close", "Uždaryti")}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                {field("name", "text", "form_name", "form_name_placeholder", firstFieldRef)}
                {field("email", "email", "form_email", "form_email_placeholder")}

                <div>
                  <label htmlFor="q-budget" className="label">
                    {t("budget_label")}
                  </label>
                  <select
                    id="q-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="mt-2 w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink outline-none"
                    style={{ borderColor: "var(--line-strong)" }}
                  >
                    <option value="">{t("budget_none")}</option>
                    {BUDGETS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {t(b.key)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="q-message" className="label">
                    {t("form_message")}
                  </label>
                  <textarea
                    id="q-message"
                    name="message"
                    rows={5}
                    placeholder={t("form_brief_placeholder")}
                    aria-invalid={!!fieldErrors.message || undefined}
                    aria-describedby={fieldErrors.message ? "q-err-message" : undefined}
                    onInput={() => clearError("message")}
                    className="autogrow mt-2 w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink outline-none placeholder:text-ink-3"
                    style={{
                      borderColor: fieldErrors.message
                        ? "var(--signal)"
                        : "var(--line-strong)",
                    }}
                  />
                  {fieldErrors.message && (
                    <p id="q-err-message" className="mt-2 text-sm text-ink">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <div aria-live="polite" role="status">
                  {error && (
                    <p
                      className="border-l-2 py-2 pl-4 text-sm"
                      style={{ borderColor: "var(--signal)" }}
                    >
                      <span className="label mr-3">{t("state_error")}</span>
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative inline-flex w-full items-center justify-between gap-4 overflow-hidden border px-6 py-4 text-base font-semibold disabled:cursor-wait"
                  style={{ borderColor: "var(--signal)" }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[300ms] ease-expo group-hover:scale-x-100 group-disabled:scale-x-0"
                    style={{ background: "var(--signal)" }}
                  />
                  <span className="relative transition-colors duration-200 group-hover:text-ground">
                    {sending ? t("form_sending") : t("form_send")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative font-mono text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ground"
                  >
                    {sending ? "···" : "→"}
                  </span>
                </button>

                <p className="copy-sm text-sm">{t("privacy_note")}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
