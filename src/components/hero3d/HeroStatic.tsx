'use client'
import { useTranslation } from '@/hooks/useTranslation'

const WA_URL =
  'https://wa.me/55XXXXXXXXXX?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Cerne'

/**
 * Fallback leve do hero — servido em aparelhos de baixo desempenho, conexões
 * com economia de dados, ou para quem pede `prefers-reduced-motion`.
 *
 * Zero WebGL, zero GSAP, zero tracking de cursor. Só CSS. Mantém a marca:
 * fundo dark, grid sutil, glow do acento, headline editorial e CTA.
 */
export function HeroStatic() {
  const t = useTranslation()

  return (
    <section
      className="hero-static relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}
    >
      {/* Grid sutil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Glow do acento */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '720px',
          height: '380px',
          background: 'radial-gradient(ellipse, var(--accent-subtle) 0%, transparent 70%)',
        }}
      />

      <div className="hero-static-inner relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <span
          className="inline-flex items-center text-xs font-medium uppercase mb-10"
          style={{
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            border: '1px solid var(--accent-glow)',
            background: 'var(--accent-subtle)',
            padding: '6px 14px',
            borderRadius: '100px',
          }}
        >
          {t.hero.badge}
        </span>

        {/* Headline visível (decorativa — o <h1> semântico está na página) */}
        <p
          aria-hidden
          className="mb-9 font-semibold"
          style={{
            fontSize: 'clamp(2.6rem, 5vw + 1rem, 5.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            color: 'var(--text-primary)',
          }}
        >
          {t.hero.headline}
        </p>

        {/* Três linhas de benefício */}
        <div className="mb-11 space-y-1.5 max-w-2xl mx-auto">
          <p style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em', lineHeight: 1.55, fontSize: '1.0625rem' }}>
            {t.hero.sub1}
          </p>
          <p style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em', lineHeight: 1.55, fontSize: '1.0625rem' }}>
            {t.hero.sub2}
          </p>
          <p style={{ color: 'var(--text-muted)', letterSpacing: '-0.01em', lineHeight: 1.55, fontSize: '0.9375rem', marginTop: '12px' }}>
            {t.hero.sub3}
          </p>
        </div>

        {/* CTA — anchor puro com feedback de :active via CSS */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-static-cta inline-flex items-center justify-center font-semibold text-base px-7 py-4 rounded-xl no-underline"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-base)' }}
        >
          {t.hero.cta}
        </a>
      </div>

      <style>{`
        .hero-static-inner { animation: heroStaticIn 0.6s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-static-cta { transition: transform 150ms ease-out; }
        .hero-static-cta:active { transform: scale(0.97); }
        @keyframes heroStaticIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
