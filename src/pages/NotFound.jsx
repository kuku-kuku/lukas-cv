import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import background from "../assets/background.jpg";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white font-poppins">
      <img
        src={background}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/70" />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold mb-4">{t("not_found_title")}</h1>
        <p className="text-xl mb-8">{t("not_found_subtitle")}</p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-3 bg-white text-black rounded-xl hover:bg-gray-300 transition font-medium"
        >
          ← {t("back_home")}
        </Link>
      </div>
    </div>
  );
}
