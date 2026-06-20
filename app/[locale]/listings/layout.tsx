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
      ? `${STATS.totalProperties} logements à Tokyo — Mon réseau | Tokyo Expat`
      : `${STATS.totalProperties} properties in Tokyo — My network | Tokyo Expat`,
    description: isFr
      ? `Accès direct à ${STATS.totalProperties} logements à Tokyo : share houses (dès ${STATS.shareHouseMin.toLocaleString('fr-FR')} ¥), appartements meublés, maisons. ${STATS.wards} arrondissements. Sans garant. Réponse en 24h.`
      : `Direct access to ${STATS.totalProperties} Tokyo properties: share houses (from ¥${STATS.shareHouseMin.toLocaleString()}), furnished apartments, houses. ${STATS.wards} wards. No guarantor. Reply in 24h.`,
    alternates: {
      canonical: `/${locale}/listings`,
    },
    openGraph: {
      title: isFr
        ? `Trouvez votre logement à Tokyo — ${STATS.totalProperties} options`
        : `Find your Tokyo home — ${STATS.totalProperties} options`,
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
