import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Tokyo Expat'
  const locale = searchParams.get('locale') || 'fr'
  const subtitle = locale === 'fr' ? 'Chasseur immobilier à Tokyo' : 'Property Hunter in Tokyo'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f2744',
          padding: '70px 80px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            backgroundColor: '#e84141',
            borderRadius: '6px',
            padding: '6px 14px',
          }}>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
              TOKYO EXPAT
            </span>
          </div>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center', padding: '40px 0' }}>
          <p style={{
            color: 'white',
            fontSize: title.length > 60 ? '42px' : '52px',
            fontWeight: '800',
            lineHeight: '1.2',
            margin: 0,
          }}>
            {title}
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#9ca3af', fontSize: '20px' }}>tokyo-expat.com</span>
          <span style={{ color: '#e84141', fontSize: '20px', fontWeight: '600' }}>
            {subtitle}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
