import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: '#0f2744',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: '-0.5px',
      }}
    >
      <span style={{ color: 'white' }}>T</span>
      <span style={{ color: '#e84141' }}>E</span>
    </div>,
    { ...size }
  )
}
