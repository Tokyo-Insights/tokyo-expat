import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MicrosoftClarity from '@/components/MicrosoftClarity'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tokyo-expat.com'),
  // Validation Bing Webmaster (ajoutee 08/09/2026). Le compte ne suivait que l'apex
  // tokyo-expat.com, alors que le site sert sur www et que tous les backlinks pointent
  // vers www: le rapport de liens de Bing etait donc vide par construction. Cette balise
  // permet de verifier la propriete https://www.tokyo-expat.com/ en un clic.
  // Code de verification du compte, lu via l'API GetUserSites (AuthenticationCode).
  verification: {
    other: { 'msvalidate.01': '79722CF2CAEF3DE62F70CD0E50DAB44B' },
  },
  title: 'Tokyo Expat — Chasseur Immobilier Tokyo',
  description: 'Trouvez votre logement à Tokyo avec un chasseur immobilier dédié. Share house, appartement meublé, maison. FR / EN / JP.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0f2744',
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
      <head>
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="preconnect" href="https://formspree.io" />
        <link rel="dns-prefetch" href="https://formspree.io" />
      </head>
      <body>
        <GoogleAnalytics />
        <MicrosoftClarity />
        {children}
      </body>
    </html>
  )
}
