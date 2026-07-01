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
  const title = locale === 'en' ? 'Our Services — Tokyo Expat' : 'Nos Services — Tokyo Expat'
  const description = locale === 'en'
    ? 'Tokyo Expat property hunting services for foreigners in Tokyo: share house, furnished apartment, family home. Free consultation, bilingual English-French support.'
    : 'Services de chasseur immobilier pour expatriés a Tokyo : share house, appartement meuble, maison familiale. Consultation gratuite, accompagnement en francais et anglais.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}/services`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}/services`,
        'x-default': 'https://www.tokyo-expat.com/en/services',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.tokyo-expat.com/${locale}/services`,
      images: [{ url: '/og?title=Services', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const dict = getDictionary(locale)
  const s = dict.services

  const faqItems = locale === 'en' ? [
    {
      q: 'How much does a property hunter service cost in Tokyo?',
      a: 'Tokyo Expat packages start from €250 for a one-person share house search. All packages include a free initial consultation with no commitment. Price depends on housing type and number of people.',
    },
    {
      q: 'How long does it take to find housing in Tokyo through Tokyo Expat?',
      a: 'For share houses and furnished apartments, typically 1-4 weeks from the initial consultation. Standard 2-year rentals take 4-8 weeks. We present your first options within 48-72 hours of your brief.',
    },
    {
      q: 'Do I need a Japanese guarantor to rent through Tokyo Expat?',
      a: 'No. Tokyo Expat specialises in housing that does not require a Japanese guarantor: share houses, monthly mansions, and furnished apartments accessible with a valid passport, visa, and proof of funds.',
    },
    {
      q: 'Can you search for housing in Tokyo before I arrive in Japan?',
      a: 'Yes. We handle the entire search remotely, including virtual viewings, application submission, and contract review. Many clients sign their lease before landing in Japan.',
    },
    {
      q: 'What types of housing does Tokyo Expat cover?',
      a: 'Share houses (35,000-90,000 JPY/month), furnished monthly apartments (80,000-200,000 JPY/month), and family homes for expats relocating with children.',
    },
  ] : [
    {
      q: 'Combien coûte un service de chasseur immobilier à Tokyo ?',
      a: 'Les forfaits Tokyo Expat commencent à 250€ pour une recherche de share house pour une personne. Tous les forfaits incluent une consultation initiale gratuite sans engagement. Le tarif dépend du type de logement et du nombre de personnes.',
    },
    {
      q: 'Combien de temps faut-il pour trouver un logement à Tokyo ?',
      a: 'Pour les share houses et appartements meublés, comptez 1 à 4 semaines à partir de la consultation initiale. Les locations classiques 2 ans nécessitent 4 à 8 semaines. Nous vous présentons les premières options dans les 48 à 72h après votre brief.',
    },
    {
      q: 'Faut-il un garant japonais pour louer via Tokyo Expat ?',
      a: 'Non. Tokyo Expat se spécialise dans les logements qui ne nécessitent pas de garant japonais : share houses, monthly mansions et appartements meublés accessibles avec un passeport valide, un visa et une preuve de fonds.',
    },
    {
      q: 'Peut-on chercher un logement à Tokyo avant d\'arriver au Japon ?',
      a: 'Oui. Nous gérons toute la recherche à distance, visites virtuelles, dépôt de candidature et vérification du contrat inclus. De nombreux clients signent leur bail avant d\'atterrir au Japon.',
    },
    {
      q: 'Quels types de logement couvrez-vous ?',
      a: 'Share houses (35 000-90 000 JPY/mois), appartements meublés mensuels (80 000-200 000 JPY/mois) et maisons familiales pour les expatriés qui s\'installent avec leurs enfants.',
    },
  ]

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tokyo Expat', item: 'https://www.tokyo-expat.com' },
      { '@type': 'ListItem', position: 2, name: locale === 'fr' ? 'Nos Services' : 'Our Services', item: `https://www.tokyo-expat.com/${locale}/services` },
    ],
  }

  const servicesLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fr' ? 'Services Tokyo Expat' : 'Tokyo Expat Services',
    url: `https://www.tokyo-expat.com/${locale}/services`,
    itemListElement: s.packages.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: pkg.name,
        description: pkg.description,
        url: `https://www.tokyo-expat.com/${locale}/services`,
        provider: {
          '@type': 'Organization',
          name: 'Tokyo Expat',
          url: 'https://www.tokyo-expat.com',
        },
        areaServed: { '@type': 'City', name: 'Tokyo' },
        serviceType: locale === 'fr' ? 'Chasseur immobilier' : 'Property Hunter',
      },
    })),
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">{s.title}</h1>
        <p className="text-gray-500 text-lg">{s.subtitle}</p>
      </div>

      {/* Credibility band (elements 100% verifiables, pas de faux temoignages) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { v: '300+', l: locale === 'fr' ? 'logements dans notre réseau' : 'properties in our network' },
          { v: 'FR / EN / 日本語', l: locale === 'fr' ? 'accompagnement multilingue' : 'multilingual support' },
          { v: '500 000+', l: locale === 'fr' ? 'annonces analysées' : 'listings analysed' },
          { v: locale === 'fr' ? 'Gratuite' : 'Free', l: locale === 'fr' ? 'consultation initiale' : 'initial consultation' },
        ].map((st) => (
          <div key={st.l} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-base font-extrabold text-[#0f2744]">{st.v}</div>
            <div className="text-xs text-gray-500 mt-1">{st.l}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {s.packages.map((pkg) => (
          <div key={pkg.id} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0f2744] mb-1">{pkg.name}</h2>
              <p className="text-gray-500 text-sm">{pkg.description}</p>
            </div>
            <div className="mb-6">
              <span className="inline-block bg-[#0f2744]/8 text-[#0f2744] text-sm font-semibold px-3 py-1 rounded-full">
                {locale === 'fr' ? 'Tarif sur devis — consultation gratuite' : 'Price on request — free consultation'}
              </span>
            </div>
            <div className="mb-6 flex-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{s.included}</p>
              <ul className="space-y-2">
                {pkg.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="block text-center bg-[#0f2744] hover:bg-[#1a3a6b] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {s.book_cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Comment ca marche */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-8">
          {locale === 'fr' ? 'Comment ça marche' : 'How it works'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {(locale === 'fr'
            ? [
                ['1', 'Consultation gratuite', 'On cadre votre projet : visa, budget, quartiers, timing.'],
                ['2', 'Brief et recherche', 'On sélectionne les biens qui correspondent à vos critères.'],
                ['3', 'Visites', 'En personne ou en visio, on vous accompagne.'],
                ['4', 'Candidature et contrat', 'On gère le dossier, la traduction et la négociation.'],
                ['5', 'Remise des clés', 'Vous emménagez, sans mauvaise surprise.'],
              ]
            : [
                ['1', 'Free consultation', 'We frame your project: visa, budget, wards, timing.'],
                ['2', 'Brief and search', 'We shortlist properties matching your criteria.'],
                ['3', 'Viewings', 'In person or by video, we guide you.'],
                ['4', 'Application and contract', 'We handle the file, translation and negotiation.'],
                ['5', 'Keys', 'You move in, with no bad surprises.'],
              ]
          ).map((step) => (
            <div key={step[0]} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="w-7 h-7 rounded-full bg-[#e84141] text-white text-sm font-bold flex items-center justify-center mb-2">{step[0]}</div>
              <div className="font-semibold text-[#0f2744] text-sm mb-1">{step[1]}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{step[2]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pourquoi Tokyo Expat */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-8">
          {locale === 'fr' ? 'Pourquoi Tokyo Expat' : 'Why Tokyo Expat'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(locale === 'fr'
            ? [
                ['Bilingue FR / EN / 日本語', 'On parle votre langue ET celle des propriétaires japonais.'],
                ['Appuyé sur la data', 'Nos recommandations reposent sur 500 000+ annonces réelles (notre Indice des loyers).'],
                ['Tarif fixe et transparent', 'Pas de commission opaque : vous savez ce que vous payez.'],
                ['Sans garant, à distance', 'On contourne les obstacles classiques : garant japonais, barrière de langue.'],
              ]
            : [
                ['Bilingual EN / FR / 日本語', 'We speak your language AND the Japanese landlords\'.'],
                ['Data-backed', 'Our advice is grounded in 500,000+ real listings (our Rent Index).'],
                ['Fixed, transparent pricing', 'No opaque commission: you know what you pay.'],
                ['No guarantor, remote-friendly', 'We bypass the classic hurdles: Japanese guarantor, language barrier.'],
              ]
          ).map((why) => (
            <div key={why[0]} className="border border-gray-200 rounded-xl p-5">
              <div className="font-bold text-[#0f2744] mb-1">{why[0]}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{why[1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-8">
          {locale === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 bg-white hover:bg-gray-50 transition-colors list-none">
                <span className="font-semibold text-[#0f2744] pr-4">{faq.q}</span>
                <span className="flex-shrink-0 text-[#e84141] font-bold text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-100">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

    </div>
  )
}
