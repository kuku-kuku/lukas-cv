/**
 * SITE STRUCTURE - single source of truth for the page.
 *
 * Only structure, identifiers and verifiable facts live here. Every piece of
 * human-readable copy is an i18n key (see src/i18n.js) so LT/EN stay in sync
 * and nothing has to be edited in two places.
 *
 * Editing guide:
 *  - SECTIONS drives the command rail, the section indices and the anchors.
 *  - CAPABILITIES.evidence must point at real PROJECTS ids. A capability with
 *    no evidence renders without the evidence line rather than claiming one.
 *  - PROJECTS is ordered by how recognisable each project is to the
 *    client this site is for - a local clinic reads as relevant, a
 *    Norwegian marketplace does not - not by date or by size.
 *  - PROJECTS carries no invented metrics by design: scope, role, stack and
 *    status are facts that can be checked by opening the site.
 *  - `metric` is the one number shown on a work row. It must be MEASURED, not
 *    claimed: run `npx lighthouse <url> --preset=desktop` (or PageSpeed
 *    Insights) and paste the result with the date it was taken. Leave it
 *    empty rather than guessing - an empty cell costs nothing, a number that
 *    does not reproduce costs the whole page its credibility.
 *  - `year` is the year the work shipped. Left empty where it is not known;
 *    the row simply omits it.
 *  - `notes: false` means no scope/problem/approach copy has been written
 *    yet. The panel renders what exists and omits the rest, so a project can
 *    be listed truthfully before its write-up is done.
 *  - PACKAGES / CARE / HOURLY are the only place prices live; the cards,
 *    the contact form's budget select and the JSON-LD all read from them.
 */

export const SECTIONS = [
  { id: "index", index: "00", labelKey: "nav_index" },
  { id: "capabilities", index: "01", labelKey: "nav_capabilities" },
  { id: "work", index: "02", labelKey: "nav_work" },
  { id: "pricing", index: "03", labelKey: "nav_pricing" },
  { id: "process", index: "04", labelKey: "nav_process" },
  { id: "faq", index: "05", labelKey: "nav_faq" },
  { id: "contact", index: "06", labelKey: "nav_contact" },
];

export const CAPABILITIES = [
  {
    id: "apps",
    index: "01",
    titleKey: "cap_apps_title",
    bodyKey: "cap_apps_body",
    tech: ["React", "Vite", "Tailwind", "Prerendering"],
    evidence: ["fakaunas", "smiletrans"],
  },
  {
    id: "performance",
    index: "02",
    titleKey: "cap_performance_title",
    bodyKey: "cap_performance_body",
    tech: ["Core Web Vitals", "Lighthouse", "WebP / AVIF"],
    evidence: ["beneta", "bangu"],
  },
  {
    id: "seo",
    index: "03",
    titleKey: "cap_seo_title",
    bodyKey: "cap_seo_body",
    tech: ["Techninis SEO", "Struktūriniai duomenys", "Sitemap"],
    evidence: ["bangu"],
  },
  {
    id: "shop",
    index: "04",
    titleKey: "cap_shop_title",
    bodyKey: "cap_shop_body",
    tech: ["WordPress", "WooCommerce", "Shopify"],
    evidence: ["flore"],
  },
  {
    id: "automation",
    index: "05",
    titleKey: "cap_automation_title",
    bodyKey: "cap_automation_body",
    tech: ["Node.js", "REST API", "Airtable", "Resend"],
    evidence: ["syncara", "velgtilbud"],
  },
  {
    id: "operations",
    index: "06",
    titleKey: "cap_operations_title",
    bodyKey: "cap_operations_body",
    tech: ["Vercel", "Atsarginės kopijos", "Stebėjimas"],
    evidence: [],
  },
];

/**
 * The method graph rendered by SystemDiagram.
 * Coordinates are in the diagram viewBox (1000 x 460) and are deliberate:
 * left column = inputs, middle = the engineering spine, right = delivery.
 */
export const METHOD_NODES = [
  { id: "brief", x: 90, y: 90, kind: "input", titleKey: "node_brief_title", bodyKey: "node_brief_body" },
  { id: "constraints", x: 90, y: 230, kind: "input", titleKey: "node_constraints_title", bodyKey: "node_constraints_body" },
  { id: "data", x: 90, y: 370, kind: "input", titleKey: "node_data_title", bodyKey: "node_data_body" },

  { id: "model", x: 350, y: 160, kind: "core", titleKey: "node_model_title", bodyKey: "node_model_body" },
  { id: "contract", x: 350, y: 320, kind: "core", titleKey: "node_contract_title", bodyKey: "node_contract_body" },

  { id: "interface", x: 630, y: 90, kind: "build", titleKey: "node_interface_title", bodyKey: "node_interface_body" },
  { id: "services", x: 630, y: 230, kind: "build", titleKey: "node_services_title", bodyKey: "node_services_body" },
  { id: "automation", x: 630, y: 370, kind: "build", titleKey: "node_automation_title", bodyKey: "node_automation_body" },

  { id: "ship", x: 890, y: 160, kind: "out", titleKey: "node_ship_title", bodyKey: "node_ship_body" },
  { id: "operate", x: 890, y: 320, kind: "out", titleKey: "node_operate_title", bodyKey: "node_operate_body" },
];

export const METHOD_EDGES = [
  ["brief", "model"],
  ["constraints", "model"],
  ["constraints", "contract"],
  ["data", "contract"],
  ["model", "interface"],
  ["model", "services"],
  ["contract", "services"],
  ["contract", "automation"],
  ["interface", "ship"],
  ["services", "ship"],
  ["services", "operate"],
  ["automation", "operate"],
  ["operate", "model"],
];

export const PROJECTS = [
  {
    id: "bangu",
    index: "01",
    year: null,
    metric: null,
    metricNote: null,
    metricDate: null,
    notes: true,
    image: "/work-bangu.webp",
    thumb: "/work-bangu-sm.webp",
    imageFallback: "/work-bangu.jpg",
    liveUrl: "https://banguklinika.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_build_seo",
    stack: ["React", "Tailwind", "i18next", "Technical SEO"],
  },
  {
    id: "fakaunas",
    index: "02",
    year: null,
    metric: null,
    metricNote: null,
    metricDate: null,
    notes: true,
    image: "/work-fakaunas.webp",
    thumb: "/work-fakaunas-sm.webp",
    imageFallback: "/work-fakaunas.jpg",
    liveUrl: "https://fakaunas.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_design_build",
    stack: ["React", "Tailwind", "Express", "Resend API", "Vercel"],
  },
  {
    id: "flore",
    index: "03",
    year: null,
    metric: null,
    metricNote: null,
    metricDate: null,
    notes: false,
    image: "/work-flore.webp",
    thumb: "/work-flore-sm.webp",
    imageFallback: "/work-flore.jpg",
    liveUrl: "https://florestudija.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_build",
    stack: ["WordPress", "WooCommerce"],
  },
  {
    id: "smiletrans",
    index: "04",
    year: null,
    metric: null,
    metricNote: null,
    metricDate: null,
    notes: false,
    image: "/work-smiletrans.webp",
    thumb: "/work-smiletrans-sm.webp",
    imageFallback: "/work-smiletrans.jpg",
    liveUrl: "https://www.smiletrans.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_build",
    stack: ["Next.js", "React", "Multilingual"],
  },
  {
    id: "velgtilbud",
    index: "05",
    year: null,
    metric: null,
    metricNote: null,
    metricDate: null,
    notes: false,
    image: "/work-velgtilbud.webp",
    thumb: "/work-velgtilbud-sm.webp",
    imageFallback: "/work-velgtilbud.jpg",
    liveUrl: "https://www.velgtilbud.no",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_build",
    stack: ["React", "Vite", "Multi-step form", "Norwegian"],
  },
  {
    id: "sei",
    index: "06",
    year: null,
    metric: null,
    metricNote: null,
    metricDate: null,
    notes: false,
    image: "/work-sei.webp",
    thumb: "/work-sei-sm.webp",
    imageFallback: "/work-sei.jpg",
    liveUrl: "https://serviceexperienceindex.com",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_build",
    stack: ["Next.js", "React"],
  },
  {
    id: "syncara",
    index: "07",
    year: null,
    metric: null,
    metricNote: null,
    metricDate: null,
    notes: true,
    image: "/work-syncara.webp",
    thumb: "/work-syncara-sm.webp",
    imageFallback: "/work-syncara.jpg",
    liveUrl: null,
    repoUrl: null,
    statusKey: "demo",
    roleKey: "role_prototype",
    stack: ["React", "Firebase", "Airtable API", "Chart.js", "CSV export"],
  },
  {
    id: "beneta",
    index: "08",
    year: "2026",
    metric: "Lighthouse 99 desktop",
    metricNote: "Lighthouse 99 desktop / 88 mobile, LCP 0.8 s",
    metricDate: "2026–10–31",
    notes: true,
    image: "/work-beneta.webp",
    thumb: "/work-beneta-sm.webp",
    imageFallback: "/work-beneta.jpg",
    liveUrl: "https://beneta.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_design_build",
    stack: ["React 18", "Tailwind", "Framer Motion", "i18next", "Vercel"],
  },
];

export const STACK_GROUPS = [
  {
    id: "interface",
    index: "01",
    titleKey: "stack_interface",
    items: ["React 18", "Tailwind CSS", "Framer Motion", "i18next", "Canvas 2D", "SVG"],
  },
  {
    id: "runtime",
    index: "02",
    titleKey: "stack_runtime",
    items: ["Node.js", "Express", "MongoDB", "MySQL", "Firebase", "REST"],
  },
  {
    id: "integrations",
    index: "03",
    titleKey: "stack_integrations",
    items: ["Airtable API", "Resend", "EmailJS", "reCAPTCHA", "Chart.js", "GA4"],
  },
  {
    id: "delivery",
    index: "04",
    titleKey: "stack_delivery",
    items: ["Git / GitHub", "Vercel", "Lighthouse", "CI builds", "Web Vitals"],
  },
];

export const PROCESS_STEPS = [
  { id: "intake", index: "01", titleKey: "step_intake_title", bodyKey: "step_intake_body", outKey: "step_intake_out" },
  { id: "architecture", index: "02", titleKey: "step_architecture_title", bodyKey: "step_architecture_body", outKey: "step_architecture_out" },
  { id: "build", index: "03", titleKey: "step_build_title", bodyKey: "step_build_body", outKey: "step_build_out" },
  { id: "review", index: "04", titleKey: "step_review_title", bodyKey: "step_review_body", outKey: "step_review_out" },
  { id: "launch", index: "05", titleKey: "step_launch_title", bodyKey: "step_launch_body", outKey: "step_launch_out" },
  { id: "operate", index: "06", titleKey: "step_operate_title", bodyKey: "step_operate_body", outKey: "step_operate_out" },
];

/**
 * PRICING - the single place prices live.
 *
 * These values render in three places: the pricing cards, the budget select
 * on the contact form, and the Offer entries in the JSON-LD. Change a number
 * here and all three follow.
 *
 * PLACEHOLDERS pending confirmation. Reference points used to set them:
 * Lithuanian marketplace freelancers average 230-300 EUR a site, small
 * studios charge 450-590 for a one-pager and 890+ for a business site. The
 * old list (200 / 300 EUR) sat below the freelance floor while the site
 * argues for custom, fast, measured work - which reads as a warning, not a
 * bargain.
 */
export const PACKAGES = [
  {
    id: "onepage",
    price: 490,
    duration: "1–2 sav.",
    featured: false,
    titleKey: "pkg_onepage_title",
    forKey: "pkg_onepage_for",
    includes: [
      "inc_mobile",
      "inc_form",
      "inc_google",
      "inc_speed",
      "inc_analytics",
      "inc_fixes",
      "inc_ownership",
    ],
  },
  {
    id: "business",
    price: 990,
    duration: "2–4 sav.",
    featured: true,
    titleKey: "pkg_business_title",
    forKey: "pkg_business_for",
    includes: [
      "inc_pages",
      "inc_mobile",
      "inc_form",
      "inc_google",
      "inc_speed",
      "inc_analytics",
      "inc_editing",
      "inc_fixes",
      "inc_ownership",
    ],
  },
  {
    id: "custom",
    price: 1900,
    duration: "pagal sąmatą",
    featured: false,
    titleKey: "pkg_custom_title",
    forKey: "pkg_custom_for",
    includes: [
      "inc_shop",
      "inc_booking",
      "inc_accounts",
      "inc_integrations",
      "inc_speed",
      "inc_fixes",
      "inc_ownership",
    ],
  },
];

/** Monthly care plans. Replaces the old "server maintenance" line. */
export const CARE = [
  { id: "calm", price: 39, titleKey: "care_calm_title", bodyKey: "care_calm_body" },
  { id: "growth", price: 99, titleKey: "care_growth_title", bodyKey: "care_growth_body" },
];

/** One-off work. */
export const HOURLY = 35;

/**
 * FAQ. Rendered as an accordion and as FAQPage structured data, so the
 * answers Google shows are the answers on the page.
 */
export const FAQ = [
  "price",
  "time",
  "edit",
  "broken",
  "google",
  "meet",
  "owns",
].map((id) => ({ id, qKey: `faq_${id}_q`, aKey: `faq_${id}_a` }));

/**
 * Alternative contact channels, shown beside the form.
 *
 * EDIT THESE. Every one is empty on purpose - a portfolio that links to the
 * wrong profile is worse than one that links to none, so nothing is guessed
 * here. Fill in what you actually want public; each entry renders only when
 * it has a value, so leaving one blank simply hides it.
 *
 *   email:    the address you are happy to publish (it will be scraped)
 *   linkedin: full https:// URL
 *   github:   full https:// URL
 */
export const CHANNELS = {
  email: "",
  linkedin: "",
  github: "",
};

/**
 * Business details for the footer. Lithuanian individual-activity or MB
 * registration numbers belong here if the practice is registered; leave
 * empty otherwise.
 */
export const LEGAL = {
  entity: "",
  code: "",
};

export const PRACTICE = {
  name: "Lukas Beneta",
  mark: "BENETA",
  // Remote practice: no city is surfaced anywhere in the interface.
  // Kept only for legal registration details in the footer, if ever needed.
  country: "LT",
  timeZone: "Europe/Vilnius",
  domain: "beneta.lt",
};
