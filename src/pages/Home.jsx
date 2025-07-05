import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");
  const [langKey, setLangKey] = useState(i18n.language);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setTheme(saved || "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "lt" ? "en" : "lt";
    i18n.changeLanguage(newLang);
    setLangKey(newLang);
  };

  return (
    <div className="relative h-screen w-full font-poppins">
      {/* Kalbos mygtukas */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 border border-white rounded hover:bg-white hover:text-black text-sm text-white transition"
        >
          {i18n.language === "lt" ? "EN" : "LT"}
        </button>
      </div>

      {/* Tik tekstas keičiasi su animacija, visa kita – instant */}
      <motion.div
        key={langKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t("heroText")}
        </h1>

        <div className="h-6 md:h-10" />

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link
            to="/apie"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition min-w-[180px] text-center"
          >
            {t("about")}
          </Link>
          <Link
            to="/paslaugos"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition min-w-[180px] text-center"
          >
            {t("services")}
          </Link>
          <Link
            to="/darbai"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition min-w-[180px] text-center"
          >
            {t("works")}
          </Link>
          <Link
            to="/kontaktai"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition min-w-[180px] text-center"
          >
            {t("contact")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
