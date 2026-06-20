import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tokyo-expat.com'),
  title: 'Tokyo Expat — Chasseur Immobilier Tokyo',
  description: 'Trouvez votre logement à Tokyo avec un chasseur immobilier dédié. Share house, appartement meublé, maison. FR / EN / JP.',
}

const GA_ID = 'G-NL25TL3LDG'

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
