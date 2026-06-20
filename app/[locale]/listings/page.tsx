'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { PROPERTY_TYPES, ZONES, STATS, formatPrice, type PropertyType } from '@/lib/listings'

export default function ListingsPage() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'fr'
  const isFr = locale === 'fr'

  const [activeType, setActiveType] = useState<PropertyType | ''>('')

  const filteredZones = activeType
    ? ZONES.filter(z => activeType && z.types.includes(activeType as PropertyType))
    : ZONES

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block bg-[#e84141] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {isFr ? 'Mon réseau' : 'My network'}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            {isFr
              ? 'Accès direct à 300+ logements à Tokyo'
              : 'Direct access to 300+ properties in Tokyo'}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-8">
            {isFr
              ? "Je travaille avec un réseau d'agences locales et de propriétaires privés qui me donnent accès à des logements non publiés en ligne. Décrivez votre projet, je cherche pour vous."
              : "I work with a network of local agencies and private landlords giving me access to properties not listed online. Describe your needs, I'll search for you."}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: STATS.totalProperties, label: isFr ? 'Logements accessibles' : 'Properties accessible' },
              { value: `${STATS.wards}`, label: isFr ? 'Arrondissements' : 'Tokyo wards' },
              { value: STATS.responseTime, label: isFr ? 'Délai de réponse' : 'Response time' },
              { value: '0€', label: isFr ? "Frais d'agence cachés" : 'Hidden agency fees' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-8 text-center">
          {isFr ? 'Ce que je peux trouver pour vous' : 'What I can find for you'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPERTY_TYPES.map(type => (
            <div key={type.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
              <div className="text-3xl">{type.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-[#0f2744]">
                  {isFr ? type.nameFr : type.nameEn}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {isFr ? type.descFr : type.descEn}
                </p>
              </div>

              {/* Price range */}
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">
                  {isFr ? 'Fourchette de prix' : 'Price range'}
                </p>
                <p className="font-bold text-[#0f2744]">
                  {formatPrice(type.priceRange.min)} – {formatPrice(type.priceRange.max)}
                  <span className="text-gray-400 font-normal text-xs ml-1">/mois</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {isFr ? type.minStayFr : type.minStayEn}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5">
                {(isFr ? type.features : type.featuresEn).map(f => (
                  <span key={f} className="text-xs bg-blue-50 text-[#0f2744] px-2 py-0.5 rounded-full">
                    {f}
                  </span>
                ))}
              </div>

              <Link
                href={`/${locale}/contact?type=${type.id}`}
                className="mt-auto block text-center bg-[#0f2744] hover:bg-[#1a3a6b] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                {isFr ? `Chercher un ${type.nameFr.toLowerCase()}` : `Find a ${type.nameEn.toLowerCase()}`}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Zone filter + grid */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#0f2744]">
              {isFr ? 'Zones couvertes' : 'Covered areas'}
            </h2>
            {/* Type filter pills */}
            <div className="flex flex-wrap gap-2">
              {(['', 'share-house', 'appartement', 'maison'] as const).map(t => {
                const labels: Record<string, { fr: string; en: string }> = {
                  '': { fr: 'Tous', en: 'All' },
                  'share-house': { fr: 'Share House', en: 'Share House' },
                  'appartement': { fr: 'Appartement', en: 'Apartment' },
                  'maison': { fr: 'Maison', en: 'House' },
                }
                const isActive = activeType === t
                return (
                  <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0f2744] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isFr ? labels[t].fr : labels[t].en}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredZones.map(zone => (
              <div key={zone.ward} className="border border-gray-100 rounded-xl p-4 hover:border-[#0f2744]/30 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[#0f2744]">{zone.ward}</h3>
                    <p className="text-xs text-gray-400">{zone.nameEn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#0f2744]">
                      {formatPrice(zone.priceRange.min)}+
                    </p>
                    <p className="text-xs text-gray-400">/mois</p>
                  </div>
                </div>

                {/* Type badges */}
                <div className="flex gap-1.5 mt-3">
                  {zone.types.map(t => {
                    const icons: Record<PropertyType, string> = { 'share-house': '🏘', 'appartement': '🏢', 'maison': '🏡' }
                    const labels: Record<PropertyType, { fr: string; en: string }> = {
                      'share-house': { fr: 'Share', en: 'Share' },
                      'appartement': { fr: 'Apt', en: 'Apt' },
                      'maison': { fr: 'Maison', en: 'House' },
                    }
                    return (
                      <span key={t} className="text-xs bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                        {icons[t]} {isFr ? labels[t].fr : labels[t].en}
                      </span>
                    )
                  })}
                </div>

                {/* Highlights */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {(isFr ? zone.highlights : zone.highlightsEn).map(h => (
                    <span key={h} className="text-xs text-gray-400">{h}</span>
                  )).reduce((acc: ReactNode[], el, i, arr) => {
                    acc.push(el)
                    if (i < arr.length - 1) acc.push(<span key={`dot-${i}`} className="text-gray-300 text-xs"> · </span>)
                    return acc
                  }, [])}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            {isFr
              ? 'Vous avez une zone précise en tête ? Je peux aussi couvrir Kanagawa, Saitama et Chiba.'
              : 'Have a specific area in mind? I also cover Kanagawa, Saitama and Chiba.'}
          </p>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#0f2744] mb-8 text-center">
          {isFr ? 'Comment ça marche' : 'How it works'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(isFr
            ? [
                { n: '1', t: 'Consultation', d: 'Appel gratuit 30 min pour définir vos critères : zone, budget, type, durée.' },
                { n: '2', t: 'Recherche', d: "J'active mon réseau et sélectionne les options qui correspondent exactement à votre profil." },
                { n: '3', t: 'Visites', d: 'Je vous accompagne (ou je visite pour vous si vous êtes encore à l'étranger).' },
                { n: '4', t: 'Signature', d: 'Je gère le dossier et le contrat en japonais. Vous emménagez.' },
              ]
            : [
                { n: '1', t: 'Consultation', d: 'Free 30-min call to define your criteria: area, budget, type, duration.' },
                { n: '2', t: 'Search', d: "I activate my network and select options that exactly match your profile." },
                { n: '3', t: 'Viewings', d: 'I accompany you (or visit on your behalf if you are still abroad).' },
                { n: '4', t: 'Signing', d: 'I handle the paperwork and contract in Japanese. You move in.' },
              ]
          ).map(step => (
            <div key={step.n} className="text-center">
              <div className="w-10 h-10 bg-[#e84141] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {step.n}
              </div>
              <h3 className="font-bold text-[#0f2744] mb-1">{step.t}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="bg-[#0f2744] py-16 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            {isFr ? 'Décrivez votre projet' : 'Describe your project'}
          </h2>
          <p className="text-gray-300 mb-8">
            {isFr
              ? "Budget, zone, nombre de personnes, date d'arrivée : envoyez-moi ces 4 informations et je vous réponds sous 24h avec des options concrètes."
              : "Budget, area, number of people, arrival date: send me these 4 details and I'll reply within 24h with concrete options."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            {isFr ? 'Consultation gratuite 30 min' : 'Free 30-min consultation'}
          </Link>
        </div>
      </section>
    </div>
  )
}
