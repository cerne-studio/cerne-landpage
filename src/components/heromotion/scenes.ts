/**
 * Manifesto das cenas do hero cinematográfico.
 *
 * Adicionar/trocar arte = editar este arquivo (1 linha por cena) + soltar o
 * arquivo de imagem em /public/hero. O motor (HeroCinematic) renderiza o resto.
 */
export interface HeroScene {
  id: string
  /** caminho em /public. Troque a extensão se exportar webp/png. */
  src: string
  /** faixa de scroll [início, fim] em 0–1 onde a cena aparece */
  range: [number, number]
  /** zoom Ken Burns [escala inicial, final] — push-in cinematográfico */
  kenBurns: [number, number]
  /** gradiente exibido enquanto a imagem não existe (placeholder elegante) */
  fallback: string
  /** última cena: não desaparece no fim (transiciona para o site) */
  last?: boolean
}

export const HERO_SCENES: HeroScene[] = [
  {
    id: 'cidade',
    src: '/hero/01-cidade.jpg',
    range: [0.0, 0.3],
    kenBurns: [1.0, 1.12],
    fallback:
      'radial-gradient(120% 90% at 50% 85%, rgba(0,212,180,0.10), transparent 60%), linear-gradient(180deg,#0a0a0b,#06100e)',
  },
  {
    id: 'predio',
    src: '/hero/02-predio.jpg',
    range: [0.24, 0.54],
    kenBurns: [1.05, 1.18],
    fallback:
      'radial-gradient(80% 80% at 58% 48%, rgba(0,212,180,0.16), transparent 60%), #0a0a0b',
  },
  {
    id: 'pessoa',
    src: '/hero/03-pessoa.jpg',
    range: [0.5, 0.78],
    kenBurns: [1.0, 1.12],
    fallback:
      'radial-gradient(60% 60% at 46% 55%, rgba(0,212,180,0.12), transparent 60%), #08090a',
  },
  {
    id: 'sistema',
    src: '/hero/04-sistema.jpg',
    range: [0.74, 1.0],
    kenBurns: [1.06, 1.26],
    fallback: 'linear-gradient(135deg,#0a0a0b 0%,#0d1a17 100%)',
    last: true,
  },
]

/** Timings das legendas (texto vem do copy.ts, por idioma). 5 beats. */
export const CAPTION_TIMINGS: { from: number; to: number }[] = [
  { from: 0.02, to: 0.16 },
  { from: 0.2, to: 0.34 },
  { from: 0.42, to: 0.56 },
  { from: 0.62, to: 0.74 },
  { from: 0.82, to: 0.99 },
]

/** Telas de scroll (× 100vh) para percorrer o hero */
export const HERO_PAGES = 5
