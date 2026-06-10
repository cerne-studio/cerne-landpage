'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { useTranslation } from '@/hooks/useTranslation'
import { MagneticButton } from '@/components/MagneticButton'

const WA_URL =
  'https://wa.me/55XXXXXXXXXX?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Cerne'

export function CTA() {
  const t = useTranslation()
  const c = t.ctaFinal

  return (
    <section
      id="contato"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)', padding: '128px 0' }}
    >
      {/* Glow central com parallax + escala = sensação de "entrar" no foco */}
      <Parallax
        offset={60}
        scaleDepth
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '760px',
          height: '420px',
          background: 'radial-gradient(ellipse, var(--accent-subtle) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Stagger amount={0.3}>
          <Item
            as="h2"
            className="text-4xl md:text-6xl font-semibold"
            style={{
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '24px',
            }}
          >
            {c.headline}
          </Item>

          <Item
            className="text-lg max-w-md mx-auto"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
              marginBottom: '40px',
            }}
          >
            {c.sub}
          </Item>

          <Item className="flex flex-col items-center gap-3">
            <MagneticButton
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.25}
              className="inline-flex items-center justify-center font-semibold text-base px-8 py-4 rounded-xl no-underline"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-base)' }}
            >
              {c.cta}
            </MagneticButton>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {c.note}
            </p>
          </Item>
        </Stagger>
      </div>
    </section>
  )
}
