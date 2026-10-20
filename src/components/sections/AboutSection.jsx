import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Zap, Heart } from "lucide-react";

export default function AboutSection() {
  const { t, i18n } = useTranslation();

  const images = [
    "/me.jpg",
    "/assets/lukas-futbolas.jpg",
    "/assets/lukas-baras.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const principles = [
    {
      icon: Code2,
      title: t("principle_clean", "Clean Code"),
      desc: t("principle_clean_desc", "Rašau skaitomą, maintainable kodą"),
    },
    {
      icon: Zap,
      title: t("principle_performance", "Performance"),
      desc: t("principle_performance_desc", "Optimizuoju kiekvieną milisekundę"),
    },
    {
      icon: Heart,
      title: t("principle_user", "User-Centric"),
      desc: t("principle_user_desc", "Vartotojas visada centre"),
    },
  ];

  const skills = [
    { name: "React / Next.js", level: 90 },
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Node.js / Express", level: 75 },
    { name: "Git / GitHub", level: 90 },
    { name: "Figma / Design", level: 80 },
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-4 md:px-8"
      style={{
        paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Subtle background - matching Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header - matching Hero style */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/[0.02] border-white/[0.08] text-white/60 backdrop-blur-sm mb-4">
            <span>{t("about_badge", "Apie mane")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("about_title", "Kas esu ir kaip galiu padėti")}
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left: Image + Principles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Image carousel */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt="Lukas Beneta"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                />
              </AnimatePresence>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Image indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIndex
                        ? "bg-white w-8"
                        : "bg-white/30 w-1.5 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Principles - cleaner grid */}
            <div className="grid grid-cols-3 gap-4">
              {principles.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-center"
                  >
                    <Icon className="w-5 h-5 text-blue-400 mb-2 mx-auto" />
                    <h4 className="text-xs font-semibold text-white mb-1">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-white/50 leading-tight">
                      {principle.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Story */}
          <motion.div
            key={i18n.language}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p className="text-lg text-white/70">
                {t("about_p1")}
              </p>
              <p>
                {t("about_p2")}
              </p>
              <p>
                {t("about_p3")}
              </p>
              <p>
                {t("about_p4")}
              </p>
              <p className="text-white/80 font-medium">
                {t("about_p5")}
              </p>
            </div>

            {/* Philosophy */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-3">
                {t("philosophy_title", "Mano požiūris")}
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                {t(
                  "philosophy_text",
                  "Tikiu, kad geras kodas turi būti ne tik funkcionalus, bet ir suprantamas. Svetainė turi veikti greitai, atrodyti gerai ir spręsti realias verslo problemas."
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skills - Clean bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t("skills_title", "Technologijos")}
            </h3>
            <p className="text-white/50">
              {t("skills_subtitle", "Įrankiai, su kuriais dirbu kasdien")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium text-sm">{skill.name}</h4>
                  <span className="text-xs font-semibold text-blue-400">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Clean progress bar */}
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.05 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}