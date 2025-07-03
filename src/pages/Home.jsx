import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import me from "../assets/me.jpg";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen w-full font-poppins">
      {/* Fonas */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${me})` }}
      ></div>
      {/* Pusiau permatomas gradientas virš fono */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>

      {/* Hero turinys */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          {t('heroText')} <br />
        </h1>

        <div className="h-6 md:h-10" />

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/apie"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t('about')}
          </Link>
          <Link
            to="/paslaugos"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t('services')}
          </Link>
          <Link
            to="/darbai"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t('works')}
          </Link>
          <Link
            to="/kontaktai"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 hover:bg-gray-100 transition"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </div>
  );
}
