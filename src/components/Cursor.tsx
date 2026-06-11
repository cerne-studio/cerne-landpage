'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * Cursor customizado — ponto preciso + anel com inércia (spring).
 * mix-blend-difference: inverte o que estiver embaixo, funciona em
 * qualquer fundo. Sobre elementos interativos o anel expande.
 *
 * Só monta em dispositivos com hover real e sem reduced-motion.
 * O cursor nativo continua visível — o anel é assinatura, não substituto
 * (usabilidade primeiro: ninguém perde o ponteiro).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  // ponto: quase imediato; anel: persegue com física
  const dotX = useSpring(mx, { stiffness: 900, damping: 50 })
  const dotY = useSpring(my, { stiffness: 900, damping: 50 })
  const ringX = useSpring(mx, { stiffness: 220, damping: 24 })
  const ringY = useSpring(my, { stiffness: 220, damping: 24 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest('a, button, [role="button"], input, textarea, select')
    const onOver = (e: MouseEvent) => setHovering(isInteractive(e.target))

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mx, my])

  if (!enabled) return null

  return (
    <>
      {/* ponto */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[290] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          backgroundColor: 'var(--accent)',
        }}
      />
      {/* anel com inércia */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[290] pointer-events-none rounded-full"
        animate={{
          scale: hovering ? 2.1 : 1,
          opacity: hovering ? 0.9 : 0.45,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{
          x: ringX,
          y: ringY,
          width: 34,
          height: 34,
          marginLeft: -17,
          marginTop: -17,
          border: '1px solid var(--accent)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
