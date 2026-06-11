'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { useTranslation } from '@/hooks/useTranslation'
import { Logo } from '@/components/Logo'

/**
 * Posicionamento — comparativo dimensão a dimensão: Cerne × software house
 * tradicional. Fecha com a punchline oficial: "o investimento é semelhante,
 * a diferença está no resultado".
 */
export function Posicionamento() {
  const t = useTranslation()
  const p = t.posicionamento

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
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
              lineHeight: 1.12,
              marginBottom: '16px',
            }}
          >
            {p.headline1}
            <br />
            <span style={{ color: 'var(--accent)' }}>{p.headline2}</span>
          </Item>
          <Item
            className="text-base max-w-xl"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
              marginBottom: '56px',
            }}
          >
            {p.sub}
          </Item>

          {/* Tabela comparativa */}
          <Item deep className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {/* Cabeçalho */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: '140px 1fr 1fr',
                backgroundColor: 'var(--bg-elevated)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div className="p-5" />
              <div className="p-5 flex items-center gap-2.5">
                <Logo size={20} />
                <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  cerne
                </span>
              </div>
              <div className="p-5">
                <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  Software house tradicional
                </span>
              </div>
            </div>

            {p.rows.map((row, i) => (
              <div
                key={row.dim}
                className="grid md:grid-cols-[140px_1fr_1fr]"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div className="px-5 pt-5 md:py-5">
                  <span
                    className="text-xs font-medium uppercase"
                    style={{ letterSpacing: '0.08em', color: 'var(--text-muted)' }}
                  >
                    {row.dim}
                  </span>
                </div>
                <div className="px-5 py-3 md:py-5 flex items-start gap-3">
                  <span aria-hidden className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {row.cerne}
                  </span>
                </div>
                <div className="px-5 pb-5 md:py-5 flex items-start gap-3">
                  <span aria-hidden className="mt-0.5 shrink-0" style={{ color: 'var(--text-muted)' }}>
                    —
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {row.outro}
                  </span>
                </div>
              </div>
            ))}
          </Item>

          <Item className="text-center" style={{ marginTop: '48px' }}>
            <p
              className="font-semibold mx-auto"
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.35,
                color: 'var(--text-primary)',
                maxWidth: '560px',
              }}
            >
              {p.punchline}
            </p>
          </Item>
        </Stagger>
      </div>
    </section>
  )
}
