import { ImageResponse } from 'next/og'

// Gerada estaticamente no build (compatível com output: 'export')
export const dynamic = 'force-static'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Cerne — o sistema que a sua empresa merecia ter.'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#060708',
          // Glow do acento + grid sutil
          backgroundImage:
            'radial-gradient(900px circle at 50% 42%, rgba(0,212,180,0.12), transparent 60%),' +
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
        }}
      >
        {/* Label */}
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#3dd9a0',
            marginBottom: 28,
          }}
        >
          Estúdio de sistemas internos · Brasil
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            fontSize: 168,
            fontWeight: 600,
            letterSpacing: -6,
            color: '#f0f0f2',
            lineHeight: 1,
          }}
        >
          cerne
        </div>

        {/* Linha do acento */}
        <div
          style={{ display: 'flex', width: 96, height: 4, backgroundColor: '#3dd9a0', margin: '40px 0' }}
        />

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontWeight: 500,
            color: '#8b8b9a',
            textAlign: 'center',
            maxWidth: 860,
          }}
        >
          O sistema que a sua empresa merecia ter.
        </div>
      </div>
    ),
    { ...size },
  )
}
