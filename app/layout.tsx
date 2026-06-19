import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tokyo Expat — Chasseur Immobilier Tokyo',
  description: 'Trouvez votre logement à Tokyo avec un chasseur immobilier dédié. Share house, appartement meublé, maison. FR / EN / JP.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
