'use client'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Problema — o coração do pitch comercial.
 * 1. As três perguntas que doem (cards com aspas grandes)
 * 2. Punchline: "não é falta de ferramenta, é falta de estrutura"
 * 3. "O problema não é a sua equipe" + antes/depois (como é hoje × como deveria ser)
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
              lineHeight: 1.6,
              marginBottom: '56px',
            }}
          >
            {p.sub}
          </Item>

          {/* As três perguntas que doem */}
          <div className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-12" style={{ backgroundColor: 'var(--border)' }}>
            {p.questions.map((q, i) => (
              <Item key={i} deep className="p-8" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <span
                  aria-hidden
                  className="block font-semibold select-none"
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: '56px',
                    lineHeight: 0.6,
                    color: 'var(--accent)',
                    opacity: 0.5,
                    marginBottom: '20px',
                  }}
                >
                  “
                </span>
                <p
                  className="text-base font-medium"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.55 }}
                >
                  {q}
                </p>
              </Item>
            ))}
          </div>

          {/* Punchline */}
          <Item className="text-center" style={{ marginBottom: '80px' }}>
            <p
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 'clamp(1.4rem, 3.2vw, 2.25rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                color: 'var(--text-secondary)',
              }}
            >
              {p.punchline1}
              <br />
              <span style={{ color: 'var(--accent)' }}>{p.punchline2}</span>
            </p>
          </Item>

          {/* A equipe não é o problema + antes/depois */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div>
              <Item
                as="h3"
                className="text-2xl md:text-3xl font-semibold"
                style={{
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                {p.equipe.headline}
              </Item>
              <Item
                className="text-base"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}
              >
                {p.equipe.body}
              </Item>
              <Item className="text-base font-semibold" style={{ color: 'var(--accent)' }}>
                {p.equipe.closing}
              </Item>
            </div>

            <div className="grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              {/* Como é hoje */}
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
              {/* Como deveria ser */}
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
          </div>
        </Stagger>
      </div>
    </section>
  )
}
