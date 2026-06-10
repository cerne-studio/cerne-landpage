'use client'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS, MONITOR_CENTER } from './config'
import { heroScroll } from './scrollStore'

/**
 * Interior — a cena dentro da janela do prédio: uma pessoa na mesa, mexendo
 * no computador. A câmera entra na tela do monitor, que mostra um "sistema"
 * (dashboard abstrato desenhado em CanvasTexture). É o clímax da narrativa.
 */
export default function Interior() {
  const screenRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)

  // Textura do "sistema" na tela — desenhada uma vez num canvas
  const screenTex = useMemo(() => makeDashboardTexture(), [])

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame(({ clock }) => {
    // Brilho da tela e da luz crescem conforme a câmera se aproxima/entra
    const prox = Math.max(0, Math.min(1, (heroScroll.current - 0.45) / 0.45))
    const mat = screenRef.current?.material as THREE.MeshStandardMaterial | undefined
    if (mat) {
      const pulse = reduceMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.2) * 0.04
      mat.emissiveIntensity = (0.5 + prox * 1.1) * pulse
    }
    if (lightRef.current) lightRef.current.intensity = 1 + prox * 5
  })

  return (
    <group>
      {/* Mesa */}
      <mesh position={[MONITOR_CENTER.x, 14.9, 11.6]}>
        <boxGeometry args={[4.2, 0.18, 1.6]} />
        <meshStandardMaterial color={COLORS.elevated} roughness={0.8} flatShading />
      </mesh>

      {/* Base/haste do monitor */}
      <mesh position={[MONITOR_CENTER.x, 15.45, 11.9]}>
        <boxGeometry args={[0.3, 0.7, 0.3]} />
        <meshStandardMaterial color="#050506" roughness={0.6} />
      </mesh>

      {/* Moldura do monitor */}
      <mesh position={[MONITOR_CENTER.x, MONITOR_CENTER.y, MONITOR_CENTER.z - 0.08]}>
        <boxGeometry args={[3.5, 2.3, 0.16]} />
        <meshStandardMaterial color="#050506" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Tela — o "sistema" (CanvasTexture). A câmera entra aqui. */}
      <mesh ref={screenRef} position={MONITOR_CENTER.toArray()}>
        <planeGeometry args={[3.2, 2]} />
        <meshStandardMaterial
          map={screenTex}
          emissive="#ffffff"
          emissiveMap={screenTex}
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Teclado */}
      <mesh position={[MONITOR_CENTER.x, 15.05, 12.7]}>
        <boxGeometry args={[1.5, 0.08, 0.55]} />
        <meshStandardMaterial color={COLORS.elevated} roughness={0.7} flatShading />
      </mesh>

      {/* Pessoa — silhueta sentada AO LADO do monitor, retroiluminada pela tela
          (entre a tela e a câmera → lê como recorte escuro contra o brilho). */}
      <group position={[40.4, 0, 12.3]} rotation={[0, 0.6, 0]}>
        {/* tronco */}
        <mesh position={[0, 15.8, 0]}>
          <boxGeometry args={[0.95, 1.4, 0.55]} />
          <meshStandardMaterial color="#1d1d24" roughness={0.95} flatShading />
        </mesh>
        {/* cabeça */}
        <mesh position={[0, 16.8, 0.02]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#1d1d24" roughness={0.95} flatShading />
        </mesh>
        {/* braço em direção ao teclado */}
        <mesh position={[0.7, 15.35, 0.5]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[1.0, 0.22, 0.22]} />
          <meshStandardMaterial color="#1d1d24" roughness={0.95} flatShading />
        </mesh>
      </group>

      {/* Luz teal da tela — ilumina a pessoa e a mesa */}
      <pointLight
        ref={lightRef}
        position={[MONITOR_CENTER.x, MONITOR_CENTER.y, MONITOR_CENTER.z + 0.6]}
        color={COLORS.accent}
        intensity={1}
        distance={20}
        decay={2}
      />
    </group>
  )
}

/** Desenha um dashboard abstrato — o "sistema" que aparece na tela. */
function makeDashboardTexture(): THREE.CanvasTexture {
  const w = 512
  const h = 320
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const ACCENT = '#00d4b4'
  const SURFACE = '#111113'
  const ELEVATED = '#1a1a1f'
  const MUTED = '#3a3a44'

  // Fundo
  ctx.fillStyle = '#0a0a0b'
  ctx.fillRect(0, 0, w, h)

  // Sidebar
  ctx.fillStyle = SURFACE
  ctx.fillRect(0, 0, 72, h)
  for (let i = 0; i < 6; i++) {
    const y = 22 + i * 26
    ctx.fillStyle = i === 0 ? ACCENT : ELEVATED
    ctx.fillRect(12, y, 48, 10)
  }
  // marcador ativo
  ctx.fillStyle = ACCENT
  ctx.fillRect(4, 22, 3, 10)

  // Top bar
  ctx.fillStyle = SURFACE
  ctx.fillRect(72, 0, w - 72, 30)
  ctx.fillStyle = ACCENT
  roundRect(ctx, 90, 8, 70, 14, 7)
  ctx.fill()

  // 3 KPI cards
  const cardY = 44
  for (let i = 0; i < 3; i++) {
    const x = 90 + i * 136
    ctx.fillStyle = SURFACE
    roundRect(ctx, x, cardY, 120, 66, 8)
    ctx.fill()
    ctx.fillStyle = MUTED
    ctx.fillRect(x + 14, cardY + 14, 50, 6)
    ctx.fillStyle = ACCENT
    ctx.fillRect(x + 14, cardY + 30, 64, 16)
  }

  // Gráfico de linha
  const gx = 90
  const gy = 130
  const gw = 392
  const gh = 110
  ctx.fillStyle = SURFACE
  roundRect(ctx, gx, gy, gw, gh, 8)
  ctx.fill()
  ctx.strokeStyle = ACCENT
  ctx.lineWidth = 3
  ctx.beginPath()
  const pts = [0.7, 0.55, 0.6, 0.4, 0.45, 0.3, 0.34, 0.2, 0.24, 0.12]
  pts.forEach((p, i) => {
    const x = gx + 16 + (i / (pts.length - 1)) * (gw - 32)
    const y = gy + 16 + p * (gh - 32)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  })
  ctx.stroke()
  // área sob a linha
  ctx.lineTo(gx + gw - 16, gy + gh - 16)
  ctx.lineTo(gx + 16, gy + gh - 16)
  ctx.closePath()
  ctx.fillStyle = 'rgba(0,212,180,0.12)'
  ctx.fill()

  // Barras inferiores
  for (let i = 0; i < 8; i++) {
    const x = gx + 14 + i * 46
    const bh = 14 + (i % 4) * 9
    ctx.fillStyle = i % 3 === 0 ? ACCENT : ELEVATED
    ctx.fillRect(x, gy + gh + 14 + (40 - bh), 28, bh)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
