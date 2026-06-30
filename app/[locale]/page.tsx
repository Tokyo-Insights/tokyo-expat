import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, type Locale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const titles: Record<string, string> = {
    fr: 'Tokyo Expat — Chasseur Immobilier à Tokyo',
    en: 'Tokyo Expat — Property Hunter in Tokyo',
  }
  const descriptions: Record<string, string> = {
    fr: 'Trouvez votre logement à Tokyo avec un chasseur immobilier dédié. Share house, appartement meublé, maison. Consultation gratuite.',
    en: 'Find your housing in Tokyo with a dedicated property hunter. Share house, furnished apartment, house. Free consultation.',
  }
  const title = titles[locale] ?? titles.fr
  const description = descriptions[locale] ?? descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}`,
        'x-default': 'https://www.tokyo-expat.com/en',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.tokyo-expat.com/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const dict = getDictionary(locale)
  const h = dict.home
  const s = dict.services
  const featured = s.packages.slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Tokyo Expat',
    url: 'https://www.tokyo-expat.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.tokyo-expat.com/icon.png',
      width: 192,
      height: 192,
    },
    description: locale === 'fr'
      ? 'Chasseur immobilier à Tokyo pour francophones et expatriés. Share house, appartement meublé, maison.'
      : 'Property hunter in Tokyo for expats. Share house, furnished apartment, house.',
    areaServed: { '@type': 'City', name: 'Tokyo', sameAs: 'https://www.wikidata.org/wiki/Q1490' },
    serviceType: locale === 'fr' ? 'Chasseur immobilier' : 'Property Hunter',
    inLanguage: locale === 'fr' ? ['fr', 'en'] : ['en', 'fr'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Japanese'],
      url: `https://www.tokyo-expat.com/${locale}/contact`,
    },
    founder: {
      '@type': 'Person',
      name: 'Alessandro',
      jobTitle: locale === 'fr' ? 'Chasseur immobilier à Tokyo' : 'Tokyo Property Hunter',
      sameAs: [
        'https://www.linkedin.com/company/tokyo-expat',
        'https://www.facebook.com/tokyoexpatguide',
      ],
    },
    sameAs: [
      'https://www.linkedin.com/company/tokyo-expat',
      'https://www.facebook.com/tokyoexpatguide',
    ],
    offers: {
      '@type': 'Offer',
      url: `https://www.tokyo-expat.com/${locale}/services`,
    },
  }

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tokyo Expat',
    url: 'https://www.tokyo-expat.com',
    inLanguage: ['fr', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'Tokyo Expat',
      url: 'https://www.tokyo-expat.com',
    },
  }

  const stats = locale === 'fr'
    ? [
        { value: '300+', label: 'Logements en portefeuille' },
        { value: '16+', label: 'Dossiers clients actifs' },
        { value: 'FR · EN · JP', label: 'Langues parlées' },
      ]
    : [
        { value: '300+', label: 'Properties available' },
        { value: '16+', label: 'Active client files' },
        { value: 'FR · EN · JP', label: 'Languages spoken' },
      ]

  const cases = locale === 'fr'
    ? [
        {
          label: 'Share house trouvée en 9 jours',
          profile: 'Travailleur à distance — Paris',
          detail: 'Chambre privée à Shinjuku, 65 000 JPY/mois, sans garant japonais',
        },
        {
          label: 'Appartement meublé avant l\'arrivée',
          profile: 'Couple — Londres',
          detail: '2 pièces à Shibuya, candidature et contrat signés à distance',
        },
        {
          label: 'Setup nomade digital complet',
          profile: 'Consultant indépendant — Montréal',
          detail: 'Share house à Koenji + accompagnement visa en 12 jours',
        },
      ]
    : [
        {
          label: 'Share house found in 9 days',
          profile: 'Remote worker — Paris',
          detail: 'Private room in Shinjuku, 65,000 JPY/month, no Japanese guarantor',
        },
        {
          label: 'Furnished apartment before landing',
          profile: 'Couple — London',
          detail: '2-room in Shibuya, application and contract signed remotely',
        },
        {
          label: 'Full digital nomad setup',
          profile: 'Independent consultant — Montreal',
          detail: 'Share house in Koenji + visa guidance, 12 days end-to-end',
        },
      ]

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      {/* Hero */}
      <section className="bg-[#0f2744] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#e84141] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Tokyo Expat
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {h.hero_title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {h.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              {h.hero_cta}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="border border-white text-white hover:bg-white hover:text-[#0f2744] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              {h.hero_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.value}>
              <p className="text-2xl font-extrabold text-[#0f2744]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0f2744] mb-12">{h.why_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="font-bold text-[#0f2744] text-lg mb-2">{h.why_1_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{h.why_1_desc}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-[#0f2744] text-lg mb-2">{h.why_2_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{h.why_2_desc}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="font-bold text-[#0f2744] text-lg mb-2">{h.why_3_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{h.why_3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0f2744] mb-4">{h.services_title}</h2>
          <p className="text-center text-gray-500 mb-12">{s.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((pkg) => (
              <div key={pkg.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#0f2744] text-lg mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{pkg.description}</p>
                <p className="text-sm font-semibold text-[#0f2744]/60 mt-2">
                  {locale === 'fr' ? 'Tarif sur devis' : 'Price on request'}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/services`}
              className="bg-[#0f2744] hover:bg-[#1a3a6b] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              {h.services_cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Client cases */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0f2744] mb-3">
            {locale === 'fr' ? 'Dossiers récents' : 'Recent client cases'}
          </h2>
          <p className="text-center text-gray-400 text-sm mb-12">
            {locale === 'fr' ? 'Profils anonymisés' : 'Anonymised profiles'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#e84141] flex items-center justify-center text-white text-xs font-bold mb-4">
                  {String.fromCharCode(65 + i)}
                </div>
                <p className="font-bold text-[#0f2744] mb-1">{c.label}</p>
                <p className="text-xs text-gray-400 mb-3">{c.profile}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">{h.trust_title}</h2>
          <p className="text-gray-300">{h.trust_desc}</p>
          <Link
            href={`/${locale}/about`}
            className="inline-block mt-6 text-[#e84141] font-semibold hover:text-[#ff6b6b] transition-colors"
          >
            {dict.nav.about} →
          </Link>
        </div>
      </section>
    </div>
  )
}
