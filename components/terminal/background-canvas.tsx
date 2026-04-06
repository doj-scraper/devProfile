"use client"

import { useEffect, useRef } from "react"

interface BackgroundCanvasProps {
  currentEnv: string
}

export function BackgroundCanvas({ currentEnv }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const dotsRef = useRef<{ x: number; y: number; life: number }[]>([])
  const dropsRef = useRef<number[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Reinitialize hex drops on resize
      const fontSize = 16
      dropsRef.current = Array(Math.floor(canvas.width / fontSize)).fill(1)
    }

    // Initialize dots for matrix effect
    dotsRef.current = Array(250)
      .fill(null)
      .map(() => ({
        x: Math.random(),
        y: Math.random(),
        life: Math.random() * Math.PI * 2,
      }))

    resize()
    window.addEventListener("resize", resize)

    const chars = "0123456789ABCDEF".split("")
    const fontSize = 16

    const draw = () => {
      if (currentEnv === "wireframe") {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      // Fade effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (currentEnv === "matrix") {
        dotsRef.current.forEach((dot) => {
          dot.life += 0.03
          if (dot.life > Math.PI * 2) {
            dot.x = Math.random()
            dot.y = Math.random()
            dot.life = 0
          }
          const alpha = (Math.sin(dot.life) + 1) / 2
          ctx.fillStyle = `rgba(120, 120, 120, ${alpha * 0.4})`
          ctx.beginPath()
          ctx.arc(dot.x * canvas.width, dot.y * canvas.height, 1.5, 0, Math.PI * 2)
          ctx.fill()
        })
      } else if (currentEnv === "hex") {
        ctx.fillStyle = "#3a3a3a"
        ctx.font = fontSize + "px monospace"
        dropsRef.current.forEach((y, i) => {
          const text = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)]
          ctx.fillText(text, i * fontSize, y * fontSize)
          if (y * fontSize > canvas.height && Math.random() > 0.98) dropsRef.current[i] = 0
          dropsRef.current[i]++
        })
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    if (!prefersReducedMotion) {
      draw()
    } else {
      ctx.fillStyle = "#050505"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentEnv])

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        style={{ display: currentEnv === "wireframe" ? "none" : "block" }}
      />
      <div
        className="wireframe"
        style={{ display: currentEnv === "wireframe" ? "block" : "none" }}
      />
    </div>
  )
}
