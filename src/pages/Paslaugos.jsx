import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, X, Check, Zap } from "lucide-react";

export default function Paslaugos({ openContactModal }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [active, setActive] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  const services = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    }
  }, []);

  const handleGetStarted = (e) => {
    e && e.stopPropagation();
    setActive(null);
    if (typeof openContactModal === "function") {
      openContactModal(); // turi prioritetą
    } else {
      navigate("/kontaktai"); // EN ir LT – tas pats kelias
    }
  };

  // „Nuo/From“ tik 1–5 paslaugoms
  const formatPrice = (i) => {
    const raw = t(`service_${i}_price`);
    if (i === 6) return raw;
    const lower = (raw || "").trim().toLowerCase();
    const alreadyHasPrefix = lower.startsWith("nuo ") || lower.startsWith("from ");
    const prefix = i18n.language && i18n.language.startsWith("lt") ? "Nuo " : "From ";
    return alreadyHasPrefix ? raw : `${prefix}${raw}`;
  };

  // Globalus horizontalus „clip“, kad mobile neplėstų pločio
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("overflow-x-clip");
    body.classList.add("overflow-x-clip");
    return () => {
      html.classList.remove("overflow-x-clip");
      body.classList.remove("overflow-x-clip");
    };
  }, []);

  // Body scroll lock modalui
  useEffect(() => {
    const body = document.body;
    if (active) {
      const prevOverflow = body.style.overflow;
      const prevPosition = body.style.position;
      body.style.overflow = "hidden";
      body.style.position = "relative";
      return () => {
        body.style.overflow = prevOverflow;
        body.style.position = prevPosition;
      };
    }
  }, [active]);

  return (
    <motion.div
      key={i18n.language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-28 pb-20 px-4 md:px-8 text-white min-h-screen font-poppins transition-colors duration-500 overflow-x-clip transform-gpu"
    >
      {/* Dekorai – suklipyti, kad neplėstų pločio */}
      <div className="pointer-events-none absolute inset-0 overflow-x-clip">
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Header mini badge */}
        <motion.div
          className="text-center mb-10"
          initial={isTouch ? false : { opacity: 0, y: -20 }}
          animate={isTouch ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: isTouch ? 0 : 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-white/80">{t("professional_services")}</span>
          </div>
        </motion.div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-clip">
          {services.map((i) => (
            <motion.div
              key={`${i}-${i18n.language}`}
              onClick={() =>
                setActive({
                  title: t(`service_${i}_title`),
                  long: t(`service_${i}_long`),
                  price: t(`service_${i}_price`),
                  index: i,
                })
              }
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={isTouch ? false : { opacity: 0, y: 20 }}
              animate={isTouch ? {} : { opacity: 1, y: 0 }}
              whileHover={isTouch ? {} : { y: -8, scale: 1.02 }}
              transition={{ duration: isTouch ? 0 : 0.4, delay: isTouch ? 0 : i * 0.05 }}
              className="group relative p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 flex flex-col justify-between overflow-hidden transform-gpu"
              style={{ willChange: "transform" }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-lg font-bold text-white">0{i}</span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">
                  {t(`service_${i}_title`)}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {t(`service_${i}_short`)}
                </p>
              </div>

              {/* Price row */}
              <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xl font-bold text-white">{formatPrice(i)}</p>
                </div>

                <motion.div
                  animate={{ x: hoveredCard === i ? 4 : 0 }}
                  className="flex items-center gap-2 text-sm font-medium text-violet-300 group-hover:text-violet-200"
                >
                  <span>{t("details")}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Shine effect – klipuotas kortelės viduje */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div
                    className="
                      absolute top-0 bottom-0 w-[150%]
                      bg-gradient-to-r from-transparent via-white/5 to-transparent
                      skew-x-12
                      translate-x-full group-hover:-translate-x-full
                      transition-transform duration-1000
                    "
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 20 }}
          animate={isTouch ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: isTouch ? 0 : 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" />
            <span>{t("trust_fast_delivery")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{t("trust_quality_guaranteed")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{t("trust_modern_tech")}</span>
          </div>
        </motion.div>
      </div>

      {/* Modal (responsive) */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => e.key === "Escape" && setActive(null)}
          >
            {/* centering wrapper su paddings */}
            <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg sm:max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
              >
                {/* vidinis scrollas */}
                <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-8">
                  {/* Dekoras modal viduje – klipuotas */}
                  <div className="absolute inset-0 pointer-events-none overflow-x-clip z-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                  </div>

                  {/* Close */}
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 z-20"
                    aria-label={t("close", { defaultValue: "Close" })}
                  >
                    <X className="w-5 h-5 text-white/90" />
                  </button>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 border border-white/20 mb-5 sm:mb-6">
                      <span className="text-xl sm:text-2xl font-bold text-white">
                        0{active.index}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {active.title}
                    </h3>

                    <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <p className="text-white/90 leading-relaxed text-base sm:text-lg">
                        {active.long}
                      </p>
                    </div>

                    {/* Kaina + CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-white/20">
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {formatPrice(active.index)}
                      </p>

                      <button
                        type="button"
                        onClick={handleGetStarted}
                        className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                      >
                        {t("get_started")}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
