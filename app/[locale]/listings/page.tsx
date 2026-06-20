'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { listings, STATS, formatPrice, type ListingType, type Availability } from '@/lib/listings'

const TYPE_LABELS: Record<string, { fr: string; en: string; icon: string }> = {
  'share-house': { fr: 'Share House', en: 'Share House', icon: '🏘' },
  'appartement':  { fr: 'Appartement meublé', en: 'Furnished Apartment', icon: '🏢' },
  'maison':       { fr: 'Maison / Famille', en: 'House / Family', icon: '🏡' },
}

const AVAIL_LABELS: Record<string, { fr: string; en: string; color: string }> = {
  'disponible': { fr: 'Disponible',      en: 'Available',    color: 'bg-green-100 text-green-800' },
  'bientot':    { fr: 'Bientôt dispo',   en: 'Coming soon',  color: 'bg-yellow-100 text-yellow-800' },
  'reserve':    { fr: 'Réservé',         en: 'Reserved',     color: 'bg-red-100 text-red-800' },
}

const PRICE_RANGES = [
  { label: '< 60k',     max: 60000 },
  { label: '60-100k',   max: 100000, min: 60000 },
  { label: '100-180k',  max: 180000, min: 100000 },
  { label: '> 180k',    min: 180000 },
]

export default function ListingsPage() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'fr'
  const isFr = locale === 'fr'

  const [typeFilter, setTypeFilter] = useState<ListingType | ''>('')
  const [priceFilter, setPriceFilter] = useState<number>(0)
  const [availFilter, setAvailFilter] = useState<Availability | ''>('')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (typeFilter && l.type !== typeFilter) return false
      if (priceFilter && l.price > priceFilter) return false
      if (availFilter && l.availability !== availFilter) return false
      if (search) {
        const q = search.toLowerCase()
        const haystack = `${l.ward} ${l.neighborhood} ${l.station} ${l.rooms}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [typeFilter, priceFilter, availFilter, search])

  const available = filtered.filter(l => l.availability === 'disponible').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block bg-[#e84141] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {isFr ? 'Inventaire exclusif' : 'Exclusive inventory'}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            {isFr ? 'Logements disponibles à Tokyo' : 'Available Housing in Tokyo'}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {isFr
              ? `${STATS.total} logements dans mon réseau — ${STATS.available} disponibles maintenant. Sans garant, sans agence.`
              : `${STATS.total} properties in my network — ${STATS.available} available now. No guarantor, no agency fees.`}
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <div>
              <span className="text-2xl font-bold text-white">{STATS.shareHouses}</span>
              <span className="text-gray-400 ml-2">{isFr ? 'Share houses' : 'Share houses'}</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{STATS.apartments}</span>
              <span className="text-gray-400 ml-2">{isFr ? 'Appartements' : 'Apartments'}</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{STATS.houses}</span>
              <span className="text-gray-400 ml-2">{isFr ? 'Maisons' : 'Houses'}</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#e84141]">+300</span>
              <span className="text-gray-400 ml-2">{isFr ? 'via réseau direct' : 'via direct network'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-[65px] z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-3 items-center">
          {/* Search */}
          <input
            type="text"
            placeholder={isFr ? 'Quartier, station...' : 'Neighborhood, station...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
          />

          {/* Type */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as ListingType | '')}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
          >
            <option value="">{isFr ? 'Tous types' : 'All types'}</option>
            <option value="share-house">{isFr ? 'Share House' : 'Share House'}</option>
            <option value="appartement">{isFr ? 'Appartement meublé' : 'Furnished Apartment'}</option>
            <option value="maison">{isFr ? 'Maison / Famille' : 'House / Family'}</option>
          </select>

          {/* Prix */}
          <select
            value={priceFilter}
            onChange={e => setPriceFilter(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
          >
            <option value={0}>{isFr ? 'Tous budgets' : 'All budgets'}</option>
            <option value={60000}>{isFr ? 'Moins de 60,000 ¥' : 'Under ¥60,000'}</option>
            <option value={100000}>{isFr ? 'Moins de 100,000 ¥' : 'Under ¥100,000'}</option>
            <option value={180000}>{isFr ? 'Moins de 180,000 ¥' : 'Under ¥180,000'}</option>
          </select>

          {/* Dispo */}
          <select
            value={availFilter}
            onChange={e => setAvailFilter(e.target.value as Availability | '')}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
          >
            <option value="">{isFr ? 'Toutes dispo' : 'All availability'}</option>
            <option value="disponible">{isFr ? 'Disponible maintenant' : 'Available now'}</option>
            <option value="bientot">{isFr ? 'Bientôt disponible' : 'Coming soon'}</option>
          </select>

          {/* Reset */}
          {(typeFilter || priceFilter || availFilter || search) && (
            <button
              onClick={() => { setTypeFilter(''); setPriceFilter(0); setAvailFilter(''); setSearch('') }}
              className="text-xs text-gray-400 hover:text-[#e84141] transition-colors"
            >
              {isFr ? 'Réinitialiser' : 'Reset'} ×
            </button>
          )}

          <span className="ml-auto text-sm text-gray-400">
            {filtered.length} {isFr ? 'logements' : 'properties'}
            {available < filtered.length && ` · ${available} ${isFr ? 'disponibles' : 'available'}`}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg font-medium text-gray-600 mb-2">
              {isFr ? 'Aucun logement ne correspond' : 'No properties match your search'}
            </p>
            <p className="text-sm mb-6">
              {isFr
                ? 'Décrivez votre projet et je cherche dans mon réseau élargi de 300+ logements.'
                : 'Describe your needs and I'll search my extended network of 300+ properties.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="bg-[#e84141] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#ff6b6b] transition-colors"
            >
              {isFr ? 'Me décrire votre projet' : 'Describe your project'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(listing => {
              const typeInfo = TYPE_LABELS[listing.type]
              const availInfo = AVAIL_LABELS[listing.availability]
              const desc = isFr ? listing.descFr : listing.descEn
              const subject = isFr
                ? `Demande - ${listing.neighborhood} ${listing.rooms}`
                : `Inquiry - ${listing.neighborhood} ${listing.rooms}`

              return (
                <div
                  key={listing.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
                >
                  {/* Color band by type */}
                  <div className={`h-1.5 ${listing.type === 'share-house' ? 'bg-blue-400' : listing.type === 'appartement' ? 'bg-[#0f2744]' : 'bg-emerald-500'}`} />

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* Type + Dispo */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {typeInfo.icon} {isFr ? typeInfo.fr : typeInfo.en}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${availInfo.color}`}>
                        {isFr ? availInfo.fr : availInfo.en}
                      </span>
                    </div>

                    {/* Location */}
                    <div>
                      <h3 className="font-bold text-[#0f2744] text-base">
                        {listing.neighborhood}
                        <span className="font-normal text-gray-400 text-sm"> — {listing.ward}</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">📍 {listing.station}</p>
                    </div>

                    {/* Price + Rooms */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-extrabold text-[#0f2744]">
                        {formatPrice(listing.price)}
                      </span>
                      <span className="text-xs text-gray-400">/mois</span>
                      <span className="ml-auto text-sm font-semibold text-gray-600">
                        {listing.rooms}
                        {listing.size && <span className="text-gray-400 font-normal"> · {listing.size}m²</span>}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {listing.features.slice(0, 3).map(f => (
                        <span key={f} className="text-xs bg-gray-50 text-gray-500 border border-gray-100 px-2 py-0.5 rounded-full">
                          {f}
                        </span>
                      ))}
                      {listing.features.length > 3 && (
                        <span className="text-xs text-gray-400">+{listing.features.length - 3}</span>
                      )}
                    </div>

                    {/* Available from */}
                    {listing.availableFrom && (
                      <p className="text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded-lg">
                        {isFr ? `Disponible dès le ${listing.availableFrom}` : `Available from ${listing.availableFrom}`}
                      </p>
                    )}

                    {/* Min stay */}
                    {listing.minStay && (
                      <p className="text-xs text-gray-400">
                        {isFr ? `Durée min. : ${listing.minStay}` : `Min. stay: ${listing.minStay}`}
                      </p>
                    )}

                    {/* CTA */}
                    <div className="mt-auto pt-2">
                      <Link
                        href={`/${locale}/contact?subject=${encodeURIComponent(subject)}`}
                        className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          listing.availability === 'reserve'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                            : 'bg-[#0f2744] hover:bg-[#1a3a6b] text-white'
                        }`}
                      >
                        {listing.availability === 'reserve'
                          ? (isFr ? 'Réservé' : 'Reserved')
                          : (isFr ? 'Demander ce logement' : 'Request this property')
                        }
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA — réseau élargi */}
        <div className="mt-16 bg-[#0f2744] text-white rounded-2xl p-8 text-center">
          <p className="text-xl font-bold mb-2">
            {isFr ? "Vous ne trouvez pas votre logement idéal ?" : "Can't find your ideal property?"}
          </p>
          <p className="text-gray-300 mb-6">
            {isFr
              ? "Ces logements ne représentent qu'une partie de mon réseau. Décrivez-moi votre projet et j'explore les 300+ options disponibles."
              : "These listings represent only part of my network. Describe your needs and I'll explore 300+ available options."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors"
          >
            {isFr ? 'Consultation gratuite 30 min' : 'Free 30-min consultation'}
          </Link>
        </div>
      </section>
    </div>
  )
}
