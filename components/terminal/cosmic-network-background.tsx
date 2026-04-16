"use client"

import { useEffect, useRef } from "react"

interface Node {
  normX: number
  normY: number
  x: number
  y: number
  pulsePhase: number
  id: number
}

interface Edge {
  fromIdx: number
  toIdx: number
}

interface Particle {
  fromNode: number
  toNode: number
  t: number
  speed: number
  size: number
  color: string
}

interface Star {
  x: number
  y: number
  size: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
}

// Configuration - slowed down animation speeds
const CONFIG = {
  NODE_COUNT: 28,
  MAX_PARTICLES: 48,
  SPAWN_RATE: 0.15, // Reduced from 0.32 for slower spawning
  PARTICLE_SPEED_RANGE: [0.001, 0.008] as [number, number], // Slowed from [0.003, 0.018]
  PARTICLE_SIZE: 2.2,
  LINE_OPACITY: 0.22,
  LINE_GLOW: 0.6,
  NODE_GLOW_SIZE: 8,
  NODE_BASE_SIZE: 4,
  CONNECTION_NEIGHBORS: 3,
  EXTRA_LONG_EDGES: 2,
  STAR_COUNT: 180,
  STAR_TWINKLE_SPEED: 0.003, // Slowed from 0.008
  BACKGROUND_COLOR: "#05070c",
}

const COLORS = {
  primaryLine: "rgba(80, 180, 255, 0.7)",
  secondaryLine: "rgba(160, 100, 255, 0.6)",
  nodeGlow: "#3e8aff",
  nodeCore: "#c0e0ff",
  particlePrimary: "#4affd0",
  particleSecondary: "#b76eff",
  starBase: "#b8ccff",
}

export function CosmicNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  const nodesRef = useRef<Node[]>([])
  const edgesRef = useRef<Edge[]>([])
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Initialize stars
    const initStars = () => {
      starsRef.current = []
      for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 1.8 + 0.5,
          baseAlpha: Math.random() * 0.5 + 0.2,
          twinkleSpeed: 0.5 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    // Generate nodes in normalized UV space
    const generateNodes = (): Node[] => {
      const nodeList: Node[] = []
      for (let i = 0; i < CONFIG.NODE_COUNT; i++) {
        let normX: number, normY: number

        if (i < CONFIG.NODE_COUNT * 0.4) {
          const angle = (i / (CONFIG.NODE_COUNT * 0.4)) * Math.PI * 2
          const rad = 0.3 + Math.random() * 0.2
          normX = 0.5 + Math.cos(angle) * rad
          normY = 0.5 + Math.sin(angle) * rad
        } else {
          normX = 0.1 + Math.random() * 0.8
          normY = 0.1 + Math.random() * 0.8
        }

        normX += (Math.random() - 0.5) * 0.08
        normY += (Math.random() - 0.5) * 0.08
        normX = Math.min(0.94, Math.max(0.06, normX))
        normY = Math.min(0.94, Math.max(0.06, normY))

        nodeList.push({
          normX,
          normY,
          x: 0,
          y: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          id: i,
        })
      }
      return nodeList
    }

    // Distance between nodes (normalized)
    const distanceNorm = (a: Node, b: Node): number => {
      const dx = a.normX - b.normX
      const dy = a.normY - b.normY
      return Math.hypot(dx, dy)
    }

    // Build edges
    const buildEdges = (nodeList: Node[]): Edge[] => {
      const edgeSet = new Set<string>()
      const edgesArray: Edge[] = []
      const k = CONFIG.CONNECTION_NEIGHBORS

      const addEdge = (i: number, j: number) => {
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`
        if (edgeSet.has(key)) return
        edgeSet.add(key)
        edgesArray.push({ fromIdx: i, toIdx: j })
      }

      for (let i = 0; i < nodeList.length; i++) {
        const distances: { idx: number; dist: number }[] = []
        for (let j = 0; j < nodeList.length; j++) {
          if (i === j) continue
          const dist = distanceNorm(nodeList[i], nodeList[j])
          distances.push({ idx: j, dist })
        }
        distances.sort((a, b) => a.dist - b.dist)
        for (let n = 0; n < Math.min(k, distances.length); n++) {
          addEdge(i, distances[n].idx)
        }
      }

      let extra = 0
      const maxAttempts = 200
      for (let attempt = 0; attempt < maxAttempts && extra < CONFIG.EXTRA_LONG_EDGES; attempt++) {
        const i = Math.floor(Math.random() * nodeList.length)
        const j = Math.floor(Math.random() * nodeList.length)
        if (i === j) continue
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`
        if (!edgeSet.has(key)) {
          const dist = distanceNorm(nodeList[i], nodeList[j])
          if (dist > 0.35) {
            edgeSet.add(key)
            edgesArray.push({ fromIdx: i, toIdx: j })
            extra++
          }
        }
      }

      return edgesArray
    }

    // Update node positions
    const updateNodePositions = (width: number, height: number) => {
      for (const node of nodesRef.current) {
        node.x = node.normX * width
        node.y = node.normY * height
      }
    }

    // Spawn particle
    const spawnParticle = () => {
      if (particlesRef.current.length >= CONFIG.MAX_PARTICLES) return
      if (edgesRef.current.length === 0) return

      const randomEdge = edgesRef.current[Math.floor(Math.random() * edgesRef.current.length)]
      const speed =
        CONFIG.PARTICLE_SPEED_RANGE[0] +
        Math.random() * (CONFIG.PARTICLE_SPEED_RANGE[1] - CONFIG.PARTICLE_SPEED_RANGE[0])
      const colorChoice = Math.random() > 0.6 ? COLORS.particleSecondary : COLORS.particlePrimary

      particlesRef.current.push({
        fromNode: randomEdge.fromIdx,
        toNode: randomEdge.toIdx,
        t: 0,
        speed,
        size: CONFIG.PARTICLE_SIZE + (Math.random() * 1.2 - 0.4),
        color: colorChoice,
      })
    }

    // Update particles
    const updateParticles = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i]
        p.t += p.speed
        if (p.t >= 1.0) {
          particlesRef.current.splice(i, 1)
          i--
          continue
        }
      }

      if (particlesRef.current.length < CONFIG.MAX_PARTICLES && Math.random() < CONFIG.SPAWN_RATE) {
        spawnParticle()
        if (Math.random() < 0.35 && particlesRef.current.length < CONFIG.MAX_PARTICLES - 2) {
          spawnParticle()
        }
      }
    }

    // Draw stars
    const drawStars = (ctx: CanvasRenderingContext2D, time: number, width: number, height: number) => {
      for (const s of starsRef.current) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * CONFIG.STAR_TWINKLE_SPEED * s.twinkleSpeed + s.phase)
        const alpha = s.baseAlpha * (0.5 + twinkle * 0.5)
        ctx.globalAlpha = alpha
        ctx.fillStyle = COLORS.starBase
        ctx.beginPath()
        ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // Draw edges
    const drawEdges = (ctx: CanvasRenderingContext2D, time: number) => {
      if (!edgesRef.current.length) return
      ctx.save()
      ctx.shadowBlur = 3
      ctx.shadowColor = "rgba(60, 140, 255, 0.5)"

      for (const edge of edgesRef.current) {
        const fromNode = nodesRef.current[edge.fromIdx]
        const toNode = nodesRef.current[edge.toIdx]
        if (!fromNode || !toNode) continue

        const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y)
        gradient.addColorStop(0, "rgba(70, 170, 255, 0.7)")
        gradient.addColorStop(1, "rgba(140, 90, 255, 0.6)")

        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.lineWidth = 1.2
        ctx.strokeStyle = gradient
        ctx.globalAlpha = CONFIG.LINE_OPACITY + Math.sin(time * 0.4 + edge.fromIdx) * 0.04
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.lineWidth = 3
        ctx.strokeStyle = "rgba(100, 130, 255, 0.12)"
        ctx.stroke()
      }

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      ctx.restore()
    }

    // Draw nodes
    const drawNodes = (ctx: CanvasRenderingContext2D, time: number) => {
      for (const node of nodesRef.current) {
        const pulse = 0.7 + 0.4 * Math.sin(time * 1.2 + node.pulsePhase) // Slowed from 2.4
        const glowIntensity = 6 + pulse * 5

        ctx.shadowBlur = glowIntensity
        ctx.shadowColor = COLORS.nodeGlow
        ctx.beginPath()
        ctx.arc(node.x, node.y, CONFIG.NODE_BASE_SIZE * (0.8 + pulse * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = COLORS.nodeCore
        ctx.fill()

        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(node.x, node.y, CONFIG.NODE_BASE_SIZE * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = "#ffffff"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, CONFIG.NODE_BASE_SIZE * 1.3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(80, 180, 255, 0.2)"
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    // Draw particles
    const drawParticles = (ctx: CanvasRenderingContext2D, time: number) => {
      for (const p of particlesRef.current) {
        const fromNode = nodesRef.current[p.fromNode]
        const toNode = nodesRef.current[p.toNode]
        if (!fromNode || !toNode) continue

        const x = fromNode.x + (toNode.x - fromNode.x) * p.t
        const y = fromNode.y + (toNode.y - fromNode.y) * p.t

        ctx.shadowBlur = 6
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.85 + Math.sin(time * 6) * 0.15 // Slowed from 12
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, p.size * 0.55, 0, Math.PI * 2)
        ctx.fillStyle = "#ffffff"
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }

    // Draw orbital wisps
    const drawOrbitalWisps = (ctx: CanvasRenderingContext2D, time: number) => {
      if (nodesRef.current.length === 0) return
      ctx.save()
      ctx.globalAlpha = 0.35

      for (let i = 0; i < nodesRef.current.length; i += 2) {
        const node = nodesRef.current[i]
        const radiusVar = 18 + Math.sin(time * 0.9 + i) * 5 // Slowed from 1.8

        for (let ring = 0; ring < 2; ring++) {
          const angleOffset = time * 1.1 + ring * Math.PI // Slowed from 2.2
          const xOff = Math.cos(angleOffset) * radiusVar
          const yOff = Math.sin(angleOffset) * radiusVar
          ctx.beginPath()
          ctx.arc(node.x + xOff * 0.5, node.y + yOff * 0.6, 1.2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(100, 200, 255, 0.6)"
          ctx.fill()
        }
      }
      ctx.restore()
    }

    // Resize handler
    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height
      dimensionsRef.current = { width, height }
      updateNodePositions(width, height)
    }

    // Initialize
    initStars()
    nodesRef.current = generateNodes()
    edgesRef.current = buildEdges(nodesRef.current)
    resize()

    // Initial particles
    for (let i = 0; i < 14; i++) {
      spawnParticle()
    }

    window.addEventListener("resize", resize)

    // Animation loop
    const draw = () => {
      timeRef.current += 0.008 // Slowed from 0.016
      const { width, height } = dimensionsRef.current

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, "#050a12")
      grad.addColorStop(1, "#03060c")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      drawStars(ctx, timeRef.current, width, height)
      drawEdges(ctx, timeRef.current)
      drawNodes(ctx, timeRef.current)
      updateParticles()
      drawParticles(ctx, timeRef.current)
      drawOrbitalWisps(ctx, timeRef.current)

      // Subtle fog overlay
      ctx.fillStyle = "rgba(0, 5, 12, 0.12)"
      ctx.fillRect(0, 0, width, height)

      animationRef.current = requestAnimationFrame(draw)
    }

    if (!prefersReducedMotion) {
      draw()
    } else {
      // Static fallback
      const { width, height } = dimensionsRef.current
      ctx.fillStyle = "#050a12"
      ctx.fillRect(0, 0, width, height)
      drawStars(ctx, 0, width, height)
      drawEdges(ctx, 0)
      drawNodes(ctx, 0)
    }

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="cosmic-network-container">
      <canvas ref={canvasRef} />
    </div>
  )
}
