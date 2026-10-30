import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Votre devis · Your quote · Tokyo Expat',
  robots: { index: false, follow: false },
}

type Bilingual<T> = { fr: T; en: T }

type OfferData = {
  title: Bilingual<string>
  price: number
  // Par defaut EUR. Le Diagnostic (offre v3 du 28/10/2026) est le seul en yen.
  currency?: 'EUR' | 'JPY'
  // Lien de paiement permanent de l'offre ; un ?stripe= passe dans l'URL reste prioritaire.
  payUrl?: string
  description: Bilingual<string>
  included: Bilingual<string[]>
  steps?: Bilingual<string[]>
  faq?: Bilingual<{ q: string; a: string }[]>
  badges?: Bilingual<string[]>
}

function formatPrice(price: number, currency: 'EUR' | 'JPY', lang: 'fr' | 'en') {
  if (currency === 'JPY') {
    return lang === 'fr'
      ? `${price.toLocaleString('fr-FR').replace(/\s/g, ' ')} ¥`
      : `¥${price.toLocaleString('en-US')}`
  }
  return `${price}€`
}

const OFFERS: Record<string, OfferData> = {
  // Offre v3 (strategie/offre_particuliers_v3_2026_10.md) : livrable ecrit, sans appel,
  // aucun volet qui peut creer un litige (caution, restitution, negociation).
  diagnostic: {
    title: { fr: 'Diagnostic logement', en: 'Housing Check' },
    price: 15000,
    currency: 'JPY',
    // Lien Wise reutilisable cree par Alessandro le 30/10/2026 (15 000 JPY, « Diagnostic logement Tokyo »).
    payUrl: 'https://wise.com/pay/r/ui8YPn2qRR_yN-U',
    description: {
      fr: "En 48 heures et par écrit, je vous dis quels logements de Tokyo acceptent vraiment votre situation (visa, durée, sans garant) et ce que chacun vous coûtera au total sur tout votre séjour, avant que vous signiez quoi que ce soit.",
      en: "Within 48 hours, in writing: which Tokyo homes will actually accept your situation (visa, length of stay, no guarantor), and what each one will really cost you over your whole stay, before you sign anything.",
    },
    included: {
      fr: [
        "Ce qui vous est ouvert et ce qui vous est fermé (share house, meublé au mois, bail classique avec société de garantie), et pourquoi",
        "3 à 5 logements réels disponibles à vos dates, avec pour chacun le coût total sur la durée du séjour (entrée, mois, sortie anticipée)",
        "Pour chacun, les clauses du contrat à vérifier avant de signer",
        "Votre calendrier : préavis du logement actuel, période où partent les bons logements",
        "Entièrement par écrit, sous 48 heures, sans appel nécessaire",
      ],
      en: [
        "What is open to you and what is closed (share house, monthly furnished, standard lease with a guarantor company), and why",
        "3 to 5 real homes available on your dates, each with its total cost over your stay (move-in, monthly, early exit)",
        "For each one, the contract points to check before signing",
        "Your timeline: notice on your current home, and when the good homes go",
        "Entirely in writing, within 48 hours, no call needed",
      ],
    },
    steps: {
      fr: ['Votre demande', 'Votre offre', 'Paiement', 'Rapport sous 48 h'],
      en: ['Your request', 'Your offer', 'Payment', 'Report within 48 h'],
    },
    faq: {
      fr: [
        {
          q: "Y aura-t-il des frais supplémentaires ?",
          a: "Non : 15 000 ¥ est le seul montant. Si vous me confiez ensuite l'accompagnement jusqu'à la remise des clés, ces 15 000 ¥ sont déduits du forfait. Les frais du logement lui-même (dépôt, premier loyer, frais d'agence, société de garantie) se règlent au propriétaire ou à l'agence et ne passent jamais par moi ; le rapport les chiffre pour chaque logement.",
        },
        {
          q: "Que se passe-t-il après le paiement ?",
          a: "Répondez simplement à mon email avec votre gare de travail ou d'études et vos dates. Le rapport écrit vous parvient sous 48 heures.",
        },
        {
          q: "Est-ce remboursable ?",
          a: "Oui, intégralement, si le rapport n'arrive pas sous 48 heures, ou si aucun logement n'accepte votre situation dans votre budget.",
        },
        {
          q: "Pourquoi payer alors que l'agence est gratuite ?",
          a: "L'agence n'est gratuite qu'en apparence : elle est payée à la signature, en général un mois de loyer, et seulement si vous signez chez elle. Le Diagnostic est payé par vous seul, et il compare aussi les logements où il n'y a aucun frais d'agence.",
        },
      ],
      en: [
        {
          q: "Will there be any additional fees?",
          a: "No: 15,000 yen is the only amount. If you then ask me to handle everything up to the keys, the 15,000 yen is deducted from that fee. The property's own costs (deposit, first rent, agency fee, guarantor company) are paid to the landlord or the agency and never pass through me; the report prices them for each home.",
        },
        {
          q: "What happens after payment?",
          a: "Just reply to my email with your work or study station and your dates. The written report reaches you within 48 hours.",
        },
        {
          q: "Is it refundable?",
          a: "Yes, in full, if the report does not reach you within 48 hours, or if no home accepts your situation within your budget.",
        },
        {
          q: "Why pay when the agency is free?",
          a: "The agency only looks free: it is paid when you sign, usually one month's rent, and only if you sign through it. The Housing Check is paid by you alone, and it also compares homes with no agency fee at all.",
        },
      ],
    },
    badges: {
      fr: ['Remboursé si le rapport arrive en retard', 'Service FR / EN / JP', 'Déduit du forfait si vous continuez'],
      en: ['Refunded if the report is late', 'FR / EN / JP service', 'Deducted if you continue with me'],
    },
  },
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
        "Accompagnement et conseil pendant la négociation du loyer et du contrat",
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
        "Accompagnement et conseil pendant la négociation du loyer et du contrat",
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
        "Accompagnement et conseil pendant la négociation du loyer et du contrat",
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
        "Accompagnement et conseil pendant la négociation du loyer et du contrat",
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
        "Accompagnement et conseil pendant la négociation du loyer et du contrat",
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
        "Accompagnement et conseil pendant la négociation du loyer et du contrat",
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
      a: "Aucun de ma part : le montant indiqué est mon seul honoraire, et je ne vous demanderai jamais rien d'autre. C'est à distinguer des frais du logement lui-même, que vous réglez au propriétaire ou à l'agence : dépôt de garantie, argent-clé le cas échéant, premier mois de loyer, frais d'agence et société de garantie. Ces sommes ne passent jamais par moi. Chaque bien de votre sélection vous est présenté avec le détail chiffré de ces coûts d'entrée, pour que vous sachiez ce que vous engagez avant de vous décider, et non à la signature.",
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
      a: "Cela dépend du type de logement. Pour un meublé, une share house ou une formule mensuelle, votre première sélection vous parvient sous 48 heures après le paiement. Pour une location classique non meublée (bail de 2 ans), comptez environ une semaine : il faut contacter les agences japonaises une par une et confirmer que le propriétaire accepte un locataire étranger, ce qui ne se fait pas en 48 heures. La mission complète, jusqu'à la remise des clés, se conclut le plus souvent en 7 à 21 jours.",
    },
  ],
  en: [
    {
      q: "Will there be any additional fees?",
      a: "None from me: the amount shown is my only fee, and I will never ask you for anything else. That is separate from the property's own move-in costs, which you pay to the landlord or the agency: deposit, key money where it applies, first month's rent, agency fee and guarantor company fee. That money never passes through me. Every property in your shortlist comes with a full breakdown of those entry costs, so you know what you are committing to before you decide, not at signing.",
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
      a: "It depends on the type of housing. For a furnished apartment, a share house or a monthly plan, your first shortlist reaches you within 48 hours of payment. For a standard unfurnished rental on a 2-year lease, expect about a week: Japanese agencies have to be contacted one by one and the landlord's willingness to accept a foreign tenant confirmed, which cannot be done in 48 hours. The full mission, through to the keys, is most often completed within 7 to 21 days.",
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
  const steps = (offerData.steps ?? STEPS)[lang]
  const faq = (offerData.faq ?? FAQ)[lang]
  const payUrl = stripe ?? offerData.payUrl
  const isDiagnostic = offer === 'diagnostic'

  const labels = {
    fr: {
      quote: 'Votre devis',
      proposed: 'Proposition pour',
      valid: 'Valable 30 jours',
      included: 'Ce qui est inclus',
      price_label: 'Total',
      pay_btn: 'Payer en ligne',
      pay_sub: 'Paiement sécurisé',
      contact_title: 'Votre conseiller logement',
      contact_sub: 'Disponible pour toute question',
      faq_title: 'Questions fréquentes',
      starts: 'La recherche commence dès réception du paiement.',
      // Le badge "4.8/5 sur Google" a ete retire le 11/09/2026: aucune fiche Google
      // n'existe, donc aucune note. Une note d'avis inventee sur la page de paiement
      // est verifiable en un clic et se retourne contre nous. Remplace par la garantie
      // de remboursement, qui est VRAIE et deja engagee plus bas dans la FAQ.
      google: 'Remboursé si aucune proposition',
      bilingual: 'Service FR / EN / JP',
      no_extra: 'Aucun honoraire en plus du montant affiché',
    },
    en: {
      quote: 'Your quote',
      proposed: 'Proposal for',
      valid: 'Valid for 30 days',
      included: "What's included",
      price_label: 'Total',
      pay_btn: 'Pay securely',
      pay_sub: 'Secure payment',
      contact_title: 'Your housing advisor',
      contact_sub: 'Available for any questions',
      faq_title: 'Frequently asked questions',
      starts: 'The search begins as soon as payment is received.',
      google: 'Refunded if nothing is proposed',
      bilingual: 'FR / EN / JP service',
      no_extra: 'No fee beyond the amount shown',
    },
  }

  const t = labels[lang]
  const priceText = formatPrice(offerData.price, offerData.currency ?? 'EUR', lang)
  // Un seul bouton, rendu deux fois : sous le titre sur mobile (sinon il tombe apres toute la FAQ),
  // dans la colonne de droite sur ordinateur.
  const payButton = payUrl ? (
    <a
      href={payUrl}
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
  )
  const badges = offerData.badges?.[lang] ?? [t.google, t.bilingual, t.no_extra]
  // Le Diagnostic ne lance pas une recherche mais un rapport ecrit.
  const starts = isDiagnostic
    ? (lang === 'fr' ? 'Le rapport écrit vous parvient sous 48 heures après le paiement.' : 'The written report reaches you within 48 hours of payment.')
    : t.starts

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

          {/* Prix + paiement, mobile seulement */}
          <div className="lg:hidden bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{t.price_label}</p>
            <p className="text-3xl font-extrabold text-[#0f2744] mb-4">{priceText}</p>
            {payButton}
            <p className="text-xs text-center text-gray-400">{starts}</p>
          </div>

          {/* Included */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-[#0f2744] text-lg mb-5">{t.included}</h2>
            <ul className="flex flex-col gap-3">
              {offerData.included[lang].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden="true" className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
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
            <p className="text-4xl font-extrabold text-[#0f2744] mb-1">{priceText}</p>
            <p className="text-xs text-gray-400 mb-6">{starts}</p>

            {payButton}
            <p className="text-xs text-center text-gray-400">{t.pay_sub}</p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-col gap-2 border-t border-gray-100 pt-5">
              {badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500" aria-hidden="true">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <div className="bg-[#0f2744] rounded-2xl p-6">
            <p className="text-white/60 text-xs mb-1">{t.contact_title}</p>
            <p className="text-white font-bold mb-1">Alessandro</p>
            <p className="text-white/60 text-xs mb-3">Tokyo Expat</p>
            <a href="mailto:contact@tokyo-expat.com" className="block text-center bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors">
              contact@tokyo-expat.com
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
