import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react"; // ← graži rodyklė

export default function Navbar() {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme || "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

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
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 font-poppins text-gray-800 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ← Rodyklė vietoj logotipo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="hidden sm:inline text-sm font-medium">{t("back") || "Back"}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-10 text-lg font-medium">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center justify-center h-full hover:text-indigo-600 transition-colors duration-200 ${
                  location.pathname === to ? "text-indigo-600 font-semibold" : ""
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={i18n.language + label + theme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-800 dark:text-white transition-transform duration-200 hover:scale-105"
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="text-xl hover:scale-110 transition"
              title="Perjungti temą"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-gray-800 dark:border-white rounded hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-sm transition-colors duration-300"
            >
              {i18n.language === "lt" ? "EN" : "LT"}
            </button>

            {/* Mobile menu button */}
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

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden origin-top bg-white dark:bg-gray-900 shadow-inner overflow-hidden px-6 py-4 space-y-4 text-lg font-medium"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block hover:text-indigo-600 transition-colors duration-200 ${
                  location.pathname === to ? "text-indigo-600 font-semibold" : ""
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
