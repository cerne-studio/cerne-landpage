'use client'
import { useEffect, useRef, useState } from 'react'
import { OVERLAY_TIMINGS } from './config'
import { heroScroll } from './scrollStore'
import { useTranslation } from '@/hooks/useTranslation'

export default function Overlays({ active }: { active: boolean }) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const t = useTranslation()
  // Texto vem do idioma ativo → alterna PT/EN ao trocar o toggle
  const overlays = OVERLAY_TIMINGS.map((tm, i) => ({ ...tm, text: t.hero3d.overlays[i] }))

  useEffect(() => {
    // Para o rAF quando o hero sai da tela → não desperdiça frames
    if (!active) return
    const loop = () => {
      // Lê o MESMO valor suavizado que a câmera usa → textos e câmera sincronizados
      setProgress(heroScroll.current)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active])

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      {overlays.map((overlay, i) => {
        const visible = progress >= overlay.from && progress <= overlay.to
        // A última mensagem (to ≈ 1) não deve desvanecer no fim — permanece no clímax
        const fadeOut = overlay.to >= 0.999 ? 1 : (overlay.to - progress) / 0.06
        const opacity = visible
          ? Math.max(
              0,
              Math.min(
                (progress - overlay.from) / 0.06, // fade in
                fadeOut,
                1,
              ),
            )
          : 0
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              textAlign: 'center',
              opacity,
              transform: `translateY(${visible ? 0 : 16}px)`,
              transition: 'transform 0.4s ease-out',
              padding: '0 24px',
            }}
          >
            {overlay.text.split('\n').map((line, j) => (
              <div
                key={j}
                style={{
                  fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                  fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  color: '#f0f0f2',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        )
      })}

      {/* Indicador de scroll — some após 15% */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: Math.max(0, 1 - progress / 0.15),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,242,0.35)',
          }}
        >
          {t.hero3d.scrollHint}
        </div>
        <div
          style={{
            width: 1,
            height: 32,
            background: 'linear-gradient(to bottom, rgba(0,212,180,0.6), transparent)',
            animation: 'scrollPulse 1.8s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; transform: scaleY(0.8); }
            50% { opacity: 1; transform: scaleY(1); }
          }
        `}</style>
      </div>
    </div>
  )
}
