'use client'
import { motion } from 'motion/react'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { depthItem, spring } from '@/lib/motion'

const servicos = [
  {
    titulo: 'CRMs e pipelines de venda',
    descricao:
      'Gestão de clientes, oportunidades e follow-up — sem depender de planilhas ou WhatsApp.',
  },
  {
    titulo: 'Dashboards operacionais',
    descricao:
      'Números do negócio em tempo real, num único lugar que qualquer pessoa consegue entender.',
  },
  {
    titulo: 'Automação de processos',
    descricao: 'Tarefas repetitivas viram fluxos automáticos. O time foca no que importa.',
  },
  {
    titulo: 'Portais para clientes',
    descricao:
      'Seu cliente acessa pedidos, documentos e atualizações sem precisar ligar pro atendimento.',
  },
  {
    titulo: 'Integrações',
    descricao: 'Conectamos o que você já usa: ERP, WhatsApp, planilhas, APIs de parceiros.',
  },
  {
    titulo: 'Controle financeiro',
    descricao: 'Contas, fluxo de caixa e relatórios para quem precisa tomar decisão.',
  },
]

export function Servicos() {
  return (
    <section id="servicos" className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', padding: '128px 0' }}>
      {/* Glow de profundidade */}
      <Parallax
        offset={100}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: '5%',
          left: '20%',
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 62%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger wide>
          <Item
            className="text-xs font-medium uppercase"
            style={{ color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '16px' }}
          >
            O que entregamos
          </Item>
          <Item
            as="h2"
            className="text-4xl md:text-5xl font-semibold"
            style={{
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              marginBottom: '16px',
            }}
          >
            Ferramentas para o
            <br />
            dia a dia do negócio.
          </Item>
          <Item
            className="text-base max-w-lg"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: '1.6',
              marginBottom: '64px',
            }}
          >
            Cada sistema é feito para um problema real. Não um template com o seu logo em cima.
          </Item>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {servicos.map((s) => (
              <motion.div
                key={s.titulo}
                variants={depthItem}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={spring.smooth}
                style={{ transformStyle: 'preserve-3d' }}
                className="p-8 bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors duration-200"
              >
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {s.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {s.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
