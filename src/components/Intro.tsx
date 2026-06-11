'use client'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { asset } from '@/lib/asset'

/**
 * Intro — a abertura do site é o vídeo do logo (a "germinação" do núcleo).
 * Toca uma vez por sessão, em tela cheia, e revela o site ao terminar.
 *
 * Regras de respeito ao visitante:
 * - botão "pular" sempre disponível
 * - prefers-reduced-motion / autoplay bloqueado / repeat visit → pula direto
 * - trava de segurança: nunca passa de 12s
 *
 * O contexto expõe `done` para o Hero iniciar as animações só depois
 * que a cortina sobe.
 */

const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)

export function IntroProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('cerne-intro') === '1'
    if (reduce || seen) {
      setDone(true)
      return
    }
    sessionStorage.setItem('cerne-intro', '1')
    setShow(true)
  }, [])

  // trava de segurança — se o vídeo travar/buffering eterno, libera o site
  useEffect(() => {
    if (!show) return
    const id = setTimeout(() => finish(), 12000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const finish = () => {
    setShow(false)
    setDone(true)
  }

  return (
    <IntroContext.Provider value={done}>
      <AnimatePresence>
        {show && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[300] flex items-center justify-center"
            style={{ backgroundColor: '#000000' }}
            exit={{
              y: '-100%',
              transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={asset('/intro.mp4')}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={finish}
              onError={finish}
              onPlay={(e) => {
                // se o navegador bloquear o autoplay, play() rejeita e nunca
                // dispara onPlay — o catch abaixo cobre isso
                void e
              }}
              onLoadedData={(e) => {
                const v = e.currentTarget
                v.play().catch(() => finish())
              }}
            />

            {/* pular intro */}
            <motion.button
              onClick={finish}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute text-xs font-medium uppercase cursor-pointer"
              style={{
                bottom: 28,
                right: 28,
                letterSpacing: '0.1em',
                color: 'rgba(240,242,241,0.55)',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '100px',
                padding: '10px 18px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              pular →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  )
}
