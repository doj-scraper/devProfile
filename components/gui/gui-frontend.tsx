"use client"

import { useState, useEffect, useRef } from "react"
import { 
  profileData, 
  services, 
  certModules, 
  capstoneProjects, 
  whyNowItems 
} from "@/lib/portfolio-data"

interface GuiFrontendProps {
  onExitGui: () => void
}

export function GuiFrontend({ onExitGui }: GuiFrontendProps) {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [openModule, setOpenModule] = useState<string>("MOD_01")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal')
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observerRef.current?.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    
    reveals.forEach(r => observerRef.current?.observe(r))
    
    return () => observerRef.current?.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="gui-wrap">
      {/* Global Texture Overlays */}
      <div className="gui-grid-overlay" />
      <div className="gui-scanlines" />

      {/* Navigation */}
      <nav className="gui-nav-bar">
        <div className="nav-logo">
          <div className="nav-dot" />
          CHRISTOPHER<span>.AI</span>
        </div>
        <ul className="nav-links">
          <li><button onClick={() => scrollToSection('services')}>SERVICES</button></li>
          <li><button onClick={() => scrollToSection('about')}>ABOUT</button></li>
          <li><button onClick={() => scrollToSection('cert')}>CERTIFICATION</button></li>
          <li><button onClick={() => scrollToSection('capstone')}>CAPSTONE</button></li>
          <li><button onClick={() => scrollToSection('contact')}>CONTACT</button></li>
        </ul>
        <div className="nav-ctas">
          <button className="btn-secondary" onClick={onExitGui}>EXIT_GUI</button>
          <button className="btn-primary" onClick={() => scrollToSection('contact')}>BOOK CALL</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gui-hero" id="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-sys-tag">
              <span className="tag-dot" />
              SYS_ID: CAI-2026 // {profileData.location.toUpperCase()} // ACTIVE
            </div>
            <h1 className="hero-headline">
              ENGINEER<br />
              THE <span className="accent">AGENTIC</span><br />
              <span className="red">FUTURE</span>
            </h1>
            <p className="hero-sub">{profileData.tagline}</p>
            <p className="hero-body">{profileData.bio}</p>
            <div className="hero-ctas">
              <button className="btn-primary-lg" onClick={() => scrollToSection('cert')}>
                EXPLORE CERTIFICATION
              </button>
              <button className="btn-secondary-lg" onClick={() => scrollToSection('services')}>
                VIEW SERVICES
              </button>
            </div>
          </div>

          <div className="hero-terminal">
            <div className="terminal-bar">
              <div className="t-dot r" />
              <div className="t-dot y" />
              <div className="t-dot g" />
              <div className="terminal-title">PIPELINE // LIVE</div>
            </div>
            <div className="terminal-line">
              <span className="prompt">❯ </span>
              <span className="cmd">swarm init --agents 5 --mode async</span>
            </div>
            <div className="terminal-line"><span className="out">✓ WEAVER       [PM]       ONLINE</span></div>
            <div className="terminal-line"><span className="out">✓ NAVIGATOR    [ARCH]     ONLINE</span></div>
            <div className="terminal-line"><span className="out">✓ SCRUTINEER   [QA]       ONLINE</span></div>
            <div className="terminal-line"><span className="out">✓ LEDGER       [DATA]     ONLINE</span></div>
            <div className="terminal-line"><span className="out">✓ CHRONICLER   [SYNTH]    ONLINE</span></div>
            <div className="terminal-line"><span className="comment">// shared_state: BACKENDREPORT.md</span></div>
            <div className="terminal-line">
              <span className="prompt">❯ </span>
              <span className="cmd">deploy --env production --hardened</span>
            </div>
            <div className="terminal-line"><span className="out">✓ QUANTUM_LAYER hardened</span></div>
            <div className="terminal-line"><span className="out">✓ NIST-aligned checks passed</span></div>
            <div className="terminal-line">
              <span className="out-red">⬤ PIPELINE RUNNING</span> 
              <span className="cursor">█</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Bar */}
      <div className="stat-bar reveal">
        <div className="stat-item">
          <div className="stat-val">5+</div>
          <div className="stat-label">AGENTS / PIPELINE</div>
        </div>
        <div className="stat-item">
          <div className="stat-val">NIST</div>
          <div className="stat-label">ALIGNED PRACTICES</div>
        </div>
        <div className="stat-item">
          <div className="stat-val">2026</div>
          <div className="stat-label">WHY NOW</div>
        </div>
        <div className="stat-item">
          <div className="stat-val">∞</div>
          <div className="stat-label">SCALE // ASYNC</div>
        </div>
      </div>

      {/* Services Section */}
      <section className="gui-section reveal" id="services">
        <div className="section-header">
          <div className="section-tag">01 // SERVICES</div>
          <h2 className="section-title">WHAT I <span>BUILD</span></h2>
          <div className="section-num">SVC_MAP // v2.4</div>
        </div>

        <div className="services-grid">
          {services.map((svc) => (
            <div 
              key={svc.id} 
              className={`svc-card ${svc.variant === 'red' ? 'red-card' : ''} ${svc.variant === 'green' ? 'green-card' : ''}`}
              data-num={svc.id}
            >
              <span className="svc-icon">{svc.icon}</span>
              <div className="svc-title">{svc.title}</div>
              <span className={`svc-tag ${svc.variant}`}>{svc.tag}</span>
              <div className="svc-desc">{svc.description}</div>
              <span className={`svc-badge ${svc.variant}`}>{svc.badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Now Section */}
      <section className="gui-section reveal" id="about">
        <div className="section-header">
          <div className="section-tag">02 // CONTEXT</div>
          <h2 className="section-title">WHY <span>2026</span></h2>
          <div className="section-num">THREAT_MATRIX // ACTIVE</div>
        </div>
        <div className="why-grid">
          {whyNowItems.map((item, i) => (
            <div key={i} className="why-cell">
              <div className="why-cell-tag">{item.tag}</div>
              <div className="why-cell-title">{item.title}</div>
              <div className="why-cell-body">{item.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certification Section */}
      <section className="gui-section reveal" id="cert">
        <div className="section-header">
          <div className="section-tag">03 // TRAINING</div>
          <h2 className="section-title">SECURE AGENTIC AI <span>PRACTITIONER</span></h2>
          <div className="section-num">CERT_PROG // v1.0</div>
        </div>

        <div className="cert-panel">
          <div className="cert-modules">
            <p className="cert-intro">
              The only certification built around production agentic systems. Not theory. Not toy demos. 
              You&apos;ll design, build, harden, and deploy a multi-agent system with real security constraints 
              — and walk away with a capstone project you can show.
            </p>

            <div className="module-list">
              {certModules.map((mod) => (
                <div 
                  key={mod.id}
                  className={`module ${openModule === mod.id ? 'open' : ''}`}
                  onClick={() => setOpenModule(openModule === mod.id ? '' : mod.id)}
                >
                  <div className="module-head">
                    <span className="module-num">{mod.id}</span>
                    <span className="module-name">{mod.name}</span>
                    <span className="module-arrow">❯</span>
                  </div>
                  <div className="module-body">
                    <div className="module-body-inner">{mod.description}</div>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${mod.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cert-badge-section">
            <div className="cert-badge-panel">
              <span className="cert-badge-icon">⬡</span>
              <div className="cert-badge-title">SECURE AGENTIC AI<br />PRACTITIONER</div>
              <div className="cert-badge-sub">
                CERTIFIED // 2026<br />
                QUANTUM-HARDENED<br />
                NIST-ALIGNED
              </div>
              <div className="cert-divider" />
              <div className="cert-stat">
                <div className="cert-stat-item">
                  <div className="cert-stat-val">5</div>
                  <span className="cert-stat-label">MODULES</span>
                </div>
                <div className="cert-stat-item">
                  <div className="cert-stat-val">1</div>
                  <span className="cert-stat-label">CAPSTONE</span>
                </div>
                <div className="cert-stat-item">
                  <div className="cert-stat-val">∞</div>
                  <span className="cert-stat-label">ACCESS</span>
                </div>
              </div>
              <button className="btn-primary-lg full-width" onClick={() => scrollToSection('contact')}>
                ENROLL NOW
              </button>
            </div>

            <div className="code-block">
              <pre>
                <span className="c">// Capstone deliverable contract</span>{"\n"}
                <span className="k">export</span> <span className="k">interface</span> <span className="f">CapstoneArtifact</span> {"{"}{"\n"}
                {"  "}agents:     <span className="s">AgentConfig[]</span>;{"\n"}
                {"  "}sharedState:<span className="s">StateContract</span>;{"\n"}
                {"  "}qaGate:     <span className="s">ScrutineerReport</span>;{"\n"}
                {"  "}deployment: <span className="s">HardenedEnv</span>;{"\n"}
                {"  "}casestudy:  <span className="s">CASESTUDY_MD</span>;{"\n"}
                {"}"}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Capstone Projects Section */}
      <section className="gui-section reveal" id="capstone">
        <div className="section-header">
          <div className="section-tag">04 // EXAMPLES</div>
          <h2 className="section-title">CAPSTONE <span>PROJECTS</span></h2>
          <div className="section-num">PROD_EXAMPLES // 2026</div>
        </div>

        <div className="capstone-grid">
          {capstoneProjects.map((project, i) => (
            <div key={i} className="cap-card">
              <div className="cap-title">{project.title}</div>
              <span className="cap-tag">{project.tag}</span>
              <div className="cap-desc">{project.description}</div>
              <div className="cap-metric">
                <div className="cap-metric-val">{project.metricValue}</div>
                <div className="cap-metric-label">{project.metricLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <div className="cta-banner reveal" id="contact">
        <div className="cta-inner">
          <div>
            <div className="cta-headline">READY TO <span>ENGINEER</span><br />YOUR AI SYSTEMS?</div>
            <div className="cta-sub">{profileData.location} · Available globally · Response within 24hrs</div>
          </div>
          <div className="cta-buttons">
            <a href={`mailto:${profileData.email}`} className="btn-primary-lg">
              BOOK DISCOVERY CALL
            </a>
            <button className="btn-secondary-lg" onClick={() => scrollToSection('cert')}>
              VIEW CERTIFICATION
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="gui-footer">
        <div className="footer-inner">
          <div className="footer-logo">CHRISTOPHER<span>.AI</span></div>
          <div className="footer-links">
            <button onClick={() => scrollToSection('services')}>SERVICES</button>
            <button onClick={() => scrollToSection('cert')}>CERTIFICATION</button>
            <button onClick={() => scrollToSection('capstone')}>CAPSTONE</button>
            <button onClick={() => scrollToSection('contact')}>CONTACT</button>
          </div>
          <div className="footer-sig">
            {profileData.location.toUpperCase()} · NIST-ALIGNED · QUANTUM-HARDENED<br />
            <span>© 2026 CHRISTOPHER // ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>

      {/* Mini Terminal Bar */}
      <MiniTerminalBar onExitGui={onExitGui} />
    </div>
  )
}

function MiniTerminalBar({ onExitGui }: { onExitGui: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([
    '<span class="out">GUI mode active</span> | Type "exit" to return to terminal',
  ])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (trimmed === "exit") {
      onExitGui()
      return
    }
    if (trimmed === "help") {
      setOutput((prev) => [
        ...prev,
        `<span class="prompt">❯</span> ${cmd}`,
        '<span class="out">Mini-terminal commands: exit, help, status</span>',
      ])
    } else if (trimmed === "status") {
      setOutput((prev) => [
        ...prev,
        `<span class="prompt">❯</span> ${cmd}`,
        '<span class="out">System: CLIENT_GUI | All agents nominal</span>',
      ])
    } else {
      setOutput((prev) => [
        ...prev, 
        `<span class="prompt">❯</span> ${cmd}`, 
        `<span class="out-red">Command not available in GUI mode. Type "exit" for full terminal.</span>`
      ])
    }
    setInput("")
  }

  return (
    <div className={`mini-terminal ${isExpanded ? "expanded" : ""}`}>
      <div className="mini-terminal-bar" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="mini-status">⬤ system operational</span>
        <span className="mini-hint">{isExpanded ? "click to collapse" : "click for command palette"}</span>
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
