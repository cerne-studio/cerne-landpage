'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { MagneticButton } from '@/components/MagneticButton'
import { RingsCanvas } from '@/components/RingsCanvas'
import { Logo } from '@/components/Logo'
import { useIntroDone } from '@/components/Intro'

const WA_URL =
  'https://wa.me/55XXXXXXXXXX?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Cerne'

/** Easing forte — built-ins são fracos demais (emil-design-eng). */
const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** Delays após a intro de vídeo liberar a tela. */
const DELAY = { badge: 0.1, mark: 0.25, title: 0.7, cta: 1.0 }

/**
 * Hero — o wordmark monumental sobre os anéis de crescimento generativos.
 * As animações só disparam quando a intro de vídeo termina (useIntroDone).
 */
export function Hero() {
  const t = useTranslation()
  const h = t.hero
  const reduce = !!useReducedMotion()
  const done = useIntroDone()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -90])
  const ringsY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 60])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const letters = 'cerne'.split('')

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100svh', backgroundColor: 'var(--bg-base)' }}
    >
      {/* Anéis de crescimento — o símbolo da marca, vivo */}
      <motion.div className="absolute inset-0" style={{ y: ringsY }}>
        <RingsCanvas className="w-full h-full" growSeconds={5.5} />
      </motion.div>

      {/* Vinheta para legibilidade do texto sobre os anéis */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 50%, transparent 30%, var(--bg-base) 100%)',
          opacity: 0.65,
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center"
        style={{ y: contentY, opacity: fade, paddingTop: '96px', paddingBottom: '80px' }}
      >
        {/* Kicker com o logo oficial */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: DELAY.badge, ease: EASE_OUT }}
          className="inline-flex items-center gap-2.5 text-xs font-medium"
          style={{
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            backgroundColor: 'color-mix(in srgb, var(--bg-base) 60%, transparent)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: '100px',
            letterSpacing: '0.04em',
            marginBottom: '20px',
          }}
        >
          <Logo size={18} />
          {h.badge}
        </motion.p>

        {/* Wordmark monumental — cada letra sobe de um mask */}
        <div aria-hidden className="flex justify-center select-none" style={{ marginBottom: '8px' }}>
          {letters.map((letter, i) => (
            <span key={i} className="overflow-hidden inline-block" style={{ padding: '0.04em 0' }}>
              <motion.span
                className="inline-block font-semibold"
                initial={reduce ? false : { y: '108%' }}
                animate={done ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: DELAY.mark + i * 0.07, ease: EASE_OUT }}
                style={{
                  fontFamily: 'var(--font-display), var(--font-geist-sans), sans-serif',
                  fontSize: 'clamp(5.5rem, 19vw, 17rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.05em',
                  color: 'var(--text-primary)',
                  willChange: 'transform',
                }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </div>

        {/* Headline real (h1) — a tagline oficial */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={done ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.65, delay: DELAY.title, ease: EASE_OUT }}
          className="font-medium mx-auto"
          style={{
            fontSize: 'clamp(1.25rem, 2.6vw, 1.75rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            color: 'var(--text-primary)',
            maxWidth: '620px',
            marginBottom: '14px',
          }}
        >
          {h.headline}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: DELAY.title + 0.12, ease: EASE_OUT }}
          className="text-sm md:text-base mx-auto"
          style={{
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.65,
            maxWidth: '480px',
            marginBottom: '36px',
          }}
        >
          {h.sub}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: DELAY.cta, ease: EASE_OUT }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.25}
            className="inline-flex items-center justify-center font-semibold text-base no-underline"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#060708',
              padding: '14px 28px',
              borderRadius: '12px',
              minHeight: '48px',
            }}
          >
            {h.cta} →
          </MagneticButton>
          <a
            href="#processo"
            className="ghost-button inline-flex items-center justify-center text-base font-medium no-underline"
            style={{
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-strong)',
              padding: '13px 24px',
              borderRadius: '12px',
              minHeight: '48px',
            }}
          >
            {h.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      {/* Hint de scroll */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 hidden md:flex"
        style={{ bottom: 24, opacity: fade }}
      >
        <span
          className="text-[11px] uppercase"
          style={{ letterSpacing: '0.12em', color: 'var(--text-muted)' }}
        >
          {h.scrollHint}
        </span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  )
}
