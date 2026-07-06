"use client"
import { useEffect, useState } from "react"

const NAV = [
  {
    id: "topo",
    label: "Início",
    target: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "showcase",
    label: "Sistemas",
    target: "showcase",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "perfis",
    label: "Perfis",
    target: "perfis",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "processo",
    label: "Processo",
    target: "processo",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "contato",
    label: "Contato",
    target: "contato",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

function scrollToSection(target: string | null) {
  if (!target) {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }
  const el = document.getElementById(target)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: "smooth" })
}

export default function PillNav() {
  const [active, setActive] = useState("topo")

  useEffect(() => {
    const targets = NAV
      .filter(n => n.target)
      .map(n => document.getElementById(n.target!))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-15% 0px -72% 0px", threshold: 0 }
    )

    targets.forEach(t => observer.observe(t))

    const onScroll = () => {
      if (window.scrollY < 120) setActive("topo")
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <nav className="pill-nav" aria-label="Navegação por seções">
      {NAV.map(item => {
        const isActive = active === (item.target ?? "topo")
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.target)}
            className={`pill-nav__btn${isActive ? " pill-nav__btn--active" : ""}`}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
            <span className="pill-nav__label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
