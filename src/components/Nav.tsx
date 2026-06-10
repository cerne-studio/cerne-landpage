'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
import { spring } from '@/lib/motion'
import { useTheme } from '@/providers/ThemeProvider'
import { useLang } from '@/providers/LanguageProvider'
import { useTranslation } from '@/hooks/useTranslation'

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.3 10.2A7 7 0 0 1 5.8 2.7a7 7 0 1 0 7.5 7.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={spring.snappy}
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <div className="flex items-center gap-1.5" style={{ fontSize: '13px' }}>
      <button
        onClick={lang !== 'pt' ? toggle : undefined}
        style={{
          color: lang === 'pt' ? 'var(--text-primary)' : 'var(--text-muted)',
          fontWeight: lang === 'pt' ? 500 : 400,
          cursor: lang !== 'pt' ? 'pointer' : 'default',
          background: 'none',
          border: 'none',
          padding: 0,
          lineHeight: 1,
        }}
        aria-label="Mudar para português"
      >
        PT
      </button>
      <span style={{ color: 'var(--text-muted)', lineHeight: 1 }} aria-hidden>·</span>
      <button
        onClick={lang !== 'en' ? toggle : undefined}
        style={{
          color: lang === 'en' ? 'var(--text-primary)' : 'var(--text-muted)',
          fontWeight: lang === 'en' ? 500 : 400,
          cursor: lang !== 'en' ? 'pointer' : 'default',
          background: 'none',
          border: 'none',
          padding: 0,
          lineHeight: 1,
        }}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const t = useTranslation()

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const showBg = theme === 'light' || scrolled

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: showBg ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: showBg ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: showBg ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${showBg ? 'var(--border)' : 'transparent'}`,
        transition: 'background-color 200ms ease-out, border-color 200ms ease-out',
      }}
    >
      {/* 2px scroll progress bar — Framer Motion useScroll */}
      <motion.div
        aria-hidden
        style={{
          scaleX,
          transformOrigin: 'left',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--accent)',
          zIndex: 10,
        }}
      />

      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-normal no-underline"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
        >
          cerne
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#servicos"
            className="text-sm no-underline text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            {t.nav.services}
          </a>
          <a
            href="#processo"
            className="text-sm no-underline text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            {t.nav.howItWorks}
          </a>
          <div
            aria-hidden
            style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-strong)', flexShrink: 0 }}
          />
          <LangToggle />
          <ThemeToggle />
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={spring.snappy}
            className="text-sm font-semibold px-4 py-2 rounded-lg no-underline"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-base)' }}
          >
            {t.nav.cta}
          </motion.a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <LangToggle />
          <ThemeToggle />
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={spring.snappy}
            className="text-sm font-semibold px-4 py-2 rounded-lg no-underline"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-base)' }}
          >
            falar
          </motion.a>
        </div>
      </nav>
    </header>
  )
}
