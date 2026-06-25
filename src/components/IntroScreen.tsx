'use client'
import { useEffect, useRef, useState } from 'react'

export default function IntroScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<'playing' | 'exit' | 'done'>('playing')

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Se o usuário já viu o intro nessa sessão, pula
    if (sessionStorage.getItem('intro-seen')) {
      setPhase('done')
      return
    }

    v.play().catch(() => {
      // Autoplay bloqueado — pula direto
      setPhase('done')
    })

    const onEnd = () => {
      sessionStorage.setItem('intro-seen', '1')
      setPhase('exit')
      // Remove após a transição CSS
      setTimeout(() => setPhase('done'), 600)
    }

    v.addEventListener('ended', onEnd)
    return () => v.removeEventListener('ended', onEnd)
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        transition: 'opacity 0.6s ease',
        opacity: phase === 'exit' ? 0 : 1,
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
    >
      <video
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/intro.mp4`}
        muted
        playsInline
        onError={() => setPhase('done')}
        style={{
          width: 'min(500px, 85vw)',
          maxHeight: '85vh',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
