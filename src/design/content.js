/**
 * SITE STRUCTURE — single source of truth for the page.
 *
 * Only structure, identifiers and verifiable facts live here. Every piece of
 * human-readable copy is an i18n key (see src/i18n.js) so LT/EN stay in sync
 * and nothing has to be edited in two places.
 *
 * Editing guide:
 *  - SECTIONS drives the command rail, the section indices and the anchors.
 *  - CAPABILITIES.evidence must point at real PROJECTS ids. A capability with
 *    no evidence renders without the evidence line rather than claiming one.
 *  - PROJECTS carries no invented metrics by design: scope, role, stack and
 *    status are facts that can be checked by opening the site.
 *  - RATE_CARD prices come straight from the existing service list.
 */

export const SECTIONS = [
  { id: "index", index: "00", labelKey: "nav_index" },
  { id: "capabilities", index: "01", labelKey: "nav_capabilities" },
  { id: "method", index: "02", labelKey: "nav_method" },
  { id: "work", index: "03", labelKey: "nav_work" },
  { id: "stack", index: "04", labelKey: "nav_stack" },
  { id: "process", index: "05", labelKey: "nav_process" },
  { id: "contact", index: "06", labelKey: "nav_contact" },
];

export const CAPABILITIES = [
  {
    id: "apps",
    index: "01",
    titleKey: "cap_apps_title",
    bodyKey: "cap_apps_body",
    items: ["React 18", "SPA / routing", "i18n (LT/EN)", "Design systems"],
    evidence: ["fakaunas", "bangu"],
  },
  {
    id: "backend",
    index: "02",
    titleKey: "cap_backend_title",
    bodyKey: "cap_backend_body",
    items: ["Node.js / Express", "REST APIs", "MongoDB / MySQL", "Auth flows"],
    evidence: ["fakaunas"],
  },
  {
    id: "integrations",
    index: "03",
    titleKey: "cap_integrations_title",
    bodyKey: "cap_integrations_body",
    items: ["Transactional email", "Firebase", "Airtable", "Third-party APIs"],
    evidence: ["syncara", "fakaunas"],
  },
  {
    id: "automation",
    index: "04",
    titleKey: "cap_automation_title",
    bodyKey: "cap_automation_body",
    items: ["Dashboards", "Data export", "Scheduled jobs", "Internal tools"],
    evidence: ["syncara"],
  },
  {
    id: "performance",
    index: "05",
    titleKey: "cap_performance_title",
    bodyKey: "cap_performance_body",
    items: ["Core Web Vitals", "Bundle budgets", "Technical SEO", "Accessibility"],
    evidence: ["beneta", "bangu"],
  },
  {
    id: "operations",
    index: "06",
    titleKey: "cap_operations_title",
    bodyKey: "cap_operations_body",
    items: ["Deployment", "Monitoring", "Updates", "Handover"],
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
    id: "beneta",
    index: "01",
    image: "/beneta1.webp",
    thumb: "/beneta1-sm.webp",
    imageFallback: "/beneta1.jpg",
    liveUrl: "https://beneta.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_design_build",
    stack: ["React 18", "Tailwind", "Framer Motion", "i18next", "Vercel"],
  },
  {
    id: "fakaunas",
    index: "02",
    image: "/fakaunas1.webp",
    thumb: "/fakaunas1-sm.webp",
    imageFallback: "/fakaunas1.jpg",
    liveUrl: "https://fakaunas.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_design_build",
    stack: ["React", "Tailwind", "Express", "Resend API", "Vercel"],
  },
  {
    id: "bangu",
    index: "03",
    image: null,
    thumb: null,
    imageFallback: null,
    liveUrl: "https://banguklinika.lt",
    repoUrl: null,
    statusKey: "live",
    roleKey: "role_build_seo",
    stack: ["React", "Tailwind", "i18next", "Technical SEO"],
  },
  {
    id: "syncara",
    index: "04",
    image: "/syncara1.webp",
    thumb: "/syncara1-sm.webp",
    imageFallback: "/syncara1.jpg",
    liveUrl: null,
    repoUrl: null,
    statusKey: "demo",
    roleKey: "role_prototype",
    stack: ["React", "Firebase", "Airtable API", "Chart.js", "CSV export"],
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

/** Prices carried over verbatim from the existing service list. */
export const RATE_CARD = [
  { id: 1, titleKey: "service_1_title", priceKey: "service_1_price", from: true },
  { id: 2, titleKey: "service_2_title", priceKey: "service_2_price", from: true },
  { id: 3, titleKey: "service_3_title", priceKey: "service_3_price", from: true },
  { id: 4, titleKey: "service_4_title", priceKey: "service_4_price", from: false },
  { id: 5, titleKey: "service_5_title", priceKey: "service_5_price", from: false },
  { id: 6, titleKey: "service_6_title", priceKey: "service_6_price", from: false },
];

export const PRACTICE = {
  name: "Lukas Beneta",
  mark: "BENETA",
  locality: "Klaipėda",
  country: "LT",
  timeZone: "Europe/Vilnius",
  domain: "beneta.lt",
};
