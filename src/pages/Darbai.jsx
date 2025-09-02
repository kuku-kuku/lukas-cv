import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe, Github, MonitorSmartphone, LayoutDashboard, HeartHandshake } from "lucide-react";
import bg from "../assets/background.jpg";

const PROJECTS = [
  {
    id: "beneta",
    title: "beneta.lt — Portfolio",
    type: "website",
    status: "Live",
    image: "/beneta1.png",
    tech: ["React 18", "Tailwind", "i18next", "Framer Motion", "React Router", "Vercel"],
    liveUrl: "https://beneta.lt",
  },
  {
    id: "fakaunas",
    title: "FA Kaunas — Jaunimo futbolo akademija",
    type: "website",
    status: "Live",
    image: "/fakaunas1.png",
    tech: ["React", "Tailwind", "React Router", "Express Proxy", "Resend Email API", "Vercel"],
    liveUrl: "https://fakaunas.lt",
    repoUrl: null,
  },
  {
    id: "syncara",
    title: "Syncara — Client Insights Dashboard",
    type: "dashboard",
    status: "Demo",
    image: "/syncara1.png",
    tech: ["Tailwind", "Firebase Auth", "Airtable API (via Express)", "Chart.js", "CSV Export"],
    liveUrl: null,
    repoUrl: null,
  },
  {
    id: "bangu",
    title: "Bangų klinika — Dental Website",
    type: "website",
    status: "WIP",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    tech: ["React", "Tailwind", "i18next", "SEO-ready"],
    liveUrl: null,
    repoUrl: null,
  },
];

const TYPE_ICON = {
  website: MonitorSmartphone,
  dashboard: LayoutDashboard,
  landing: HeartHandshake,
};

const STATUS_TW = {
  Live: "bg-emerald-500/90 text-white",
  Demo: "bg-indigo-500/90 text-white",
  WIP: "bg-amber-500/90 text-white",
};

export default function Darbai() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-28 pb-20 px-4 md:px-8 text-white min-h-screen font-poppins overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={bg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-10">{t("works")}</h2>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.id}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-lg shadow-xl hover:shadow-2xl flex flex-col h-full transform-gpu"
            >
              <div className="relative h-48">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span
                  className={`absolute top-3 left-3 text-[11px] px-2.5 py-1 rounded-full font-medium ${STATUS_TW[p.status] || "bg-slate-600/90 text-white"}`}
                >
                  {p.status}
                </span>
                <span className="absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full font-medium bg-white/15 backdrop-blur border border-white/25">
                  {p.type}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start gap-2">
                  {(() => {
                    const Icon = TYPE_ICON[p.type] || MonitorSmartphone;
                    return <Icon className="w-5 h-5 opacity-80 mt-0.5" />;
                  })()}
                  <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((tch) => (
                    <span
                      key={tch}
                      className="text-[11px] px-2 py-1 rounded-full bg-white/10 border border-white/20"
                    >
                      {tch}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 flex items-center gap-2">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl bg-white text-slate-900 font-medium hover:opacity-90 transition"
                    >
                      <Globe className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border border-white/25 bg-white/10 hover:bg-white/15 transition"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
