import { getDictionary, type Locale } from '@/lib/i18n'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const title = locale === 'en' ? 'About — Tokyo Expat' : 'À propos — Tokyo Expat'
  const description = locale === 'en'
    ? 'Alessandro, Tokyo property hunter. Bilingual English-French-Japanese. Specialist in furnished short-term housing and monthly mansions for expats. Free consultation.'
    : 'Alessandro, chasseur immobilier à Tokyo. Bilingue français-anglais-japonais. Spécialiste du logement meublé courte durée pour expatriés. Consultation gratuite.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}/about`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}/about`,
        'x-default': 'https://www.tokyo-expat.com/en/about',
      },
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://www.tokyo-expat.com/${locale}/about`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const dict = getDictionary(locale)
  const a = dict.about

  const whyPoints = [a.why_1, a.why_2, a.why_3, a.why_4, a.why_5]

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tokyo Expat', item: 'https://www.tokyo-expat.com' },
      { '@type': 'ListItem', position: 2, name: locale === 'fr' ? 'À propos' : 'About', item: `https://www.tokyo-expat.com/${locale}/about` },
    ],
  }

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alessandro',
    jobTitle: locale === 'fr' ? 'Chasseur immobilier bilingue à Tokyo' : 'Bilingual property hunter in Tokyo',
    url: `https://www.tokyo-expat.com/${locale}/about`,
    worksFor: {
      '@type': 'Organization',
      name: 'Tokyo Expat',
      url: 'https://www.tokyo-expat.com',
    },
    knowsAbout: [
      'Tokyo real estate',
      'Japan expat housing',
      'Japanese rental market',
      'Share houses Tokyo',
      'Furnished apartments Tokyo',
    ],
    sameAs: [
      'https://www.linkedin.com/company/tokyo-expat',
      'https://www.facebook.com/tokyoexpatguide',
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <h1 className="text-4xl font-extrabold text-[#0f2744] mb-10">{a.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {/* Photo placeholder */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 rounded-full bg-[#0f2744] flex items-center justify-center text-white text-5xl font-bold">
            A
          </div>
          <div className="text-center">
            <p className="font-bold text-[#0f2744] text-lg">{a.name}</p>
            <p className="text-gray-500 text-sm">{a.role}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-2 flex flex-col gap-4 text-gray-700 leading-relaxed">
          <p>{a.bio_1}</p>
          <p>{a.bio_2}</p>
          <p>{a.bio_3}</p>
        </div>
      </div>

      {/* Why trust me */}
      <div className="bg-[#0f2744] text-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">{a.why_me_title}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whyPoints.map((point, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-[#e84141] text-lg">✓</span>
              <span className="text-gray-200 text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-12">
        <Link
          href={`/${locale}/contact`}
          className="bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
        >
          {dict.nav.cta}
        </Link>
      </div>
    </div>
  )
}
