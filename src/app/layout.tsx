import type { Metadata } from 'next'
import { Geist, Sora } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import { MotionProvider } from '@/components/MotionProvider'
import { IntroProvider } from '@/components/Intro'
import { Cursor } from '@/components/Cursor'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

// Sora — display da marca (wordmark, números monumentais)
const sora = Sora({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cerne.com.br'),
  title: 'cerne — o sistema certo para o processo que você já tem',
  description:
    'Sistemas internos feitos para o jeito que o seu negócio funciona. Transformamos processos desorganizados em operações claras, estruturadas e escaláveis.',
  openGraph: {
    title: 'cerne — o sistema certo para o processo que você já tem',
    description:
      'Sistemas internos feitos para o jeito que o seu negócio funciona.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <MotionProvider>
              <IntroProvider>
                <Cursor />
                {children}
              </IntroProvider>
            </MotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
