'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import CameraRig from './CameraRig'
import City from './City'
import TargetBuilding from './TargetBuilding'
import Interior from './Interior'
import Overlays from './Overlays'
import { COLORS, WINDOW } from './config'

export default function Scene({ active }: { active: boolean }) {
  return (
    <>
      <Canvas
        // Pausa o render loop quando o hero sai da tela → economiza GPU/bateria
        frameloop={active ? 'always' : 'never'}
        camera={{ fov: 65, near: 0.1, far: 600, position: [0, 120, 205] }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.75]}
        style={{ background: COLORS.bg, width: '100%', height: '100%' }}
        role="img"
        aria-label="Animação 3D: a câmera sobrevoa uma cidade noturna, encontra um prédio destacado em verde, entra pela janela onde alguém trabalha no computador e mergulha na tela do sistema — uma metáfora de como a Cerne transforma o processo da sua empresa num sistema."
      >
        {/* Névoa — profundidade para a cidade ao fundo */}
        <fog attach="fog" args={[COLORS.fog, 70, 320]} />

        <Suspense fallback={null}>
          <CameraRig />
          <City />
          <TargetBuilding />
          <Interior />
          <Lights />
        </Suspense>
      </Canvas>

      {/* Overlays HTML — sincronizados via heroScroll.current. aria-hidden:
          o texto semântico já está no <h1> da página; aqui é decorativo. */}
      <Overlays active={active} />
    </>
  )
}

function Lights() {
  return (
    <>
      {/* Ambiente — cidade noturna visível (não preto total) */}
      <ambientLight intensity={0.3} />
      {/* Céu/chão — preenchimento suave que dá leitura à cidade */}
      <hemisphereLight args={['#3a3a48', '#050507', 0.55]} />
      {/* Luar — direcional fria por cima */}
      <directionalLight position={[40, 90, 50]} color="#b8b8c8" intensity={0.7} />
      {/* Glow teal da janela acesa do prédio destacado */}
      <pointLight
        position={[WINDOW.x, WINDOW.y, WINDOW.z + 2]}
        color="#00d4b4"
        intensity={4}
        distance={36}
        decay={2}
      />
    </>
  )
}
