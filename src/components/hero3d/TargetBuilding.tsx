'use client'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS, BUILDING, WINDOW } from './config'
import { heroScroll } from './scrollStore'

/**
 * Prédio destacado — construído como um QUARTO (não um bloco sólido), para a
 * câmera poder entrar pela janela e ver a pessoa no computador lá dentro.
 *
 * Paredes (fundo + laterais + piso/teto) + uma moldura frontal com a ABERTURA
 * da janela no meio. O vidro é translúcido e teal; a câmera o atravessa.
 */
export default function TargetBuilding() {
  const edgesRef = useRef<THREE.LineSegments>(null!)
  const winFrameRef = useRef<THREE.LineSegments>(null!)

  const { x, y, z, w, h, d } = BUILDING
  const frontZ = z + d / 2 // 14
  const backZ = z - d / 2 // 6

  // Abertura da janela
  const winW = 5
  const winH = 9
  const winCenterY = WINDOW.y // 17

  const outerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)),
    [w, h, d],
  )
  const winEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(winW, winH, 0.1)),
    [],
  )

  useFrame(() => {
    const t = heroScroll.current
    const proximity = Math.max(0, Math.min(1, (t - 0.12) / 0.4))
    const em = edgesRef.current?.material as THREE.LineBasicMaterial | undefined
    if (em) em.opacity = 0.06 + proximity * 0.5
    const wm = winFrameRef.current?.material as THREE.LineBasicMaterial | undefined
    if (wm) wm.opacity = 0.2 + proximity * 0.7
  })

  const wall = (
    key: string,
    pos: [number, number, number],
    size: [number, number, number],
  ) => (
    <mesh key={key} position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={COLORS.elevated} roughness={0.75} metalness={0.15} flatShading />
    </mesh>
  )

  // Dimensões da moldura frontal (preenche a fachada, deixando o buraco da janela)
  const belowH = winCenterY - winH / 2 // 12.5
  const aboveH = h - (winCenterY + winH / 2) // 8.5
  const sideW = (w - winW) / 2 // 1.5

  return (
    <group>
      {/* Paredes do quarto */}
      {wall('back', [x, y, backZ + 0.15], [w, h, 0.3])}
      {wall('left', [x - w / 2 + 0.15, y, z], [0.3, h, d])}
      {wall('right', [x + w / 2 - 0.15, y, z], [0.3, h, d])}
      {wall('floor', [x, 0.15, z], [w, 0.3, d])}
      {wall('ceil', [x, h - 0.15, z], [w, 0.3, d])}

      {/* Moldura frontal (deixa a abertura da janela no meio) */}
      {wall('f-bottom', [x, belowH / 2, frontZ], [w, belowH, 0.3])}
      {wall('f-top', [x, h - aboveH / 2, frontZ], [w, aboveH, 0.3])}
      {wall('f-left', [x - w / 2 + sideW / 2, winCenterY, frontZ], [sideW, winH, 0.3])}
      {wall('f-right', [x + w / 2 - sideW / 2, winCenterY, frontZ], [sideW, winH, 0.3])}

      {/* Vidro translúcido teal na abertura — a câmera atravessa */}
      <mesh position={[x, winCenterY, frontZ + 0.02]}>
        <planeGeometry args={[winW, winH]} />
        <meshStandardMaterial
          color={COLORS.accent}
          emissive={COLORS.accentDim}
          emissiveIntensity={0.25}
          transparent
          opacity={0.12}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Contorno teal da janela — o que faz o prédio "se destacar" de longe */}
      <lineSegments ref={winFrameRef} geometry={winEdges} position={[x, winCenterY, frontZ]}>
        <lineBasicMaterial color={COLORS.accent} transparent opacity={0.2} />
      </lineSegments>

      {/* Contorno geral do prédio */}
      <lineSegments ref={edgesRef} geometry={outerEdges} position={[x, y, z]}>
        <lineBasicMaterial color={COLORS.accent} transparent opacity={0.06} />
      </lineSegments>
    </group>
  )
}
