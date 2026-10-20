import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

export default function StickyNav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language?.startsWith("lt") ? "en" : "lt";
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { id: "hero", label: t("nav_home", "Pradžia"), icon: "🏠" },
    { id: "about", label: t("nav_about", "Apie"), icon: "👤" },
    { id: "services", label: t("nav_services", "Paslaugos"), icon: "⚡" },
    { id: "works", label: t("nav_works", "Darbai"), icon: "💼" },
    { id: "contact", label: t("nav_contact", "Kontaktai"), icon: "✉️" },
  ];

  return (
    <>
      {/* Desktop Navigation - Transforms to left sidebar on scroll */}
      <motion.nav
        animate={{
          top: scrolled ? "50%" : "2rem",
          left: scrolled ? "1.5rem" : "50%",
          x: scrolled ? 0 : "-50%",
          y: scrolled ? "-50%" : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className="hidden md:block fixed z-40"
        style={{ willChange: "transform" }}
      >
        <motion.div
          animate={{
            flexDirection: scrolled ? "column" : "row",
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={`flex items-center gap-3 transition-all duration-400 ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-violet-500/20"
              : "bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-8 py-4"
          }`}
          style={{ willChange: "flex-direction" }}
        >
          {navLinks.map((link, idx) => (
            <motion.button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className={`group transition-all duration-300 ${
                scrolled
                  ? "flex items-center justify-start gap-3 px-4 py-3 rounded-xl hover:bg-white/10 w-full min-w-[160px]"
                  : "flex items-center justify-center px-6 py-2 rounded-full hover:bg-white/10"
              }`}
              style={{ willChange: "transform" }}
            >
              {/* Icon - smooth fade in/out */}
              <motion.span
                animate={{
                  opacity: scrolled ? 1 : 0,
                  scale: scrolled ? 1 : 0.5,
                  width: scrolled ? "1.25rem" : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-xl flex-shrink-0 overflow-hidden"
              >
                {link.icon}
              </motion.span>

              {/* Label - prevent text shifting */}
              <motion.span
                className={`text-white/90 group-hover:text-white font-medium transition-colors text-sm whitespace-nowrap ${
                  scrolled ? "" : "text-center"
                }`}
              >
                {link.label}
              </motion.span>
            </motion.button>
          ))}

          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-center gap-2 text-white/80 hover:text-white transition-all ${
              scrolled
                ? "px-4 py-3 rounded-xl hover:bg-white/10 border-t border-white/10 mt-2 w-full min-w-[160px]"
                : "px-6 py-2 rounded-full hover:bg-white/10 border-l border-white/10 ml-3"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium uppercase whitespace-nowrap">
              {i18n.language?.startsWith("lt") ? "LT" : "EN"}
            </span>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation - Top bar with hamburger */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">
                {i18n.language?.startsWith("lt") ? "LT" : "EN"}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-black/95 backdrop-blur-xl border-l border-white/10"
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 64px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <div className="p-8 space-y-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center gap-3 w-full text-left text-xl text-white hover:text-violet-400 transition-colors py-3 border-b border-white/10"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span>{link.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}