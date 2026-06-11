import { asset } from '@/lib/asset'

/**
 * Logo cerne — o símbolo oficial da marca, extraído em alta resolução do
 * material de identidade (anel quebrado + núcleo, mint metálico com glow).
 * PNG com transparência — pensado para fundos escuros.
 */
interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 32, className }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset('/logo-cerne.png')}
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', objectFit: 'contain' }}
      aria-hidden
    />
  )
}
