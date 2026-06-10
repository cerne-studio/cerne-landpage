'use client'
import { motion } from 'motion/react'
import { Stagger, Item } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { depthItem, spring } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'

export function Servicos() {
  const t = useTranslation()
  const s = t.servicos

  return (
    <section
      id="servicos"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
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
            {s.label}
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
            {s.headline1}
            <br />
            {s.headline2}
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
            {s.sub}
          </Item>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {s.items.map((item, i) => (
              <motion.div
                key={item.titulo}
                variants={depthItem}
                whileHover={{ y: -4 }}
                transition={spring.smooth}
                style={{ transformStyle: 'preserve-3d' }}
                className="p-8 bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors duration-200"
              >
                <p
                  className="text-xs font-medium tnum mb-5"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {item.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
