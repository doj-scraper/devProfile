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

export const profileData = {
  name: "Christopher Rodriguez",
  shortName: "Chris Rodriguez",
  title: "Full-stack Developer | Creative Technologist",
  tagline: "Crafting interactive experiences with code",
  bio: `Creative technologist with 8+ years of experience building 
interactive web experiences and full-stack applications.

Specializing in:
  → Real-time data visualization
  → Creative coding & generative art
  → High-performance web applications
  → Developer tooling & CLI design

Currently available for freelance projects.`,
  email: "hello@christopherrodriguez.dev",
  github: "github.com/christopherrodriguez",
  linkedin: "linkedin.com/in/christopherrodriguez",
  website: "christopherrodriguez.dev",
}

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
    liveUrl: "christopherrodriguez.dev",
    rawMarkdown: `# Interactive Terminal Portfolio

Built with Next.js, TypeScript, and HTML5 Canvas.

Features:
- Zellij-inspired split-pane layout
- Three animated canvas backgrounds  
- Working terminal with command history
- Dual-boot GUI/Terminal modes

Status: Production ✓
Repo: github.com/croda/portfolio`,
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

Status: Production ✓
Repo: github.com/croda/wholesale-ecom`,
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

Status: Beta ✓
Repo: github.com/croda/web-daw`,
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

Status: Production ✓
Repo: github.com/croda/data-viz`,
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
  { text: "> Initializing CRODA display server...", delay: 300 },
  { text: "> Mounting React components...", delay: 500 },
  { text: '> <span class="success">✓ components mounted</span>', delay: 150 },
  { text: "> Parsing markdown to HTML...", delay: 400 },
  { text: '> <span class="success">✓ content parsed</span>', delay: 120 },
  { text: "> Resolving layout dependencies...", delay: 350 },
  { text: '> <span class="success">✓ layout ready</span>', delay: 100 },
  { text: "> Establishing GUI connection...", delay: 600 },
  { text: '> <span class="info">Server running on port 3000</span>', delay: 200 },
  { text: "> Switching display mode...", delay: 400 },
]
