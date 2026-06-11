'use client'
import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'
import { Stagger, Item } from '@/components/Reveal'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Processo — as 7 etapas oficiais, do levantamento ao contrato de recorrência.
 * Linha vertical que se desenha conforme o scroll (scaleY via spring) e
 * etapas que revelam em stagger. Só transform/opacity → GPU.
 */
export function Processo() {
  const t = useTranslation()
  const p = t.processo
  const reduce = !!useReducedMotion()
  const lineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <section
      id="processo"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger>
          <Item
            className="text-xs font-medium uppercase"
            style={{ color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '16px' }}
          >
            {p.label}
          </Item>
          <Item
            as="h2"
            className="text-4xl md:text-5xl font-semibold"
            style={{
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            {p.headline1}
            <br />
            <span style={{ color: 'var(--accent)' }}>{p.headline2}</span>
          </Item>
          <Item
            className="text-base max-w-xl"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
              marginBottom: '72px',
            }}
          >
            {p.sub}
          </Item>
        </Stagger>

        {/* Timeline */}
        <div ref={lineRef} className="relative" style={{ paddingLeft: '0px' }}>
          {/* trilho */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0"
            style={{ left: '11px', width: '2px', backgroundColor: 'var(--border)' }}
          />
          {/* linha que se desenha */}
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0"
            style={{
              left: '11px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent), var(--accent-hover))',
              scaleY: reduce ? 1 : lineScale,
              transformOrigin: 'top',
            }}
          />

          <div className="flex flex-col" style={{ gap: 'clamp(40px, 6vw, 64px)' }}>
            {p.steps.map((step, i) => (
              <Step key={step.num} step={step} index={i} reduce={reduce} />
            ))}
          </div>
        </div>

        <p
          className="text-sm mt-16 max-w-2xl"
          style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}
        >
          {p.footer}
        </p>
      </div>
    </section>
  )
}

function Step({
  step,
  index,
  reduce,
}: {
  step: { num: string; title: string; desc: string }
  index: number
  reduce: boolean
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.5, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 22, delay: (index % 2) * 0.05 }}
      className="relative flex items-start gap-6 md:gap-10"
    >
      {/* nó */}
      <span
        aria-hidden
        className="relative z-10 shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: '24px',
          height: '24px',
          marginTop: '4px',
          backgroundColor: 'var(--bg-base)',
          border: '2px solid var(--accent)',
        }}
      >
        <span
          className="block rounded-full"
          style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent)' }}
        />
      </span>

      <div className="flex-1 grid md:grid-cols-[120px_1fr] gap-2 md:gap-8 items-baseline">
        <span
          className="tnum font-semibold select-none"
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            lineHeight: 1,
            color: 'var(--ghost-number)',
            letterSpacing: '-0.03em',
          }}
          aria-hidden
        >
          {step.num}
        </span>
        <div>
          <h3
            className="text-lg md:text-xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.015em' }}
          >
            {step.title}
          </h3>
          <p className="text-sm md:text-base max-w-xl" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
