"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface TerminalProps {
  onEnvChange?: (env: string) => void
  currentEnv: string
}

export function Terminal({ onEnvChange, currentEnv }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    '<span class="prompt">❯</span> cd ~/projects/portfolio',
    '<span class="prompt">❯</span> source environment.sh',
    '<span class="success">✓ Environment initialized</span>',
    '',
    '<span class="prompt">❯</span> Type <span class="info">help</span> for available commands',
    '',
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const commands: Record<string, { desc: string; fn: (args?: string) => string }> = {
    help: {
      desc: "Display available commands",
      fn: () => {
        let help = '<span class="success">Available Commands:</span>\n\n'
        for (const [cmd, { desc }] of Object.entries(commands)) {
          help += `<span class="prompt">${cmd.padEnd(15)}</span> - ${desc}\n`
        }
        return help
      },
    },
    about: {
      desc: "Display portfolio information",
      fn: () => `<span class="info">Christopher Rodriguez</span>
Full-stack developer | Creative technologist | Portfolio specialist
🌐 Crafting interactive experiences with code

Key Skills:
  • Frontend: React, HTML5 Canvas, WebGL
  • Backend: Node.js, Python, Database Design
  • Creative: Generative art, UX/UI, Data visualization
  • Tools: Git, Docker, AWS, CI/CD pipelines`,
    },
    projects: {
      desc: "List featured projects",
      fn: () => `<span class="success">Featured Projects:</span>

1. <span class="info">Interactive Portfolio</span>
   An immersive terminal-based portfolio with multiple environments
   Status: In development ✓
   
2. <span class="info">Data Visualization Suite</span>
   Real-time data visualization with D3.js and WebGL
   Status: Deployed ✓
   
3. <span class="info">Generative Art Engine</span>
   Custom generative art system with p5.js
   Status: Open source ✓

Use '<span class="prompt">project [name]</span>' for more details`,
    },
    project: {
      desc: "Get details on a specific project",
      fn: (args) => {
        const projectName = args?.toLowerCase() || ""
        const projects: Record<string, string> = {
          portfolio:
            "Interactive Portfolio: Built with vanilla JS, HTML5 Canvas, and CSS animations. Features responsive design, terminal emulation, and environment switching. Deployed at portfolio.dev",
          visualization:
            "Data Visualization Suite: React-based dashboard with real-time D3.js charts and WebGL rendering. Handles 100k+ data points with smooth performance.",
          generative:
            "Generative Art Engine: p5.js powered system for creating algorithmic art with custom flow fields and particle systems.",
          wholesale_ecom: `<span class="success">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="info">PROJECT: wholesale_ecom</span>
<span class="success">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

B2B E-commerce Platform for wholesale distribution
Tech Stack: Next.js, PostgreSQL, Stripe, Redis

Features:
  • Multi-tenant architecture
  • Real-time inventory management
  • Automated invoicing system
  • Custom pricing tiers

<span class="prompt">Status:</span> Production ✓
<span class="prompt">Repo:</span> github.com/croda/wholesale-ecom`,
          web_daw: `<span class="success">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="info">PROJECT: web_daw</span>
<span class="success">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

Browser-based Digital Audio Workstation
Tech Stack: Web Audio API, React, WebAssembly

Features:
  • Multi-track recording
  • Real-time effects processing
  • MIDI controller support
  • Cloud project storage

<span class="prompt">Status:</span> Beta ✓
<span class="prompt">Repo:</span> github.com/croda/web-daw`,
        }
        return projects[projectName] || `<span class="error">Project not found. Try: project portfolio</span>`
      },
    },
    skills: {
      desc: "Display technical skills",
      fn: () => `<span class="success">Technical Skills:</span>

Languages: JavaScript (Expert) | Python | TypeScript | HTML/CSS
Frameworks: React | Vue | Node.js | Express
Libraries: D3.js | Three.js | p5.js | Canvas API
Databases: PostgreSQL | MongoDB | Redis
DevOps: Docker | AWS | GitHub Actions | Heroku`,
    },
    contact: {
      desc: "Display contact information",
      fn: () => `<span class="success">Contact Information:</span>

Email: <span class="info">hello@christopherrodriguez.dev</span>
GitHub: <span class="info">github.com/christopherrodriguez</span>
LinkedIn: <span class="info">linkedin.com/in/christopherrodriguez</span>
Portfolio: <span class="info">christopherrodriguez.dev</span>`,
    },
    clear: {
      desc: "Clear terminal output",
      fn: () => {
        setHistory([])
        return ""
      },
    },
    env: {
      desc: "Display current environment",
      fn: () => {
        const envMap: Record<string, string> = {
          matrix: "MEM_ALLOC (Dot Matrix)",
          hex: "SYS_DUMP (Hex Rain)",
          wireframe: "TOPO_SCAN (Topology)",
        }
        return `<span class="success">Current Environment:</span> ${envMap[currentEnv]}
Use buttons at top to switch environments.`
      },
    },
    echo: {
      desc: "Echo text back to terminal",
      fn: (args) => args || "echo: nothing to echo",
    },
    cat: {
      desc: "Display file contents",
      fn: (args) => {
        const files: Record<string, string> = {
          "about.md": `<span class="info"># About Christopher Rodriguez</span>

Creative technologist with 8+ years of experience building 
interactive web experiences and full-stack applications.

Specializing in:
  → Real-time data visualization
  → Creative coding & generative art
  → High-performance web applications
  → Developer tooling & CLI design

Currently available for freelance projects.`,
          "contact.txt": `<span class="info">━━━━ CONTACT INFO ━━━━</span>

📧 Email: hello@christopherrodriguez.dev
🐙 GitHub: github.com/christopherrodriguez
💼 LinkedIn: linkedin.com/in/christopherrodriguez
🌐 Web: christopherrodriguez.dev

<span class="success">Open to opportunities!</span>`,
        }
        const filename = args?.trim() || ""
        return files[filename] || `<span class="error">cat: ${filename}: No such file or directory</span>`
      },
    },
    ls: {
      desc: "List directory contents",
      fn: () => `<span class="info">drwxr-xr-x</span>  projects/
<span class="info">-rw-r--r--</span>  about.md
<span class="info">-rw-r--r--</span>  contact.txt
<span class="info">-rwxr-xr-x</span>  build.sh`,
    },
    "./build.sh": {
      desc: "Build a project",
      fn: (args) => {
        const projectName = args?.trim() || ""
        if (!projectName) {
          return `<span class="error">Usage: ./build.sh [project_name]</span>`
        }
        // Trigger the project command
        return commands.project.fn(projectName)
      },
    },
  }

  const executeCommand = useCallback(
    (input: string) => {
      if (!input.trim()) return

      const cmdLine = `<span class="prompt">❯</span> ${input}`
      const parts = input.trim().split(/\s+/)
      const cmd = parts[0].toLowerCase()
      const args = parts.slice(1).join(" ")

      let result = ""
      if (commands[cmd]) {
        result = commands[cmd].fn(args)
      } else {
        result = `<span class="error">Command not found: ${cmd}. Type 'help' for available commands.</span>`
      }

      setHistory((prev) => [...prev, cmdLine, ...(result ? [result, ""] : [""])])
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
    },
    [currentEnv]
  )

  // Expose executeCommand globally for the file tree
  useEffect(() => {
    ;(window as unknown as { triggerCommand: (cmd: string) => void }).triggerCommand = executeCommand
  }, [executeCommand])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue)
      setInputValue("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(newIndex)
      setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setInputValue(newIndex >= 0 ? commandHistory[commandHistory.length - 1 - newIndex] : "")
    }
  }

  return (
    <div className="terminal-pane">
      <div className="terminal-output" ref={outputRef}>
        {history.map((line, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />
        ))}
      </div>
      <div className="input-line">
        <span className="prompt">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command..."
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
      </div>
    </div>
  )
}
