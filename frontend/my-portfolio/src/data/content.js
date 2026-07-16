import {
  Code2,
  Server,
  Layers,
  Palette,
  Plug,
  Gauge,
  Database,
  Globe,
  Rocket,
  Puzzle,
  Blocks,
  Settings2,
  Workflow,
  Laptop,
  Filter,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export const STATS = [
  { label: "Experience", value: "4+ Years" },
  { label: "Projects Delivered", value: "10+" },
  { label: "API Integrations", value: "30+" },
  { label: "Deployment Platforms", value: "3" },
  { label: "Stack", value: "MERN + GHL" },
  { label: "Response Time", value: "< 24h" },
];

export const TAGS = [
  "Node.js", "Express.js", "Next.js", "React.js", "TypeScript", "Vue.js",
  "Bootstrap", "TailwindCss", "MongoDB Atlas", "GoHighLevel",
  "OAuth 2.0", "Webhooks", "REST APIs", "WordPress", "Render / Vercel / Netlify",
];

export const EXPERIENCE_ROLES = [
  {
    role: "MERN Stack Developer",
    company: "LevelUp Marketplace Software House",
    period: "2023 – 2026",
    points: [
      "Built and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
      "Developed and consumed RESTful APIs for third-party integrations and internal services.",
      "Designed responsive, performant user interfaces with React and modern CSS frameworks.",
      "Managed MongoDB data models and optimized query performance for production workloads.",
      "Collaborated with cross-functional teams to deliver scalable, maintainable software.",
    ],
  },
  {
    role: "GoHighLevel App & Automation Developer",
    company: "LevelUp Marketplace Software House",
    period: "2023 – 2026",
    points: [
      "Developed custom marketplace apps using GoHighLevel APIs with OAuth 2.0 authentication.",
      "Built CRM dashboards, pipeline visualizations, and automation workflows for client management.",
      "Integrated webhooks, contact creation APIs, and third-party services into GHL environments.",
      "Configured API scopes, webhook event handling, and HMAC verification for secure deployments.",
      "Deployed frontends on Vercel / Netlify and backends on Render with MongoDB Atlas.",
    ],
  },
  {
    role: "WordPress Developer",
    company: "LevelUp Marketplace Software House",
    period: "2023 – 2026",
    points: [
      "Built and managed WordPress websites with custom theme development and plugin integration.",
      "Customized layouts, optimized site performance, and handled content management for clients.",
    ],
  },
];

export const EXPERTISE_CARDS = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "Responsive, accessible React interfaces with modern CSS, built for real production traffic — not just demos.",
  },
  {
    icon: Server,
    title: "Backend Development",
    desc: "Node.js & Express APIs with clean routing, middleware, JWT/OAuth auth, and structured error handling.",
  },
  {
    icon: Layers,
    title: "MERN Stack",
    desc: "End-to-end delivery across MongoDB, Express, React, and Node — from schema to deployed UI.",
  },
  {
    icon: Palette,
    title: "UI/UX",
    desc: "Interfaces designed around clarity and flow, with attention to spacing, hierarchy, and motion.",
  },
  {
    icon: Plug,
    title: "API Integration",
    desc: "OAuth 2.0 flows, HMAC-verified webhooks, and third-party integrations (Stripe, Twilio, GHL, and more).",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    desc: "Query and index tuning, efficient re-renders, and lean bundles for fast, reliable apps at scale.",
  },
  {
    icon: Database,
    title: "Database Design",
    desc: "MongoDB schema design, Mongoose modeling, aggregation pipelines, and indexing for production workloads.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    desc: "CI/CD-friendly deployments across Render, Vercel, and Netlify with environment-safe configuration.",
  },
];

export const PROJECTS = [
  {
    icon: Layers,
    title: "Custom Software Solutions",
    desc: "End-to-end custom software built to solve specific business problems — from requirements and architecture to deployment, with a focus on scalability and maintainability.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: Puzzle,
    title: "GHL Custom Widgets",
    desc: "Embeddable, customizable widgets for GoHighLevel — real-time editable content, colors, and layout, embedded into client sites and sub-accounts via a lightweight script tag.",
    stack: ["React.js", "Node.js", "GHL API", "HTML/CSS/JS"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: Laptop,
    title: "Custom Website Development",
    desc: "Full-stack custom websites built from scratch on the MERN stack — responsive UI, RESTful APIs, and database design — deployed on cloud platforms with CI/CD pipelines.",
    stack: ["React", "Node.js", "MongoDB", "Vercel", "Render"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: Settings2,
    title: "GHL Marketplace Apps",
    desc: "Production GHL marketplace apps with OAuth 2.0, HMAC-verified webhooks, custom workflow actions, auto-refreshing token lifecycle, and Winston logging.",
    stack: ["Node.js", "Express.js", "GHL API", "OAuth 2.0", "Webhooks"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: Workflow,
    title: "GHL Automations & Integrations",
    desc: "Advanced GoHighLevel automation and third-party integrations — triggers, campaigns, pipelines, and CRM workflows connecting GHL to external tools and reducing manual client effort.",
    stack: ["GoHighLevel", "REST APIs", "Webhooks", "Automation"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: Filter,
    title: "GHL Custom Themes & Funnels",
    desc: "Custom GoHighLevel themes and funnel builds using injected scripts and custom buttons/add-ons — responsive layouts, CSS overrides, custom sections, and client-facing dashboards.",
    stack: ["GoHighLevel", "JavaScript", "CSS", "Custom Scripts"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Store Development",
    desc: "Shopify store setup and customization — theme configuration, custom sections, app integrations, and storefront optimization for conversion-focused e-commerce experiences.",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: Globe,
    title: "WordPress Development",
    desc: "Custom WordPress sites and theme customization — page builder integrations, plugin configuration, and performance-tuned builds for client and business websites.",
    stack: ["WordPress", "PHP", "Elementor/WPBakery", "CSS"],
    github: "https://github.com/shamrozamalik2",
  },
  {
    icon: Blocks,
    title: "Custom Chrome Extensions",
    desc: "Fully functional Chrome extensions for workflow automation, UI enhancements, and productivity tools — from manifest configuration to production publishing.",
    stack: ["JavaScript", "Chrome APIs", "HTML/CSS", "Node.js"],
    github: "https://github.com/shamrozamalik2",
  },
];

export const CONTACT_INFO = [
  { icon: Mail, label: "Email", val: "shamrozascode@gmail.com", href: "mailto:shamrozascode@gmail.com" },
  { icon: Phone, label: "Phone", val: "+92 3236641191", href: "tel:+923236641191" },
  { icon: MapPin, label: "Location", val: "Pakistan · Remote OK" },
  { icon: Clock, label: "Response Time", val: "Usually within 24 hours" },
];


export const SOCIALS = [
  { label: "LinkedIn", link: "https://www.linkedin.com/in/shamrozafalak-dev/", key: "linkedin" },
  { label: "GitHub", link: "https://github.com/shamrozamalik2", key: "github" },
  { label: "Upwork", link: "https://www.upwork.com/freelancers/~0166ab062c43592950?mp_source=share", key: "upwork" },
];


// Illustrative snippet for the Code Integration Block — representative style, not client code.
// Token kinds: kw = keyword (violet), id = identifier/call (cyan), str = string (emerald),
// cmt = comment (muted grey), plain = punctuation/operators (default neutral).
export const CODE_SNIPPET = {
  filename: "verifyWebhook.middleware.js",
  lines: [
    [{ kw: "import" }, { plain: " crypto " }, { kw: "from" }, { plain: " " }, { str: "'crypto'" }, { plain: ";" }],
    [{ kw: "import" }, { plain: " { " }, { id: "GhlError" }, { plain: " } " }, { kw: "from" }, { plain: " " }, { str: "'../errors.js'" }, { plain: ";" }],
    [],
    [{ cmt: "// HMAC-verified GoHighLevel webhook middleware" }],
    [{ kw: "export const" }, { plain: " " }, { id: "verifyWebhook" }, { plain: " = (" }, { id: "req" }, { plain: ", " }, { id: "res" }, { plain: ", " }, { id: "next" }, { plain: ") => {" }],
    [{ kw: "  const" }, { plain: " signature = req.headers[" }, { str: "'x-wh-signature'" }, { plain: "];" }],
    [{ kw: "  const" }, { plain: " expected = crypto" }],
    [{ plain: "    ." }, { id: "createHmac" }, { plain: "(" }, { str: "'sha256'" }, { plain: ", process.env.GHL_WEBHOOK_SECRET)" }],
    [{ plain: "    ." }, { id: "update" }, { plain: "(JSON." }, { id: "stringify" }, { plain: "(req.body))" }],
    [{ plain: "    ." }, { id: "digest" }, { plain: "(" }, { str: "'hex'" }, { plain: ");" }],
    [],
    [{ kw: "  if" }, { plain: " (signature !== expected) {" }],
    [{ kw: "    return" }, { plain: " " }, { id: "next" }, { plain: "(new " }, { id: "GhlError" }, { plain: "(" }, { str: "'Invalid signature'" }, { plain: ", 401));" }],
    [{ plain: "  }" }],
    [],
    [{ cmt: "  // verified — safe to process" }],
    [{ id: "  next" }, { plain: "();" }],
    [{ plain: "};" }],
  ],
};
