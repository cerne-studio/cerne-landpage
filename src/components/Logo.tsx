'use client'
import { useId } from 'react'

/**
 * Logo cerne — anel quebrado + núcleo, recriado em SVG vetorial a partir
 * do logotipo oficial. Dois arcos (sistema e processo) e o ponto central
 * (núcleo). Gradiente mint do material da marca.
 */

/** ponto na circunferência — ângulo em graus, 0° no topo, sentido horário */
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) }
}

/** path de arco entre dois ângulos (sentido horário) */
function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const sweep = (endDeg - startDeg + 360) % 360
  const start = polar(cx, cy, r, startDeg)
  const end = polar(cx, cy, r, endDeg)
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

interface LogoProps {
  size?: number
  className?: string
  /** true = gradiente mint da marca; false = currentColor (contextos monocromáticos) */
  gradient?: boolean
}

export function Logo({ size = 32, className, gradient = true }: LogoProps) {
  const id = useId()
  const stroke = gradient ? `url(#${id})` : 'currentColor'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden
    >
      {gradient && (
        <defs>
          <linearGradient id={id} x1="20" y1="12" x2="80" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8df2cc" />
            <stop offset="0.55" stopColor="#3dd9a0" />
            <stop offset="1" stopColor="#1fa878" />
          </linearGradient>
        </defs>
      )}
      {/* sistema — arco maior (da base esquerda, pelo topo, até a direita) */}
      <path d={arcPath(50, 50, 38, 205, 75)} stroke={stroke} strokeWidth="13" />
      {/* processo — arco menor (inferior direito) */}
      <path d={arcPath(50, 50, 38, 95, 185)} stroke={stroke} strokeWidth="13" />
      {/* núcleo */}
      <circle cx="50" cy="50" r="13.5" fill={stroke} />
    </svg>
  )
}
