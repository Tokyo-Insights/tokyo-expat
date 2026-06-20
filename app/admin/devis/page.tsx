'use client'

import { useState } from 'react'

const OFFERS = [
  { slug: 'share-house-1p',       label: 'Share House — 1 personne',   price: '250€' },
  { slug: 'share-house-2p',       label: 'Share House — 2 personnes',  price: '350€' },
  { slug: 'appartement-1p',       label: 'Appartement — 1 personne',   price: '400€' },
  { slug: 'appartement-2p',       label: 'Appartement — 2 personnes',  price: '500€' },
  { slug: 'maison-famille',       label: 'Maison famille',             price: '800€' },
  { slug: 'appartement-meuble-1p',label: 'Appartement meublé — 1P',   price: '400€' },
]

const BASE = 'https://www.tokyo-expat.com'

export default function AdminDevisPage() {
  const [name, setName]     = useState('')
  const [offer, setOffer]   = useState(OFFERS[0].slug)
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')
  const [stripe, setStripe] = useState('')
  const [copied, setCopied] = useState(false)

  const selectedOffer = OFFERS.find(o => o.slug === offer)!

  const url = (() => {
    const params = new URLSearchParams()
    if (name.trim()) params.set('name', name.trim())
    params.set('locale', locale)
    if (stripe.trim()) params.set('stripe', stripe.trim())
    return `${BASE}/devis/${offer}?${params.toString()}`
  })()

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Admin</span>
          <h1 className="text-2xl font-extrabold text-[#0f2744] mt-1">Générer un devis</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">

          {/* Nom client */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Prénom client
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex : Nicolas"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20"
            />
          </div>

          {/* Offre */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Offre
            </label>
            <select
              value={offer}
              onChange={e => setOffer(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 bg-white"
            >
              {OFFERS.map(o => (
                <option key={o.slug} value={o.slug}>
                  {o.label} — {o.price}
                </option>
              ))}
            </select>
          </div>

          {/* Langue */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Langue
            </label>
            <div className="flex gap-3">
              {(['fr', 'en'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    locale === l
                      ? 'bg-[#0f2744] text-white border-[#0f2744]'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-[#0f2744]/30'
                  }`}
                >
                  {l === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
                </button>
              ))}
            </div>
          </div>

          {/* Stripe (optionnel) */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Lien Stripe <span className="font-normal normal-case text-gray-400">(optionnel — laisser vide si pas encore configuré)</span>
            </label>
            <input
              type="text"
              value={stripe}
              onChange={e => setStripe(e.target.value)}
              placeholder="https://buy.stripe.com/..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20"
            />
          </div>

          {/* URL générée */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Lien devis généré</p>
            <p className="text-xs text-gray-700 break-all font-mono leading-relaxed">{url}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={copy}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-[#0f2744] hover:bg-[#1a3a6b] text-white'
              }`}
            >
              {copied ? 'Copié !' : 'Copier le lien'}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:border-[#0f2744]/30 transition-colors text-center"
            >
              Prévisualiser
            </a>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Copie le lien et envoie-le via WhatsApp ou email. Le client voit sa page personnalisée.
          </p>
        </div>

        {/* Summary card */}
        <div className="mt-4 bg-[#0f2744]/5 rounded-xl p-4 border border-[#0f2744]/10">
          <p className="text-xs text-[#0f2744] font-semibold">
            {selectedOffer.label} · {selectedOffer.price} · {locale.toUpperCase()}
            {name.trim() ? ` · ${name.trim()}` : ''}
            {stripe.trim() ? ' · Stripe actif' : ' · Sans paiement'}
          </p>
        </div>
      </div>
    </div>
  )
}
