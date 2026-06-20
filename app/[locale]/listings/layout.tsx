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
      ? `Logements disponibles à Tokyo — ${STATS.available} dispo maintenant | Tokyo Expat`
      : `Available Housing in Tokyo — ${STATS.available} available now | Tokyo Expat`,
    description: isFr
      ? `${STATS.total} logements dans le réseau Tokyo Expat : ${STATS.shareHouses} share houses, ${STATS.apartments} appartements meublés, ${STATS.houses} maisons. Sans garant. Disponibles maintenant.`
      : `${STATS.total} properties in Tokyo Expat network: ${STATS.shareHouses} share houses, ${STATS.apartments} furnished apartments, ${STATS.houses} houses. No guarantor required. Available now.`,
    alternates: {
      canonical: `/${locale}/listings`,
    },
    openGraph: {
      title: isFr ? `${STATS.available} logements disponibles à Tokyo` : `${STATS.available} properties available in Tokyo`,
      description: isFr
        ? `Share houses, appartements meublés, maisons. Sans garant. Réseau exclusif.`
        : `Share houses, furnished apartments, houses. No guarantor. Exclusive network.`,
      url: `https://www.tokyo-expat.com/${locale}/listings`,
    },
  }
}

export default function ListingsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
