"use client"

import { useState } from "react"
import { projects, profileData, skillCategories } from "@/lib/portfolio-data"

interface GuiFrontendProps {
  onExitGui: () => void
}

export function GuiFrontend({ onExitGui }: GuiFrontendProps) {
  const [activeSection, setActiveSection] = useState<"home" | "projects" | "about" | "contact">("home")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const navItems = [
    { id: "home" as const, label: "HOME" },
    { id: "projects" as const, label: "PROJECTS" },
    { id: "about" as const, label: "ABOUT" },
    { id: "contact" as const, label: "CONTACT" },
  ]

  return (
    <div className="gui-container">
      {/* Top Navigation Bar */}
      <header className="gui-header">
        <div className="gui-logo">[ CRODA ]</div>
        <nav className="gui-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setSelectedProject(null)
              }}
              className={activeSection === item.id ? "active" : ""}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className="gui-exit" onClick={onExitGui} title="Return to terminal">
          [ EXIT_GUI ]
        </button>
      </header>

      {/* Main Content Area */}
      <main className="gui-main">
        {activeSection === "home" && (
          <section className="gui-section gui-home">
            <div className="home-hero">
              <h1>{profileData.name}</h1>
              <p className="hero-tagline">{profileData.title}</p>
              <p className="hero-desc">{profileData.tagline}</p>
              <div className="hero-cta">
                <button onClick={() => setActiveSection("projects")}>View Projects</button>
                <button onClick={() => setActiveSection("contact")} className="secondary">
                  Get in Touch
                </button>
              </div>
            </div>
            <div className="home-featured">
              <h2>Featured Work</h2>
              <div className="featured-grid">
                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="featured-card"
                    onClick={() => {
                      setActiveSection("projects")
                      setSelectedProject(project.id)
                    }}
                  >
                    <div className="card-status">{project.status}</div>
                    <h3>{project.shortTitle}</h3>
                    <p>{project.description.slice(0, 100)}...</p>
                    <div className="card-tech">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === "projects" && (
          <section className="gui-section gui-projects">
            {selectedProject ? (
              <ProjectDetail
                project={projects.find((p) => p.id === selectedProject)!}
                onBack={() => setSelectedProject(null)}
              />
            ) : (
              <>
                <h1>Projects</h1>
                <p className="section-desc">A selection of technical work and creative experiments.</p>
                <div className="projects-grid">
                  {projects.map((project) => (
                    <div key={project.id} className="project-card" onClick={() => setSelectedProject(project.id)}>
                      <div className="project-header">
                        <h3>{project.title}</h3>
                        <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
                      </div>
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.techStack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <div className="project-features">
                        <h4>Key Features:</h4>
                        <ul>
                          {project.features.slice(0, 3).map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {activeSection === "about" && (
          <section className="gui-section gui-about">
            <h1>About</h1>
            <div className="about-content">
              <div className="about-bio">
                <h2>{profileData.name}</h2>
                <p className="bio-title">{profileData.title}</p>
                <div className="bio-text">
                  {profileData.bio.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              <div className="about-skills">
                <h2>Technical Skills</h2>
                {skillCategories.map((category) => (
                  <div key={category.name} className="skill-category">
                    <h3>{category.name}</h3>
                    <div className="skill-bars">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="skill-bar">
                          <div className="skill-label">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="skill-track">
                            <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === "contact" && (
          <section className="gui-section gui-contact">
            <h1>Contact</h1>
            <p className="section-desc">Open to opportunities and collaborations.</p>
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <div className="contact-links">
                  <a href={`mailto:${profileData.email}`} className="contact-link">
                    <span className="contact-icon">@</span>
                    <span>{profileData.email}</span>
                  </a>
                  <a
                    href={`https://${profileData.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <span className="contact-icon">&lt;/&gt;</span>
                    <span>{profileData.github}</span>
                  </a>
                  <a
                    href={`https://${profileData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <span className="contact-icon">in</span>
                    <span>{profileData.linkedin}</span>
                  </a>
                </div>
              </div>
              <div className="contact-form">
                <h2>Send a Message</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Message functionality would be connected here!")
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={4} required />
                  </div>
                  <button type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Persistent Mini Terminal Bar */}
      <MiniTerminalBar />
    </div>
  )
}

function ProjectDetail({ project, onBack }: { project: (typeof projects)[0]; onBack: () => void }) {
  return (
    <div className="project-detail">
      <button className="back-btn" onClick={onBack}>
        &larr; Back to Projects
      </button>
      <div className="detail-header">
        <h1>{project.title}</h1>
        <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
      </div>
      <div className="detail-tech">
        {project.techStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <p className="detail-desc">{project.description}</p>
      <div className="detail-features">
        <h2>Features</h2>
        <ul>
          {project.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>
      {(project.repo || project.liveUrl) && (
        <div className="detail-links">
          {project.repo && (
            <a href={`https://${project.repo}`} target="_blank" rel="noopener noreferrer">
              View Repository
            </a>
          )}
          {project.liveUrl && (
            <a href={`https://${project.liveUrl}`} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function MiniTerminalBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([
    '<span class="success">GUI mode active</span> | Type "exit" to return to terminal',
  ])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (trimmed === "exit") {
      // Trigger exit through window
      const exitFn = (window as unknown as { exitGui?: () => void }).exitGui
      if (exitFn) exitFn()
      return
    }
    if (trimmed === "help") {
      setOutput((prev) => [
        ...prev,
        `<span class="prompt">❯</span> ${cmd}`,
        '<span class="info">Mini-terminal commands: exit, help, status</span>',
      ])
    } else if (trimmed === "status") {
      setOutput((prev) => [
        ...prev,
        `<span class="prompt">❯</span> ${cmd}`,
        '<span class="success">System: CLIENT_GUI | All systems nominal</span>',
      ])
    } else {
      setOutput((prev) => [...prev, `<span class="prompt">❯</span> ${cmd}`, `<span class="error">Command not available in GUI mode. Type "exit" to access full terminal.</span>`])
    }
    setInput("")
  }

  return (
    <div className={`mini-terminal ${isExpanded ? "expanded" : ""}`}>
      <div className="mini-terminal-bar" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="mini-status">system running optimally</span>
        <span className="mini-hint">{isExpanded ? "click to collapse" : "click to open command palette"}</span>
        <span className="mini-cursor">█</span>
      </div>
      {isExpanded && (
        <div className="mini-terminal-content">
          <div className="mini-output">
            {output.map((line, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </div>
          <div className="mini-input-line">
            <span className="prompt">❯</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  handleCommand(input)
                }
              }}
              placeholder='Type "exit" to return to terminal...'
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  )
}
