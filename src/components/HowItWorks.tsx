'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * HowItWorks — seção sticky com ScrollTrigger.
 *
 * Estrutura: container de 300vh → inner sticky de 100vh.
 * GSAP scrub (0.8) transiciona o conteúdo de fase conforme o scroll.
 * Indicador de fase usa opacity puro (sem color animation) para compatibilidade com temas.
 * Em mobile (< 768px): revelação simples via ScrollTrigger sem sticky.
 */
export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslation()
  const h = t.howItWorks

  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const container = containerRef.current
      if (!container) return

      const mm = gsap.matchMedia()

      // ── Desktop: sticky + scrub ──────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        // Fase 1 já visível (opacity 1), fases 2 e 3 iniciam invisíveis
        gsap.set('[data-phase="1"], [data-phase="2"]', { opacity: 0, y: 40 })
        gsap.set('[data-phase="0"]', { opacity: 1, y: 0 })
        gsap.set('[data-dot="0"]', { opacity: 1 })
        gsap.set('[data-dot="1"], [data-dot="2"]', { opacity: 0.3 })

        const tl = gsap.timeline({ defaults: { ease: 'none' } })

        // Fase 1 → 2
        tl.to('[data-phase="0"]', { opacity: 0, y: -50, duration: 1 }, 0.5)
        tl.to('[data-dot="0"]', { opacity: 0.3, duration: 0.5 }, 0.5)
        tl.fromTo('[data-phase="1"]', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 0.8)
        tl.to('[data-dot="1"]', { opacity: 1, duration: 0.5 }, 0.8)

        // Fase 2 → 3
        tl.to('[data-phase="1"]', { opacity: 0, y: -50, duration: 1 }, 1.6)
        tl.to('[data-dot="1"]', { opacity: 0.3, duration: 0.5 }, 1.6)
        tl.fromTo('[data-phase="2"]', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 1.9)
        tl.to('[data-dot="2"]', { opacity: 1, duration: 0.5 }, 1.9)

        ScrollTrigger.create({
          animation: tl,
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        })
      })

      // ── Mobile: reveal com profundidade que REANIMA toda vez ──────
      mm.add('(max-width: 767px)', () => {
        const cards = container.querySelectorAll<HTMLElement>('[data-phase]')
        cards.forEach((card) => {
          gsap.set(card, { transformPerspective: 800 })
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, rotateX: -22, scale: 0.92 },
            {
              opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 30%',
                // restart ao entrar (descendo) e reverse ao sair voltando =
                // reanima sempre que você passa por ela, em qualquer direção
                toggleActions: 'restart none none reverse',
              },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [h.headline] },
  )

  return (
    /* Container de 300vh — dá o espaço de scroll para o sticky funcionar */
    <div
      ref={containerRef}
      id="processo"
      className="md:relative"
      style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}
    >
      {/* Inner sticky (visível em desktop) */}
      <div
        className="md:sticky md:top-0 md:h-screen md:overflow-hidden"
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-base)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          {/* Header */}
          <div className="mb-16 md:mb-20">
            <p
              className="text-xs font-medium uppercase mb-4"
              style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}
            >
              {h.label}
            </p>
            <h2
              className="text-4xl md:text-5xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              {h.headline}
            </h2>
            <p
              className="text-base max-w-lg"
              style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em', lineHeight: 1.6 }}
            >
              {h.sub}
            </p>
          </div>

          {/* Grid: indicador à esquerda + conteúdo à direita */}
          <div className="flex gap-12 md:gap-20">
            {/* Indicador vertical de fase */}
            <div className="hidden md:flex flex-col gap-6 pt-2 shrink-0">
              {h.phases.map((phase, i) => (
                <div
                  key={i}
                  data-dot={i}
                  className="flex items-center gap-3"
                  style={{ opacity: i === 0 ? 1 : 0.3 }}
                >
                  {/* Linha vertical de progresso */}
                  <div
                    style={{
                      width: '2px',
                      height: '32px',
                      backgroundColor: 'var(--accent)',
                      borderRadius: '1px',
                    }}
                  />
                  <span
                    className="text-xs font-medium uppercase"
                    style={{ letterSpacing: '0.12em', color: 'var(--text-muted)' }}
                  >
                    {phase.number}
                  </span>
                </div>
              ))}
            </div>

            {/* Área de conteúdo das fases */}
            <div className="relative flex-1" style={{ minHeight: '240px' }}>
              {h.phases.map((phase, i) => (
                <div
                  key={`${h.headline}-phase-${i}`}
                  data-phase={i}
                  className="md:absolute md:inset-0"
                  /* Mobile: exibe todas empilhadas */
                  style={{ marginBottom: i < h.phases.length - 1 ? '48px' : 0 }}
                >
                  {/* Ghost number */}
                  <div
                    aria-hidden
                    className="text-8xl font-bold select-none mb-2"
                    style={{
                      color: 'var(--ghost-number)',
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {phase.number}
                  </div>

                  {/* Duration chip */}
                  <span
                    className="inline-block text-xs font-medium mb-4"
                    style={{
                      color: 'var(--accent)',
                      backgroundColor: 'var(--accent-subtle)',
                      border: '1px solid var(--accent-glow)',
                      padding: '3px 10px',
                      borderRadius: '100px',
                    }}
                  >
                    {phase.duration}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-4"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.25 }}
                  >
                    {phase.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-base max-w-xl"
                    style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                  >
                    {phase.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer para desktop — cria o espaço de scroll extra (×2 viewports) */}
      <div className="hidden md:block" style={{ height: '200vh' }} aria-hidden />
    </div>
  )
}
