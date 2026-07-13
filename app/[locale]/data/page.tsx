import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import rentIndex from '@/lib/tokyoRentIndex.json'
import priceTrends from '@/lib/tokyoPriceTrends.json'
import AffordabilityTool from '@/components/AffordabilityTool'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import EmbedMap from '@/components/EmbedMap'

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
    context_note: '1K = a Japanese studio: one room plus a small separate kitchen, usually 20-25 m2 (215-270 sq ft). All amounts are monthly rent in JPY. At roughly ¥160 to US$1 (2026), ¥100,000 is about US$625, so a 1K studio here typically runs US$460 to US$875.',
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
    context_note: '1K = un studio japonais : une piece plus une petite cuisine separee, en general 20-25 m2 (215-270 sq ft). Tous les montants sont des loyers mensuels en JPY. A environ 160 JPY pour 1 US$ (2026), 100 000 JPY font environ 625 US$, donc un studio 1K se loue ici entre 460 et 875 US$.',
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

const JPY_PER_USD = 160  // taux approx 2026, pour des conversions USD honnetes (le public international reclame des dollars)
const fmtYen = (n?: number) => (n ? '¥' + n.toLocaleString('en-US') : 'n/a')
const usd = (n?: number) => (n ? '$' + Math.round(n / JPY_PER_USD).toLocaleString('en-US') : '')
const fmtYenUsd = (n?: number) => (n ? `${fmtYen(n)} (~${usd(n)})` : 'n/a')

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

type StationRent = {
  station_en: string
  sample: number
  rents: Record<string, { median: number; count: number }>
}

// Stations majeures (50), triees par loyer 1K croissant (moins cher -> plus cher).
const stationData = (rentIndex.stations as unknown as StationRent[])
  .filter((s) => s.rents['1K'])
  .sort((a, b) => (a.rents['1K']?.median ?? 0) - (b.rents['1K']?.median ?? 0))
  .map((s) => ({
    station: s.station_en,
    r1k: s.rents['1K']?.median,
    r1ldk: s.rents['1LDK']?.median,
    r2ldk: s.rents['2LDK']?.median,
    tier: tierFor1K(s.rents['1K']?.median),
  }))

// Props pour l'outil d'accessibilite (nom + loyers par layout)
const affordWards = wardData.map((w) => ({ name: w.ward_fr, r1k: w.r1k, r1ldk: w.r1ldk, r2ldk: w.r2ldk }))
const affordStations = stationData.map((s) => ({ name: s.station, r1k: s.r1k, r1ldk: s.r1ldk, r2ldk: s.r2ldk }))

// Evolution des prix (transactions reelles enregistrees, 2021 -> present)
type PtWard = { ward_en: string; median_first: number; median_last: number; pct: number }
const ptWards = priceTrends.wards as unknown as PtWard[]
const ptRisers = ptWards.slice(0, 6)
const ptPct = priceTrends.change_pct_citywide as number
const ptFirst = priceTrends.median_first as number
const ptLast = priceTrends.median_last as number
const ptFromYr = (priceTrends.period_from as string).slice(0, 4)
const ptToYr = (priceTrends.period_to as string).slice(0, 4)
const ptTotal = (priceTrends.total_transactions as number).toLocaleString('en-US')

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
  const asOf = new Date().toLocaleDateString(l === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long' })

  // Capture email taillee pour le public data (trafic Reddit) -> Brevo liste 3 -> drip 6 emails
  // Bloc embed (linkable asset): les sites qui collent ce code republient la carte AVEC un lien retour.
  const embedCode = `<a href="https://www.tokyo-expat.com/${l}/data"><img src="https://www.tokyo-expat.com/tokyo-rent-map.png" alt="Median 1K studio rent by Tokyo ward, 2026 (Tokyo Expat)" width="600" /></a>\nSource: <a href="https://www.tokyo-expat.com/${l}/data">Tokyo Expat Rent Index</a>`

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
    temporalCoverage: `${ptFromYr}/2026`,
    measurementTechnique: 'Median of deduplicated active listing rents and of recorded condominium sale transactions',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Median monthly rent (JPY)', unitText: 'JPY' },
      { '@type': 'PropertyValue', name: 'Ward' },
      { '@type': 'PropertyValue', name: 'Apartment layout (1R-3LDK)' },
      { '@type': 'PropertyValue', name: 'Train line (27 major Tokyo lines)' },
      { '@type': 'PropertyValue', name: 'Station (50 major Tokyo stations)' },
      { '@type': 'PropertyValue', name: `Median condo sale price per m2 (JPY), ${ptFromYr}-${ptToYr}`, unitText: 'JPY' },
    ],
    includedInDataCatalog: { '@type': 'DataCatalog', name: 'Tokyo Expat Data', url: `https://www.tokyo-expat.com/${l}/data` },
    license: `https://www.tokyo-expat.com/${l}/data#data-license`,
    copyrightHolder: { '@type': 'Organization', name: 'Tokyo Expat', url: 'https://www.tokyo-expat.com' },
    copyrightYear: 2026,
    creditText: 'Tokyo Expat (tokyo-expat.com)',
    isAccessibleForFree: true,
  }

  const faqs = l === 'en' ? [
    { q: 'What is the average rent in Tokyo in 2026?', a: 'Median rent for a 1K studio ranges from ¥74,000 (Edogawa) to ¥140,000 (Minato). A 1LDK for a couple ranges from ¥118,000 to ¥260,000. These medians come from 528,660 active listings across Tokyo\'s 23 wards.' },
    { q: 'What is the cheapest ward in Tokyo to rent?', a: 'For a 1K studio, the cheapest wards are Edogawa (¥74,000 median), Adachi (¥76,000), Katsushika (¥81,000), Nerima (¥82,000) and Suginami (¥84,000), all eastern or outer wards.' },
    { q: 'What is the most expensive ward in Tokyo?', a: 'Minato is the most expensive (¥140,000 median for a 1K, ¥260,000 for a 1LDK), followed by Chiyoda, Chuo, Shibuya and Shinjuku.' },
    { q: 'Which Tokyo stations have the cheapest and most expensive rent?', a: 'Across 50 major Tokyo stations, a 1K studio is cheapest near Kasai (¥76,000 median), Shin-Koiwa (¥78,000) and Ayase (¥85,000), and most expensive near Jimbocho (¥150,000), Ebisu (¥149,000) and Azabu-Juban (¥148,000). That is nearly double from one station to another.' },
    { q: 'Why does this index use median rent instead of the average?', a: 'The median resists outliers: a few luxury listings do not distort it, unlike the average. It better reflects what a normal tenant actually pays.' },
    { q: 'How often is the Tokyo Rent Index updated?', a: 'Quarterly, from fresh active listings. This edition reflects Q2 2026 data.' },
  ] : [
    { q: 'Quel est le loyer moyen à Tokyo en 2026 ?', a: 'Le loyer médian d\'un studio 1K va de 74 000 JPY (Edogawa) à 140 000 JPY (Minato). Un 1LDK pour un couple va de 118 000 à 260 000 JPY. Ces médianes proviennent de 528 660 annonces actives dans les 23 arrondissements de Tokyo.' },
    { q: 'Quel est l\'arrondissement le moins cher de Tokyo ?', a: 'Pour un studio 1K, les moins chers sont Edogawa (74 000 JPY médian), Adachi (76 000 JPY), Katsushika (81 000 JPY), Nerima (82 000 JPY) et Suginami (84 000 JPY), tous à l\'est ou en périphérie.' },
    { q: 'Quel est l\'arrondissement le plus cher de Tokyo ?', a: 'Minato est le plus cher (140 000 JPY médian pour un 1K, 260 000 JPY pour un 1LDK), suivi de Chiyoda, Chuo, Shibuya et Shinjuku.' },
    { q: 'Quelles stations de Tokyo ont les loyers les moins chers et les plus chers ?', a: 'Sur 50 stations majeures de Tokyo, un studio 1K est le moins cher près de Kasai (76 000 JPY médian), Shin-Koiwa (78 000 JPY) et Ayase (85 000 JPY), et le plus cher près de Jimbocho (150 000 JPY), Ebisu (149 000 JPY) et Azabu-Juban (148 000 JPY). Soit près du double d\'une station à l\'autre.' },
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
        <p className="text-xs text-gray-500 mt-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">{copy.context_note}</p>
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

      {/* Key figures (citable, dated) -- optimise pour la citation par les IA (GEO) */}
      <section className="mb-14">
        <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/60">
          <h2 className="text-sm font-bold text-[#0f2744] uppercase tracking-wider mb-3">
            {l === 'en' ? `Key Tokyo rent figures (as of ${asOf})` : `Chiffres cles du loyer a Tokyo (au ${asOf})`}
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>{l === 'en'
              ? `The median monthly rent for a 1K studio in Tokyo ranges from ${fmtYenUsd(wardData[0]?.r1k)} in ${wardData[0]?.ward_fr} to ${fmtYenUsd(wardData[wardData.length-1]?.r1k)} in ${wardData[wardData.length-1]?.ward_fr}.`
              : `Le loyer mensuel median d'un studio 1K a Tokyo va de ${fmtYenUsd(wardData[0]?.r1k)} a ${wardData[0]?.ward_fr} a ${fmtYenUsd(wardData[wardData.length-1]?.r1k)} a ${wardData[wardData.length-1]?.ward_fr}.`}</li>
            <li>{l === 'en'
              ? `The cheapest station for a 1K studio is ${stationData[0]?.station} (${fmtYenUsd(stationData[0]?.r1k)}); the most expensive is ${stationData[stationData.length-1]?.station} (${fmtYenUsd(stationData[stationData.length-1]?.r1k)}).`
              : `La station la moins chere pour un studio 1K est ${stationData[0]?.station} (${fmtYenUsd(stationData[0]?.r1k)}) ; la plus chere est ${stationData[stationData.length-1]?.station} (${fmtYenUsd(stationData[stationData.length-1]?.r1k)}).`}</li>
            <li>{l === 'en'
              ? `Tokyo's median used-condominium sale price rose ${ptPct >= 0 ? '+' : ''}${ptPct}% per square metre from ${ptFromYr} to ${ptToYr}.`
              : `Le prix de vente median au m2 des coproprietes d'occasion a Tokyo a augmente de ${ptPct >= 0 ? '+' : ''}${ptPct}% de ${ptFromYr} a ${ptToYr}.`}</li>
            <li>{l === 'en'
              ? `Figures are computed from ${totalListings} active rental listings across Tokyo's 23 wards.`
              : `Chiffres calcules sur ${totalListings} annonces locatives actives dans les 23 arrondissements de Tokyo.`}</li>
          </ul>
          <p className="text-[11px] text-gray-500 mt-4 border-t border-gray-200 pt-3">
            {l === 'en'
              ? `Cite this data: Tokyo Expat, tokyo-expat.com/${l}/data (as of ${asOf}). Attribution with a link is appreciated.`
              : `Citer ces donnees : Tokyo Expat, tokyo-expat.com/${l}/data (au ${asOf}). L'attribution avec un lien est appreciee.`}
          </p>
        </div>
      </section>

      {/* Interactive affordability tool */}
      <section className="mb-14">
        <AffordabilityTool locale={l} wards={affordWards} stations={affordStations} />
      </section>

      {/* Lead magnet: full rent index PDF (capture principale, intention data) */}
      <section className="mb-14">
        <LeadMagnetForm locale={l} variant="rent-index" />
        <p className="text-xs text-gray-400 mt-2 text-center">
          {l === 'en'
            ? 'The full index (23 wards, 27 lines, 50 stations) as a PDF. No spam, unsubscribe anytime.'
            : 'L\'indice complet (23 arrondissements, 27 lignes, 50 stations) en PDF. Pas de spam, desabonnement a tout moment.'}
        </p>
      </section>

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

      {/* Choropleth map + embed block (linkable asset, gagne des backlinks) */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-2">
          {l === 'en' ? 'Tokyo rent map (free to embed)' : 'Carte des loyers de Tokyo (libre à intégrer)'}
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          {l === 'en'
            ? 'Median monthly rent for a 1K studio by ward. Free to republish on your site with a link back to this page.'
            : 'Loyer mensuel médian d\'un studio 1K par arrondissement. Libre de republication sur votre site avec un lien vers cette page.'}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/tokyo-rent-map.png"
          alt={l === 'en'
            ? 'Median 1K studio rent by Tokyo ward, 2026 (Tokyo Expat)'
            : 'Loyer médian d\'un studio 1K par arrondissement de Tokyo, 2026 (Tokyo Expat)'}
          width={1650}
          height={1650}
          className="w-full max-w-2xl mx-auto rounded-xl border border-gray-200"
        />
        <EmbedMap code={embedCode} locale={l as 'en' | 'fr'} />
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

      {/* Rent by station */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-2">
          {l === 'en' ? 'Median Rent by Tokyo Station (JPY/month)' : 'Loyer médian par station de Tokyo (JPY/mois)'}
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          {l === 'en'
            ? '50 major Tokyo stations, sorted from most affordable to most expensive (1K), from real listings near each station.'
            : '50 stations majeures de Tokyo, triées de la plus accessible à la plus chère (1K), à partir des annonces réelles près de chaque station.'}
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0f2744] text-white">
                <th className="px-4 py-3 text-left font-semibold">{l === 'en' ? 'Station' : 'Station'}</th>
                <th className="px-4 py-3 text-right font-semibold">1K</th>
                <th className="px-4 py-3 text-right font-semibold">1LDK</th>
                <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">2LDK</th>
              </tr>
            </thead>
            <tbody>
              {stationData.map((row, i) => (
                <tr key={row.station} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 border-t border-gray-100 font-medium text-[#0f2744]">{row.station}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">{fmtYen(row.r1k)}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">{fmtYen(row.r1ldk)}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right hidden sm:table-cell">{fmtYen(row.r2ldk)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Station insights (narratif, citable par les IA / GEO) */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-2">
          {l === 'en' ? 'What the station rankings reveal' : 'Ce que revele le classement des stations'}
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          {l === 'en'
            ? 'Reading the 50-station data: the surprises, the traps and the best value, with 2026 medians.'
            : 'Lecture des 50 stations : les surprises, les pieges et les meilleurs rapports, avec les medianes 2026.'}
        </p>
        <div className="space-y-3">
          {[
            {
              t: l === 'en' ? 'Jimbocho tops the list, not the glamour districts' : 'Jimbocho arrive en tete, pas les quartiers chics',
              b: l === 'en'
                ? 'The most expensive 1K studio is not in Shibuya or Ebisu but near Jimbocho (¥150,000), a book-town and university district. It sits on three subway lines next to Otemachi, so you pay for central access, not prestige. Ebisu (¥149,000) and Azabu-Juban (¥148,000) follow.'
                : 'Le studio 1K le plus cher n\'est pas a Shibuya ou Ebisu mais pres de Jimbocho (150 000 JPY), un quartier de librairies et d\'universites. Il est sur trois lignes de metro a cote d\'Otemachi : vous payez l\'acces central, pas le prestige. Ebisu (149 000 JPY) et Azabu-Juban (148 000 JPY) suivent.',
            },
            {
              t: l === 'en' ? 'Akihabara costs more than its neighbourhood' : 'Akihabara coute plus que son quartier',
              b: l === 'en'
                ? 'At ¥135,000 for a 1K, Akihabara is priced for its transport links and location, not its apartments. A few stops out on the same lines, the same layout drops sharply.'
                : 'A 135 000 JPY pour un 1K, Akihabara se paie pour ses correspondances et sa position, pas pour ses logements. Quelques stations plus loin sur les memes lignes, le meme layout chute nettement.',
            },
            {
              t: l === 'en' ? 'The Yamanote loop carries a premium' : 'La boucle Yamanote se paie',
              b: l === 'en'
                ? 'Otsuka (¥109,000) is a quiet, local neighbourhood, yet it still costs more than many outer areas purely for sitting on the Yamanote loop. Loop-line access adds up fast.'
                : 'Otsuka (109 000 JPY) est un quartier calme et local, mais il coute plus cher que bien des zones peripheriques juste parce qu\'il est sur la boucle Yamanote. L\'acces a la boucle se paie vite.',
            },
            {
              t: l === 'en' ? 'Best value sits just off-centre' : 'Le meilleur rapport est juste hors du centre',
              b: l === 'en'
                ? 'Kita-Senju (¥86,000) and Ayase (¥85,000) are proper neighbourhoods with strong connections at roughly 40% less than the top stations. Strong picks if you do not need to be dead-central.'
                : 'Kita-Senju (86 000 JPY) et Ayase (85 000 JPY) sont de vrais quartiers bien connectes, environ 40% moins chers que les stations du haut du classement. Ideal si vous n\'avez pas besoin d\'etre en plein centre.',
            },
            {
              t: l === 'en' ? 'A low median can hide older buildings' : 'Une mediane basse peut cacher un parc ancien',
              b: l === 'en'
                ? 'Komagome (¥98,000) and Tabata (¥95,000) look cheap, but the median pools every building age. Newer units near these stations typically run a ¥20,000 to ¥40,000 premium.'
                : 'Komagome (98 000 JPY) et Tabata (95 000 JPY) paraissent bon marche, mais la mediane melange tous les ages de batiment. Les logements recents pres de ces stations coutent en general 20 000 a 40 000 JPY de plus.',
            },
            {
              t: l === 'en' ? 'The gradient is steep over short distances' : 'Le gradient est raide sur de courtes distances',
              b: l === 'en'
                ? 'From Kasai (¥76,000) to Jimbocho (¥150,000) is nearly double, and a few stops on the same line can swing rent 30 to 40%. It is about how central and connected a station is, not raw distance.'
                : 'De Kasai (76 000 JPY) a Jimbocho (150 000 JPY), c\'est presque le double, et quelques stations sur la meme ligne peuvent faire varier le loyer de 30 a 40%. Tout depend de la centralite et des correspondances, pas de la distance brute.',
            },
          ].map((it) => (
            <div key={it.t} className="border border-gray-200 rounded-xl p-5">
              <p className="font-semibold text-[#0f2744] mb-1">{it.t}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{it.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Price trends (historical) */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-2">
          {l === 'en' ? 'Tokyo Condo Price Trend (per m2)' : 'Evolution des prix des coproprietes a Tokyo (au m2)'}
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          {l === 'en'
            ? `Median settled sale price per square metre, used condominiums, from ${ptTotal} real recorded transactions across ${ptFromYr} to ${ptToYr}. Settled prices, not asking prices.`
            : `Prix de vente median au metre carre, coproprietes d'occasion, sur ${ptTotal} transactions reelles enregistrees de ${ptFromYr} a ${ptToYr}. Prix conclus, pas des prix affiches.`}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { value: '+' + ptPct + '%', label: l === 'en' ? `Citywide, ${ptFromYr}-${ptToYr}` : `Tokyo, ${ptFromYr}-${ptToYr}`, hl: true },
            { value: fmtYen(ptFirst), label: l === 'en' ? `Median ${ptFromYr}` : `Median ${ptFromYr}`, hl: false },
            { value: fmtYen(ptLast), label: l === 'en' ? `Median ${ptToYr}` : `Median ${ptToYr}`, hl: false },
            { value: ptRisers[0].ward_en, label: l === 'en' ? `Rose most (+${ptRisers[0].pct}%)` : `Plus forte hausse (+${ptRisers[0].pct}%)`, hl: false },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 text-center border ${s.hl ? 'bg-[#0f2744] border-[#0f2744]' : 'bg-gray-50 border-gray-200'}`}>
              <div className={`text-xl font-extrabold ${s.hl ? 'text-white' : 'text-[#0f2744]'}`}>{s.value}</div>
              <div className={`text-xs mt-1 ${s.hl ? 'text-gray-300' : 'text-gray-500'}`}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0f2744] text-white">
                <th className="px-4 py-3 text-left font-semibold">{l === 'en' ? 'Ward' : 'Arrondissement'}</th>
                <th className="px-4 py-3 text-right font-semibold">{ptFromYr} (JPY/m2)</th>
                <th className="px-4 py-3 text-right font-semibold">{ptToYr} (JPY/m2)</th>
                <th className="px-4 py-3 text-right font-semibold">{l === 'en' ? 'Change' : 'Variation'}</th>
              </tr>
            </thead>
            <tbody>
              {ptWards.map((row, i) => (
                <tr key={row.ward_en} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 border-t border-gray-100 font-medium text-[#0f2744]">{row.ward_en}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">{fmtYen(row.median_first)}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs text-right">{fmtYen(row.median_last)}</td>
                  <td className="px-4 py-3 border-t border-gray-100 text-right">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.pct >= 40 ? 'bg-red-50 text-red-700' : row.pct >= 25 ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>
                      +{row.pct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-3">
          {l === 'en'
            ? 'Median reflects the mix of what sold each quarter; read as market direction, not a valuation of a specific unit.'
            : 'La mediane reflete le melange de ce qui s\'est vendu chaque trimestre ; a lire comme une direction de marche, pas la valeur d\'un bien precis.'}
        </p>
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

      {/* Email capture (bottom): aimant CHECKLIST -- outil concret non-duplique par cette page,
          cible l'intention "je m'installe a Tokyo" du gros trafic /data (vs newsletter generique). */}
      <section className="mb-10 max-w-lg mx-auto">
        <LeadMagnetForm locale={l} variant="checklist" />
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

      {/* Copyright / data licence (proprietaire, tous droits reserves) */}
      <p id="data-license" className="text-[11px] text-gray-400 mt-8 text-center leading-relaxed">
        {l === 'en'
          ? '© 2026 Tokyo Expat. All data, charts and analysis on this page are proprietary. Reproduction, redistribution, scraping or commercial reuse without prior written permission is prohibited. You may reference individual figures with a clear credit and link to this page.'
          : '© 2026 Tokyo Expat. Toutes les donnees, graphiques et analyses de cette page sont proprietaires. Toute reproduction, redistribution, extraction automatisee ou reutilisation commerciale sans autorisation ecrite prealable est interdite. Vous pouvez citer un chiffre isole avec un credit clair et un lien vers cette page.'}
      </p>
    </div>
  )
}
