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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color: 'white',
          fontWeight: 900,
          fontSize: 16,
          lineHeight: 1,
          fontFamily: 'sans-serif',
        }}
      >
        T
      </span>
      <span
        style={{
          color: '#e84141',
          fontWeight: 900,
          fontSize: 16,
          lineHeight: 1,
          fontFamily: 'sans-serif',
        }}
      >
        E
      </span>
    </div>,
    { ...size }
  )
}
