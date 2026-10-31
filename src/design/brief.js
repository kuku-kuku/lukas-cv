import emailjs from "@emailjs/browser";

/**
 * The one place a brief gets validated and sent.
 *
 * Both the contact section and the quote drawer submit the same thing to the
 * same EmailJS template, so the logic lives here rather than in each
 * component. The field names - name, email, message - are fixed by that
 * template; renaming one silently breaks a working inbox.
 *
 * Anything extra a visitor chooses (a package, a budget range) is composed
 * into `message` rather than sent as its own field. An extra field needs a
 * matching placeholder in the EmailJS template, and if that placeholder were
 * ever missing the answer would be dropped without any error - the worst
 * kind of failure for a sales enquiry.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SERVICE_ID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

/** Returns a map of field name -> message. Empty means valid. */
export function validateBrief({ name, email, message }, t) {
  const errors = {};
  if (!name || name.trim().length < 2) {
    errors.name = t("err_name", "Please enter your name.");
  }
  if (!EMAIL_RE.test((email || "").trim())) {
    errors.email = t("err_email", "Enter a valid email address.");
  }
  if (!message || message.trim().length < 20) {
    errors.message = t("err_message", "A sentence or two, please.");
  }
  return errors;
}

/** Turns an EmailJS failure into something worth showing a visitor. */
export function describeError(err, t) {
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

/**
 * Sends a form element through EmailJS.
 * Throws on a missing configuration so the caller can say so plainly rather
 * than appearing to succeed.
 */
export async function sendBrief(formEl, t) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      t("form_error_config", "The message service is not configured.")
    );
  }
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formEl, {
    publicKey: PUBLIC_KEY,
  });
}

/** Budget bands offered in the drawer. Plain ranges, not package names. */
export const BUDGETS = [
  { id: "under500", key: "budget_under500" },
  { id: "500to1000", key: "budget_500to1000" },
  { id: "1000to2000", key: "budget_1000to2000" },
  { id: "over2000", key: "budget_over2000" },
  { id: "unsure", key: "budget_unsure" },
];
