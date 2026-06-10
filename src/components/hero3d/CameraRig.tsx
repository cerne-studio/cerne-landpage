'use client'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA_PATH, MONITOR_CENTER } from './config'
import { heroScroll } from './scrollStore'

// Vetores reusados — zero alocação por frame
const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

export default function CameraRig() {
  const { camera } = useThree()

  useFrame(() => {
    // Damping: current persegue target com inércia (sem jank do scroll cru)
    heroScroll.current += (heroScroll.target - heroScroll.current) * 0.1
    const t = heroScroll.current

    // Posição na curva
    CAMERA_PATH.getPoint(t, _pos)
    camera.position.copy(_pos)

    // Olhar: à frente na curva no início; nos últimos trechos, mira o monitor
    // (a curva voltaria pra trás no fim — por isso o lerp explícito pro alvo).
    CAMERA_PATH.getPoint(Math.min(t + 0.03, 1), _look)
    if (t > 0.6) {
      const k = Math.min(1, (t - 0.6) / 0.4)
      _look.lerp(MONITOR_CENTER, k)
    }
    camera.lookAt(_look)
  })

  return null
}
