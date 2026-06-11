'use client'
import { motion, useReducedMotion } from 'motion/react'
import { Logo } from '@/components/Logo'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * ChaosMap — o visual assinatura do material da marca: o caos da operação
 * (WhatsApp, planilhas, papéis...) orbitando conectado ao núcleo cerne.
 * Linhas tracejadas fluindo para o centro + chips flutuando.
 * Só transform/opacity/stroke-dashoffset → GPU.
 */

// posições dos satélites em % do container (x, y no centro do chip)
const NODES: { x: number; y: number }[] = [
  { x: 16, y: 14 },
  { x: 78, y: 10 },
  { x: 92, y: 46 },
  { x: 80, y: 84 },
  { x: 22, y: 88 },
  { x: 6, y: 50 },
]

export function ChaosMap() {
  const t = useTranslation()
  const reduce = !!useReducedMotion()
  const labels = t.problema.chaos

  return (
    <div className="relative w-full select-none" style={{ aspectRatio: '1 / 0.92', maxWidth: 560 }}>
      {/* linhas — desenhadas atrás dos chips */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 92"
        preserveAspectRatio="none"
        aria-hidden
      >
        {NODES.map((n, i) => (
          <motion.line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={50}
            y2={46}
            stroke="var(--border-strong)"
            strokeWidth="0.35"
            strokeDasharray="1.6 2.2"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className={reduce ? undefined : 'chaos-line'}
            style={{ animationDelay: `${i * -1.3}s` }}
          />
        ))}
      </svg>

      {/* núcleo — o logo com glow pulsante */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 132,
          height: 132,
          backgroundColor: 'var(--bg-base)',
          border: '1px solid var(--border)',
          boxShadow: '0 0 80px var(--accent-glow), inset 0 0 32px rgba(0,0,0,0.5)',
        }}
      >
        <Logo size={84} />
      </motion.div>

      {/* satélites — o caos flutuando */}
      {NODES.map((n, i) => (
        <motion.div
          key={labels[i]}
          className="absolute"
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 18,
            delay: 0.25 + i * 0.1,
          }}
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <span
            className={`inline-block text-xs font-medium whitespace-nowrap ${reduce ? '' : 'chaos-chip'}`}
            style={{
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-strong)',
              borderRadius: '100px',
              padding: '8px 14px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
              animationDelay: `${i * -0.9}s`,
            }}
          >
            {labels[i]}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
