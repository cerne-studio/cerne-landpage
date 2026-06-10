/**
 * GSAP plugin registration — importar este arquivo antes de usar ScrollTrigger.
 * Registro no módulo evita registros duplicados em HMR.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
