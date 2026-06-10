import type { Variants } from 'motion/react'

export const spring = {
  snappy: { type: 'spring' as const, stiffness: 400, damping: 30 },
  smooth: { type: 'spring' as const, stiffness: 200, damping: 25 },
  gentle: { type: 'spring' as const, stiffness: 300, damping: 30 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

/**
 * staggerItem — agora com PROFUNDIDADE.
 * O elemento sobe (y) enquanto desgira no eixo X (rotateX) e cresce de escala,
 * vindo "de trás" do plano. Combinado com `perspective` no container, dá a
 * sensação de o conteúdo emergir do espaço, não só deslizar para cima.
 *
 * Spring com mass < 1 = assentamento rápido mas com peso humano (não mecânico).
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 56, rotateX: -22, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 140, damping: 19, mass: 0.9 },
  },
}

/** Item de profundidade mais intenso — para cards e blocos grandes. */
export const depthItem: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
  },
}

/** Container com stagger mais espaçado, para grids de cards. */
export const depthContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}
