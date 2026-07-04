import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const title = locale === 'en'
    ? 'Data & Press | Tokyo Expat'
    : 'Donnees & Presse | Tokyo Expat'
  const description = locale === 'en'
    ? 'Original Tokyo rental and property data for journalists, writers and researchers. Free to cite with attribution and a link. Charts, figures and data requests.'
    : 'Donnees originales sur le marche locatif et immobilier de Tokyo pour journalistes et chercheurs. Libres de citation avec attribution et lien. Graphiques, chiffres, demandes de data.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/press`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}/press`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}/press`,
        'x-default': 'https://www.tokyo-expat.com/en/press',
      },
    },
    openGraph: { title, description, type: 'website', url: `https://www.tokyo-expat.com/${locale}/press` },
  }
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale
  const en = l === 'en'

  const stats = en
    ? [
        'Median 1K studio rent by ward: ¥74,000 (Edogawa) to ¥140,000 (Minato).',
        "Tokyo's median used-condo sale price rose about +30% per m2 from 2021 to 2025.",
        'Computed from 500,000+ active rental listings across Tokyo\'s 23 wards, updated quarterly.',
        'Rent and price data available by ward, by train line and by station.',
      ]
    : [
        'Loyer median studio 1K par arrondissement : 74 000 JPY (Edogawa) a 140 000 JPY (Minato).',
        "Le prix de vente median au m2 des coproprietes a Tokyo a augmente d'environ +30% de 2021 a 2025.",
        'Calcule sur plus de 500 000 annonces locatives actives dans les 23 arrondissements, mis a jour chaque trimestre.',
        'Donnees loyers et prix disponibles par arrondissement, par ligne et par station.',
      ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">
        {en ? 'Data & Press' : 'Donnees & Presse'}
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-10">
        {en
          ? 'Tokyo Expat publishes original data on Tokyo\'s rental and property market, built from real listings and recorded transactions. Journalists, writers and researchers are welcome to use it.'
          : 'Tokyo Expat publie des donnees originales sur le marche locatif et immobilier de Tokyo, baties sur des annonces reelles et des transactions enregistrees. Journalistes, redacteurs et chercheurs sont les bienvenus.'}
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-4">{en ? 'Key figures' : 'Chiffres cles'}</h2>
        <ul className="space-y-2">
          {stats.map((s) => (
            <li key={s} className="text-gray-700 flex items-start gap-2">
              <span className="text-[#e84141] mt-1 flex-shrink-0">-</span>{s}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-4">
          {en ? 'Explore the full dataset and charts in the ' : 'Explorez le jeu de donnees complet et les graphiques dans l\''}
          <Link href={`/${l}/data`} className="text-[#e84141] underline">{en ? 'Tokyo Rent Index' : 'Indice des loyers de Tokyo'}</Link>.
        </p>
      </section>

      <section className="mb-10 border border-gray-200 rounded-2xl p-6 bg-gray-50/60">
        <h2 className="text-xl font-bold text-[#0f2744] mb-3">{en ? 'How to cite our data' : 'Comment citer nos donnees'}</h2>
        <p className="text-gray-700 text-sm mb-2">
          {en
            ? 'You are welcome to reference our figures in articles and reports, free of charge, with a clear credit and a link back to the source page.'
            : 'Vous pouvez citer nos chiffres dans vos articles et rapports, gratuitement, avec un credit clair et un lien vers la page source.'}
        </p>
        <p className="text-sm font-mono bg-white border border-gray-200 rounded px-3 py-2 text-gray-800">
          {en ? 'Source: Tokyo Expat (tokyo-expat.com/en/data)' : 'Source : Tokyo Expat (tokyo-expat.com/fr/data)'}
        </p>
        <p className="text-[11px] text-gray-500 mt-3">
          {en
            ? 'Wholesale reproduction, scraping or commercial reuse of the full dataset requires written permission.'
            : 'La reproduction en bloc, l\'extraction automatisee ou la reutilisation commerciale du jeu complet necessite une autorisation ecrite.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-[#0f2744] mb-3">{en ? 'Press requests' : 'Demandes presse'}</h2>
        <p className="text-gray-700 text-sm mb-4">
          {en
            ? 'Need a custom cut of the data, a chart for your story, or a quote from an operator inside the Tokyo market? We are happy to help writers on deadline.'
            : 'Besoin d\'une extraction sur mesure, d\'un graphique pour votre article, ou d\'une citation d\'un operateur du marche tokyoite ? Nous aidons volontiers les redacteurs.'}
        </p>
        <Link
          href={`/${l}/contact`}
          className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          {en ? 'Contact us' : 'Nous contacter'} &rarr;
        </Link>
      </section>
    </div>
  )
}
