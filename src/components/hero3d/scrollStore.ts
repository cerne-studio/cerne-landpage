/**
 * Store de scroll compartilhado entre o Canvas (useFrame) e os Overlays HTML.
 *
 * `target`  = progresso bruto do scroll nativo (0–1), atualizado por listener.
 * `current` = progresso suavizado (damping), atualizado pelo CameraRig no frame.
 *
 * Câmera e textos leem o MESMO `current` → ficam perfeitamente sincronizados,
 * sem o conflito de dois mecanismos de scroll independentes.
 */
export const heroScroll = {
  target: 0,
  current: 0,
}
