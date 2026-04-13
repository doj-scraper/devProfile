"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { projects, profileData, buildLogSteps, guiBootSteps } from "@/lib/portfolio-data"

interface TerminalProps {
  onBootGui?: () => void
}

export function Terminal({ onBootGui }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    '<span class="prompt">❯</span> cd ~/projects/portfolio',
    '<span class="prompt">❯</span> source environment.sh',
    '<span class="success">✓ Environment initialized</span>',
    '',
    '<span class="prompt">❯</span> Type <span class="info">help</span> for available commands',
    '<span class="prompt">❯</span> Type <span class="info">startx</span> to boot into GUI mode',
    '',
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputValue, setInputValue] = useState("")
  const [isLocked, setIsLocked] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Helper to add output with animation
  const addOutput = useCallback((text: string) => {
    setHistory((prev) => [...prev, text])
  }, [])

  // Simulate build log animation
  const simulateBuild = useCallback(
    async (projectId: string, projectDetails: string) => {
      setIsLocked(true)
      
      const project = projects.find((p) => p.id === projectId)
      const displayName = project?.title || projectId

      addOutput("")
      addOutput(`<span class="prompt">❯</span> ./build.sh ${projectId}`)
      addOutput(`<span class="info">> INIT: Deployment script for ${displayName}</span>`)

      for (const step of buildLogSteps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay))
        addOutput(step.text)
      }

      await new Promise((resolve) => setTimeout(resolve, 400))
      addOutput("")
      addOutput('<span class="info">══════════════════════════════════════════════════</span>')
      addOutput(projectDetails)
      addOutput('<span class="info">══════════════════════════════════════════════════</span>')
      addOutput("")

      setIsLocked(false)
      inputRef.current?.focus()
    },
    [addOutput]
  )

  // Boot into GUI mode
  const bootGui = useCallback(async () => {
    setIsLocked(true)

    addOutput("")
    addOutput('<span class="prompt">❯</span> startx')

    for (const step of guiBootSteps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay))
      addOutput(step.text)
    }

    await new Promise((resolve) => setTimeout(resolve, 600))
    
    if (onBootGui) {
      onBootGui()
    }
  }, [addOutput, onBootGui])

  const commands: Record<string, { desc: string; fn: (args?: string) => string | Promise<string> }> = {
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
    startx: {
      desc: "Boot into GUI display mode",
      fn: () => {
        bootGui()
        return ""
      },
    },
    about: {
      desc: "Display portfolio information",
      fn: () => `<span class="info">${profileData.name}</span>
${profileData.title}
${profileData.tagline}

Key Skills:
  • Frontend: React, HTML5 Canvas, WebGL
  • Backend: Node.js, Python, Database Design
  • Creative: Generative art, UX/UI, Data visualization
  • Tools: Git, Docker, AWS, CI/CD pipelines`,
    },
    projects: {
      desc: "List featured projects",
      fn: () => {
        let output = '<span class="success">Featured Projects:</span>\n\n'
        projects.forEach((project, i) => {
          output += `${i + 1}. <span class="info">${project.title}</span>\n`
          output += `   ${project.description.slice(0, 60)}...\n`
          output += `   Status: ${project.status} ✓\n\n`
        })
        output += `\nUse '<span class="prompt">project [name]</span>' or '<span class="prompt">./build.sh [name]</span>' for details`
        return output
      },
    },
    project: {
      desc: "Get details on a specific project (with build animation)",
      fn: async (args) => {
        const projectId = args?.toLowerCase().trim() || ""
        const project = projects.find((p) => p.id === projectId || p.id.includes(projectId))

        if (project) {
          const details = `<span class="success">PROJECT: ${project.title}</span>
<span class="info">Tech Stack:</span> ${project.techStack.join(", ")}

${project.description}

<span class="info">Features:</span>
${project.features.map((f) => `  • ${f}`).join("\n")}

<span class="prompt">Status:</span> ${project.status} ✓
${project.repo ? `<span class="prompt">Repo:</span> ${project.repo}` : ""}`

          simulateBuild(project.id, details)
          return ""
        } else {
          const availableIds = projects.map((p) => p.id).join(", ")
          return `<span class="error">Project not found. Available: ${availableIds}</span>`
        }
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

Email: <span class="info">${profileData.email}</span>
GitHub: <span class="info">${profileData.github}</span>
LinkedIn: <span class="info">${profileData.linkedin}</span>
Portfolio: <span class="info">${profileData.website}</span>`,
    },
    clear: {
      desc: "Clear terminal output",
      fn: () => {
        setHistory([])
        return ""
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
          "about.md": `<span class="info"># About ${profileData.name}</span>

${profileData.bio}`,
          "contact.txt": `<span class="info">━━━━ CONTACT INFO ━━━━</span>

Email: ${profileData.email}
GitHub: ${profileData.github}
LinkedIn: ${profileData.linkedin}
Web: ${profileData.website}

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
      desc: "Build a project with animation",
      fn: (args) => {
        const projectName = args?.trim() || ""
        if (!projectName) {
          return `<span class="error">Usage: ./build.sh [project_name]</span>\n<span class="info">Available:</span> ${projects.map((p) => p.id).join(", ")}`
        }
        // Trigger the project command
        return commands.project.fn(projectName) as string
      },
    },
  }

  const executeCommand = useCallback(
    async (input: string) => {
      if (!input.trim() || isLocked) return

      const cmdLine = `<span class="prompt">❯</span> ${input}`
      const parts = input.trim().split(/\s+/)
      const cmd = parts[0].toLowerCase()
      const args = parts.slice(1).join(" ")

      let result = ""
      if (commands[cmd]) {
        const output = commands[cmd].fn(args)
        result = output instanceof Promise ? await output : output
      } else {
        result = `<span class="error">Command not found: ${cmd}. Type 'help' for available commands.</span>`
      }

      if (cmd !== "project" && cmd !== "./build.sh" && cmd !== "startx") {
        setHistory((prev) => [...prev, cmdLine, ...(result ? [result, ""] : [""])])
      }
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
    },
    [isLocked]
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
    if (isLocked) return
    
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
          placeholder={isLocked ? "compiling..." : "Enter command..."}
          autoComplete="off"
          spellCheck={false}
          autoFocus
          disabled={isLocked}
        />
      </div>
    </div>
  )
}
