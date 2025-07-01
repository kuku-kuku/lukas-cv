import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Darbai() {
  const { t, i18n } = useTranslation();

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen font-poppins transition">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 transition-colors duration-500">{t("works")}</h2>

        <motion.div
          key={i18n.language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
        >
          <p className="text-xl mb-4">
            {t("works_intro_1")}{" "}
            <strong>{t("works_intro_2")}</strong> 😄
          </p>
          <p className="text-gray-700 dark:text-gray-300">{t("works_outro")}</p>
        </motion.div>
      </div>
    </div>
  );
}
