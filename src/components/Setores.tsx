'use client'
import { motion } from 'motion/react'
import { Stagger, Item } from '@/components/Reveal'
import { depthItem, spring } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Setores — onde a cerne atua. 6 verticais do material oficial.
 */
export function Setores() {
  const t = useTranslation()
  const s = t.setores

  return (
    <section
      id="setores"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', padding: 'clamp(64px, 12vw, 128px) 0' }}
    >
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
              lineHeight: 1.1,
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
              lineHeight: 1.6,
              marginBottom: '64px',
            }}
          >
            {s.sub}
          </Item>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-12"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {s.items.map((item) => (
              <motion.div
                key={item.title}
                variants={depthItem}
                whileHover={{ y: -4 }}
                transition={spring.smooth}
                style={{ transformStyle: 'preserve-3d' }}
                className="p-8 bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors duration-200"
              >
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <Item
            className="text-center text-base"
            style={{
              color: 'var(--text-muted)',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            {s.closing}
          </Item>
        </Stagger>
      </div>
    </section>
  )
}
