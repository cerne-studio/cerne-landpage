'use client'
import { useTranslation } from '@/hooks/useTranslation'

const WA_URL =
  'https://wa.me/55XXXXXXXXXX?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Cerne'

export function Footer() {
  const t = useTranslation()
  const f = t.footer

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-base)',
        borderTop: '1px solid var(--border)',
        padding: '40px 0',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span
            className="text-base font-normal"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
          >
            cerne
          </span>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {f.tagline}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs no-underline hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            {f.whatsapp}
          </a>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {f.copy}
          </p>
        </div>
      </div>
    </footer>
  )
}
