'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'motion/react'

interface CountUpProps {
  to: number
  /** segundos antes de iniciar (após entrar na viewport) */
  delay?: number
  duration?: number
}

/**
 * Número que conta de 0 até o valor ao entrar na viewport.
 * Assinatura sensorial da marca ("números contam"). Usa fonte tabular
 * (classe .tnum no pai) para não tremer a largura durante a contagem.
 */
export function CountUp({ to, delay = 0, duration = 1.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, delay, duration, reduce])

  return <span ref={ref}>{value}</span>
}
