import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Send, User, MessageSquare, Check, AlertCircle, X } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const formRef = useRef(null);

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

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
        throw new Error("Neteisingai sukonfigūruoti EmailJS aplinkos kintamieji.");
      }
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      formRef.current?.reset();
      setFormSuccess(t("form_sent_success", "Žinutė išsiųsta! Atsakysiu per 24 val."));
    } catch (err) {
      console.error("Email send error:", err);
      setFormError("Klaida siunčiant žinutę: " + safeErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  useEffect(() => {
    if (formSuccess) {
      const timer = setTimeout(() => setFormSuccess(""), 6000);
      return () => clearTimeout(timer);
    }
  }, [formSuccess]);

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-4 md:px-8"
      style={{
        paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Subtle background - matching Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        {/* Section Header - matching Hero style */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/[0.02] border-white/[0.08] text-white/60 backdrop-blur-sm mb-4">
            <span>{t("contact_badge", "Susisiekime")}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("contact_title", "Pradėkime projektą")}
          </h2>

          <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            {t(
              "contact_subtitle",
              "Turite idėją? Papasakokite apie ją ir kartu sukursime kažką nuostabaus."
            )}
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/[0.02] border border-white/10 rounded-2xl p-8"
        >
          <div className="space-y-6">
            {/* Name field */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t("form_name", "Vardas")} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder={t("form_name_placeholder", "Jūsų vardas")}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400/50 focus:bg-white/10 transition-all outline-none text-white placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t("form_email", "El. paštas")} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder={t("form_email_placeholder", "jusu@email.lt")}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400/50 focus:bg-white/10 transition-all outline-none text-white placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t("form_message", "Žinutė")} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
                <textarea
                  name="message"
                  placeholder={t("form_message_placeholder", "Papasakokite apie savo projektą...")}
                  rows={6}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400/50 focus:bg-white/10 transition-all outline-none text-white placeholder:text-white/30 resize-none"
                />
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative bg-red-500/10 border border-red-500/20 text-white rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    <span className="flex-1 text-sm">{formError}</span>
                    <button
                      type="button"
                      onClick={() => setFormError("")}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {formSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative bg-emerald-500/10 border border-emerald-500/20 text-white rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                    <span className="flex-1 text-sm font-medium">{formSuccess}</span>
                    <button
                      type="button"
                      onClick={() => setFormSuccess("")}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <button
              type="submit"
              disabled={sending}
              className="w-full relative px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  {t("form_sending", "Siunčiama...")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t("form_send", "Siųsti žinutę")}
                </>
              )}
            </button>

            {/* Privacy note */}
            <p className="text-xs text-center text-white/40">
              {t(
                "privacy_note",
                "Jūsų duomenys yra saugūs ir niekada nebus perduoti tretiesiems asmenims"
              )}
            </p>
          </div>
        </motion.form>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center space-y-2"
        >
          <p className="text-sm text-white/50">
            📍 {t("location", "Klaipėda, Lietuva")}
          </p>
          <p className="text-sm text-white/50">
            {t("availability", "Prieinamas projektams")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}