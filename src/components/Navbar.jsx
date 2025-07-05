import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftCircle } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "lt" ? "en" : "lt";
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { to: "/apie", label: t("about") },
    { to: "/paslaugos", label: t("services") },
    { to: "/darbai", label: t("works") },
    { to: "/kontaktai", label: t("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md text-white shadow-md font-poppins transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Rodyklė į pradžią */}
          <Link
            to="/"
            className="group flex items-center hover:text-blue-500 transition duration-300"
          >
            <ChevronLeftCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </Link>

          {/* Desktop navigacija */}
          <div className="hidden md:flex space-x-10 text-lg font-medium">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center justify-center h-full transition-colors duration-200 ${
                  location.pathname === to
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={i18n.language + label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="transition-transform duration-200 hover:scale-105"
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Kalbos perjungimas + burger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-white rounded hover:bg-white hover:text-black text-sm transition-colors duration-300"
            >
              {i18n.language === "lt" ? "EN" : "LT"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden ml-2 text-2xl focus:outline-none"
              title="Meniu"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobilus meniu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ scaleY: 0.95, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden origin-top bg-black/70 backdrop-blur-md shadow-inner overflow-hidden px-6 py-6 flex flex-col items-center gap-4 text-lg font-medium text-white"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center transition-colors duration-200 ${
                  location.pathname === to
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500"
                }`}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
