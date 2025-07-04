import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import me from "../assets/me.jpg";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");

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
  };

  return (
    <div className="relative h-screen w-full font-poppins">
      {/* Fonas */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${me})` }}
      ></div>

      {/* Gradientas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>

      {/* Kalbos mygtukas viršuje */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 border border-white rounded hover:bg-white hover:text-black text-sm text-white transition"
        >
          {i18n.language === "lt" ? "EN" : "LT"}
        </button>
      </div>

      {/* Hero turinys */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          {t("heroText")}
        </h1>

        <div className="h-6 md:h-10" />

        {/* Mygtukai */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 w-full max-w-md">
          <Link
            to="/apie"
            className="w-full sm:w-auto text-center bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t("about")}
          </Link>
          <Link
            to="/paslaugos"
            className="w-full sm:w-auto text-center bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t("services")}
          </Link>
          <Link
            to="/darbai"
            className="w-full sm:w-auto text-center bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t("works")}
          </Link>
          <Link
            to="/kontaktai"
            className="w-full sm:w-auto text-center bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
