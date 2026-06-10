'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { CountUp } from '@/components/CountUp'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Prova viva — o case-âncora (Base Contábil) + números que contam.
 * "Já está rodando numa empresa de verdade, todo dia."
 */
export function Prova() {
  const t = useTranslation()
  const p = t.prova

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
      <Parallax
        offset={90}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '0%',
          right: '-12%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 62%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger>
          <Item
            className="text-xs font-medium uppercase"
            style={{ color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '16px' }}
          >
            {p.label}
          </Item>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">
            <div>
              <Item
                as="h2"
                className="text-4xl md:text-5xl font-semibold"
                style={{
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                }}
              >
                {p.headline}
              </Item>
              <Item
                className="text-base max-w-xl"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}
              >
                {p.body}
              </Item>
              <Item className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block"
                  style={{ width: 32, height: 1, backgroundColor: 'var(--accent)' }}
                />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {p.company}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {p.location}
                </span>
              </Item>
            </div>

            {/* Números que contam */}
            <div className="flex flex-col gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              {p.stats.map((stat) => (
                <Item
                  key={stat.label}
                  deep
                  className="px-7 py-6"
                  style={{ backgroundColor: 'var(--bg-surface)' }}
                >
                  <p
                    className="text-3xl md:text-4xl font-semibold tnum"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                  >
                    <CountUp to={stat.value} duration={1} />
                    <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
                  </p>
                  <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                    {stat.label}
                  </p>
                </Item>
              ))}
            </div>
          </div>
        </Stagger>
      </div>
    </section>
  )
}
