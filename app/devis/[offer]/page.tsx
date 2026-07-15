import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Votre devis — Tokyo Expat',
  robots: { index: false, follow: false },
}

type OfferData = {
  title: { fr: string; en: string }
  price: number
  description: { fr: string; en: string }
  included: { fr: string[]; en: string[] }
}

const OFFERS: Record<string, OfferData> = {
  'share-house-1p': {
    title: { fr: 'Share House — 1 Personne', en: 'Share House — 1 Person' },
    price: 250,
    description: {
      fr: "Idéal pour une première installation à Tokyo ou un séjour de moins de 12 mois.",
      en: "Ideal for a first move to Tokyo or a stay of less than 12 months.",
    },
    included: {
      fr: [
        "Consultation détaillée et conseils sur le marché locatif",
        "Sélection de 5+ share houses correspondant à vos critères",
        "Organisation et accompagnement pour les visites",
        "Négociation du loyer et des conditions de contrat",
        "Traduction et explication de tous les documents",
        "Accompagnement jusqu'à la remise des clés",
      ],
      en: [
        "Detailed consultation and Tokyo rental market advice",
        "Selection of 5+ share houses matching your criteria",
        "Organisation and support for viewings",
        "Contract review and bilingual support",
        "Translation and explanation of all documents",
        "Full support through to key handover",
      ],
    },
  },
  'share-house-2p': {
    title: { fr: 'Share House — 2 Personnes', en: 'Share House — 2 People' },
    price: 350,
    description: {
      fr: "Solution idéale pour deux personnes cherchant un logement partagé à Tokyo.",
      en: "The ideal solution for two people looking for shared accommodation in Tokyo.",
    },
    included: {
      fr: [
        "Consultation détaillée et conseils sur le marché locatif",
        "Sélection de 5+ share houses adaptées à 2 personnes",
        "Organisation et accompagnement pour les visites",
        "Négociation du loyer et des conditions de contrat",
        "Traduction et explication de tous les documents",
        "Accompagnement jusqu'à la remise des clés",
      ],
      en: [
        "Detailed consultation and Tokyo rental market advice",
        "Selection of 5+ share houses suitable for 2 people",
        "Organisation and support for viewings",
        "Contract review and bilingual support",
        "Translation and explanation of all documents",
        "Full support through to key handover",
      ],
    },
  },
  'appartement-1p': {
    title: { fr: 'Appartement — 1 Personne', en: 'Apartment — 1 Person' },
    price: 400,
    description: {
      fr: "Pour ceux qui recherchent intimité et indépendance dans un appartement à Tokyo.",
      en: "For those seeking privacy and independence in their own Tokyo apartment.",
    },
    included: {
      fr: [
        "Consultation détaillée et conseils sur le marché locatif",
        "Sélection de 5+ appartements correspondant à vos critères",
        "Organisation et accompagnement pour les visites",
        "Négociation du loyer et des conditions de contrat",
        "Traduction et explication de tous les documents",
        "Accompagnement jusqu'à la remise des clés",
      ],
      en: [
        "Detailed consultation and Tokyo rental market advice",
        "Selection of 5+ apartments matching your criteria",
        "Organisation and support for viewings",
        "Contract review and bilingual support",
        "Translation and explanation of all documents",
        "Full support through to key handover",
      ],
    },
  },
  'appartement-2p': {
    title: { fr: 'Appartement — 2 Personnes', en: 'Apartment — 2 People' },
    price: 500,
    description: {
      fr: "Pour deux personnes cherchant un appartement indépendant à Tokyo.",
      en: "For two people looking for their own apartment in Tokyo.",
    },
    included: {
      fr: [
        "Consultation détaillée et conseils sur le marché locatif",
        "Sélection de 5+ appartements adaptés à 2 personnes",
        "Organisation et accompagnement pour les visites",
        "Négociation du loyer et des conditions de contrat",
        "Traduction et explication de tous les documents",
        "Accompagnement jusqu'à la remise des clés",
      ],
      en: [
        "Detailed consultation and Tokyo rental market advice",
        "Selection of 5+ apartments suitable for 2 people",
        "Organisation and support for viewings",
        "Contract review and bilingual support",
        "Translation and explanation of all documents",
        "Full support through to key handover",
      ],
    },
  },
  'maison-famille': {
    title: { fr: 'Recherche de Maison Familiale', en: 'Family Home Search' },
    price: 800,
    description: {
      fr: "Pour les familles expatriées cherchant une maison à Tokyo, proches des écoles internationales.",
      en: "For expat families looking for a family home in Tokyo, close to international schools.",
    },
    included: {
      fr: [
        "Consultation détaillée sur le marché locatif familial à Tokyo",
        "Sélection de 5+ maisons correspondant à vos critères",
        "Organisation et accompagnement pour les visites",
        "Négociation du loyer et des conditions de contrat",
        "Traduction et explication de tous les documents",
        "Coordination avec les écoles internationales si besoin",
        "Accompagnement jusqu'à la remise des clés",
      ],
      en: [
        "Detailed consultation on the Tokyo family rental market",
        "Selection of 5+ homes matching your criteria",
        "Organisation and support for viewings",
        "Contract review and bilingual support",
        "Translation and explanation of all documents",
        "Coordination with international schools if needed",
        "Full support through to key handover",
      ],
    },
  },
  'appartement-meuble-1p': {
    title: { fr: 'Appartement Meublé — 1 Personne', en: 'Furnished Apartment — 1 Person' },
    price: 400,
    description: {
      fr: "Pour une installation rapide à Tokyo. Disponible sous 7 à 14 jours, sans garant requis.",
      en: "For a fast move-in to Tokyo. Available within 7 to 14 days, no guarantor required.",
    },
    included: {
      fr: [
        "Consultation détaillée sur les logements meublés disponibles",
        "Sélection de 5+ appartements meublés sans garant requis",
        "Organisation et accompagnement pour les visites",
        "Négociation du loyer et des conditions de contrat",
        "Traduction et explication de tous les documents",
        "Disponibilité immédiate sous 7 à 14 jours",
        "Accompagnement jusqu'à la remise des clés",
      ],
      en: [
        "Detailed consultation on available furnished properties",
        "Selection of 5+ furnished apartments, no guarantor required",
        "Organisation and support for viewings",
        "Contract review and bilingual support",
        "Translation and explanation of all documents",
        "Immediate availability within 7 to 14 days",
        "Full support through to key handover",
      ],
    },
  },
}

const STEPS = {
  fr: ['Premier contact', 'Validation', 'Paiement', 'Recherche', 'Remise des clés'],
  en: ['First contact', 'Validation', 'Payment', 'Search', 'Key handover'],
}

const FAQ = {
  fr: [
    {
      q: "Y aura-t-il des frais supplémentaires ?",
      a: "Non. Le montant indiqué est le seul honoraire. Aucun frais supplémentaire ne sera demandé.",
    },
    {
      q: "Quand commence la recherche ?",
      a: "Dès réception du paiement. Vous recevrez une confirmation dans les 24 heures.",
    },
    {
      q: "Les honoraires sont-ils remboursables ?",
      a: "Si aucune proposition de logement n'a été transmise pendant la durée de la mission, un remboursement intégral est possible. Si vous trouvez un logement par vous-même ou décidez d'arrêter la mission, les honoraires ne sont pas remboursables.",
    },
    {
      q: "Combien de temps dure la mission ?",
      a: "La plupart des missions se concluent en 7 à 21 jours. Tout dépend de vos critères et de la disponibilité des biens.",
    },
  ],
  en: [
    {
      q: "Will there be any additional fees?",
      a: "No. The amount shown is the only fee. No additional charges will be requested.",
    },
    {
      q: "When does the search begin?",
      a: "As soon as payment is received. You will receive a confirmation within 24 hours.",
    },
    {
      q: "Are fees refundable?",
      a: "If no property proposal has been sent during the mission period, a full refund is possible. If you find accommodation yourself or decide to stop the mission, fees are non-refundable.",
    },
    {
      q: "How long does the mission take?",
      a: "Most missions are completed within 7 to 21 days. It depends on your criteria and property availability.",
    },
  ],
}

export default async function DevisPage({
  params,
  searchParams,
}: {
  params: Promise<{ offer: string }>
  searchParams: Promise<{ name?: string; locale?: string; stripe?: string }>
}) {
  const { offer } = await params
  const { name, locale = 'fr', stripe } = await searchParams

  const offerData = OFFERS[offer]
  if (!offerData) notFound()

  const lang = (locale === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  const clientName = name ?? (lang === 'fr' ? 'vous' : 'you')
  const steps = STEPS[lang]
  const faq = FAQ[lang]

  const labels = {
    fr: {
      quote: 'Votre devis',
      proposed: 'Proposition pour',
      valid: 'Valable 30 jours',
      included: 'Ce qui est inclus',
      price_label: 'Total TTC',
      pay_btn: 'Payer par carte',
      pay_sub: 'Paiement sécurisé par Stripe',
      contact_title: 'Votre chasseur immobilier',
      contact_sub: 'Disponible pour toute question',
      faq_title: 'Questions fréquentes',
      starts: 'La recherche commence dès réception du paiement.',
      google: '4.8/5 sur Google',
      bilingual: 'Service FR / EN / JP',
      no_extra: 'Aucun frais supplémentaire',
    },
    en: {
      quote: 'Your quote',
      proposed: 'Proposal for',
      valid: 'Valid for 30 days',
      included: "What's included",
      price_label: 'Total',
      pay_btn: 'Pay by card',
      pay_sub: 'Secure payment via Stripe',
      contact_title: 'Your property hunter',
      contact_sub: 'Available for any questions',
      faq_title: 'Frequently asked questions',
      starts: 'The search begins as soon as payment is received.',
      google: '4.8/5 on Google',
      bilingual: 'FR / EN / JP service',
      no_extra: 'No additional fees',
    },
  }

  const t = labels[lang]

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div className="bg-[#0f2744] py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <span className="text-white font-bold text-xl">Tokyo<span className="text-[#e84141]">Expat</span></span>
          </Link>
          <span className="text-white/50 text-sm">{t.quote}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-0 overflow-x-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-0 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i < 2 ? 'bg-green-500 text-white' :
                    i === 2 ? 'bg-[#e84141] text-white' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {i < 2 ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${
                    i < 2 ? 'text-green-600' :
                    i === 2 ? 'text-[#e84141]' :
                    'text-gray-400'
                  }`}>{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-6 h-px bg-gray-200 mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: offer details */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Title card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-400 mb-1">{t.proposed} <strong className="text-[#0f2744]">{clientName}</strong></p>
            <h1 className="text-2xl font-extrabold text-[#0f2744] mb-2">{offerData.title[lang]}</h1>
            <p className="text-gray-500 text-sm">{offerData.description[lang]}</p>
          </div>

          {/* Included */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-[#0f2744] text-lg mb-5">{t.included}</h2>
            <ul className="flex flex-col gap-3">
              {offerData.included[lang].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-[#0f2744] text-lg mb-5">{t.faq_title}</h2>
            <div className="flex flex-col gap-5">
              {faq.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-[#e84141] mb-1">{item.q}</p>
                  <p className="text-sm text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: price + payment */}
        <div className="flex flex-col gap-4 sticky top-6 self-start">

          {/* Price card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{t.price_label}</p>
            <p className="text-4xl font-extrabold text-[#0f2744] mb-1">{offerData.price}€</p>
            <p className="text-xs text-gray-400 mb-6">{t.starts}</p>

            {stripe ? (
              <a
                href={stripe}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#e84141] hover:bg-[#ff6b6b] text-white px-6 py-3 rounded-xl font-bold transition-colors mb-2"
              >
                {t.pay_btn} →
              </a>
            ) : (
              <div className="block w-full text-center bg-gray-200 text-gray-400 px-6 py-3 rounded-xl font-bold mb-2 cursor-not-allowed">
                {t.pay_btn} →
              </div>
            )}
            <p className="text-xs text-center text-gray-400">{t.pay_sub}</p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-col gap-2 border-t border-gray-100 pt-5">
              {[t.google, t.bilingual, t.no_extra].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <div className="bg-[#0f2744] rounded-2xl p-6">
            <p className="text-white/60 text-xs mb-1">{t.contact_title}</p>
            <p className="text-white font-bold mb-1">Alessandro P.</p>
            <p className="text-white/60 text-xs mb-3">Tokyo Expat</p>
            <a href="https://wa.me/817041715285" className="block text-center bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors mb-2">
              WhatsApp
            </a>
            <a href="mailto:contact@tokyo-expat.com" className="block text-center text-white/60 text-xs hover:text-white transition-colors">
              contact@tokyo-expat.com
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
