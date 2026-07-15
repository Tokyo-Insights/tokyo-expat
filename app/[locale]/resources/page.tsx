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
    ? 'Expat Resources Japan 2026: Best Tools for Living in Tokyo'
    : 'Ressources expatriés Japon 2026 : meilleurs outils pour vivre à Tokyo'
  const description = locale === 'en'
    ? 'Curated tools and services for expats moving to Tokyo: travel health insurance, Japanese lessons, guided tours and SIM cards. Tested and recommended by Tokyo Expat.'
    : 'Outils et services sélectionnés pour les expatriés à Tokyo : assurance santé voyage, cours de japonais, visites guidées et cartes SIM. Testés et recommandés par Tokyo Expat.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/resources`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}/resources`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}/resources`,
        'x-default': 'https://www.tokyo-expat.com/en/resources',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.tokyo-expat.com/${locale}/resources`,
      images: [{ url: '/og?title=Resources', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

type Card = {
  id: string
  icon: string
  name: string
  tagline: string
  desc: string
  benefits: string[]
  cta: string
  url: string
  badge?: string
  external: boolean
}

function getCards(locale: string): Card[] {
  const isFr = locale === 'fr'
  return [
    {
      id: 'safetywing',
      icon: '🛡️',
      name: 'SafetyWing',
      tagline: isFr
        ? 'Assurance santé et voyage pour expatriés'
        : 'Travel health insurance for expats',
      desc: isFr
        ? 'Couverture mensuelle sans engagement, activable avant votre inscription à l\'assurance nationale japonaise. Idéale pour la période de transition après l\'arrivée au Japon.'
        : 'Monthly coverage with no commitment, activatable before your Japanese national insurance enrolment. Ideal for the transition period after arriving in Japan.',
      benefits: isFr
        ? ['Couverture mondiale + Japon inclus', 'Pas d\'examen médical ni d\'engagement long terme', 'Hospitalisation, évacuation médicale, urgences']
        : ['Worldwide coverage including Japan', 'No medical exam, no long-term commitment', 'Hospitalisation, medical evacuation, emergencies'],
      cta: isFr ? 'Obtenir un devis gratuit' : 'Get a Free Quote',
      url: 'https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador',
      external: true,
    },
    {
      id: 'italki',
      icon: '🗣️',
      name: 'italki',
      tagline: isFr
        ? 'Cours de japonais avec des professeurs natifs'
        : 'Japanese lessons with native teachers',
      desc: isFr
        ? 'Plateforme de cours particuliers en ligne avec des professeurs natifs japonais. Flexible, abordable, et bien plus efficace que les applications de vocabulaire seules.'
        : 'Online private tutoring platform with native Japanese teachers. Flexible, affordable, and far more effective than vocabulary apps alone.',
      benefits: isFr
        ? ['Professeurs natifs à partir de 10 $/heure', 'Horaires 100% flexibles selon votre agenda', 'Cours d\'essai à prix réduit pour commencer']
        : ['Native teachers from $10/hour', '100% flexible scheduling around your life', 'Reduced-price trial lesson to get started'],
      cta: isFr ? 'Trouver un professeur' : 'Find a Teacher',
      url: 'https://www.italki.com/affshare?ref=af32660342',
      external: true,
    },
    {
      id: 'getyourguide',
      icon: '🗺️',
      name: 'GetYourGuide',
      tagline: isFr
        ? 'Visites guidées et activités à Tokyo'
        : 'Guided tours and activities in Tokyo',
      desc: isFr
        ? 'Réservez des visites guidées, expériences culturelles et activités à Tokyo. Idéal pour explorer la ville avant ou après votre installation, seul, en famille ou en groupe.'
        : 'Book guided tours, cultural experiences and activities in Tokyo. Perfect for exploring the city before or after settling in, solo, with family, or in a group.',
      benefits: isFr
        ? ['Temples, quartiers, expériences culinaires', 'Guides anglophones et francophones disponibles', 'Annulation gratuite jusqu\'à 24h avant']
        : ['Temples, districts, food experiences', 'English and French-speaking guides available', 'Free cancellation up to 24 hours before'],
      cta: isFr ? 'Explorer Tokyo' : 'Explore Tokyo',
      url: 'https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher',
      external: true,
    },
    {
      id: 'sakuramobile',
      icon: '📱',
      name: 'Sakura Mobile',
      tagline: isFr
        ? 'Carte SIM japonaise pour étrangers'
        : 'Japanese SIM card for foreigners',
      desc: isFr
        ? 'Carte SIM prépayée ou forfait mensuel accessible dès votre arrivée au Japon, sans adresse locale ni garant japonais. Activation rapide avec votre passeport uniquement.'
        : 'Prepaid SIM card or monthly plan accessible from day one in Japan, without a Japanese address or guarantor. Fast activation with your passport only.',
      benefits: isFr
        ? ['Pas d\'adresse japonaise requise', 'Livraison à l\'hôtel ou retrait à l\'aéroport', 'Forfaits data et appels pour tout type de séjour']
        : ['No Japanese address required', 'Hotel delivery or airport pickup', 'Data and call plans for any length of stay'],
      cta: isFr ? 'Voir les forfaits' : 'View Plans',
      url: 'https://www.sakuramobile.jp/tokyoexpat-top',
      external: true,
    },
  ]
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'
  const cards = getCards(locale)

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tokyo Expat', item: 'https://www.tokyo-expat.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: isFr ? 'Ressources' : 'Resources',
        item: `https://www.tokyo-expat.com/${locale}/resources`,
      },
    ],
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Ressources pour expatriés au Japon' : 'Resources for Expats in Japan',
    url: `https://www.tokyo-expat.com/${locale}/resources`,
    numberOfItems: cards.filter(c => !c.badge).length,
    itemListElement: cards
      .filter(c => !c.badge)
      .map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: c.url,
        name: c.name,
      })),
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">
          {isFr ? 'Ressources pour expatriés au Japon' : 'Resources for Expats in Japan'}
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {isFr
            ? 'Outils et services sélectionnés pour faciliter votre installation à Tokyo. Chaque recommandation, je l\'ai testée ou utilisée personnellement.'
            : 'Curated tools and services to make your move to Tokyo smoother. Every recommendation is one I have personally tested or used.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`border rounded-2xl p-8 flex flex-col transition-shadow hover:shadow-lg ${
              card.badge ? 'border-gray-200 bg-gray-50 opacity-75' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2744]">{card.name}</h2>
                  <p className="text-sm text-[#e84141] font-medium">{card.tagline}</p>
                </div>
              </div>
              {card.badge && (
                <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
                  {card.badge}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
              {card.desc}
            </p>

            <ul className="space-y-2 mb-6">
              {card.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            {card.badge ? (
              <span className="block text-center border border-gray-300 text-gray-400 px-6 py-3 rounded-xl font-semibold text-sm cursor-not-allowed">
                {card.cta}
              </span>
            ) : (
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block text-center bg-[#0f2744] hover:bg-[#1a3a6b] text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                {card.cta} &rarr;
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-sm text-gray-500 leading-relaxed">
        <p className="font-semibold text-gray-700 mb-2">
          {isFr ? 'Transparence affilee' : 'Affiliate disclosure'}
        </p>
        <p>
          {isFr
            ? 'Les liens vers des services partenaires sur cette page sont des liens affiliés : si vous effectuez un achat, Tokyo Expat perçoit une commission, sans coût supplémentaire pour vous. Je ne recommande que des services que j\'ai utilisés ou évalués, et que je recommanderais indépendamment de tout partenariat commercial.'
            : 'The links to partner services on this page are affiliate links: if you make a purchase, Tokyo Expat earns a commission at no extra cost to you. I only recommend services I have personally used or evaluated, and would recommend regardless of any partnership.'}
        </p>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-4">
          {isFr
            ? 'Vous avez un projet de logement a Tokyo ?'
            : 'Planning your housing search in Tokyo?'}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="inline-block bg-[#e84141] hover:bg-[#c73333] text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          {isFr ? 'Consultation gratuite 30 min' : 'Free 30-min Consultation'}
        </Link>
      </div>
    </div>
  )
}
