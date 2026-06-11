'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'

const WA_URL =
  'https://wa.me/55XXXXXXXXXX?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Cerne'

/**
 * Footer — fecha com o wordmark monumental subindo do rodapé,
 * como a assinatura gravada na madeira.
 */
export function Footer() {
  const t = useTranslation()
  const f = t.footer
  const ref = useRef<HTMLElement>(null)
  const reduce = !!useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const markY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['38%', '0%'])
  const markOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 1])

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-10">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {f.tagline}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm no-underline hover:opacity-80 transition-opacity duration-150"
              style={{ color: 'var(--accent)' }}
            >
              {f.whatsapp}
            </a>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {f.copy}
            </p>
          </div>
        </div>

        {/* Wordmark monumental — sobe conforme o footer entra */}
        <div className="overflow-hidden" aria-hidden>
          <motion.div
            className="font-semibold select-none text-center"
            style={{
              y: markY,
              opacity: markOpacity,
              fontFamily: 'var(--font-display), var(--font-geist-sans), sans-serif',
              fontSize: 'clamp(6rem, 22vw, 22rem)',
              lineHeight: 0.78,
              letterSpacing: '-0.05em',
              color: 'var(--ghost-number)',
              marginBottom: '-0.06em',
              willChange: 'transform',
            }}
          >
            cerne
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
