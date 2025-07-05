import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import bg from "../assets/background.jpg"; // bendras fonas

export default function Darbai() {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative pt-28 pb-20 px-4 md:px-8 text-white min-h-screen font-poppins transition overflow-hidden">
      {/* Fonas */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          src={bg}
          alt="Background"
          className="w-full h-full object-cover object-left sm:object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-10">{t("works")}</h2>

        <motion.p
          key={i18n.language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg text-white"
        >
          {t("works_intro_1")} <strong>{t("works_intro_2")}</strong> 
          <br />
          {t("works_outro")}
        </motion.p>
      </div>
    </section>
  );
}
