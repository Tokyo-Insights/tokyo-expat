// listings.ts — Inventaire logements Tokyo Expat
// Alessandro met à jour manuellement ce fichier avec ses logements disponibles.
// C'est le fossé concurrentiel : 300+ logements réels = impossible à copier.

export type ListingType = 'share-house' | 'appartement' | 'maison'
export type Availability = 'disponible' | 'bientot' | 'reserve'

export interface Listing {
  id: string
  type: ListingType
  ward: string          // Arrondissement (ex: Shinjuku-ku)
  neighborhood: string  // Quartier précis (ex: Kabukicho)
  station: string       // Station + temps à pied (ex: Shinjuku 8min)
  price: number         // JPY/mois
  rooms: string         // ex: "1K", "1LDK", "Chambre individuelle"
  size?: number         // m²
  furnished: boolean
  features: string[]    // ["No guarantor required", "Bills included", "Pets OK"]
  availability: Availability
  availableFrom?: string // ex: "2026-07-01"
  minStay?: string      // ex: "1 mois", "3 mois"
  descFr: string
  descEn: string
}

export const listings: Listing[] = [
  // ── SHARE HOUSES ──────────────────────────────────────────────────────────
  {
    id: "sh-shinjuku-01",
    type: "share-house",
    ward: "Shinjuku-ku",
    neighborhood: "Takadanobaba",
    station: "Takadanobaba 3min",
    price: 52000,
    rooms: "Chambre individuelle",
    size: 9,
    furnished: true,
    features: ["Sans garant", "Charges incluses", "Wi-Fi inclus", "Cuisine équipée partagée", "Francophone bienvenu"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Share house moderne à 3 minutes de Takadanobaba. Idéal pour étudiants et jeunes professionnels. Communauté internationale.",
    descEn: "Modern share house 3 minutes from Takadanobaba station. Ideal for students and young professionals. International community.",
  },
  {
    id: "sh-nakameguro-01",
    type: "share-house",
    ward: "Meguro-ku",
    neighborhood: "Nakameguro",
    station: "Nakameguro 5min",
    price: 72000,
    rooms: "Chambre individuelle",
    size: 12,
    furnished: true,
    features: ["Sans garant", "Charges incluses", "Proche canal", "Quartier tendance", "Design intérieur soigné"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Share house design à Nakameguro, l'un des quartiers les plus prisés de Tokyo. À 5 minutes du canal célèbre.",
    descEn: "Designer share house in Nakameguro, one of Tokyo's trendiest neighborhoods. 5 minutes from the famous canal.",
  },
  {
    id: "sh-shinagawa-01",
    type: "share-house",
    ward: "Shinagawa-ku",
    neighborhood: "Gotanda",
    station: "Gotanda 6min",
    price: 58000,
    rooms: "Chambre individuelle",
    size: 10,
    furnished: true,
    features: ["Sans garant", "Charges incluses", "Wi-Fi 1Gbps", "Lave-linge gratuit", "Parking vélo"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Share house bien équipé à Gotanda. Ligne Yamanote pour accès rapide partout à Tokyo.",
    descEn: "Well-equipped share house in Gotanda. Yamanote Line for quick access anywhere in Tokyo.",
  },
  {
    id: "sh-bunkyo-01",
    type: "share-house",
    ward: "Bunkyo-ku",
    neighborhood: "Korakuen",
    station: "Korakuen 4min",
    price: 62000,
    rooms: "Chambre individuelle",
    size: 11,
    furnished: true,
    features: ["Sans garant", "Charges incluses", "Proche universités", "Calme", "Coworking space"],
    availability: "bientot",
    availableFrom: "2026-07-15",
    minStay: "2 mois",
    descFr: "Idéal pour étudiants. À 4 minutes de Korakuen, proche des universités de Bunkyo. Espace coworking dans l'immeuble.",
    descEn: "Ideal for students. 4 minutes from Korakuen, near Bunkyo universities. Coworking space in the building.",
  },
  {
    id: "sh-koenji-01",
    type: "share-house",
    ward: "Suginami-ku",
    neighborhood: "Koenji",
    station: "Koenji 8min",
    price: 49000,
    rooms: "Chambre individuelle",
    size: 8,
    furnished: true,
    features: ["Sans garant", "Charges incluses", "Ambiance artistique", "Marché local", "Communauté créative"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Share house dans le quartier bohème de Koenji. Parfait pour les artistes et créatifs. Animations locales constantes.",
    descEn: "Share house in Koenji's bohemian neighborhood. Perfect for artists and creatives. Constant local events.",
  },

  // ── APPARTEMENTS MEUBLÉS ──────────────────────────────────────────────────
  {
    id: "apt-shinjuku-01",
    type: "appartement",
    ward: "Shinjuku-ku",
    neighborhood: "Shinjuku",
    station: "Shinjuku 10min",
    price: 135000,
    rooms: "1LDK",
    size: 35,
    furnished: true,
    features: ["Sans garant", "Meublé complet", "Vue ville", "Étage élevé", "Immeuble récent 2022"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Appartement 1LDK meublé avec vue sur Shinjuku. Immeuble neuf 2022. Idéal pour couple ou professionnel.",
    descEn: "Furnished 1LDK apartment with Shinjuku skyline view. New 2022 building. Ideal for a couple or professional.",
  },
  {
    id: "apt-minato-01",
    type: "appartement",
    ward: "Minato-ku",
    neighborhood: "Hiroo",
    station: "Hiroo 3min",
    price: 185000,
    rooms: "1LDK",
    size: 42,
    furnished: true,
    features: ["Sans garant", "Meublé haut de gamme", "Quartier ambassades", "Sécurité 24h", "Parking disponible"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Appartement premium à Hiroo, quartier ambassades. Meublé haut de gamme. Idéal pour expatriés corporate.",
    descEn: "Premium apartment in Hiroo, embassy district. High-end furnished. Ideal for corporate expats.",
  },
  {
    id: "apt-meguro-01",
    type: "appartement",
    ward: "Meguro-ku",
    neighborhood: "Meguro",
    station: "Meguro 7min",
    price: 118000,
    rooms: "1K",
    size: 28,
    furnished: true,
    features: ["Sans garant", "Meublé complet", "Internet inclus", "Lave-linge", "Climatisation"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Studio moderne à Meguro. Tout équipé, prêt à vivre. Accès direct Yamanote et Namboku.",
    descEn: "Modern studio in Meguro. Fully equipped, move-in ready. Direct Yamanote and Namboku access.",
  },
  {
    id: "apt-shibuya-01",
    type: "appartement",
    ward: "Shibuya-ku",
    neighborhood: "Daikanyama",
    station: "Daikanyama 5min",
    price: 168000,
    rooms: "1LDK",
    size: 38,
    furnished: true,
    features: ["Sans garant", "Meublé design", "Quartier premium", "Calme", "Terrasse"],
    availability: "bientot",
    availableFrom: "2026-08-01",
    minStay: "3 mois",
    descFr: "1LDK design avec terrasse à Daikanyama. L'un des quartiers les plus charmants de Tokyo. Disponible août 2026.",
    descEn: "Design 1LDK with terrace in Daikanyama. One of Tokyo's most charming neighborhoods. Available August 2026.",
  },
  {
    id: "apt-sumida-01",
    type: "appartement",
    ward: "Sumida-ku",
    neighborhood: "Kinshicho",
    station: "Kinshicho 6min",
    price: 89000,
    rooms: "1K",
    size: 25,
    furnished: true,
    features: ["Sans garant", "Meublé complet", "Vue Tokyo Skytree", "Prix abordable", "Accès rapide centre"],
    availability: "disponible",
    minStay: "1 mois",
    descFr: "Studio économique avec vue sur le Tokyo Skytree. Zone en plein développement, bon rapport qualité-prix.",
    descEn: "Affordable studio with Tokyo Skytree view. Area in full development, excellent value for money.",
  },
  {
    id: "apt-chiyoda-01",
    type: "appartement",
    ward: "Chiyoda-ku",
    neighborhood: "Akihabara",
    station: "Akihabara 4min",
    price: 142000,
    rooms: "1LDK",
    size: 32,
    furnished: true,
    features: ["Sans garant", "Meublé complet", "Centre de Tokyo", "Plusieurs lignes", "Sécurité"],
    availability: "reserve",
    minStay: "1 mois",
    descFr: "1LDK au cœur de Tokyo, à 4 minutes d'Akihabara. Accès exceptionnel : JR, Metro, Tsukuba Express.",
    descEn: "1LDK in the heart of Tokyo, 4 minutes from Akihabara. Exceptional access: JR, Metro, Tsukuba Express.",
  },
  {
    id: "apt-nerima-01",
    type: "appartement",
    ward: "Nerima-ku",
    neighborhood: "Oizumigakuen",
    station: "Oizumigakuen 8min",
    price: 95000,
    rooms: "2LDK",
    size: 52,
    furnished: true,
    features: ["Sans garant", "Meublé", "Grand espace", "Quartier calme", "Idéal famille"],
    availability: "disponible",
    minStay: "3 mois",
    descFr: "Grand 2LDK meublé idéal pour couple ou petite famille. Quartier résidentiel calme, ligne Seibu.",
    descEn: "Large furnished 2LDK ideal for couple or small family. Quiet residential area, Seibu line.",
  },

  // ── MAISONS / FAMILY ──────────────────────────────────────────────────────
  {
    id: "house-setagaya-01",
    type: "maison",
    ward: "Setagaya-ku",
    neighborhood: "Sangenjaya",
    station: "Sangenjaya 12min",
    price: 290000,
    rooms: "3LDK",
    size: 85,
    furnished: false,
    features: ["Maison individuelle", "Jardin", "2 salles de bain", "Parking", "École internationale proche"],
    availability: "disponible",
    minStay: "6 mois",
    descFr: "Belle maison 3LDK à Sangenjaya. Jardin, parking, proche école internationale. Idéal pour famille expatriée.",
    descEn: "Beautiful 3LDK house in Sangenjaya. Garden, parking, near international school. Ideal for expat family.",
  },
  {
    id: "house-nerima-01",
    type: "maison",
    ward: "Nerima-ku",
    neighborhood: "Hikarigaoka",
    station: "Hikarigaoka 15min",
    price: 235000,
    rooms: "4LDK",
    size: 110,
    furnished: false,
    features: ["Maison individuelle", "Grand jardin", "3 chambres", "Quartier familial", "École française proche"],
    availability: "bientot",
    availableFrom: "2026-09-01",
    minStay: "12 mois",
    descFr: "Grande maison familiale à Hikarigaoka. À 20 minutes de l'École Française Internationale du Japon (EFIJ).",
    descEn: "Large family house in Hikarigaoka. 20 minutes from the French International School of Japan (EFIJ).",
  },
  {
    id: "house-musashino-01",
    type: "maison",
    ward: "Musashino-shi",
    neighborhood: "Kichijoji",
    station: "Kichijoji 10min",
    price: 320000,
    rooms: "3LDK",
    size: 92,
    furnished: false,
    features: ["Maison individuelle", "Inogashira Park proche", "Quartier très prisé", "Calme", "Commerces"],
    availability: "disponible",
    minStay: "6 mois",
    descFr: "Maison 3LDK à Kichijoji, régulièrement élue quartier préféré des Tokyoïtes. À 2 min du parc Inogashira.",
    descEn: "3LDK house in Kichijoji, consistently voted Tokyo's favorite neighborhood. 2 min from Inogashira Park.",
  },
]

// ── HELPERS ───────────────────────────────────────────────────────────────────

export function getListings(filters?: {
  type?: ListingType
  maxPrice?: number
  availability?: Availability
  locale?: string
}): Listing[] {
  let result = listings

  if (filters?.type) {
    result = result.filter(l => l.type === filters.type)
  }
  if (filters?.maxPrice) {
    result = result.filter(l => l.price <= filters.maxPrice!)
  }
  if (filters?.availability) {
    result = result.filter(l => l.availability === filters.availability)
  }

  return result
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 })
    .format(price)
}

export const STATS = {
  total: listings.length,
  available: listings.filter(l => l.availability === 'disponible').length,
  shareHouses: listings.filter(l => l.type === 'share-house').length,
  apartments: listings.filter(l => l.type === 'appartement').length,
  houses: listings.filter(l => l.type === 'maison').length,
  minPrice: Math.min(...listings.map(l => l.price)),
  maxPrice: Math.max(...listings.map(l => l.price)),
}
