"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
  twinkleOffset: number
  connections: number[]
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 15000)
      starsRef.current = []

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          brightness: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          connections: [],
        })
      }

      // Pre-calculate connections for constellation effect
      const connectionDistance = 120
      starsRef.current.forEach((star, i) => {
        starsRef.current.forEach((otherStar, j) => {
          if (i < j) {
            const dx = star.x - otherStar.x
            const dy = star.y - otherStar.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < connectionDistance && Math.random() > 0.7) {
              star.connections.push(j)
            }
          }
        })
      })
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      timeRef.current += 0.016 // ~60fps

      // Clear with dark background
      ctx.fillStyle = "#050508"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw engineering grid (static, subtle)
      ctx.strokeStyle = "rgba(100, 100, 120, 0.08)"
      ctx.lineWidth = 1
      const gridSize = 40

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw constellation connections
      starsRef.current.forEach((star, i) => {
        star.connections.forEach((j) => {
          const otherStar = starsRef.current[j]
          const alpha = Math.min(star.brightness, otherStar.brightness) * 0.15
          ctx.strokeStyle = `rgba(170, 180, 200, ${alpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(otherStar.x, otherStar.y)
          ctx.stroke()
        })
      })

      // Draw stars with twinkling
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed * 60 + star.twinkleOffset)
        const currentBrightness = star.brightness + twinkle * 0.15

        // Star glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
        gradient.addColorStop(0, `rgba(200, 210, 230, ${currentBrightness})`)
        gradient.addColorStop(0.5, `rgba(150, 160, 180, ${currentBrightness * 0.3})`)
        gradient.addColorStop(1, "rgba(100, 110, 130, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Star core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentBrightness})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 0.6, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    if (!prefersReducedMotion) {
      draw()
    } else {
      // Static fallback
      ctx.fillStyle = "#050508"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      initStars()
      starsRef.current.forEach((star) => {
        ctx.fillStyle = `rgba(200, 210, 230, ${star.brightness})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="starfield-container">
      <canvas ref={canvasRef} />
    </div>
  )
}
