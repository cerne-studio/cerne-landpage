'use client'
import { useEffect, useRef, useState } from 'react'

export default function IntroScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<'playing' | 'exit' | 'done'>('playing')

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (sessionStorage.getItem('intro-seen')) {
      setPhase('done')
      return
    }

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
    if (window.innerWidth <= 760) {
      v.src = `${basePath}/intro-mobile.mp4`
    }

    // Fallback: se o vídeo travar por mais de 8s, descarta
    const fallback = setTimeout(() => {
      sessionStorage.setItem('intro-seen', '1')
      setPhase('done')
    }, 9500)

    v.play().catch(() => {
      clearTimeout(fallback)
      setPhase('done')
    })

    const onEnd = () => {
      clearTimeout(fallback)
      sessionStorage.setItem('intro-seen', '1')
      setPhase('exit')
      setTimeout(() => setPhase('done'), 600)
    }

    v.addEventListener('ended', onEnd)
    return () => {
      v.removeEventListener('ended', onEnd)
      clearTimeout(fallback)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
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
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}
