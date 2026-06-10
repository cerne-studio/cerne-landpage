'use client'
import { type ReactNode, type CSSProperties } from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'

interface ParallaxProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  'aria-hidden'?: boolean
  /**
   * Intensidade do deslocamento em px. Positivo = camada move mais devagar que
   * o scroll (fica "para trás", fundo). Quanto maior, mais profunda a camada.
   */
  offset?: number
  /** Também escala levemente conforme entra/sai → reforça profundidade. */
  scaleDepth?: boolean
}

/**
 * Parallax — translada o conteúdo em velocidade diferente do scroll da página,
 * criando camadas de profundidade. O elemento mede seu próprio progresso ao
 * cruzar a viewport (start end → end start) e converte em deslocamento Y.
 *
 * Spring suaviza o movimento → timing humano, não travado ao pixel do scroll.
 */
export function Parallax({
  children,
  className,
  style,
  offset = 40,
  scaleDepth = false,
  'aria-hidden': ariaHidden,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const y = useSpring(rawY, { stiffness: 120, damping: 30, restDelta: 0.001 })

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])
  const scale = useSpring(rawScale, { stiffness: 120, damping: 30 })

  if (reduce) {
    return (
      <div ref={ref} className={className} style={style} aria-hidden={ariaHidden}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      aria-hidden={ariaHidden}
      style={{ ...style, y, ...(scaleDepth ? { scale } : {}) }}
    >
      {children}
    </motion.div>
  )
}
