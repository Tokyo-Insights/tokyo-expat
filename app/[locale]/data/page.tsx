import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import rentIndex from '@/lib/tokyoRentIndex.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const title = locale === 'en'
    ? 'Tokyo Rental Market Data 2026 | Tokyo Expat'
    : 'Donnees marche locatif Tokyo 2026 | Tokyo Expat'
  const description = locale === 'en'
    ? 'Exclusive Tokyo rental market data: average rent by ward, share house pricing, time to find, seasonality. Updated Q2 2026 from 300+ active listings.'
    : 'Donnees exclusives marche locatif Tokyo : loyer moyen par arrondissement, share house, delais de recherche, saisonnalite. Mis a jour T2 2026.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/data`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}/data`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}/data`,
        'x-default': 'https://www.tokyo-expat.com/en/data',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.tokyo-expat.com/${locale}/data`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

const t = {
  en: {
    hero_title: 'Tokyo Rent Index',
    hero_subtitle: 'Median rent by ward and layout, computed from 528,660 real active listings across Tokyo\'s 23 wards. Updated Q2 2026.',
    last_updated: 'Last updated: June 2026',
    source_note: 'Methodology: median monthly rent (JPY) from 528,660 deduplicated active listings (LIFULL + AtHome), Tokyo 23 special wards, by layout. Median is more robust than average against outliers.',
    section_rent: 'Median Rent by Ward and Layout (JPY/month)',
    section_types: 'Housing Types: Cost Comparison',
    section_time: 'Average Time to Find Housing',
    section_docs: 'Required Documents by Housing Type',
    section_season: 'Rental Market Seasonality',
    section_foreigner: 'Foreigner Approval Rate',
    ward: 'Ward',
    type_label: 'Housing Type',
    min_rent: 'Min (JPY)',
    max_rent: 'Max (JPY)',
    avg_rent: 'Typical Range (JPY/month)',
    notes: 'Notes',
    time_weeks: 'Avg. Weeks to Find',
    competition: 'Competition',
    required_docs: 'Required Documents',
    approval_rate: 'Approval Rate',
    cta_title: 'Need help finding a property?',
    cta_desc: 'Book a free 30-minute consultation. We handle the full search in English, French, and Japanese.',
    cta_btn: 'Free Consultation',
  },
  fr: {
    hero_title: 'Indice des loyers de Tokyo',
    hero_subtitle: 'Loyer median par arrondissement et par layout, calcule sur 528 660 annonces actives reelles dans les 23 arrondissements de Tokyo. Mis a jour T2 2026.',
    last_updated: 'Derniere mise a jour : juin 2026',
    source_note: 'Methodologie : loyer mensuel median (JPY) sur 528 660 annonces actives dedupliquees (LIFULL + AtHome), 23 arrondissements de Tokyo, par layout. La mediane resiste mieux aux valeurs extremes que la moyenne.',
    section_rent: 'Loyer median par arrondissement et layout (JPY/mois)',
    section_types: 'Types de logement : comparatif des couts',
    section_time: 'Delai moyen pour trouver un logement',
    section_docs: 'Documents requis par type de logement',
    section_season: 'Saisonnalite du marche locatif',
    section_foreigner: 'Taux d\'acceptation pour les etrangers',
    ward: 'Arrondissement',
    type_label: 'Type de logement',
    min_rent: 'Min (JPY)',
    max_rent: 'Max (JPY)',
    avg_rent: 'Fourchette typique (JPY/mois)',
    notes: 'Notes',
    time_weeks: 'Delai moyen (semaines)',
    competition: 'Concurrence',
    required_docs: 'Documents requis',
    approval_rate: 'Taux d\'acceptation',
    cta_title: 'Besoin d\'aide pour trouver un logement ?',
    cta_desc: 'Reservez une consultation gratuite de 30 minutes. Nous gerons toute la recherche en francais, anglais et japonais.',
    cta_btn: 'Consultation gratuite',
  },
}

type WardRent = {
  ward_en: string
  ward_jp: string
  sample: number
  rents: Record<string, { median: number; count: number }>
}

const fmtYen = (n?: number) => (n ? '¥' + n.toLocaleString('en-US') : 'n/a')

function tierFor1K(median?: number): string {
  if (!median) return 'mid'
  if (median >= 125000) return 'premium'
  if (median >= 105000) return 'mid-high'
  if (median >= 88000) return 'mid'
  return 'affordable'
}

// Lignes reelles construites depuis l'indice (528k+ annonces), triees par loyer 1K croissant.
const wardData = (rentIndex.wards as unknown as WardRent[])
  .filter((w) => w.rents['1K'])
  .sort((a, b) => (a.rents['1K']?.median ?? 0) - (b.rents['1K']?.median ?? 0))
  .map((w) => ({
    ward: `${w.ward_en}-ku`,
    ward_fr: w.ward_en,
    r1k: w.rents['1K']?.median,
    r1ldk: w.rents['1LDK']?.median,
    r2ldk: w.rents['2LDK']?.median,
    tier: tierFor1K(w.rents['1K']?.median),
  }))

const totalListings = (rentIndex.total_listings as number).toLocaleString('en-US')

type LineRent = {
  line_en: string
  sample: number
  rents: Record<string, { median: number; count: number }>
}

// Lignes de train majeures, triees par loyer 1K croissant.
const lineData = (rentIndex.lines as unknown as LineRent[])
  .filter((l) => l.rents['1K'])
  .sort((a, b) => (a.rents['1K']?.median ?? 0) - (b.rents['1K']?.median ?? 0))
  .map((l) => ({
    line: l.line_en,
    r1k: l.rents['1K']?.median,
    r1ldk: l.rents['1LDK']?.median,
    r2ldk: l.rents['2LDK']?.median,
  }))

const tierColors: Record<string, string> = {
  premium: 'bg-red-50 text-red-700 border-red-200',
  'mid-high': 'bg-orange-50 text-orange-700 border-orange-200',
  mid: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  affordable: 'bg-green-50 text-green-700 border-green-200',
}

const tierLabels: Record<string, Record<string, string>> = {
  en: { premium: 'Premium', 'mid-high': 'Mid-High', mid: 'Mid', affordable: 'Affordable' },
  fr: { premium: 'Premium', 'mid-high': 'Moyen-haut', mid: 'Moyen', affordable: 'Accessible' },
}

export default async function DataPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale
  const copy = l === 'en' ? t.en : t.fr

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tokyo Expat', item: 'https://www.tokyo-expat.com' },
      { '@type': 'ListItem', position: 2, name: l === 'fr' ? 'Données marché' : 'Market Data', item: `https://www.tokyo-expat.com/${l}/data` },
    ],
  }

  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: l === 'en' ? 'Tokyo Rent Index 2026 (median rent by ward and layout)' : 'Indice des loyers de Tokyo 2026 (loyer median par arrondissement et layout)',
    description: l === 'en'
      ? 'Median monthly rent (JPY) by Tokyo ward and apartment layout (1R to 3LDK), computed from 528,660 deduplicated active rental listings (LIFULL and AtHome), Tokyo 23 special wards, Q2 2026.'
      : 'Loyer mensuel median (JPY) par arrondissement de Tokyo et par layout (1R a 3LDK), calcule sur 528 660 annonces locatives actives dedupliquees (LIFULL et AtHome), 23 arrondissements de Tokyo, T2 2026.',
    url: `https://www.tokyo-expat.com/${l}/data`,
    creator: { '@type': 'Organization', name: 'Tokyo Expat', url: 'https://www.tokyo-expat.com' },
    dateModified: '2026-06-30',
    inLanguage: l === 'fr' ? 'fr-FR' : 'en-US',
    spatialCoverage: { '@type': 'Place', name: 'Tokyo, Japan' },
    temporalCoverage: '2026',
    measurementTechnique: 'Median of deduplicated active listing rents',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Median monthly rent (JPY)', unitText: 'JPY' },
      { '@type': 'PropertyValue', name: 'Ward' },
      { '@type': 'PropertyValue', name: 'Apartment layout (1R-3LDK)' },
      { '@type': 'PropertyValue', name: 'Train line (27 major Tokyo lines)' },
    ],
    isPartOf: { '@type': 'WebSite', name: 'Tokyo Expat', url: 'https://www.tokyo-expat.com' },
  }

  const faqs = l === 'en' ? [
    { q: 'What is the average rent in Tokyo in 2026?', a: 'Median rent for a 1K studio ranges from ¥74,000 (Edogawa) to ¥140,000 (Minato). A 1LDK for a couple ranges from ¥118,000 to ¥260,000. These medians come from 528,660 active listings across Tokyo\'s 23 wards.' },
    { q: 'What is the cheapest ward in Tokyo to rent?', a: 'For a 1K studio, the cheapest wards are Edogawa (¥74,000 median), Adachi (¥76,000), Katsushika (¥81,000), Nerima (¥82,000) and Suginami (¥84,000), all eastern or outer wards.' },
    { q: 'What is the most expensive ward in Tokyo?', a: 'Minato is the most expensive (¥140,000 median for a 1K, ¥260,000 for a 1LDK), followed by Chiyoda, Chuo, Shibuya and Shinjuku.' },
    { q: 'Why does this index use median rent instead of the average?', a: 'The median resists outliers: a few luxury listings do not distort it, unlike the average. It better reflects what a normal tenant actually pays.' },
    { q: 'How often is the Tokyo Rent Index updated?', a: 'Quarterly, from fresh active listings. This edition reflects Q2 2026 data.' },
  ] : [
    { q: 'Quel est le loyer moyen à Tokyo en 2026 ?', a: 'Le loyer médian d\'un studio 1K va de 74 000 JPY (Edogawa) à 140 000 JPY (Minato). Un 1LDK pour un couple va de 118 000 à 260 000 JPY. Ces médianes proviennent de 528 660 annonces actives dans les 23 arrondissements de Tokyo.' },
    { q: 'Quel est l\'arrondissement le moins cher de Tokyo ?', a: 'Pour un studio 1K, les moins chers sont Edogawa (74 000 JPY médian), Adachi (76 000 JPY), Katsushika (81 000 JPY), Nerima (82 000 JPY) et Suginami (84 000 JPY), tous à l\'est ou en périphérie.' },
    { q: 'Quel est l\'arrondissement le plus cher de Tokyo ?', a: 'Minato est le plus cher (140 000 JPY médian pour un 1K, 260 000 JPY pour un 1LDK), suivi de Chiyoda, Chuo, Shibuya et Shinjuku.' },
    { q: 'Pourquoi cet indice utilise-t-il le loyer médian plutôt que la moyenne ?', a: 'La médiane résiste aux valeurs extrêmes : quelques biens de luxe ne la faussent pas, contrairement à la moyenne. Elle reflète mieux ce qu\'un locataire normal paie.' },
    { q: 'À quelle fréquence l\'indice est-il mis à jour ?', a: 'Chaque trimestre, à partir d\'annonces actives fraîches. Cette édition reflète les données du T2 2026.' },
  ]

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-block bg-[#0f2744]/8 text-[#0f2744] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          {copy.last_updated}
        </div>
        <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">{copy.hero_title}</h1>
        <p className="text-gray-500 text-lg leading-relaxed">{copy.hero_subtitle}</p>
        <p className="text-xs text-gray-400 mt-3">{copy.source_note}</p>
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { value: totalListings, label: l === 'en' ? 'Listings analysed' : 'Annonces analysees' },
          { value: '23', label: l === 'en' ? 'Wards covered' : 'Arrondissements' },
          { value: '8', label: l === 'en' ? 'Layouts (1R-3LDK)' : 'Layouts (1R-3LDK)' },
          { value: '2', label: l === 'en' ? 'Sources (LIFULL, AtHome)' : 'Sources (LIFULL, AtHome)' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-extrabold text-[#0f2744]">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Ward rent table */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-6">{copy.section_rent}</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0f2744] text-white">
                <th className="px-4 py-3 text-left font-semibold">{copy.ward}</th>
                <th className="px-4 py-3 text-right font-semibold">1K</th>
                <th className="px-4 py-3 text-right font-semibold">1LDK</th>
                <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">2LDK</th>
                <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Tier</th>
              </tr>
            </thead>
            <tbody>
              {wardData.map((row, i) => (
                <tr key={row.ward} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 border-t border-gray-100 font-medium text-[#0f2744]">
                    {l === 'fr' ? row.ward_fr : row.ward}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">
                    {fmtYen(row.r1k)}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">
                    {fmtYen(row.r1ldk)}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right hidden sm:table-cell">
                    {fmtYen(row.r2ldk)}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-100 hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tierColors[row.tier]}`}>
                      {tierLabels[l][row.tier]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rent by train line */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-2">
          {l === 'en' ? 'Median Rent by Major Tokyo Train Line (JPY/month)' : 'Loyer médian par grande ligne de Tokyo (JPY/mois)'}
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          {l === 'en'
            ? 'Median across all stations served by each of the 27 major Tokyo lines.'
            : 'Médiane sur toutes les stations desservies par chacune des 27 grandes lignes de Tokyo.'}
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0f2744] text-white">
                <th className="px-4 py-3 text-left font-semibold">{l === 'en' ? 'Train line' : 'Ligne'}</th>
                <th className="px-4 py-3 text-right font-semibold">1K</th>
                <th className="px-4 py-3 text-right font-semibold">1LDK</th>
                <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">2LDK</th>
              </tr>
            </thead>
            <tbody>
              {lineData.map((row, i) => (
                <tr key={row.line} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 border-t border-gray-100 font-medium text-[#0f2744]">{row.line}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">{fmtYen(row.r1k)}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">{fmtYen(row.r1ldk)}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right hidden sm:table-cell">{fmtYen(row.r2ldk)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Housing types comparison */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-6">{copy.section_types}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: l === 'en' ? 'Share House' : 'Share House',
              range: '35,000 - 90,000',
              tag: l === 'en' ? 'Most accessible' : 'Plus accessible',
              points: l === 'en'
                ? ['All bills included', 'No guarantor needed', 'Available in 1-2 weeks', 'Community living']
                : ['Charges incluses', 'Pas de garant requis', 'Disponible en 1-2 sem.', 'Vie en communaute'],
              color: 'border-green-400',
            },
            {
              name: l === 'en' ? 'Monthly Mansion' : 'Appartement meuble',
              range: '80,000 - 200,000',
              tag: l === 'en' ? 'Best balance' : 'Meilleur equilibre',
              points: l === 'en'
                ? ['Fully furnished', 'Short-term contracts', 'No guarantor', 'Private space']
                : ['Entierement meuble', 'Contrats courte duree', 'Sans garant', 'Espace prive'],
              color: 'border-[#0f2744]',
            },
            {
              name: l === 'en' ? 'Standard Rental' : 'Location standard',
              range: '60,000 - 250,000+',
              tag: l === 'en' ? 'Long-term (2 years)' : 'Long terme (2 ans)',
              points: l === 'en'
                ? ['Unfurnished typically', 'Guarantor required', '4-8 weeks process', 'Full autonomy']
                : ['Non meuble generalement', 'Garant obligatoire', 'Processus 4-8 sem.', 'Pleine autonomie'],
              color: 'border-gray-300',
            },
          ].map((type) => (
            <div key={type.name} className={`border-2 ${type.color} rounded-xl p-5`}>
              <div className="font-bold text-[#0f2744] text-lg mb-1">{type.name}</div>
              <div className="text-xs text-gray-500 mb-2">{type.tag}</div>
              <div className="font-mono text-sm font-semibold text-[#0f2744] mb-4">{type.range} JPY</div>
              <ul className="space-y-1">
                {type.points.map((p) => (
                  <li key={p} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Time to find */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-6">{copy.section_time}</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0f2744] text-white">
                <th className="px-4 py-3 text-left font-semibold">{copy.type_label}</th>
                <th className="px-4 py-3 text-left font-semibold">{copy.time_weeks}</th>
                <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">{copy.competition}</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  type: l === 'en' ? 'Share House' : 'Share House',
                  weeks: '1 - 2',
                  comp: l === 'en' ? 'Low to moderate' : 'Faible a modere',
                },
                {
                  type: l === 'en' ? 'Monthly Mansion (furnished)' : 'Appartement meuble',
                  weeks: '2 - 4',
                  comp: l === 'en' ? 'Moderate' : 'Modere',
                },
                {
                  type: l === 'en' ? 'Standard 2-year rental' : 'Location classique 2 ans',
                  weeks: '4 - 8',
                  comp: l === 'en' ? 'High: guarantor + bank account needed' : 'Eleve : garant + compte bancaire requis',
                },
              ].map((row, i) => (
                <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 border-t border-gray-100 font-medium text-[#0f2744]">{row.type}</td>
                  <td className="px-4 py-3 border-t border-gray-100 font-mono text-xs font-semibold text-[#e84141]">{row.weeks}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-600 text-xs hidden sm:table-cell">{row.comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Required documents */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-6">{copy.section_docs}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: l === 'en' ? 'Share House / Monthly Mansion' : 'Share House / Meuble',
              docs: l === 'en'
                ? ['Valid passport', 'Visa or residence card', 'Proof of funds (bank statement or credit card)', 'Move-in date confirmation']
                : ['Passeport valide', 'Visa ou carte de resident', 'Justificatif de fonds (releve bancaire ou CB)', 'Date d\'entree souhaitee'],
              note: l === 'en' ? 'No Japanese bank account or guarantor required' : 'Pas de compte bancaire ni garant japonais requis',
              color: 'bg-green-50 border-green-200',
            },
            {
              type: l === 'en' ? 'Standard 2-year rental' : 'Location standard 2 ans',
              docs: l === 'en'
                ? ['Residence card (zairyu card)', 'Employment contract or payslips', 'Japanese bank account', 'Japanese guarantor (or agency guarantor service)']
                : ['Carte de resident (zairyu card)', 'Contrat de travail ou fiches de paie', 'Compte bancaire japonais', 'Garant japonais (ou service garant agence)'],
              note: l === 'en' ? 'Process takes 4-8 weeks from application to key handover' : 'Processus de 4 a 8 semaines de la candidature a la remise des cles',
              color: 'bg-orange-50 border-orange-200',
            },
          ].map((item) => (
            <div key={item.type} className={`border rounded-xl p-5 ${item.color}`}>
              <div className="font-bold text-[#0f2744] mb-3">{item.type}</div>
              <ul className="space-y-1 mb-3">
                {item.docs.map((d) => (
                  <li key={d} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#0f2744] mt-0.5 flex-shrink-0">•</span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 italic">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonality */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-6">{copy.section_season}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { months: l === 'en' ? 'Feb - Apr' : 'Fev - Avr', label: l === 'en' ? 'Peak season' : 'Haute saison', level: 'high', note: l === 'en' ? 'Company transfers + university start' : 'Mutations + rentrees universitaires' },
            { months: l === 'en' ? 'May - Aug' : 'Mai - Aout', label: l === 'en' ? 'Quiet season' : 'Basse saison', level: 'low', note: l === 'en' ? 'Best time to negotiate' : 'Meilleur moment pour negocier' },
            { months: l === 'en' ? 'Sep - Oct' : 'Sep - Oct', label: l === 'en' ? 'Active season' : 'Saison active', level: 'medium', note: l === 'en' ? 'Foreign arrivals, new academic year' : 'Arrivees etrangeres, rentree scolaire' },
            { months: l === 'en' ? 'Nov - Jan' : 'Nov - Jan', label: l === 'en' ? 'Moderate' : 'Modere', level: 'low', note: l === 'en' ? 'Year-end slowdown' : 'Ralentissement fin d\'annee' },
          ].map((s) => (
            <div key={s.months} className={`rounded-xl p-4 border ${
              s.level === 'high' ? 'bg-red-50 border-red-200' :
              s.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="font-bold text-[#0f2744] text-sm mb-1">{s.months}</div>
              <div className={`text-xs font-semibold mb-2 ${
                s.level === 'high' ? 'text-red-600' :
                s.level === 'medium' ? 'text-yellow-700' :
                'text-gray-500'
              }`}>{s.label}</div>
              <div className="text-xs text-gray-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Foreigner approval */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-6">{copy.section_foreigner}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              path: l === 'en' ? 'Without agent (standard rental)' : 'Sans agent (location standard)',
              rate: '30-45%',
              color: 'text-red-600',
              bg: 'bg-red-50 border-red-200',
              note: l === 'en' ? 'Language barrier + guarantor + documentation gaps' : 'Barriere langue + garant + dossier incomplet',
            },
            {
              path: l === 'en' ? 'With bilingual agent (standard)' : 'Avec agent bilingue (standard)',
              rate: '70-80%',
              color: 'text-yellow-700',
              bg: 'bg-yellow-50 border-yellow-200',
              note: l === 'en' ? 'Agent bridges language and process gaps' : 'L\'agent comble la barriere langue et process',
            },
            {
              path: l === 'en' ? 'Share House / Monthly Mansion' : 'Share House / Meuble',
              rate: '90-98%',
              color: 'text-green-700',
              bg: 'bg-green-50 border-green-200',
              note: l === 'en' ? 'Designed for foreign tenants, minimal requirements' : 'Concu pour etrangers, exigences minimales',
            },
          ].map((row) => (
            <div key={row.path} className={`border rounded-xl p-5 ${row.bg}`}>
              <div className={`text-3xl font-extrabold mb-2 ${row.color}`}>{row.rate}</div>
              <div className="font-medium text-[#0f2744] text-sm mb-2">{row.path}</div>
              <div className="text-xs text-gray-500">{row.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-6">
          {l === 'en' ? 'Frequently asked questions' : 'Questions fréquentes'}
        </h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group border border-gray-200 rounded-xl p-5">
              <summary className="font-semibold text-[#0f2744] cursor-pointer list-none flex justify-between items-center gap-4">
                {f.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">▾</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#0f2744] text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">{copy.cta_title}</h2>
        <p className="text-gray-300 mb-6">{copy.cta_desc}</p>
        <Link
          href={`/${l}/contact`}
          className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          {copy.cta_btn} &rarr;
        </Link>
      </div>
    </div>
  )
}
