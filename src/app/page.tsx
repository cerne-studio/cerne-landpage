import IntroScreen from "@/components/IntroScreen";
import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problema from "@/components/Problema";
import SistemaShowcase from "@/components/SistemaShowcase";
import Profiles from "@/components/Profiles";
import Processo from "@/components/Processo";
import Stats from "@/components/Stats";
import ContatoForm from "@/components/ContatoForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <IntroScreen />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problema />
        <SistemaShowcase />
        <Profiles />
        <Processo />
        <Stats />
        <ContatoForm />
      </main>
      <Footer />
    </>
  );
}
