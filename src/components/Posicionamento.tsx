'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { useTranslation } from '@/hooks/useTranslation'

export function Posicionamento() {
  const t = useTranslation()
  const p = t.posicionamento

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
      {/* Glow de fundo com parallax — move mais devagar = camada de profundidade */}
      <Parallax
        offset={80}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%)',
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
          <Item
            as="h2"
            className="text-4xl md:text-5xl font-semibold"
            style={{
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              marginBottom: '16px',
            }}
          >
            {p.headline1}
            <br />
            {p.headline2}
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

          <div
            className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {p.columns.map((col) => (
              <Item
                key={col.label}
                deep
                className="p-8 relative"
                style={{ backgroundColor: col.isAccent ? 'var(--bg-elevated)' : 'var(--bg-surface)' }}
              >
                {col.isAccent && (
                  <div
                    aria-hidden
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                    style={{ width: '64px', height: '1px', backgroundColor: 'var(--accent)' }}
                  />
                )}
                <p
                  className="text-xs font-medium uppercase mb-6"
                  style={{
                    letterSpacing: '0.1em',
                    color: col.isAccent ? 'var(--accent)' : 'var(--text-muted)',
                  }}
                >
                  {col.label}
                </p>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: col.isAccent ? 'var(--accent)' : 'var(--text-muted)' }}
                      >
                        {col.isAccent ? '✓' : '—'}
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: col.isAccent ? 'var(--text-primary)' : 'var(--text-muted)' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Item>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
