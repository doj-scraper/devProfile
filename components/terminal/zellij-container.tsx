"use client"

import { useState, useEffect, useCallback } from "react"
import { Terminal } from "./terminal"
import { FileTree } from "./file-tree"
import { BackgroundCanvas } from "./background-canvas"
import { GuiFrontend } from "../gui/gui-frontend"

type Environment = "matrix" | "hex" | "wireframe"
type ViewMode = "SYS_ADMIN" | "CLIENT_GUI" | "BOOTING"

export function ZellijContainer() {
  const [currentEnv, setCurrentEnv] = useState<Environment>("matrix")
  const [viewMode, setViewMode] = useState<ViewMode>("SYS_ADMIN")
  const [headerText, setHeaderText] = useState("Christopher Rodriguez - Portfolio")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setHeaderText("Portfolio")
      } else if (width < 1024) {
        setHeaderText("Chris Rodriguez - Portfolio")
      } else {
        setHeaderText("Christopher Rodriguez - Portfolio")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle GUI boot transition
  const handleBootGui = useCallback(() => {
    setViewMode("BOOTING")
    // Brief flash effect then switch to GUI
    setTimeout(() => {
      setViewMode("CLIENT_GUI")
    }, 800)
  }, [])

  // Handle exit from GUI back to terminal
  const handleExitGui = useCallback(() => {
    setViewMode("SYS_ADMIN")
  }, [])

  // Expose exitGui globally for mini-terminal
  useEffect(() => {
    ;(window as unknown as { exitGui: () => void }).exitGui = handleExitGui
  }, [handleExitGui])

  const envButtons: { id: Environment; label: string; title: string }[] = [
    { id: "matrix", label: "[ ENV: MEM_ALLOC ]", title: "Toggle matrix environment" },
    { id: "hex", label: "[ ENV: SYS_DUMP ]", title: "Toggle hex dump environment" },
    { id: "wireframe", label: "[ ENV: TOPO_SCAN ]", title: "Toggle topology scan" },
  ]

  // GUI Mode - Render polished frontend
  if (viewMode === "CLIENT_GUI") {
    return (
      <div className="zellij-app gui-mode">
        <GuiFrontend onExitGui={handleExitGui} />
      </div>
    )
  }

  // Booting transition effect
  if (viewMode === "BOOTING") {
    return (
      <div className="zellij-app booting">
        <div className="boot-flash" />
      </div>
    )
  }

  // Terminal Mode (SYS_ADMIN) - Default
  return (
    <div className="zellij-app">
      <BackgroundCanvas currentEnv={currentEnv} />

      {/* System Header Controls */}
      <div className="controls">
        <span className="sys-text">[ CRODA_SYS ]</span>
        {envButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setCurrentEnv(btn.id)}
            className={currentEnv === btn.id ? "active" : ""}
            title={btn.title}
          >
            {btn.label}
          </button>
        ))}
        <button className="gui-boot-btn" onClick={handleBootGui} title="Boot into GUI mode">
          [ INIT_GUI ]
        </button>
      </div>

      {/* Zellij Terminal Container */}
      <div className="zellij">
        <div className="zellij-header">
          <span>Tab #1 ◫ strider</span>
          <span>{headerText}</span>
        </div>

        <div className="zellij-body">
          <FileTree onCommand={() => {}} />
          <Terminal currentEnv={currentEnv} onEnvChange={setCurrentEnv} onBootGui={handleBootGui} />
        </div>
      </div>
    </div>
  )
}
