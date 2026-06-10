'use client'
import { createContext, useContext, useState } from 'react'
import type { Lang } from '@/lib/copy'

const LangContext = createContext<{
  lang: Lang
  toggle: () => void
}>({ lang: 'pt', toggle: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')

  const toggle = () => setLang(prev => (prev === 'pt' ? 'en' : 'pt'))

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
