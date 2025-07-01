import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import me from "../assets/me.jpg";

export default function Apie() {
  const { t, i18n } = useTranslation();

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen font-poppins transition">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <img
            src={me}
            alt="Lukas Beneta"
            className="rounded-xl shadow-xl w-full md:w-1/3 object-cover"
          />

          {/* Animate ONLY this content */}
          <motion.div
            key={i18n.language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl"
          >
            <p className="mb-6">{t("about_p1")}</p>
            <p className="mb-6">{t("about_p2")}</p>
            <p className="mb-6">{t("about_p3")}</p>
            <p className="mb-6">{t("about_p4")}</p>
            <p>{t("about_p5")}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
