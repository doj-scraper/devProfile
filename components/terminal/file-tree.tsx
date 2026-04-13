"use client"

interface FileTreeProps {
  onCommand: (cmd: string) => void
}

export function FileTree({ onCommand }: FileTreeProps) {
  const handleClick = (cmd: string) => {
    // Use the global triggerCommand if available, otherwise use onCommand
    const win = window as unknown as { triggerCommand?: (cmd: string) => void }
    if (win.triggerCommand) {
      win.triggerCommand(cmd)
    } else {
      onCommand(cmd)
    }
  }

  return (
    <div className="strider-pane">
      <div className="strider-find">
        <span className="find-label">FIND:</span>
        <span className="find-icon"></span>
      </div>
      <div className="strider-path">
        <span className="path-label">PATH:</span>
        <span className="path-value">/h/croda/portfolio &lt;ENTER&gt;</span>
      </div>
      <div className="strider-help">
        (<span className="key-hint">&lt;↓↑&gt;</span> - Navigate, <span className="key-hint">&lt;TAB&gt;</span> - Select)
      </div>
      <div className="strider-files">
        <div className="tree-dir" onClick={() => handleClick("ls")}>backend/</div>
        <div className="tree-dir" onClick={() => handleClick("ls")}>frontend/</div>
        <div className="tree-dir" onClick={() => handleClick("ls")}>prisma/</div>
        <div className="tree-file" onClick={() => handleClick("cat about.md")}>
          <span className="file-name">about.md</span>
          <span className="file-size">10.24 kB</span>
        </div>
        <div className="tree-file" onClick={() => handleClick("./build.sh wholesale_ecom")}>
          <span className="file-name">wholesale_ecom</span>
          <span className="file-size">38.12 kB</span>
        </div>
        <div className="tree-file" onClick={() => handleClick("./build.sh web_daw")}>
          <span className="file-name">web_daw</span>
          <span className="file-size">9.9 kB</span>
        </div>
        <div className="tree-file" onClick={() => handleClick("cat contact.txt")}>
          <span className="file-name">contact.txt</span>
          <span className="file-size">3.05 kB</span>
        </div>
        <div className="tree-file" onClick={() => handleClick("skills")}>
          <span className="file-name">skills.yml</span>
          <span className="file-size">21.26 kB</span>
        </div>
        <div className="tree-file" onClick={() => handleClick("projects")}>
          <span className="file-name">projects.json</span>
          <span className="file-size">15.18 kB</span>
        </div>
      </div>
      <div className="strider-footer">
        <span className="ctrl-hint">&lt;Ctrl c&gt;</span> - back, <span className="path-hint">/</span> - root
      </div>
    </div>
  )
}
