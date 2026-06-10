'use client'
import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { spring } from '@/lib/motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  /** 0–1: quanto o botão se aproxima do cursor. Default 0.32 */
  strength?: number
  /** 'a' (default) ou 'button' */
  as?: 'a' | 'button'
}

/**
 * Wrapper magnético — o botão é atraído pelo cursor quando próximo.
 * Emil: usa apenas transform via spring physics. Zero CSS color animation.
 */
export function MagneticButton({
  children,
  className,
  style,
  href,
  target,
  rel,
  onClick,
  strength = 0.32,
  as = 'a',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 22 })
  const y = useSpring(rawY, { stiffness: 220, damping: 22 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength)
      rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength)
    },
    [rawX, rawY, strength],
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  const shared = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.95 },
    transition: spring.snappy,
    style: { ...style, x, y },
    className,
  }

  if (as === 'button') {
    return (
      <motion.button onClick={onClick} {...shared}>
        {children}
      </motion.button>
    )
  }

  return (
    <motion.a href={href} target={target} rel={rel} {...shared}>
      {children}
    </motion.a>
  )
}
