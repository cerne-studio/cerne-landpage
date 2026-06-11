'use client'
import { useEffect, useRef } from 'react'

/**
 * RingsCanvas — anéis de crescimento generativos (canvas 2D).
 *
 * O conceito da marca: "cerne" é o núcleo da madeira — a parte mais densa,
 * que sustenta a árvore por séculos. Os anéis crescem do centro para fora
 * como numa árvore real: orgânicos (ruído harmônico), lentos, irregulares.
 *
 * Performance: desenho em rAF apenas quando visível (IntersectionObserver),
 * DPR limitado a 2, e em prefers-reduced-motion renderiza uma única vez,
 * estático e completo.
 */

/** PRNG determinístico — os anéis são sempre a MESMA árvore. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Ring {
  /** raio base como fração do raio máximo */
  r: number
  /** harmônicos do contorno: [amplitude, frequência, fase] */
  harmonics: [number, number, number][]
  alpha: number
  accent: boolean
  width: number
}

function buildRings(count: number, rand: () => number): Ring[] {
  const rings: Ring[] = []
  for (let i = 0; i < count; i++) {
    const f = (i + 1) / count
    const harmonics: [number, number, number][] = []
    const n = 3 + Math.floor(rand() * 2)
    for (let h = 0; h < n; h++) {
      harmonics.push([
        (0.004 + rand() * 0.014) * (0.4 + f), // anéis externos mais irregulares
        2 + Math.floor(rand() * 5),
        rand() * Math.PI * 2,
      ])
    }
    rings.push({
      r: f,
      harmonics,
      // alguns anéis marcados (anos bons), outros quase invisíveis
      alpha: rand() < 0.22 ? 0.32 + rand() * 0.25 : 0.07 + rand() * 0.1,
      accent: rand() < 0.18,
      width: rand() < 0.15 ? 1.6 : 1,
    })
  }
  return rings
}

interface RingsCanvasProps {
  className?: string
  style?: React.CSSProperties
  /** velocidade do crescimento inicial em segundos */
  growSeconds?: number
  /** intensidade do parallax do mouse em px */
  parallax?: number
}

export function RingsCanvas({ className, style, growSeconds = 5, parallax = 14 }: RingsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rings = buildRings(26, mulberry32(7))

    let raf = 0
    let visible = true
    let running = true
    let start = performance.now()
    let w = 0
    let h = 0
    let dpr = 1
    // parallax com inércia (lerp no próprio loop — sem custo de React)
    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0

    const accentOf = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00d4b4'
    const ringColorOf = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      return theme === 'light' ? '0,0,0' : '255,255,255'
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce) draw(1, 0) // estático: redesenha completo no resize
    }

    const draw = (growth: number, time: number) => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2 + mx
      const cy = h / 2 + my
      const maxR = Math.min(w, h) * 0.46
      const accent = accentOf()
      const rgb = ringColorOf()
      const breathe = 1 + Math.sin(time * 0.00035) * 0.008
      const rot = time * 0.000012

      // núcleo — o cerne
      const coreR = maxR * 0.045 * Math.min(growth * 4, 1)
      if (coreR > 0.5) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 4)
        grad.addColorStop(0, accent + '55')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, coreR * 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2)
        ctx.fill()
      }

      const STEPS = 140
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i]
        // cada anel nasce na sua vez (de dentro para fora) e cresce com ease-out
        const born = i / rings.length
        const local = Math.max(0, Math.min(1, (growth - born) / (1 - born + 0.0001)))
        if (local <= 0) continue
        const ease = 1 - Math.pow(1 - local, 3)
        const radius = ring.r * maxR * ease * breathe

        ctx.beginPath()
        for (let s = 0; s <= STEPS; s++) {
          const a = (s / STEPS) * Math.PI * 2
          let rr = radius
          for (const [amp, freq, phase] of ring.harmonics) {
            rr += Math.sin(a * freq + phase + rot * (i % 3 === 0 ? 2 : 1)) * amp * maxR
          }
          const x = cx + Math.cos(a) * rr
          const y = cy + Math.sin(a) * rr
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.lineWidth = ring.width
        ctx.strokeStyle = ring.accent
          ? accent + Math.round(ring.alpha * 255).toString(16).padStart(2, '0')
          : `rgba(${rgb},${ring.alpha * ease})`
        ctx.stroke()
      }
    }

    const loop = (now: number) => {
      if (!running) return
      if (visible) {
        // lerp do parallax
        mx += (tx - mx) * 0.06
        my += (ty - my) * 0.06
        const growth = Math.min((now - start) / (growSeconds * 1000), 1)
        draw(growth, now)
      }
      raf = requestAnimationFrame(loop)
    }

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * parallax * 2
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * parallax * 2
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    if (reduce) {
      draw(1, 0)
    } else {
      start = performance.now()
      window.addEventListener('mousemove', onMouse, { passive: true })
      raf = requestAnimationFrame(loop)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [growSeconds, parallax])

  return <canvas ref={canvasRef} className={className} style={style} aria-hidden />
}
