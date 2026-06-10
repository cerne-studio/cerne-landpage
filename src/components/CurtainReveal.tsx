'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * Cortina de entrada na cor do acento — wipe horizontal da esquerda para a direita.
 * Aparece uma vez por page load. Esconde o FOUC enquanto o ThemeProvider hidrata.
 *
 * timing: 900ms com drawer-curve ([0.77,0,0.175,1]) = sensação artesanal (não mecânico).
 */
export function CurtainReveal() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Deixa a página renderizar um frame antes de iniciar o wipe
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShow(false))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          aria-hidden
          className="fixed inset-0 z-[200] pointer-events-none"
          style={{
            backgroundColor: 'var(--accent)',
            transformOrigin: '100% 0',   // wipe de direita para esquerda
          }}
          initial={{ scaleX: 1 }}
          exit={{
            scaleX: 0,
            transition: {
              duration: 0.9,
              ease: [0.77, 0, 0.175, 1],   // drawer curve — parece feito à mão
              delay: 0.05,
            },
          }}
        />
      )}
    </AnimatePresence>
  )
}
