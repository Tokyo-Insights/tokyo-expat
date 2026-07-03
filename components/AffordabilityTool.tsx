'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'

export interface AreaRow {
  name: string
  r1k?: number
  r1ldk?: number
  r2ldk?: number
}

interface Props {
  locale: string
  wards: AreaRow[]
  stations: AreaRow[]
}

type Layout = 'r1k' | 'r1ldk' | 'r2ldk'
type Mode = 'wards' | 'stations'

export default function AffordabilityTool({ locale, wards, stations }: Props): ReactNode {
  const isFr = locale === 'fr'
  const [budget, setBudget] = useState(120000)
  const [layout, setLayout] = useState<Layout>('r1ldk')
  const [mode, setMode] = useState<Mode>('wards')

  const t = {
    title: isFr ? 'Quel quartier puis-je m\'offrir a Tokyo ?' : 'Where can I afford to live in Tokyo?',
    subtitle: isFr
      ? 'Entrez votre budget mensuel. On vous montre, a partir de nos donnees reelles, ce que vous pouvez viser.'
      : 'Enter your monthly budget. We show you, from our real data, what you can realistically target.',
    budget: isFr ? 'Budget mensuel' : 'Monthly budget',
    layout: isFr ? 'Type de logement' : 'Home type',
    areas: isFr ? 'Voir par' : 'Show by',
    wards: isFr ? 'Arrondissements' : 'Wards',
    stations: isFr ? 'Stations' : 'Stations',
    afford: isFr ? 'a votre portee' : 'within reach',
    of: isFr ? 'sur' : 'of',
    none: isFr
      ? 'Aucun a ce budget pour ce type. Montez le budget ou visez un logement plus petit.'
      : 'None at this budget for this type. Raise the budget or target a smaller home.',
    reach: isFr ? 'Juste au-dessus de votre budget' : 'Just above your budget',
    cta: isFr ? 'Trouvez-le avec nous' : 'Find it with us',
    note: isFr
      ? 'Loyer median reel par zone. Le budget doit couvrir le loyer ; prevoyez charges et frais d\'entree en plus.'
      : 'Real median rent per area. Budget should cover rent; add utilities and move-in costs on top.',
  }
  const layoutLabels: Record<Layout, string> = {
    r1k: isFr ? '1K studio (1 pers.)' : '1K studio (single)',
    r1ldk: isFr ? '1LDK (couple)' : '1LDK (couple)',
    r2ldk: isFr ? '2LDK (famille)' : '2LDK (family)',
  }

  const src = mode === 'wards' ? wards : stations
  const withRent = src
    .map((a) => ({ name: a.name, rent: a[layout] }))
    .filter((a): a is { name: string; rent: number } => typeof a.rent === 'number')
    .sort((a, b) => a.rent - b.rent)
  const affordable = withRent.filter((a) => a.rent <= budget)
  const justAbove = withRent.filter((a) => a.rent > budget).slice(0, 3)
  const yen = (n: number) => '¥' + n.toLocaleString('en-US')

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-[#0f2744] text-white px-6 py-5">
        <h2 className="text-xl font-bold">{t.title}</h2>
        <p className="text-gray-300 text-sm mt-1">{t.subtitle}</p>
      </div>

      <div className="p-6 bg-white">
        {/* Controls */}
        <div className="grid gap-5 md:grid-cols-2 mb-6">
          {/* Budget */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t.budget}
            </label>
            <div className="text-3xl font-extrabold text-[#0f2744] mb-2 font-mono">{yen(budget)}</div>
            <input
              type="range"
              min={50000}
              max={350000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#e84141]"
              aria-label={t.budget}
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
              <span>{yen(50000)}</span>
              <span>{yen(350000)}</span>
            </div>
          </div>

          {/* Layout + mode */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t.layout}
              </label>
              <div className="flex flex-wrap gap-2">
                {(['r1k', 'r1ldk', 'r2ldk'] as Layout[]).map((L) => (
                  <button
                    key={L}
                    onClick={() => setLayout(L)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      layout === L
                        ? 'bg-[#0f2744] text-white border-[#0f2744]'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-[#0f2744]'
                    }`}
                  >
                    {layoutLabels[L]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t.areas}
              </label>
              <div className="flex gap-2">
                {(['wards', 'stations'] as Mode[]).map((M) => (
                  <button
                    key={M}
                    onClick={() => setMode(M)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      mode === M
                        ? 'bg-[#e84141] text-white border-[#e84141]'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-[#e84141]'
                    }`}
                  >
                    {M === 'wards' ? t.wards : t.stations}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result headline */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5 text-center">
          <span className="text-4xl font-extrabold text-[#0f2744]">{affordable.length}</span>
          <span className="text-gray-500 text-sm"> {t.of} {withRent.length} </span>
          <span className="text-sm font-semibold text-green-700">{t.afford}</span>
        </div>

        {/* Affordable chips */}
        {affordable.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-5">
            {affordable.map((a) => (
              <span
                key={a.name}
                className="text-xs bg-green-50 text-green-800 border border-green-200 rounded-lg px-2.5 py-1.5 font-medium"
              >
                {a.name} <span className="font-mono text-green-600">{yen(a.rent)}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic mb-5">{t.none}</p>
        )}

        {/* Just above */}
        {justAbove.length > 0 && (
          <div className="mb-5">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.reach}</div>
            <div className="flex flex-wrap gap-2">
              {justAbove.map((a) => (
                <span
                  key={a.name}
                  className="text-xs bg-gray-50 text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5"
                >
                  {a.name} <span className="font-mono">{yen(a.rent)}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-[11px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4">{t.note}</p>
      </div>
    </div>
  )
}
