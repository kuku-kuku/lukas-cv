import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import me from "../assets/me.jpg";
import futbolas from "../assets/lukas-futbolas.jpg";
import baras from "../assets/lukas-baras.jpg";
import bg from "../assets/background.jpg";

export default function Apie() {
  const { t, i18n } = useTranslation();

  const images = [me, futbolas, baras];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative pt-28 md:pt-24 pb-20 px-4 md:px-8 text-white min-h-screen font-poppins transition-colors duration-500 flex items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          src={bg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Turinys */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Tekstas */}
        <motion.div
          key={i18n.language}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full md:w-1/2 text-lg leading-relaxed text-white"
        >
          <div className="max-w-prose mx-auto">
            <p className="mb-6">{t("about_p1")}</p>
            <p className="mb-6">{t("about_p2")}</p>
            <p className="mb-6">{t("about_p3")}</p>
            <p className="mb-6">{t("about_p4")}</p>
            <p>{t("about_p5")}</p>
          </div>
        </motion.div>

        {/* Nuotraukų karuselė */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="w-full sm:w-[80%] h-[500px] sm:h-[540px] md:h-[560px] relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Lukas Beneta"
                className="absolute top-0 left-0 w-full h-full object-cover object-left-top rounded-xl shadow-xl border border-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
