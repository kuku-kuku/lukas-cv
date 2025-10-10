import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Send, User, MessageSquare, Check, AlertCircle, Sparkles, X } from "lucide-react";

export default function Kontaktai() {
  const { t } = useTranslation();

  const [formVisible, setFormVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const formRef = useRef(null);

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const toggleForm = () => {
    setFormVisible((prev) => !prev);
    setFormError("");
    setFormSuccess("");
  };

  function safeErrorMessage(err) {
    if (!err) return "Nežinoma klaida";
    if (typeof err === "string") return err;
    return (
      err?.text ||
      err?.message ||
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.status ||
      "Nežinoma klaida"
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setFormError("");
    setFormSuccess("");

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("Neteisingai sukonfigūruoti EmailJS aplinkos kintamieji (REACT_APP_*).");
      }
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      formRef.current?.reset();
      setFormVisible(false);
      setTimeout(() => setFormSuccess(t("form_sent_placeholder")), 300);
    } catch (err) {
      console.error("Email send error:", err);
      setFormError("Klaida siunčiant žinutę: " + safeErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  // auto hide toasts
  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  useEffect(() => {
    if (formSuccess) {
      const timer = setTimeout(() => setFormSuccess(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [formSuccess]);

  // global horizontal clip
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("overflow-x-clip");
    body.classList.add("overflow-x-clip");
    return () => {
      html.classList.remove("overflow-x-clip");
      body.classList.remove("overflow-x-clip");
    };
  }, []);

  // body scroll lock kai modalas atidarytas
  useEffect(() => {
    if (!formVisible) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    body.style.overflow = "hidden";
    body.style.position = "relative";
    return () => {
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
    };
  }, [formVisible]);

  return (
    <motion.div
      key={t("contact")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-28 pb-20 px-4 md:px-8 text-white min-h-screen font-poppins overflow-x-clip"
    >
      {/* Dekorai (klipuoti) */}
      <div className="absolute top-32 right-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse pointer-events-none overflow-x-clip" />
      <div className="absolute bottom-32 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none overflow-x-clip" style={{ animationDelay: "1s" }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-white/80">{t("lets_connect")}</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
            {t("contact")}
          </h2>

          <motion.p
            className="text-lg md:text-xl text-white/70 whitespace-pre-line max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t("contact_intro")}
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={toggleForm}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-2xl hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-violet-500/50 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <Mail className="w-5 h-5 relative z-10" />
          <span className="relative z-10">{t("contact_button")}</span>
        </motion.button>

        {/* Success toast */}
        <AnimatePresence>
          {!formVisible && formSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mt-8 max-w-md mx-auto"
            >
              <div className="relative bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl px-6 py-4 shadow-xl border border-emerald-400/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="flex-1 font-semibold text-left">{formSuccess}</span>
                  <button onClick={() => setFormSuccess("")} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal form */}
        <AnimatePresence>
          {formVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] overflow-y-auto overscroll-contain"
              onClick={toggleForm}
              role="dialog"
              aria-modal="true"
              onKeyDown={(e) => e.key === "Escape" && setFormVisible(false)}
              style={{ height: "100dvh" }} /* pilnas aukštis mobiluose */
            >
              {/* 
                Mobile: items-start (prasideda žemiau navbar/Notch)
                Desktop (md+): items-center (tiksliai centruojam)
              */}
              <div
                className="min-h-full w-full flex justify-center p-4 sm:p-6 items-start md:items-center"
                style={{
                  paddingTop: "max(env(safe-area-inset-top), var(--navbar-h, 64px))",
                  paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
                }}
              >
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-lg sm:max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
                >
                  {/* Vidinis scroll: mobile – iki (100dvh - viršutinis/apatinis tarpas); desktop – 90vh */}
                  <div className="max-h-[calc(100dvh-120px)] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-8">
                    {/* Dekorai – klipuoti */}
                    <div className="absolute inset-0 pointer-events-none overflow-x-clip z-0">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                    </div>

                    {/* Close – visada matomas, su safe-area margin */}
                    <button
                      type="button"
                      onClick={() => setFormVisible(false)}
                      className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 z-20"
                      aria-label={t("close")}
                      style={{ marginTop: "env(safe-area-inset-top)" }}
                    >
                      <X className="w-5 h-5 text-white/90" />
                    </button>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-6 sm:mb-8">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                          {t("contact_dialog_title")}
                        </h3>
                        <p className="text-white/60">{t("contact_dialog_subtitle")}</p>
                      </div>

                      {/* Fields */}
                      <div className="space-y-5 mb-6">
                        <div className="group">
                          <label className="block text-sm font-medium text-white/80 mb-2">{t("form_name")}</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-violet-400 transition-colors" />
                            <input
                              type="text"
                              name="name"
                              placeholder={t("form_name_placeholder")}
                              required
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-violet-400/50 focus:bg-white/10 transition-all outline-none text-white placeholder:text-white/40"
                            />
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-white/80 mb-2">{t("form_email")}</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-violet-400 transition-colors" />
                            <input
                              type="email"
                              name="email"
                              placeholder={t("form_email_placeholder")}
                              required
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-violet-400/50 focus:bg-white/10 transition-all outline-none text-white placeholder:text-white/40"
                            />
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-white/80 mb-2">{t("form_message")}</label>
                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40 group-focus-within:text-violet-400 transition-colors" />
                            <textarea
                              name="message"
                              placeholder={t("form_message_placeholder")}
                              rows={5}
                              required
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-violet-400/50 focus:bg-white/10 transition-all outline-none text-white placeholder:text-white/40 resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {formError && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6">
                            <div className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl px-4 py-3 border border-red-400/30 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                              <div className="relative flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="flex-1 text-sm font-medium">{formError}</span>
                                <button type="button" onClick={() => setFormError("")} className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={{ scale: sending ? 1 : 1.02 }}
                        whileTap={{ scale: sending ? 1 : 0.98 }}
                        className="w-full relative group bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-violet-500/50 overflow-hidden"
                        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1rem)" }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <span className="relative flex items-center justify-center gap-2 z-10">
                          {sending ? (
                            <>
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                              {t("form_sending")}
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              {t("form_send")}
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
