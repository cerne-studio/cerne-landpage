'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { staggerContainer, staggerItem } from '@/lib/motion'

const etapas = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    descricao:
      'Entendemos o fluxo antes de abrir o editor. Mapeamos o problema real, não o sintoma.',
  },
  {
    numero: '02',
    titulo: 'Protótipo',
    descricao: 'Você aprova a interface antes de codar. Sem surpresa na entrega.',
  },
  {
    numero: '03',
    titulo: 'Entrega',
    descricao: 'Em semanas, não meses. Com deploys parciais para você ver o progresso.',
  },
  {
    numero: '04',
    titulo: 'Continuidade',
    descricao:
      'O sistema cresce com o negócio. Ficamos perto para ajustes e novos módulos.',
  },
]

export function Processo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="processo" style={{ backgroundColor: '#111113', padding: '128px 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-medium uppercase"
            style={{ color: '#00d4b4', letterSpacing: '0.1em', marginBottom: '16px' }}
          >
            Como funciona
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-semibold"
            style={{
              color: '#f0f0f2',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              marginBottom: '80px',
            }}
          >
            Do problema ao ar.
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {etapas.map((e) => (
              <motion.div key={e.numero} variants={staggerItem}>
                <p
                  className="text-5xl font-bold mb-8"
                  style={{ color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.04em' }}
                >
                  {e.numero}
                </p>
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: '#f0f0f2', letterSpacing: '-0.01em' }}
                >
                  {e.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8b8b9a' }}>
                  {e.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
