// ============================================
// SHARED CONTENT DATA - Single source of truth
// Terminal prints raw, GUI renders styled
// ============================================

export interface ProjectData {
  id: string
  title: string
  shortTitle: string
  techStack: string[]
  description: string
  features: string[]
  status: string
  repo?: string
  liveUrl?: string
  rawMarkdown: string
}

export interface SkillCategory {
  name: string
  skills: { name: string; level: number }[]
}

export interface ServiceData {
  id: string
  icon: string
  title: string
  tag: string
  description: string
  badge: string
  variant: "default" | "red" | "green"
}

export interface CertModule {
  id: string
  name: string
  description: string
  progress: number
}

export interface CapstoneProject {
  title: string
  tag: string
  description: string
  metricValue: string
  metricLabel: string
}

export const profileData = {
  name: "Christopher",
  fullName: "Christopher Rodriguez",
  shortName: "CHRISTOPHER.AI",
  title: "AI Systems Architect",
  tagline: "AI Systems Architecture · Security · Education",
  bio: `I design, build, and harden production-grade agentic AI systems — then teach your team to own them.

Multi-agent orchestration, quantum-hardened infrastructure, and secure deployment pipelines.

Not templates. Not wrappers. Engineered systems.`,
  location: "Seattle, WA",
  email: "hello@christopher.ai",
  github: "github.com/christopherai",
  linkedin: "linkedin.com/in/christopherai",
  website: "christopher.ai",
}

export const services: ServiceData[] = [
  {
    id: "SVC_01",
    icon: "01",
    title: "AI AGENT CREATION",
    tag: "CORE SERVICE",
    description: "Deterministic multi-agent systems engineered for production. Not chatbot wrappers — real autonomous pipelines with defined state, contracts, and QA gates.",
    badge: "ASYNC // MULTI-AGENT",
    variant: "default"
  },
  {
    id: "SVC_02",
    icon: "02",
    title: "AGENTIC DEPLOYMENT",
    tag: "INFRASTRUCTURE",
    description: "End-to-end deployment pipelines for agentic systems. CI/CD integration, environment hardening, rollback strategies, and observability from day one.",
    badge: "PRODUCTION-GRADE",
    variant: "default"
  },
  {
    id: "SVC_03",
    icon: "03",
    title: "SECURITY & QUANTUM HARDENING",
    tag: "CRITICAL // NIST-ALIGNED",
    description: "Future-proof your AI infrastructure against quantum-era threats. NIST-aligned cryptographic practices, zero-trust architectures, and security-by-design agentic systems.",
    badge: "QUANTUM-HARDENED",
    variant: "red"
  },
  {
    id: "SVC_04",
    icon: "04",
    title: "AI INFRASTRUCTURE SECURITY",
    tag: "HARDENING",
    description: "Audit, harden, and monitor your entire AI stack. Model access controls, prompt injection defense, data pipeline integrity, and runtime threat detection.",
    badge: "ZERO-TRUST",
    variant: "red"
  },
  {
    id: "SVC_05",
    icon: "05",
    title: "WEB APPLICATION DESIGN & REFACTOR",
    tag: "FULL-STACK",
    description: "Precision-engineered web systems. I refactor legacy architectures and build new applications with AI-native features, performance-first design, and agentic backends.",
    badge: "AI-NATIVE",
    variant: "default"
  },
  {
    id: "SVC_06",
    icon: "06",
    title: "RAG ARCHITECTURE",
    tag: "RETRIEVAL // GROUNDED",
    description: "Dual-repo RAG orchestration — build-time document generation, vector indexing, and grounded inference pipelines. Zero hallucination. Maximum factual accuracy.",
    badge: "GROUNDED // RAG",
    variant: "green"
  }
]

export const certModules: CertModule[] = [
  {
    id: "MOD_01",
    name: "Agentic Systems Architecture",
    description: "Multi-agent design patterns, shared state contracts, async communication streams, and deterministic orchestration. We build the swarm before we secure it.",
    progress: 100
  },
  {
    id: "MOD_02",
    name: "RAG Pipeline Engineering",
    description: "Build-time document generation, vector database integration, grounded inference pipelines, and dual-repo deployment strategies. Eliminate hallucination by design.",
    progress: 75
  },
  {
    id: "MOD_03",
    name: "Quantum Hardening & NIST Alignment",
    description: "Post-quantum cryptographic migration, NIST SP 800-208 implementation, zero-trust architecture for AI systems, and threat modeling for agentic pipelines.",
    progress: 60
  },
  {
    id: "MOD_04",
    name: "Secure Agentic Deployment",
    description: "Production CI/CD for agent pipelines, environment isolation, secrets management, runtime monitoring, and incident response playbooks for autonomous systems.",
    progress: 45
  },
  {
    id: "MOD_05",
    name: "Capstone: Live Agent Deployment",
    description: "Design and ship a production-grade agent system against a real enterprise problem. Full security review, QA gate process, and deployment sign-off. This is your portfolio artifact.",
    progress: 20
  }
]

export const capstoneProjects: CapstoneProject[] = [
  {
    title: "SECURE IT HELPDESK AGENT",
    tag: "ENTERPRISE // ZERO-TRUST",
    description: "Multi-agent triage system with role-based access controls, prompt injection defenses, and full audit logging. Handles L1–L2 IT requests autonomously.",
    metricValue: "94%",
    metricLabel: "L1 DEFLECTION RATE"
  },
  {
    title: "QUANTUM-HARDENED RESEARCH AGENT",
    tag: "NIST-ALIGNED // POST-QUANTUM",
    description: "Document ingestion and analysis pipeline with post-quantum encrypted comms, grounded RAG retrieval, and cryptographically signed outputs.",
    metricValue: "PQC",
    metricLabel: "KYBER-1024 ENCRYPTED"
  },
  {
    title: "AGENTIC SALES INTELLIGENCE SYSTEM",
    tag: "COMMERCIAL // GROUNDED RAG",
    description: "5-agent swarm: prospecting, qualification, research synthesis, outreach generation, and CRM write-back. Zero hallucination via grounded vector retrieval.",
    metricValue: "5x",
    metricLabel: "PIPELINE VELOCITY"
  }
]

export const whyNowItems = [
  {
    tag: "THREAT_01 // QUANTUM",
    title: "THE QUANTUM WINDOW IS CLOSING",
    description: "NIST has finalized post-quantum cryptographic standards. Organizations that don't begin migration now will face catastrophic exposure. Your AI systems need hardening before your data does."
  },
  {
    tag: "THREAT_02 // AGENTIC",
    title: "AGENTS ARE IN PRODUCTION NOW",
    description: "Enterprise agentic deployments are live. The teams that engineered their systems correctly — deterministic, auditable, secure — are already compounding their advantage. The gap is widening weekly."
  },
  {
    tag: "THREAT_03 // TALENT",
    title: "THERE ARE NO PLAYBOOKS YET",
    description: "Multi-agent orchestration, secure agentic deployment, and quantum-hardened AI infrastructure are skills that don't exist in existing curricula. The practitioners who have built this in production are rare."
  }
]

// Legacy projects for terminal mode compatibility
export const projects: ProjectData[] = [
  {
    id: "portfolio",
    title: "Interactive Terminal Portfolio",
    shortTitle: "Terminal Portfolio",
    techStack: ["Next.js", "TypeScript", "Canvas API", "CSS"],
    description: "An immersive terminal-based portfolio with multiple animated environments and dual-boot architecture.",
    features: [
      "Zellij-inspired split-pane layout",
      "Three animated canvas backgrounds",
      "Working terminal with command history",
      "Dual-boot GUI/Terminal modes",
    ],
    status: "Production",
    repo: "github.com/croda/portfolio",
    liveUrl: "christopher.ai",
    rawMarkdown: `# Interactive Terminal Portfolio

Built with Next.js, TypeScript, and HTML5 Canvas.

Features:
- Zellij-inspired split-pane layout
- Three animated canvas backgrounds  
- Working terminal with command history
- Dual-boot GUI/Terminal modes

Status: Production`,
  },
  {
    id: "wholesale_ecom",
    title: "Wholesale Cellphone Repair E-commerce",
    shortTitle: "Wholesale E-com",
    techStack: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
    description: "B2B E-commerce platform for wholesale cellphone parts distribution with multi-tenant architecture.",
    features: [
      "Multi-tenant architecture",
      "Real-time inventory management",
      "Automated invoicing system",
      "Custom pricing tiers per customer",
      "Bulk order processing",
    ],
    status: "Production",
    repo: "github.com/croda/wholesale-ecom",
    rawMarkdown: `# Wholesale Cellphone Repair E-commerce

B2B E-commerce Platform for wholesale distribution.
Tech Stack: Next.js, PostgreSQL, Stripe, Redis

Features:
- Multi-tenant architecture
- Real-time inventory management
- Automated invoicing system
- Custom pricing tiers

Status: Production`,
  },
  {
    id: "web_daw",
    title: "Browser-based Digital Audio Workstation",
    shortTitle: "Web DAW",
    techStack: ["Web Audio API", "React", "WebAssembly", "IndexedDB"],
    description: "Full-featured DAW running entirely in the browser with multi-track recording and real-time effects.",
    features: [
      "Multi-track recording & playback",
      "Real-time effects processing",
      "MIDI controller support",
      "Cloud project storage",
      "Waveform visualization",
    ],
    status: "Beta",
    repo: "github.com/croda/web-daw",
    rawMarkdown: `# Browser-based Digital Audio Workstation

Full DAW running in the browser.
Tech Stack: Web Audio API, React, WebAssembly

Features:
- Multi-track recording
- Real-time effects processing
- MIDI controller support
- Cloud project storage

Status: Beta`,
  },
  {
    id: "data_viz",
    title: "Real-time Data Visualization Suite",
    shortTitle: "Data Viz Suite",
    techStack: ["D3.js", "WebGL", "React", "Node.js"],
    description: "High-performance dashboard for real-time data visualization handling 100k+ data points.",
    features: [
      "WebGL-accelerated rendering",
      "Real-time streaming data",
      "Interactive chart customization",
      "Export to PDF/PNG",
    ],
    status: "Production",
    repo: "github.com/croda/data-viz",
    rawMarkdown: `# Real-time Data Visualization Suite

High-performance dashboard with D3.js and WebGL.
Tech Stack: D3.js, WebGL, React, Node.js

Features:
- WebGL-accelerated rendering
- Real-time streaming data
- Interactive customization
- Export to PDF/PNG

Status: Production`,
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Canvas/WebGL", level: 85 },
      { name: "CSS/Tailwind", level: 92 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 78 },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", level: 82 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 88 },
      { name: "Linux", level: 85 },
    ],
  },
]

// Build log steps for the terminal animation
export const buildLogSteps = [
  { text: "> fetching repository data...", delay: 400 },
  { text: "> resolving package dependencies...", delay: 600 },
  { text: '> <span class="success">✓ dependencies resolved</span>', delay: 150 },
  { text: "> compiling client and server builds...", delay: 900 },
  { text: "> generating static pages (1/45)...", delay: 180 },
  { text: "> generating static pages (23/45)...", delay: 120 },
  { text: "> generating static pages (45/45)...", delay: 100 },
  { text: '> <span class="success">✓ build successful in 3.4s</span>', delay: 350 },
  { text: "> mounting data stream...", delay: 250 },
]

// GUI boot sequence for startx command
export const guiBootSteps = [
  { text: "> Initializing CHRISTOPHER display server...", delay: 300 },
  { text: "> Loading agentic swarm configurations...", delay: 500 },
  { text: '> <span class="success">✓ WEAVER [PM] ONLINE</span>', delay: 150 },
  { text: '> <span class="success">✓ NAVIGATOR [ARCH] ONLINE</span>', delay: 120 },
  { text: '> <span class="success">✓ SCRUTINEER [QA] ONLINE</span>', delay: 100 },
  { text: '> <span class="success">✓ CHRONICLER [SYNTH] ONLINE</span>', delay: 120 },
  { text: "> Mounting React components...", delay: 400 },
  { text: '> <span class="success">✓ components mounted</span>', delay: 150 },
  { text: "> Establishing quantum-hardened connection...", delay: 600 },
  { text: '> <span class="info">Server running on port 3000</span>', delay: 200 },
  { text: "> Switching display mode...", delay: 400 },
]
