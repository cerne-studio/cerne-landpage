'use client'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { COLORS } from './config'

const BUILDING_COUNT = 120
const CITY_SPREAD = 80 // raio da cidade em cada eixo
const TARGET_POS = new THREE.Vector3(42, 0, 10) // prédio especial — manter livre

export default function City() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)

  const matrices = useMemo(() => {
    const out: THREE.Matrix4[] = []
    const matrix = new THREE.Matrix4()
    const rng = seededRandom(42) // seed fixa → cidade reproduzível

    for (let i = 0; i < BUILDING_COUNT; i++) {
      let x: number, z: number
      // Evitar o prédio target e o corredor por onde a câmera passa
      do {
        x = (rng() - 0.5) * CITY_SPREAD * 2
        z = (rng() - 0.5) * CITY_SPREAD * 2
      } while (Math.abs(x - TARGET_POS.x) < 12 && Math.abs(z - TARGET_POS.z) < 12)

      const h = 4 + rng() * 28
      const w = 2 + rng() * 5
      const d = 2 + rng() * 5

      matrix.makeScale(w, h, d)
      matrix.setPosition(x, h / 2, z) // base em y=0
      out.push(matrix.clone())
    }
    return out
  }, [])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m))
    mesh.instanceMatrix.needsUpdate = true
  }, [matrices])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BUILDING_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={COLORS.surface}
        roughness={0.85}
        metalness={0.1}
        flatShading // essencial para o look lowpoly
        envMapIntensity={0.2}
      />
    </instancedMesh>
  )
}

// RNG determinístico com seed
function seededRandom(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
