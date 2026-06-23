import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MicrosoftClarity from '@/components/MicrosoftClarity'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tokyo-expat.com'),
  title: 'Tokyo Expat — Chasseur Immobilier Tokyo',
  description: 'Trouvez votre logement à Tokyo avec un chasseur immobilier dédié. Share house, appartement meublé, maison. FR / EN / JP.',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'fr'

  return (
    <html lang={locale}>
      <body>
        <GoogleAnalytics />
        <MicrosoftClarity />
        {children}
      </body>
    </html>
  )
}
