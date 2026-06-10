import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Posicionamento } from '@/components/Posicionamento'
import { Profiles } from '@/components/Profiles'
import { Prova } from '@/components/Prova'
import { Servicos } from '@/components/Servicos'
import { Craft } from '@/components/Craft'
import { HowItWorks } from '@/components/HowItWorks'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />

      <main id="conteudo">
        <Hero />
        <Marquee />
        <Posicionamento />
        <Profiles />
        <Prova />
        <Servicos />
        <Craft />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
