import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: '#0f2744',
        borderRadius: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <span
        style={{
          color: 'white',
          fontWeight: 900,
          fontSize: 62,
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        T<span style={{ color: '#e84141' }}>E</span>
      </span>
    </div>,
    { ...size }
  )
}
