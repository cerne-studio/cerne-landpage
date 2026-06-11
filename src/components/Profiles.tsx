'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { useTranslation } from '@/hooks/useTranslation'

export function Profiles() {
  const t = useTranslation()
  const p = t.profiles

  return (
    <section id="profiles" className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(64px, 12vw, 128px) 0' }}>
      {/* Glow de profundidade (canto oposto, parallax forte) */}
      <Parallax
        offset={120}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '-15%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger wide>
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
              lineHeight: '1.1',
              marginBottom: '12px',
            }}
          >
            {p.headline}
          </Item>
          <Item
            className="text-base max-w-lg"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: '1.6',
              marginBottom: '56px',
            }}
          >
            {p.sub}
          </Item>

          {/* 4 cards — profundidade intensa, stagger largo */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            {p.cards.map((card) => (
              <Item
                key={card.badge}
                deep
                className="profile-card p-8 rounded-2xl"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                }}
              >
                <span
                  className="inline-block text-xs font-medium mb-5"
                  style={{
                    color: 'var(--accent)',
                    backgroundColor: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-glow)',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {card.badge}
                </span>
                <p
                  className="text-base font-medium mb-3 italic"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: '1.5' }}
                >
                  &ldquo;{card.anchor}&rdquo;
                </p>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.65' }}
                >
                  {card.body}
                </p>
                <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  {card.solution}
                </p>
              </Item>
            ))}
          </div>

          <Item
            className="text-center text-base"
            style={{
              color: 'var(--text-muted)',
              letterSpacing: '-0.01em',
              lineHeight: '1.6',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            {p.closing}
          </Item>
        </Stagger>
      </div>
    </section>
  )
}
