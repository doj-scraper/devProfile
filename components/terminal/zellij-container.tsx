"use client"

import { useState, useEffect } from "react"
import { Terminal } from "./terminal"
import { FileTree } from "./file-tree"
import { BackgroundCanvas } from "./background-canvas"

type Environment = "matrix" | "hex" | "wireframe"

export function ZellijContainer() {
  const [currentEnv, setCurrentEnv] = useState<Environment>("matrix")
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

  const envButtons: { id: Environment; label: string; title: string }[] = [
    { id: "matrix", label: "[ ENV: MEM_ALLOC ]", title: "Toggle matrix environment" },
    { id: "hex", label: "[ ENV: SYS_DUMP ]", title: "Toggle hex dump environment" },
    { id: "wireframe", label: "[ ENV: TOPO_SCAN ]", title: "Toggle topology scan" },
  ]

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
      </div>

      {/* Zellij Terminal Container */}
      <div className="zellij">
        <div className="zellij-header">
          <span>Tab #1 ◫ strider</span>
          <span>{headerText}</span>
        </div>

        <div className="zellij-body">
          <FileTree onCommand={() => {}} />
          <Terminal currentEnv={currentEnv} onEnvChange={setCurrentEnv} />
        </div>
      </div>
    </div>
  )
}
