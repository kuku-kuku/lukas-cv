import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Github,
  MonitorSmartphone,
  LayoutDashboard,
  ExternalLink,
  Zap,
  Users,
  Clock,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

const PROJECTS = [
  {
    id: "beneta",
    typeKey: "website",
    statusKey: "live",
    image: "/beneta1.png",
    tech: ["React 18", "Tailwind", "i18next", "Framer Motion", "Vercel"],
    liveUrl: "https://beneta.lt",
    repoUrl: null,
    metrics: [
      { icon: Zap, label: "Load Time", value: "<2s" },
      { icon: Users, label: "Mobile Traffic", value: "65%" },
      { icon: TrendingUp, label: "Performance", value: "95/100" },
    ],
    challenge: "challenge_beneta",
    solution: "solution_beneta",
    impact: "impact_beneta",
  },
  {
    id: "fakaunas",
    typeKey: "website",
    statusKey: "live",
    image: "/fakaunas1.png",
    tech: ["React", "Tailwind", "Express", "Resend API", "Vercel"],
    liveUrl: "https://fakaunas.lt",
    repoUrl: null,
    metrics: [
      { icon: Clock, label: "Project Time", value: "4 weeks" },
      { icon: Zap, label: "Page Speed", value: "Fast" },
      { icon: Users, label: "Contact Forms", value: "+40%" },
    ],
    challenge: "challenge_fakaunas",
    solution: "solution_fakaunas",
    impact: "impact_fakaunas",
  },
  {
    id: "syncara",
    typeKey: "dashboard",
    statusKey: "demo",
    image: "/syncara1.png",
    tech: ["React", "Firebase", "Airtable API", "Chart.js", "CSV Export"],
    liveUrl: null,
    repoUrl: null,
    metrics: [
      { icon: LayoutDashboard, label: "Data Viz", value: "Real-time" },
      { icon: Zap, label: "Automation", value: "100%" },
      { icon: TrendingUp, label: "Efficiency", value: "+300%" },
    ],
    challenge: "challenge_syncara",
    solution: "solution_syncara",
    impact: "impact_syncara",
  },
  {
    id: "bangu",
    typeKey: "website",
    statusKey: "live",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    tech: ["React", "Tailwind", "i18next", "SEO-optimized"],
    liveUrl: "https://banguklinika.lt",
    repoUrl: null,
    metrics: [
      { icon: Users, label: "Online Bookings", value: "+50%" },
      { icon: Globe, label: "SEO Ranking", value: "Top 3" },
      { icon: Zap, label: "Bounce Rate", value: "-35%" },
    ],
    challenge: "challenge_bangu",
    solution: "solution_bangu",
    impact: "impact_bangu",
  },
];

const TYPE_ICON = {
  website: MonitorSmartphone,
  dashboard: LayoutDashboard,
};

const STATUS_STYLE = {
  live: { 
    color: "bg-emerald-500 text-white", 
  },
  demo: { 
    color: "bg-blue-500 text-white", 
  },
};

export default function WorksSection() {
  const { t } = useTranslation();
  const [expandedProject, setExpandedProject] = useState(null);

  return (
    <section
      id="works"
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/[0.02] border-white/[0.08] text-white/60 backdrop-blur-sm mb-4">
            <span>{t("works_badge", "Mano darbai")}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("works_title", "Projekti portfelis")}
          </h2>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t(
              "works_subtitle",
              "Realūs projektai su išmatuojamais rezultatais"
            )}
          </p>
        </motion.div>

        {/* Projects Grid - clean cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {PROJECTS.map((project, idx) => {
            const Icon = TYPE_ICON[project.typeKey] || MonitorSmartphone;
            const style = STATUS_STYLE[project.statusKey] || STATUS_STYLE.demo;

            const title = t(`projects.${project.id}.title`);
            const description = t(`projects.${project.id}.description`);
            const statusLabel = t(`status.${project.statusKey}`);
            const typeLabel = t(`type.${project.typeKey}`);

            const isExpanded = expandedProject === project.id;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${style.color}`}>
                      {statusLabel}
                    </span>
                    <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-black/40 backdrop-blur-sm border border-white/20 text-white">
                      {typeLabel}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((metric, i) => {
                      const MetricIcon = metric.icon;
                      return (
                        <div
                          key={i}
                          className="p-3 rounded-xl border border-white/10 bg-white/[0.02]"
                        >
                          <MetricIcon className="w-4 h-4 text-blue-400 mb-1" />
                          <div className="text-xs text-white/50 mb-0.5">
                            {metric.label}
                          </div>
                          <div className="text-sm font-semibold text-white">
                            {metric.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Case Study Toggle */}
                  <button
                    onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/80">
                        {t("view_case_study", "Case study")}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-blue-400"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expanded Case Study */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-4 border-t border-white/10"
                      >
                        <div>
                          <h5 className="text-xs font-semibold text-blue-400 mb-1">
                            {t("challenge", "Iššūkis")}
                          </h5>
                          <p className="text-xs text-white/70">
                            {t(project.challenge, "Projekto iššūkis...")}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-blue-400 mb-1">
                            {t("solution", "Sprendimas")}
                          </h5>
                          <p className="text-xs text-white/70">
                            {t(project.solution, "Kaip išsprendėme...")}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-emerald-400 mb-1">
                            {t("impact", "Rezultatas")}
                          </h5>
                          <p className="text-xs text-white/70">
                            {t(project.impact, "Pasiekti rezultatai...")}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{t("visit_live", "Apsilankyti")}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/10 transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/60 mb-4">
            {t("more_projects", "Daugiau projektų netrukus...")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/[0.02] text-white hover:bg-white/10 hover:border-white/30 transition-all"
          >
            <span>{t("discuss_project", "Aptarti projektą")}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}