import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, X, Check, 
  Globe, Code2, Palette, Target, TrendingUp, Rocket 
} from "lucide-react";

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(null);

  const services = [
    {
      id: 1,
      icon: Globe,
      titleKey: "service_1_title",
      shortKey: "service_1_short",
      longKey: "service_1_long",
      priceKey: "service_1_price",
      outcomes: [
        t("outcome_fast_delivery", "Greitas paleidimas"),
        t("outcome_responsive", "Responsive dizainas"),
        t("outcome_seo", "SEO optimizacija"),
      ],
      deliverables: [
        t("deliver_design", "Unikalus dizainas"),
        t("deliver_development", "Frontend + Backend"),
        t("deliver_deployment", "Deployment į serverį"),
        t("deliver_training", "Administravimo mokymai"),
      ],
    },
    {
      id: 2,
      icon: Rocket,
      titleKey: "service_2_title",
      shortKey: "service_2_short",
      longKey: "service_2_long",
      priceKey: "service_2_price",
      outcomes: [
        t("outcome_conversion", "Didesnė konversija"),
        t("outcome_modern", "Šiuolaikiškas įvaizdis"),
        t("outcome_brand", "Stipresnis brand"),
      ],
      deliverables: [
        t("deliver_redesign", "Pilnas redesign"),
        t("deliver_performance", "Performance audit"),
        t("deliver_migration", "Data migracija"),
        t("deliver_warranty", "3 mėn. garantija"),
      ],
    },
    {
      id: 3,
      icon: Code2,
      titleKey: "service_3_title",
      shortKey: "service_3_short",
      longKey: "service_3_long",
      priceKey: "service_3_price",
      outcomes: [
        t("outcome_custom", "Tiksliai jūsų poreikiams"),
        t("outcome_integration", "API integracijos"),
        t("outcome_scalable", "Skalabilus sprendimas"),
      ],
      deliverables: [
        t("deliver_consultation", "Tech konsultacija"),
        t("deliver_architecture", "Architektūra"),
        t("deliver_development", "Development"),
        t("deliver_testing", "Testing + QA"),
      ],
    },
    {
      id: 4,
      icon: TrendingUp,
      titleKey: "service_4_title",
      shortKey: "service_4_short",
      longKey: "service_4_long",
      priceKey: "service_4_price",
      outcomes: [
        t("outcome_speed", "Greičio pagerinimas"),
        t("outcome_fixes", "Bug'ų taisymas"),
        t("outcome_uptime", "Stabilumas"),
      ],
      deliverables: [
        t("deliver_audit", "Pilnas auditas"),
        t("deliver_optimization", "Optimizacija"),
        t("deliver_fixes", "Kritinių klaidų taisymas"),
        t("deliver_report", "Išsamus report"),
      ],
    },
    {
      id: 5,
      icon: Palette,
      titleKey: "service_5_title",
      shortKey: "service_5_short",
      longKey: "service_5_long",
      priceKey: "service_5_price",
      outcomes: [
        t("outcome_professional", "Profesionalus vaizdas"),
        t("outcome_ux", "Geresnė UX"),
        t("outcome_trust", "Didesnis pasitikėjimas"),
      ],
      deliverables: [
        t("deliver_mockups", "High-fidelity mockups"),
        t("deliver_prototype", "Clickable prototype"),
        t("deliver_styleguide", "Style guide"),
        t("deliver_assets", "Export assets"),
      ],
    },
    {
      id: 6,
      icon: Target,
      titleKey: "service_6_title",
      shortKey: "service_6_short",
      longKey: "service_6_long",
      priceKey: "service_6_price",
      outcomes: [
        t("outcome_expert", "Eksperto žvilgsnis"),
        t("outcome_roadmap", "Aiškus planas"),
        t("outcome_savings", "Išvengti brangių klaidų"),
      ],
      deliverables: [
        t("deliver_strategy", "Tech strategija"),
        t("deliver_recommendations", "Rekomendacijos"),
        t("deliver_documentation", "Dokumentacija"),
        t("deliver_support", "Follow-up support"),
      ],
    },
  ];

  const formatPrice = (i) => {
    const raw = t(`service_${i}_price`);
    if (i === 6) return raw;
    const lower = String(raw).trim().toLowerCase();
    const alreadyHasPrefix = lower.startsWith("nuo ") || lower.startsWith("from ");
    const prefix = i18n.language?.startsWith("lt") ? "Nuo " : "From ";
    return alreadyHasPrefix ? raw : `${prefix}${raw}`;
  };

  const scrollToContact = () => {
    setActive(null);
    const element = document.getElementById("contact");
    if (element) {
      const navHeight = 64;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="services"
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header - matching Hero style */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/[0.02] border-white/[0.08] text-white/60 backdrop-blur-sm mb-4">
            <span>{t("services_badge", "Kaip galiu padėti")}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("services_title", "Paslaugos")}
          </h2>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t(
              "services_subtitle",
              "Ne tik technologija, bet ir rezultatai jūsų verslui"
            )}
          </p>
        </motion.div>

        {/* Services Grid - clean cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={`${service.id}-${i18n.language}`}
                onClick={() => setActive(service)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-6 rounded-2xl cursor-pointer border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
              >
                {/* Icon */}
                <div className="mb-4 p-3 w-fit rounded-xl bg-blue-500/10 border border-white/10">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white">
                  {t(service.titleKey)}
                </h3>

                {/* Short description */}
                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  {t(service.shortKey)}
                </p>

                {/* Outcomes preview */}
                <div className="space-y-2 mb-6">
                  {service.outcomes.slice(0, 2).map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/60">
                      <Check className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-lg font-bold text-white">
                    {formatPrice(service.id)}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:gap-3 transition-all">
                    <span>{t("details", "Detalės")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detailed Modal - cleaner design */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="min-h-full w-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-black/95 text-white rounded-2xl border border-white/20 overflow-hidden"
              >
                <div className="p-8 max-h-[90vh] overflow-y-auto">
                  {/* Close button */}
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header */}
                  <div className="mb-8">
                    <div className="mb-4 p-3 w-fit rounded-xl bg-blue-500/10 border border-white/20">
                      {React.createElement(active.icon, { className: "w-8 h-8 text-blue-400" })}
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 text-white">
                      {t(active.titleKey)}
                    </h3>
                    
                    <p className="text-lg text-white/70 leading-relaxed">
                      {t(active.longKey)}
                    </p>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-6 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h4 className="text-lg font-semibold mb-4 text-white">
                      {t("outcomes_title", "Ką gausite")}
                    </h4>
                    <div className="space-y-3">
                      {active.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h4 className="text-lg font-semibold mb-4 text-white">
                      {t("deliverables_title", "Kas įskaičiuota")}
                    </h4>
                    <div className="space-y-3">
                      {active.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-col gap-4 p-6 rounded-xl border border-white/20 bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60 mb-1">
                          {t("starting_from", "Pradedant nuo")}
                        </p>
                        <p className="text-3xl font-bold text-white">
                          {formatPrice(active.id)}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={scrollToContact}
                      className="w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
                    >
                      {t("get_started", "Pradėti projektą")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}