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
    ? 'Tokyo Rental Market Data 2026 — Tokyo Expat'
    : 'Donnees marche locatif Tokyo 2026 — Tokyo Expat'
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
    hero_title: 'Tokyo Rental Market Data',
    hero_subtitle: 'Exclusive data compiled from 300+ active listings across Tokyo. Updated Q2 2026.',
    last_updated: 'Last updated: June 2026',
    source_note: 'Source: Tokyo Expat active listing network. Prices in JPY/month.',
    section_rent: 'Average Rent by Ward (1K / 1DK, 20-35m²)',
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
    hero_title: 'Donnees marche locatif Tokyo',
    hero_subtitle: 'Donnees exclusives compilees depuis 300+ annonces actives a Tokyo. Mis a jour T2 2026.',
    last_updated: 'Derniere mise a jour : juin 2026',
    source_note: 'Source : reseau annonces actives Tokyo Expat. Prix en JPY/mois.',
    section_rent: 'Loyer moyen par arrondissement (1K / 1DK, 20-35m²)',
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

const wardData = [
  { ward: 'Minato-ku', ward_fr: 'Minato', range: '130,000 - 220,000', tier: 'premium' },
  { ward: 'Shibuya-ku', ward_fr: 'Shibuya', range: '120,000 - 200,000', tier: 'premium' },
  { ward: 'Chiyoda-ku', ward_fr: 'Chiyoda', range: '125,000 - 195,000', tier: 'premium' },
  { ward: 'Shinjuku-ku', ward_fr: 'Shinjuku', range: '100,000 - 165,000', tier: 'mid-high' },
  { ward: 'Meguro-ku', ward_fr: 'Meguro', range: '100,000 - 155,000', tier: 'mid-high' },
  { ward: 'Setagaya-ku', ward_fr: 'Setagaya', range: '85,000 - 135,000', tier: 'mid' },
  { ward: 'Nakano-ku', ward_fr: 'Nakano', range: '78,000 - 115,000', tier: 'mid' },
  { ward: 'Sumida-ku', ward_fr: 'Sumida', range: '75,000 - 110,000', tier: 'mid' },
  { ward: 'Nerima-ku', ward_fr: 'Nerima', range: '65,000 - 95,000', tier: 'affordable' },
  { ward: 'Adachi-ku', ward_fr: 'Adachi', range: '58,000 - 88,000', tier: 'affordable' },
  { ward: 'Edogawa-ku', ward_fr: 'Edogawa', range: '58,000 - 85,000', tier: 'affordable' },
  { ward: 'Katsushika-ku', ward_fr: 'Katsushika', range: '55,000 - 82,000', tier: 'affordable' },
]

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
    name: l === 'en' ? 'Tokyo Rental Market Data 2026' : 'Donnees marche locatif Tokyo 2026',
    description: l === 'en'
      ? 'Average rent by ward, housing types, time to find, and seasonality data for Tokyo rental market 2026.'
      : 'Loyer moyen par arrondissement, types de logement, delais de recherche et saisonnalite du marche locatif tokyoite 2026.',
    url: `https://www.tokyo-expat.com/${l}/data`,
    creator: { '@type': 'Organization', name: 'Tokyo Expat', url: 'https://www.tokyo-expat.com' },
    dateModified: '2026-06-01',
    inLanguage: l === 'fr' ? 'fr-FR' : 'en-US',
    spatialCoverage: { '@type': 'Place', name: 'Tokyo, Japan' },
    temporalCoverage: '2026',
    isPartOf: { '@type': 'WebSite', name: 'Tokyo Expat', url: 'https://www.tokyo-expat.com' },
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
          { value: '300+', label: l === 'en' ? 'Active listings' : 'Annonces actives' },
          { value: '23', label: l === 'en' ? 'Wards covered' : 'Arrondissements' },
          { value: '3', label: l === 'en' ? 'Languages' : 'Langues' },
          { value: '1-4w', label: l === 'en' ? 'Avg. search time' : 'Delai moyen' },
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
                <th className="px-4 py-3 text-left font-semibold">{copy.avg_rent}</th>
                <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Tier</th>
              </tr>
            </thead>
            <tbody>
              {wardData.map((row, i) => (
                <tr key={row.ward} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 border-t border-gray-100 font-medium text-[#0f2744]">
                    {l === 'fr' ? row.ward_fr : row.ward}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-100 text-gray-700 font-mono text-xs">
                    {row.range}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-100 hidden sm:table-cell">
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
                  comp: l === 'en' ? 'High — guarantor + bank account needed' : 'Eleve : garant + compte bancaire requis',
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
