'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Manifesto — o significado do nome, revelado palavra por palavra pelo scroll.
 * Seção alta (250vh) com inner sticky: o leitor "escava" o texto.
 * Palavras-chave (marcadas com *asteriscos* no copy) acendem no acento.
 */
export function Manifesto() {
  const t = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.35'],
  })

  // tokens: *palavra* = destaque no acento
  const tokens = t.manifesto.text.split(' ')

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative"
      style={{ backgroundColor: 'var(--bg-base)', height: '250vh' }}
    >
      <div
        className="sticky flex items-center"
        style={{ top: 0, height: '100svh' }}
      >
        <div className="max-w-4xl mx-auto px-6 w-full">
          <p
            className="text-xs font-medium uppercase mb-8"
            style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}
          >
            {t.manifesto.label}
          </p>
          <p
            className="font-medium"
            style={{
              fontSize: 'clamp(1.6rem, 4.2vw, 3rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
            }}
          >
            {tokens.map((token, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                start={i / tokens.length}
                end={(i + 1) / tokens.length}
                accent={token.startsWith('*')}
              >
                {token.replaceAll('*', '')}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  start,
  end,
  accent,
}: {
  children: React.ReactNode
  progress: MotionValue<number>
  start: number
  end: number
  accent: boolean
}) {
  const opacity = useTransform(progress, [start, end], [0.13, 1])
  return (
    <motion.span
      style={{
        opacity,
        color: accent ? 'var(--accent)' : 'var(--text-primary)',
      }}
    >
      {children}{' '}
    </motion.span>
  )
}
