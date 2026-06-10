'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { MagneticButton } from '@/components/MagneticButton'

const WA_URL =
  'https://wa.me/55XXXXXXXXXX?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Cerne'

/** Easing forte de entrada — built-ins são fracos demais (emil-design-eng). */
const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** Delays progressivos do hero: kicker → título → sub → CTA. */
const DELAY = { badge: 0.25, title: 0.55, sub: 0.85, cta: 1.15 }

/**
 * Hero de abertura — vídeo institucional em tela cheia com o texto por cima.
 * O vídeo ganha um Ken Burns sutil dirigido pelo scroll e desemboca num
 * gradiente para o fundo do site (a página "nasce" do vídeo).
 *
 * Cores do texto são fixas (não tokens): o vídeo é sempre escuro,
 * independente do tema claro/escuro do resto da página.
 */
export function Hero() {
  const t = useTranslation()
  const h = t.hero
  const reduce = !!useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Parallax de saída: conteúdo sobe mais devagar que o scroll + Ken Burns no vídeo
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const videoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.1])

  // prefers-reduced-motion: não dá autoplay — mostra o primeiro frame parado
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduce) {
      video.pause()
      video.currentTime = 0
    } else {
      // play() pode rejeitar se o browser bloquear autoplay; o poster segura o visual
      video.play().catch(() => {})
    }
  }, [reduce])

  const words = h.headline.split(' ')

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex items-end md:items-center"
      style={{ minHeight: '100svh', backgroundColor: '#0a0a0b' }}
    >
      {/* ── Vídeo de fundo ── */}
      <motion.div aria-hidden className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/hero/cerne-intro.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* Overlay de legibilidade: vinheta + gradiente que desemboca no site */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.25) 35%, rgba(10,10,11,0.45) 70%, var(--bg-base) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 45%, transparent 40%, rgba(10,10,11,0.55) 100%)',
        }}
      />

      {/* ── Conteúdo ── */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6"
        style={{ y: contentY, opacity: fade, paddingTop: '128px', paddingBottom: '96px' }}
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: DELAY.badge, ease: EASE_OUT }}
          className="inline-flex items-center gap-2 text-xs font-medium"
          style={{
            color: 'rgba(240,240,242,0.85)',
            border: '1px solid rgba(255,255,255,0.18)',
            backgroundColor: 'rgba(10,10,11,0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: '100px',
            letterSpacing: '0.04em',
            marginBottom: '28px',
          }}
        >
          <span className="hero-dot" aria-hidden />
          {h.badge}
        </motion.p>

        <h1
          className="font-semibold max-w-3xl"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#f5f5f7',
            textShadow: '0 2px 32px rgba(0,0,0,0.45)',
            marginBottom: '24px',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.6,
                delay: DELAY.title + i * 0.055,
                ease: EASE_OUT,
              }}
              style={{ willChange: 'transform' }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: DELAY.sub, ease: EASE_OUT }}
          className="text-base md:text-lg max-w-xl"
          style={{
            color: 'rgba(240,240,242,0.78)',
            letterSpacing: '-0.01em',
            lineHeight: 1.65,
            textShadow: '0 1px 16px rgba(0,0,0,0.4)',
            marginBottom: '40px',
          }}
        >
          {h.sub}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: DELAY.cta, ease: EASE_OUT }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.25}
            className="inline-flex items-center justify-center font-semibold text-base no-underline"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#0a0a0b',
              padding: '14px 28px',
              borderRadius: '12px',
              minHeight: '48px',
            }}
          >
            {h.cta} →
          </MagneticButton>
          <a
            href="#processo"
            className="ghost-button-dark inline-flex items-center justify-center text-base font-medium no-underline"
            style={{
              color: 'rgba(240,240,242,0.85)',
              border: '1px solid rgba(255,255,255,0.25)',
              backgroundColor: 'rgba(10,10,11,0.35)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
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
        style={{ bottom: 28, opacity: fade }}
      >
        <span
          className="text-[11px] uppercase"
          style={{ letterSpacing: '0.12em', color: 'rgba(240,240,242,0.5)' }}
        >
          {h.scrollHint}
        </span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  )
}
