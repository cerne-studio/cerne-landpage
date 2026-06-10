'use client'
import { Stagger, Item } from '@/components/Reveal'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Craft — as oito camadas de qualidade. O argumento central do estúdio:
 * o detalhe invisível é o produto.
 */
export function Craft() {
  const t = useTranslation()
  const c = t.craft

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger wide>
          <Item
            className="text-xs font-medium uppercase"
            style={{ color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '16px' }}
          >
            {c.label}
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
            {c.headline}
          </Item>
          <Item
            className="text-base max-w-lg"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
              marginBottom: '56px',
            }}
          >
            {c.sub}
          </Item>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {c.layers.map((layer) => (
              <Item
                key={layer.num}
                className="craft-card group relative p-6"
                style={{ backgroundColor: 'var(--bg-surface)' }}
              >
                <p
                  className="text-xs font-medium tnum mb-6"
                  style={{ color: 'var(--accent)', letterSpacing: '0.08em' }}
                >
                  {layer.num}
                </p>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {layer.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {layer.desc}
                </p>
                {/* Linha de acento que cresce no hover (clip-path, GPU) */}
                <span aria-hidden className="craft-line" />
              </Item>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
