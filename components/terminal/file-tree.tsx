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
      <div className="tree-root">~/croda_consulting</div>
      <div className="tree-item" onClick={() => handleClick("cat about.md")}>
        ├──  about.md
      </div>
      <div className="tree-dir">├──  projects</div>
      <div className="tree-item indent" onClick={() => handleClick("./build.sh wholesale_ecom")}>
        │   ├──  wholesale_ecom
      </div>
      <div className="tree-item indent" onClick={() => handleClick("./build.sh web_daw")}>
        │   └── 󰈃 web_daw
      </div>
      <div className="tree-item" onClick={() => handleClick("cat contact.txt")}>
        └──  contact.txt
      </div>
    </div>
  )
}
