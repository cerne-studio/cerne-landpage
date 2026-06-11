import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Manifesto } from '@/components/Manifesto'
import { Marquee } from '@/components/Marquee'
import { Problema } from '@/components/Problema'
import { Profiles } from '@/components/Profiles'
import { Processo } from '@/components/Processo'
import { Beneficios } from '@/components/Beneficios'
import { Setores } from '@/components/Setores'
import { Posicionamento } from '@/components/Posicionamento'
import { Prova } from '@/components/Prova'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />

      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Marquee />
        <Problema />
        <Profiles />
        <Processo />
        <Beneficios />
        <Setores />
        <Posicionamento />
        <Prova />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
