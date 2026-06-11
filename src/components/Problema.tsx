'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { ChaosMap } from '@/components/ChaosMap'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Problema — visual-first: o mapa do caos de um lado, a dor do outro.
 * Texto mínimo, punchline forte, antes/depois compacto.
 */
export function Problema() {
  const t = useTranslation()
  const p = t.problema

  return (
    <section
      id="problema"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
      <Parallax
        offset={80}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '8%',
          right: '-12%',
          width: '620px',
          height: '620px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 62%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger>
          {/* Mapa do caos + headline lado a lado */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 flex justify-center">
              <ChaosMap />
            </div>
            <div className="order-1 lg:order-2">
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
                {p.headline}
              </Item>
              <Item
                className="text-base"
                style={{
                  color: 'var(--text-secondary)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                  maxWidth: '420px',
                }}
              >
                {p.sub}
              </Item>
              <Item>
                <p
                  className="font-semibold"
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: 'clamp(1.25rem, 2.4vw, 1.6rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {p.punchline1}
                  <br />
                  <span style={{ color: 'var(--accent)' }}>{p.punchline2}</span>
                </p>
              </Item>
            </div>
          </div>

          {/* Antes / Depois — compacto e visual */}
          <div className="grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden max-w-3xl mx-auto" style={{ backgroundColor: 'var(--border)' }}>
            <Item deep className="p-7" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <p
                className="text-xs font-medium uppercase mb-5"
                style={{ letterSpacing: '0.1em', color: 'var(--text-muted)' }}
              >
                {p.hoje.label}
              </p>
              <ul className="space-y-3.5">
                {p.hoje.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-0.5 shrink-0" style={{ color: 'var(--text-muted)' }}>
                      ✕
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Item>
            <Item deep className="p-7 relative" style={{ backgroundColor: 'var(--bg-elevated)' }}>
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0"
                style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
              />
              <p
                className="text-xs font-medium uppercase mb-5"
                style={{ letterSpacing: '0.1em', color: 'var(--accent)' }}
              >
                {p.depois.label}
              </p>
              <ul className="space-y-3.5">
                {p.depois.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Item>
          </div>
        </Stagger>
      </div>
    </section>
  )
}
