'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { heroScroll } from './scrollStore'
import { SCROLL_PAGES } from './config'
import { HeroStatic } from './HeroStatic'

type HeroMode = 'pending' | '3d' | 'static'

/** Decide se o aparelho aguenta a cena 3D ou recebe o fallback leve. */
function detectLowEnd(): boolean {
  if (typeof window === 'undefined') return false
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = nav.connection?.saveData === true
  const cores = nav.hardwareConcurrency ?? 8
  const mem = nav.deviceMemory ?? 8
  // "Baixíssimo desempenho": ≤2 núcleos OU ≤2GB de RAM. Sinais explícitos do
  // usuário (reduce / save-data) também levam ao fallback.
  return reduce || saveData || cores <= 2 || mem <= 2
}

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#0a0a0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: '1px solid rgba(0,212,180,0.3)',
          borderTopColor: '#00d4b4',
          borderRadius: '50%',
          animation: 'heroSpin 1s linear infinite',
        }}
      />
      <style>{`@keyframes heroSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  ),
})

export default function Hero3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // active = hero visível na viewport. Quando false, o Canvas para de renderizar
  // (frameloop "never") e o rAF dos overlays para → zero GPU lendo o resto do site.
  const [active, setActive] = useState(true)
  // Decisão 3D vs. fallback — só no cliente (evita mismatch de hidratação)
  const [mode, setMode] = useState<HeroMode>('pending')

  useEffect(() => {
    setMode(detectLowEnd() ? 'static' : '3d')
  }, [])

  // Listener de scroll nativo → atualiza heroScroll.target (0–1)
  useEffect(() => {
    if (mode !== '3d') return
    const update = () => {
      const el = wrapperRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const t = scrollable > 0 ? -top / scrollable : 0
      heroScroll.target = Math.max(0, Math.min(1, t))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [mode])

  // IntersectionObserver → pausa renderização quando o hero sai da tela
  useEffect(() => {
    if (mode !== '3d') return
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [mode])

  // Aparelho de baixo desempenho / reduce / save-data → fallback leve
  if (mode === 'static') return <HeroStatic />

  // Indeciso (1 tick antes do detect) → bloco escuro de 100vh, sem layout jump grande
  if (mode === 'pending') {
    return <div style={{ height: '100vh', backgroundColor: 'var(--bg-base)' }} aria-hidden />
  }

  return (
    <div ref={wrapperRef} style={{ height: `${SCROLL_PAGES * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <Scene active={active} />
      </div>
    </div>
  )
}
