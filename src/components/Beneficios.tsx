'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Benefícios — "o que muda depois que tudo está no lugar".
 * Os 6 impactos reais da apresentação comercial.
 */
export function Beneficios() {
  const t = useTranslation()
  const b = t.beneficios

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
      <Parallax
        offset={100}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: '0%',
          left: '-12%',
          width: '620px',
          height: '620px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 62%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger wide>
          <Item
            className="text-xs font-medium uppercase"
            style={{ color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '16px' }}
          >
            {b.label}
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
            {b.headline}
          </Item>
          <Item
            className="text-base max-w-xl"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
              marginBottom: '64px',
            }}
          >
            {b.sub}
          </Item>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {b.items.map((item, i) => (
              <Item
                key={item.title}
                deep
                className="craft-card group relative p-8"
                style={{ backgroundColor: 'var(--bg-surface)' }}
              >
                <p
                  className="text-xs font-medium tnum mb-6"
                  style={{ color: 'var(--accent)', letterSpacing: '0.08em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
                <span aria-hidden className="craft-line" />
              </Item>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
