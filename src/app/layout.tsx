import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import { MotionProvider } from '@/components/MotionProvider'
import { CurtainReveal } from '@/components/CurtainReveal'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cerne.studio'),
  title: 'cerne — sistemas internos para PMEs',
  description:
    'Construímos ferramentas internas sob medida para PMEs brasileiras. CRMs, dashboards, automações — com velocidade e acabamento de produto sério.',
  openGraph: {
    title: 'cerne — sistemas internos para PMEs',
    description:
      'Ferramentas internas sob medida. Velocidade de produto novo, rigor de software sério.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <MotionProvider>
              <CurtainReveal />
              {children}
            </MotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
