'use client'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Faixa de serviços em movimento contínuo (linear — movimento constante).
 * CSS puro: roda fora da main thread, não trava sob carga.
 * Em prefers-reduced-motion a animação é desligada via globals.css.
 */
export function Marquee() {
  const t = useTranslation()
  const items = t.marquee

  // Duplicado para o loop ser contínuo (a segunda metade é decorativa)
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <div className="marquee-track flex items-center shrink-0" aria-hidden={hidden}>
      {items.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span
            className="text-sm font-medium whitespace-nowrap"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.01em' }}
          >
            {item}
          </span>
          <span
            aria-hidden
            className="mx-8 block rounded-full"
            style={{ width: 4, height: 4, backgroundColor: 'var(--accent)', opacity: 0.5 }}
          />
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="marquee relative flex overflow-hidden py-5"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Track />
      <Track hidden />
      {/* Fades laterais */}
      <div aria-hidden className="marquee-fade left-0" style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }} />
      <div aria-hidden className="marquee-fade right-0" style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }} />
    </div>
  )
}
