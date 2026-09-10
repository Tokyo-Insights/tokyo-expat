import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { STATS } from '@/lib/listings'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? `Trouver votre logement à Tokyo : mon réseau | Tokyo Expat`
      : `Find your home in Tokyo: my operator network | Tokyo Expat`,
    description: isFr
      ? `Share houses, appartements meublés et maisons dans ${STATS.wards} zones de Tokyo. Je confirme les disponibilités auprès des opérateurs avant envoi. Réponse en 24h.`
      : `Share houses, furnished apartments and houses across ${STATS.wards} Tokyo areas. I confirm availability with the operators before I send it. Reply within 24h.`,
    alternates: {
      canonical: `/${locale}/listings`,
    },
    openGraph: {
      title: isFr
        ? `Trouvez votre logement à Tokyo`
        : `Find your Tokyo home`,
      description: isFr
        ? `Share house, appartement meublé, maison. Réseau direct, sans frais cachés.`
        : `Share house, furnished apartment, house. Direct network, no hidden fees.`,
      url: `https://www.tokyo-expat.com/${locale}/listings`,
    },
  }
}

export default function ListingsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
