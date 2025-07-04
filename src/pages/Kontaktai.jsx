import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

export default function Kontaktai() {
  const { t } = useTranslation();
  const [formVisible, setFormVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });
  const formRef = useRef();

  const toggleForm = () => {
    setFormVisible((prev) => !prev);
    setPopup({ message: "", type: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setPopup({ message: "", type: "" });

    if (!verified) {
      setPopup({ message: t("form_verify"), type: "error" });
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
        setPopup({ message: t("form_sent_placeholder"), type: "success" });
        formRef.current.reset();
        setVerified(false);
        setFormVisible(false);
        setSending(false);
      })
      .catch((error) => {
        setPopup({
          message: "Klaida siunčiant žinutę: " + error.text,
          type: "error",
        });
        setSending(false);
      });
  };

  useEffect(() => {
    if (popup.message) {
      const timer = setTimeout(() => {
        setPopup({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <motion.div
      key={t("contact")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-28 pb-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen font-poppins transition-colors duration-500"
    >
      {/* Gražus pranešimas */}
      <AnimatePresence>
        {popup.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`fixed ${
              formVisible ? "top-52" : "top-60"
            } inset-x-0 z-50 mx-auto max-w-md w-full px-6 py-4 rounded-2xl border shadow-xl
            bg-white dark:bg-gray-800 text-center text-base font-normal md:text-lg tracking-wide text-gray-900 dark:text-gray-100`}
          >
            <div className="flex justify-between items-center">
              <span className="flex-1 text-center">{popup.message}</span>
              <button
                onClick={() => setPopup({ message: "", type: "" })}
                className="ml-4 text-lg font-bold hover:scale-110 transition-transform text-gray-700 dark:text-gray-300"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Turinys */}
      <div className="max-w-3xl mx-auto text-center">
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

        <AnimatePresence>
          {formVisible && (
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl mx-auto text-left flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder={t("form_name")}
                required
                className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
              />
              <input
                type="email"
                name="email"
                placeholder={t("form_email")}
                required
                className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
              />
              <textarea
                name="message"
                placeholder={t("form_message")}
                rows="4"
                required
                className="p-3 rounded border resize-none dark:bg-gray-900 dark:border-gray-700"
              ></textarea>

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
