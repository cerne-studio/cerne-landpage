import HeroCinematic from '@/components/heromotion/HeroCinematic'
import { Nav } from '@/components/Nav'
import { Posicionamento } from '@/components/Posicionamento'
import { Profiles } from '@/components/Profiles'
import { Servicos } from '@/components/Servicos'
import { HowItWorks } from '@/components/HowItWorks'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />

      {/* H1 semântico — invisível, dá heading real à página (o hero 3D é visual).
          SEO + leitores de tela recebem o título; a cena 3D fica decorativa. */}
      <h1 className="sr-only">
        Cerne — o sistema que a sua empresa merecia ter. Estúdio que cria sistemas
        internos sob medida para PMEs brasileiras.
      </h1>

      {/* Hero cinematográfico — sequência de imagens dirigida por scroll */}
      <HeroCinematic />

      <main id="conteudo">
        <Posicionamento />
        <Profiles />
        <Servicos />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
