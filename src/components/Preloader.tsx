'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

/** Duração total do preloader em ms (contador + respiro). */
export const PRELOAD_MS = 1400

/**
 * Preloader — o primeiro aparte da marca.
 * Wordmark + contador 0→100 em fonte tabular + anel que se desenha.
 * Sai com wipe vertical na drawer curve. Esconde FOUC e dá peso à entrada.
 */
export function Preloader() {
  const reduce = !!useReducedMotion()
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduce) {
      setShow(false)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (PRELOAD_MS - 350), 1)
      // ease-out — acelera no começo, assenta no fim (percepção de rapidez)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const id = setTimeout(() => setShow(false), PRELOAD_MS)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(id)
    }
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ backgroundColor: '#0a0a0b' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Anel que se desenha em volta do wordmark */}
            <svg
              width="180"
              height="180"
              viewBox="0 0 180 180"
              fill="none"
              className="absolute -top-[52px]"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <circle
                cx="90"
                cy="90"
                r="86"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <motion.circle
                cx="90"
                cy="90"
                r="86"
                stroke="#00d4b4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="540.35"
                initial={{ strokeDashoffset: 540.35 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: (PRELOAD_MS - 350) / 1000, ease: [0.23, 1, 0.32, 1] }}
                transform="rotate(-90 90 90)"
              />
            </svg>

            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-display), var(--font-geist-sans), sans-serif',
                fontSize: '28px',
                letterSpacing: '-0.04em',
                color: '#f5f5f7',
              }}
            >
              cerne
            </motion.span>

            <span
              className="tnum mt-2 text-xs"
              style={{ color: 'rgba(240,240,242,0.4)', letterSpacing: '0.08em' }}
            >
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
