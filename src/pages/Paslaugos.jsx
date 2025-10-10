import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, X, Check, Zap } from "lucide-react";

export default function Paslaugos({ openContactModal }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const services = [1, 2, 3, 4, 5, 6];

  const handleGetStarted = (e) => {
    e?.stopPropagation();
    setActive(null);
    if (typeof openContactModal === "function") {
      openContactModal();
    } else {
      navigate("/kontaktai");
    }
  };

  const formatPrice = (i) => {
    const raw = t(`service_${i}_price`);
    if (i === 6) return raw;
    const lower = String(raw).trim().toLowerCase();
    const alreadyHasPrefix = lower.startsWith("nuo ") || lower.startsWith("from ");
    const prefix = i18n.language?.startsWith("lt") ? "Nuo " : "From ";
    return alreadyHasPrefix ? raw : `${prefix}${raw}`;
  };

  return (
    <motion.div
      key={i18n.language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-6 md:px-8 text-white font-poppins transition-colors duration-500 overflow-hidden"
      style={{
        minHeight: "100dvh",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
      }}
    >
      {/* Background glow effects */}
      <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header badge */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-violet-400" />
            <span className="text-xs sm:text-sm text-white/80">{t("professional_services")}</span>
          </div>
        </motion.div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((i, index) => (
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group relative p-5 sm:p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 active:border-white/30 shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 flex flex-col justify-between overflow-hidden touch-manipulation"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-violet-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-white/10 mb-3 sm:mb-4 group-hover:scale-110 group-active:scale-105 transition-transform">
                  <span className="text-base sm:text-lg font-bold text-white">0{i}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-violet-200 transition-colors leading-tight">
                  {t(`service_${i}_title`)}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                  {t(`service_${i}_short`)}
                </p>
              </div>

              {/* Price row */}
              <div className="relative z-10 flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                <div>
                  <p className="text-lg sm:text-xl font-bold text-white">{formatPrice(i)}</p>
                </div>

                <motion.div
                  animate={{ x: hoveredCard === i ? 4 : 0 }}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-violet-300 group-hover:text-violet-200"
                >
                  <span>{t("details")}</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </motion.div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/60 text-xs sm:text-sm"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-violet-400" />
            <span>{t("trust_fast_delivery")}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" />
            <span>{t("trust_quality_guaranteed")}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400" />
            <span>{t("trust_modern_tech")}</span>
          </div>
        </motion.div>
      </div>

      {/* Modal (fully responsive) */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => e.key === "Escape" && setActive(null)}
            style={{
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              overscrollBehaviorY: "contain",
            }}
          >
            {/* Centering wrapper with proper padding */}
            <div
              className="min-h-full w-full flex items-start sm:items-center justify-center p-3 sm:p-6"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg sm:max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-3 sm:my-0"
              >
                {/* Inner scrollable content */}
                <div
                  className="overflow-y-auto overscroll-contain"
                  style={{
                    maxHeight: "calc(100dvh - 24px)",
                    paddingBottom: "env(safe-area-inset-bottom, 0px)",
                  }}
                >
                  <div className="p-4 sm:p-6 md:p-8">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none z-0" />
                    <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />

                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 transition-colors border border-white/10 z-20 touch-manipulation"
                      aria-label={t("close", { defaultValue: "Close" })}
                      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
                    >
                      <X className="w-4 sm:w-5 h-4 sm:h-5 text-white/90" />
                    </button>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 border border-white/20 mb-4 sm:mb-6">
                        <span className="text-lg sm:text-2xl font-bold text-white">
                          0{active.index}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight pr-8">
                        {active.title}
                      </h3>

                      <div className="mb-5 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg">
                          {active.long}
                        </p>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-white/20">
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                          {formatPrice(active.index)}
                        </p>

                        <button
                          type="button"
                          onClick={handleGetStarted}
                          className="w-full px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-white/90 active:bg-white/80 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base touch-manipulation"
                        >
                          {t("get_started")}
                        </button>
                      </div>
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
