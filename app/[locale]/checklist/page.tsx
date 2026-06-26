import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n'
import LeadMagnetForm from '@/components/LeadMagnetForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const title = locale === 'en'
    ? 'Free Japan Relocation Checklist (PDF) — Tokyo Expat'
    : 'Checklist Relocation Japon gratuite (PDF) — Tokyo Expat'
  const description = locale === 'en'
    ? 'Download a free 90+ point checklist to prepare your move to Japan: pre-departure, arrival, admin, housing, banking, health insurance and daily life. By Tokyo Expat.'
    : 'Telechargez une checklist gratuite de 90+ points pour preparer votre installation au Japon : pre-depart, arrivee, demarches, logement, banque, assurance sante et vie quotidienne. Par Tokyo Expat.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/checklist`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}/checklist`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}/checklist`,
        'x-default': 'https://www.tokyo-expat.com/en/checklist',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.tokyo-expat.com/${locale}/checklist`,
      images: [{ url: '/og?title=Relocation+Checklist', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const isFr = locale === 'fr'

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tokyo Expat', item: 'https://www.tokyo-expat.com' },
      { '@type': 'ListItem', position: 2, name: isFr ? 'Checklist Relocation' : 'Relocation Checklist', item: `https://www.tokyo-expat.com/${locale}/checklist` },
    ],
  }

  const phases = isFr
    ? [
        'Pre-depart : visa, documents, budget',
        'Arrivee : carte de sejour, SIM, premiers pas',
        'Demarches administratives : My Number, mairie',
        'Logement : recherche, garant, contrat',
        'Banque : ouverture de compte, transferts',
        'Assurance sante et retraite',
        'Vie quotidienne : utilities, transports, quotidien',
      ]
    : [
        'Pre-departure: visa, documents, budget',
        'Arrival: residence card, SIM, first steps',
        'Administration: My Number, city hall',
        'Housing: search, guarantor, contract',
        'Banking: account opening, transfers',
        'Health insurance and pension',
        'Daily life: utilities, transport, routines',
      ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="text-center mb-10">
        <p className="inline-block bg-[#e84141]/10 text-[#e84141] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          {isFr ? 'PDF gratuit' : 'Free PDF'}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2744] mb-4">
          {isFr
            ? 'La checklist complete pour s\'installer au Japon'
            : 'The complete checklist to settle in Japan'}
        </h1>
        <p className="text-gray-500 text-lg">
          {isFr
            ? 'Plus de 90 actions concretes, organisees en 7 phases. Tout ce que j\'aurais aime savoir avant d\'arriver.'
            : 'Over 90 concrete action items across 7 phases. Everything I wish I had known before arriving.'}
        </p>
      </div>

      <div className="mb-12">
        <LeadMagnetForm locale={locale} />
      </div>

      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-xl font-bold text-[#0f2744] mb-6">
          {isFr ? 'Ce que couvre la checklist' : 'What the checklist covers'}
        </h2>
        <ul className="space-y-3">
          {phases.map((phase, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0f2744] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{phase}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
