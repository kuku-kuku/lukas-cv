import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { t } = useTranslation();
  const [currentValue, setCurrentValue] = useState(0);

  const valueProps = [
    t("value_convert", "Svetainės, kurios konvertuoja"),
    t("value_scale", "Sprendimai, kurie auga kartu"),
    t("value_fast", "Greitai veikiantys produktai"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue((prev) => (prev + 1) % valueProps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [valueProps.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const stats = [
    { value: "10+", label: t("projects_completed", "Projektų užbaigta") },
    { value: "100%", label: t("satisfaction", "Klientų pasitenkinimas") },
    { value: "3+", label: t("years_exp", "Metų patirtis") },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{
        paddingTop: "calc(var(--navbar-h, 64px) + 2rem)",
        paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Clean status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/[0.02] border-white/[0.08] text-white/60 backdrop-blur-sm mb-8"
        >
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          <span>{t("available_work", "Priimamas naujiems projektams")}</span>
        </motion.div>

        {/* Main headline - clean typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
            <span className="block text-white mb-2">
              {t("hero_greeting", "Labas, esu Lukas")}
            </span>
            <span className="block text-white/90">
              {t("hero_title", "Web Developer")}
            </span>
          </h1>

          {/* Rotating value proposition */}
          <div className="h-16 sm:h-20 flex items-center justify-center">
            <motion.p
              key={currentValue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-white/70"
            >
              {valueProps[currentValue]}
            </motion.p>
          </div>
        </motion.div>

        {/* Subtitle with location */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t(
            "hero_subtitle",
            "Kuriu modernias, sparčiai veikiančias svetaines Lietuvos verslui. Specializuojuosi React ekosistemoje ir domiuosi naujausiomis technologijomis."
          )}
        </motion.p>

        {/* Clean CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <button
            onClick={() => scrollToSection("works")}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2"
          >
            <span>{t("view_work", "Peržiūrėti darbus")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 hover:border-white/20 transition-all"
          >
            {t("get_in_touch", "Susisiekti")}
          </button>
        </motion.div>

        {/* Clean stats - ADDED mb-24 for scroll indicator spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-24"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/30 cursor-pointer hover:text-white/50 transition-colors"
            onClick={() => scrollToSection("about")}
          >
            <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}