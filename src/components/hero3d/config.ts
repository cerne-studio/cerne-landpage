import * as THREE from 'three'

// ── Paleta brand ──────────────────────────────────────────────────────
export const COLORS = {
  bg: '#0a0a0b',
  surface: '#111113',
  elevated: '#1a1a1f',
  accent: '#00d4b4',
  accentDim: '#006e5e',
  fog: '#0a0a0b',
}

// ── Geometria da cena ─────────────────────────────────────────────────
// Prédio destacado (a "sua empresa") e a janela por onde a câmera entra.
export const BUILDING = { x: 42, y: 15, z: 10, w: 8, h: 30, d: 8 }
// Face frontal (+z) do prédio
const FRONT_Z = BUILDING.z + BUILDING.d / 2 // 14

// Janela grande e acesa na fachada — visível de longe, é o ponto de entrada
export const WINDOW = new THREE.Vector3(BUILDING.x, 17, FRONT_Z)

// Tela do monitor logo atrás da janela — o clímax: a câmera entra nela.
export const MONITOR_CENTER = new THREE.Vector3(BUILDING.x, 16.5, 12)

// ── Trajetória da câmera — aérea → prédio → janela → dentro do monitor ─
export const CAMERA_PATH = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 120, 205), //   0%  — visão aérea da cidade
    new THREE.Vector3(24, 74, 120), //   16% — descendo
    new THREE.Vector3(47, 42, 64), //    33% — nível dos telhados, achando o prédio
    new THREE.Vector3(46, 25, 40), //    50% — aproximando da fachada
    new THREE.Vector3(43.8, 19, 27), //  66% — em frente à janela
    new THREE.Vector3(42.5, 17, 18), //  84% — atravessando a janela
    new THREE.Vector3(42, 16.5, 13.4), // 100% — dentro, colado no monitor
  ],
  false,
  'catmullrom',
  0.5,
)

// ── Timings dos textos (o texto vem do copy.ts, por idioma) ───────────
export const OVERLAY_TIMINGS: { from: number; to: number }[] = [
  { from: 0.02, to: 0.15 },
  { from: 0.19, to: 0.32 },
  { from: 0.4, to: 0.56 },
  { from: 0.64, to: 0.8 },
  { from: 0.87, to: 1.0 },
]

// Número de telas de scroll (× 100vh) para percorrer a cena
export const SCROLL_PAGES = 6
