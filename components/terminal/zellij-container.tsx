"use client"

import { useState, useEffect, useCallback } from "react"
import { Terminal } from "./terminal"
import { FileTree } from "./file-tree"
import { CosmicNetworkBackground } from "./cosmic-network-background"
import { GuiFrontend } from "../gui/gui-frontend"

type ViewMode = "SYS_ADMIN" | "CLIENT_GUI" | "BOOTING"

export function ZellijContainer() {
  const [viewMode, setViewMode] = useState<ViewMode>("SYS_ADMIN")
  const [currentTime, setCurrentTime] = useState("")

  // Digital clock - HH_MM_SS PST
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const pst = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Los_Angeles",
      }).format(now)
      setCurrentTime(pst.replace(/:/g, "_"))
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle GUI boot transition
  const handleBootGui = useCallback(() => {
    setViewMode("BOOTING")
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
      <CosmicNetworkBackground />

      {/* Top System Bar - Clock (right aligned) */}
      <div className="system-bar top">
        <span className="clock">{currentTime} PST</span>
      </div>

      {/* Zellij Terminal Container */}
      <div className="zellij">
        {/* Top Black Bar - Clean Style */}
        <div className="zellij-top-bar">
          <span className="terminal-title-text">Terminal (c.Rod_dev_profile)</span>
          <button className="gui-boot-btn" onClick={handleBootGui} title="Boot into GUI mode">
            [ INIT_GUI ]
          </button>
        </div>

        {/* Main Body with Bordered Panes */}
        <div className="zellij-body">
          <div className="strider-pane-wrapper">
            <FileTree onCommand={() => {}} />
          </div>
          <div className="terminal-pane-wrapper">
            <Terminal onBootGui={handleBootGui} />
          </div>
        </div>

        {/* Bottom Black Bar - Clean Style */}
        <div className="zellij-bottom-bar">
          <div className="shortcuts">
            <span className="shortcut">Ctrl + <span className="key">&lt;q&gt;</span> LOCK</span>
            <span className="shortcut"><span className="key">&lt;p&gt;</span> PANE</span>
            <span className="shortcut"><span className="key">&lt;t&gt;</span> TAB</span>
            <span className="shortcut"><span className="key">&lt;n&gt;</span> RESIZE</span>
            <span className="shortcut"><span className="key">&lt;h&gt;</span> MOVE</span>
            <span className="shortcut"><span className="key">&lt;s&gt;</span> SEARCH</span>
            <span className="shortcut"><span className="key">&lt;o&gt;</span> SESSION</span>
            <span className="shortcut"><span className="key">&lt;q&gt;</span> QUIT</span>
          </div>
        </div>
      </div>
    </div>
  )
}
