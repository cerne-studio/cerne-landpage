'use client'
import { useRef, type ReactNode, type CSSProperties } from 'react'
import { motion, useInView } from 'motion/react'
import { staggerContainer, depthContainer, staggerItem, depthItem } from '@/lib/motion'

interface StaggerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Fração visível para disparar (0–1). Default 0.2. */
  amount?: number
  /** Espaçamento maior entre filhos, para grids de cards. */
  wide?: boolean
}

/**
 * Stagger — container de revelação que SEMPRE reanima.
 *
 * Diferença-chave do código anterior: `useInView` SEM `once: true`.
 * Isso faz `inView` voltar a `false` quando a seção sai da tela e a `true`
 * quando reentra — então a animação reexecuta toda vez que você passa por ela,
 * em qualquer direção.
 *
 * `perspective` no container ativa o 3D real dos filhos (rotateX dos itens),
 * dando a sensação de o conteúdo emergir do espaço.
 */
export function Stagger({ children, className, style, amount = 0.2, wide = false }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount })

  return (
    <motion.div
      ref={ref}
      variants={wide ? depthContainer : staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={{ perspective: '1200px', ...style }}
    >
      {children}
    </motion.div>
  )
}

// Tags semânticas suportadas — preserva headings reais (h2/h3) para a11y/SEO
const TAG_MAP = {
  div: motion.div,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const

interface ItemProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Profundidade intensa (cards grandes). Default usa o item padrão. */
  deep?: boolean
  /** Elemento renderizado — use 'h2'/'h3' para títulos (semântica). Default 'div'. */
  as?: keyof typeof TAG_MAP
}

/** Item individual — herda o estado de animação do Stagger pai via variants. */
export function Item({ children, className, style, deep = false, as = 'div' }: ItemProps) {
  const Tag = TAG_MAP[as]
  return (
    <Tag
      variants={deep ? depthItem : staggerItem}
      className={className}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </Tag>
  )
}
