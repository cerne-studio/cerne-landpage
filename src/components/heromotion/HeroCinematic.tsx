'use client'
import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'
import { HERO_SCENES, CAPTION_TIMINGS, HERO_PAGES, type HeroScene } from './scenes'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Hero cinematográfico dirigido por scroll.
 *
 * Sticky 100vh dentro de um wrapper alto. Conforme o scroll avança (0→1), as
 * cenas (imagens) fazem crossfade entre si com leve zoom (Ken Burns) e as
 * legendas bilíngues entram/saem. Só transform + opacity → roda na GPU.
 */
export default function HeroCinematic() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const reduce = !!useReducedMotion()
  const t = useTranslation()

  return (
    <div ref={ref} style={{ height: `${HERO_PAGES * 100}vh`, position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#0a0a0b',
        }}
      >
        {/* Camadas de imagem (crossfade + zoom) */}
        {HERO_SCENES.map((s) => (
          <Layer key={s.id} scene={s} progress={scrollYProgress} reduce={reduce} />
        ))}

        {/* Vignette para legibilidade do texto sobre a imagem */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 85% at 50% 50%, transparent 38%, rgba(10,10,11,0.65) 100%)',
          }}
        />

        {/* Legendas — aria-hidden: o <h1> semântico está na página */}
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {CAPTION_TIMINGS.map((tm, i) => (
            <Caption
              key={i}
              from={tm.from}
              to={tm.to}
              text={t.hero3d.overlays[i]}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>

        <ScrollHint progress={scrollYProgress} label={t.hero3d.scrollHint} />
      </div>
    </div>
  )
}

function Layer({
  scene,
  progress,
  reduce,
}: {
  scene: HeroScene
  progress: MotionValue<number>
  reduce: boolean
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const [a, b] = scene.range
  const pad = 0.06

  // Curva de opacidade: primeira cena já visível no início; última não some no fim
  const stops = scene.last
    ? [a, a + pad, 0.999, 1]
    : a === 0
      ? [0, 0.0001, b - pad, b]
      : [a, a + pad, b - pad, b]
  const values = scene.last ? [0, 1, 1, 1] : a === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  const opacity = useTransform(progress, stops, values)
  const scale = useTransform(progress, [a, b], scene.kenBurns)

  return (
    <motion.div aria-hidden className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
        {/* Placeholder enquanto a imagem não existe */}
        <div className="absolute inset-0" style={{ background: scene.fallback }} />
        {!imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={scene.src}
            alt=""
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

function Caption({
  from,
  to,
  text,
  progress,
  reduce,
}: {
  from: number
  to: number
  text: string
  progress: MotionValue<number>
  reduce: boolean
}) {
  const opacity = useTransform(progress, [from, from + 0.05, to - 0.05, to], [0, 1, 1, 0])
  const y = useTransform(progress, [from, to], reduce ? [0, 0] : [22, -22])

  return (
    <motion.div className="absolute px-6 text-center" style={{ opacity, y }}>
      {text.split('\n').map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            fontSize: 'clamp(1.6rem, 4vw, 3rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.18,
            color: '#f5f5f7',
            textShadow: '0 2px 40px rgba(0,0,0,0.55)',
          }}
        >
          {line}
        </div>
      ))}
    </motion.div>
  )
}

function ScrollHint({ progress, label }: { progress: MotionValue<number>; label: string }) {
  const opacity = useTransform(progress, [0, 0.12], [1, 0])
  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      style={{ bottom: 32, opacity }}
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(240,240,242,0.45)',
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: 1,
          height: 32,
          background: 'linear-gradient(to bottom, rgba(0,212,180,0.7), transparent)',
          animation: 'scrollPulse 1.8s ease-in-out infinite',
        }}
      />
      <style>{`@keyframes scrollPulse{0%,100%{opacity:.4;transform:scaleY(.8)}50%{opacity:1;transform:scaleY(1)}}`}</style>
    </motion.div>
  )
}
