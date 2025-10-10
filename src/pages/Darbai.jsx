import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Globe,
  Github,
  MonitorSmartphone,
  LayoutDashboard,
  HeartHandshake,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const PROJECTS = [
  {
    id: "beneta",
    typeKey: "website",
    statusKey: "live",
    image: "/beneta1.png",
    tech: ["React 18", "Tailwind", "i18next", "Framer Motion", "React Router", "Vercel"],
    liveUrl: "https://beneta.lt",
    repoUrl: null,
  },
  {
    id: "fakaunas",
    typeKey: "website",
    statusKey: "live",
    image: "/fakaunas1.png",
    tech: ["React", "Tailwind", "React Router", "Express Proxy", "Resend Email API", "Vercel"],
    liveUrl: "https://fakaunas.lt",
    repoUrl: null,
  },
  {
    id: "syncara",
    typeKey: "dashboard",
    statusKey: "demo",
    image: "/syncara1.png",
    tech: ["Tailwind", "Firebase Auth", "Airtable API (via Express)", "Chart.js", "CSV Export"],
    liveUrl: null,
    repoUrl: null,
  },
  {
    id: "bangu",
    typeKey: "website",
    statusKey: "live",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    tech: ["React", "Tailwind", "i18next", "SEO-ready"],
    liveUrl: "https://banguklinika.lt",
    repoUrl: null,
  },
];

const TYPE_ICON = {
  website: MonitorSmartphone,
  dashboard: LayoutDashboard,
  landing: HeartHandshake,
};

const STATUS_STYLE = {
  live: { color: "bg-emerald-500/90 text-white border-emerald-400/30", glow: "shadow-emerald-500/50" },
  demo: { color: "bg-indigo-500/90 text-white border-indigo-400/30", glow: "shadow-indigo-500/50" },
  wip:  { color: "bg-amber-500/90 text-white border-amber-400/30", glow: "shadow-amber-500/50" },
};

export default function Darbai() {
  const { t } = useTranslation();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    }
  }, []);

  return (
    <section
      className="relative text-white font-poppins overflow-x-clip"
      style={{
        // dinaminis viewportas, kad iOS apačios baras „nesuvalgytų“ turinio
        minHeight: "100dvh",
        // viršus: navbar + tarpas
        paddingTop: "calc(var(--navbar-h, 64px) + 2rem)",
        // apačia: papildomas tarpas + iOS safe area
        paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px) + 24px)",
        // sutvarkom iOS bounce, kad neapkarpytų apačios
        overscrollBehaviorY: "contain",
      }}
    >
      <div
        className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-8"
        // ir vidiniam konteineriui duodam safe-area tarpelį
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-violet-400" />
            <span className="text-xs sm:text-sm text-white/80">{t("works")}</span>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
        >
          {PROJECTS.map((p, idx) => {
            const Icon = TYPE_ICON[p.typeKey] || MonitorSmartphone;
            const style = STATUS_STYLE[p.statusKey] || STATUS_STYLE.demo;

            const title = t(`projects.${p.id}.title`);
            const description = t(`projects.${p.id}.description`);
            const statusLabel = t(`status.${p.statusKey}`);
            const typeLabel = t(`type.${p.typeKey}`);

            return (
              <motion.article
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={isTouch ? {} : { y: -8 }}
                whileTap={isTouch ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 280, damping: 24, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-2xl hover:shadow-violet-500/10 hover:border-white/20 active:border-white/25 flex flex-col h-full transform-gpu touch-manipulation"
                style={{ willChange: "transform" }}
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5" />
                </div>

                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={title}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-start justify-between gap-2">
                    <span
                      className={`text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold border backdrop-blur-md ${style.color} ${style.glow} shadow-lg`}
                    >
                      {statusLabel}
                    </span>
                    <span className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium bg-black/40 backdrop-blur-md border border-white/20 text-white/90">
                      {typeLabel}
                    </span>
                  </div>

                  {/* Floating icon */}
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 relative">
                  <h3 className="text-lg sm:text-xl font-bold leading-tight mb-2 sm:mb-3 group-hover:text-violet-300 group-active:text-violet-300 transition-colors">
                    {title}
                  </h3>

                  <p className="text-sm text-white/60 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {p.tech.map((tch, i) => (
                      <motion.span
                        key={`${p.id}-${tch}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.12 + i * 0.04 }}
                        className="text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 active:bg-white/15 transition-all"
                      >
                        {tch}
                      </motion.span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 text-sm px-4 py-2.5 sm:py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-white/90 active:bg-white/80 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] transform touch-manipulation"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{t("visit_live")}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-sm px-4 py-2.5 sm:py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 active:bg-white/15 active:border-white/40 transition-all backdrop-blur-sm touch-manipulation"
                      >
                        <Github className="w-4 h-4" />
                        <span>{t("view_code")}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Mažas „spacer“, jei iOS safe-area dar nupjautų apačią */}
        <div aria-hidden="true" className="pointer-events-none" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </div>
    </section>
  );
}
