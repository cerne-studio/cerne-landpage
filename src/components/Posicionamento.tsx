'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { useTranslation } from '@/hooks/useTranslation'
import { Logo } from '@/components/Logo'

/**
 * Posicionamento — VS visual: cerne de um lado, software house do outro,
 * com o badge "VS" no meio. Frases curtas, contraste imediato.
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

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <Stagger>
          <Item
            className="text-xs font-medium uppercase text-center"
            style={{ color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '16px' }}
          >
            {p.label}
          </Item>
          <Item
            as="h2"
            className="text-4xl md:text-5xl font-semibold text-center"
            style={{
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '56px',
            }}
          >
            {p.headline1}
            <br />
            <span style={{ color: 'var(--accent)' }}>{p.headline2}</span>
          </Item>

          {/* VS layout */}
          <Item deep className="relative">
            <div className="grid md:grid-cols-2 gap-3 md:gap-5">
              {/* cerne */}
              <div
                className="rounded-2xl p-7 md:p-8 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--accent-glow)',
                  boxShadow: '0 0 60px var(--accent-subtle)',
                }}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0"
                  style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
                />
                <div className="flex items-center gap-2.5 mb-7">
                  <Logo size={24} />
                  <span className="text-base font-semibold" style={{ color: 'var(--accent)' }}>
                    cerne
                  </span>
                </div>
                <ul className="space-y-4">
                  {p.rows.map((row) => (
                    <li key={row.dim} className="flex items-start gap-3">
                      <span aria-hidden className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                        ✓
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {row.cerne}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* software house */}
              <div
                className="rounded-2xl p-7 md:p-8"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center mb-7" style={{ minHeight: 24 }}>
                  <span className="text-base font-medium" style={{ color: 'var(--text-muted)' }}>
                    Software house tradicional
                  </span>
                </div>
                <ul className="space-y-4">
                  {p.rows.map((row) => (
                    <li key={row.dim} className="flex items-start gap-3">
                      <span aria-hidden className="mt-0.5 shrink-0" style={{ color: 'var(--text-muted)' }}>
                        ✕
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {row.outro}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* badge VS central */}
            <div
              aria-hidden
              className="hidden md:flex absolute items-center justify-center font-semibold rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 52,
                height: 52,
                fontSize: 14,
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-base)',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              VS
            </div>
          </Item>

          <Item className="text-center" style={{ marginTop: '40px' }}>
            <p
              className="font-semibold mx-auto"
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.35,
                color: 'var(--text-primary)',
                maxWidth: '520px',
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
