import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import bg from "../assets/background.jpg";

export default function Kontaktai() {
  const { t } = useTranslation();
  const [formVisible, setFormVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const formRef = useRef();

  const toggleForm = () => {
    setFormVisible((prev) => !prev);
    setFormError("");
    setFormSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setFormError("");
    setFormSuccess("");

    if (!verified) {
      setFormError(t("form_verify"));
      setSending(false);
      return;
    }

    emailjs
      .sendForm(
        "service_5gekaqp",
        "template_p67o8xe",
        formRef.current,
        "XcHeNZOOUKJAmAR4p"
      )
      .then(() => {
        formRef.current.reset();
        setVerified(false);
        setSending(false);
        setFormVisible(false);

        setTimeout(() => {
          setFormSuccess(t("form_sent_placeholder"));
        }, 500);
      })
      .catch((error) => {
        setFormError("Klaida siunčiant žinutę: " + error.text);
        setSending(false);
      });
  };

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

  return (
    <motion.div
      key={t("contact")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-28 pb-20 px-4 md:px-8 text-white min-h-screen font-poppins overflow-hidden"
    >
      {/* Fonas */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          src={bg}
          alt="Background"
          className="w-full h-full object-cover object-left sm:object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t("contact")}
        </motion.h2>

        <motion.p
          className="text-lg mb-10 whitespace-pre-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t("contact_intro")}
        </motion.p>

        <button
          onClick={toggleForm}
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition-all"
        >
          {t("contact_button")}
        </button>

        {/* Sėkmės pranešimas */}
        <AnimatePresence>
          {!formVisible && formSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4 }}
              className="mt-6 max-w-md mx-auto bg-white text-green-700 text-center font-semibold rounded-xl px-6 py-4 shadow-md border border-green-400 flex justify-between items-center"
            >
              <span className="flex-1">{formSuccess}</span>
              <button
                onClick={() => setFormSuccess("")}
                className="ml-4 text-lg font-bold hover:scale-110 transition-transform text-green-600"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forma */}
        <AnimatePresence>
          {formVisible && (
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-10 bg-white/90 text-gray-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto text-left flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder={t("form_name")}
                required
                className="p-3 rounded border"
              />
              <input
                type="email"
                name="email"
                placeholder={t("form_email")}
                required
                className="p-3 rounded border"
              />
              <textarea
                name="message"
                placeholder={t("form_message")}
                rows="4"
                required
                className="p-3 rounded border resize-none"
              ></textarea>

              {/* Klaidos pranešimas */}
              <AnimatePresence>
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white text-red-600 text-center font-medium rounded-md shadow px-4 py-3 border border-red-300"
                  >
                    <div className="flex justify-between items-center">
                      <span className="flex-1">{formError}</span>
                      <button
                        onClick={() => setFormError("")}
                        className="ml-4 text-lg font-bold hover:scale-110 transition-transform text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="self-center">
                <ReCAPTCHA
                  sitekey="6Ld1vHYrAAAAAPuyK6bnW_UMKpT2pGv3qsza9yox"
                  onChange={() => setVerified(true)}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                {sending ? t("form_sending") : t("form_send")}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
