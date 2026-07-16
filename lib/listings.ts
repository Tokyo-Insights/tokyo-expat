// listings.ts — Vitrine réseau Tokyo Expat
// Données publiques uniquement : types, zones, fourchettes de prix.
// Aucun listing spécifique, aucun nom d'agence.

export type PropertyType = 'share-house' | 'appartement' | 'maison'

export interface ZoneData {
  ward: string
  nameEn: string
  types: PropertyType[]
  priceRange: { min: number; max: number }
  highlights: string[]
  highlightsEn: string[]
}

export interface TypeInfo {
  id: PropertyType
  nameFr: string
  nameEn: string
  icon: string
  descFr: string
  descEn: string
  priceRange: { min: number; max: number }
  features: string[]
  featuresEn: string[]
  minStayFr: string
  minStayEn: string
}

export const PROPERTY_TYPES: TypeInfo[] = [
  {
    id: 'share-house',
    nameFr: 'Share House',
    nameEn: 'Share House',
    icon: '🏘',
    descFr: "Idéal pour s'intégrer rapidement. Charges incluses, communauté internationale, sans garant. Disponible immédiatement dans la majorité des cas.",
    descEn: 'Ideal for quick integration. Bills included, international community, no guarantor required. Available immediately in most cases.',
    priceRange: { min: 35000, max: 90000 },
    features: ['Sans garant', 'Charges incluses', 'Wi-Fi inclus', 'Cuisine équipée', 'Lave-linge', 'Durée min. 1 mois'],
    featuresEn: ['No guarantor', 'Bills included', 'Wi-Fi included', 'Equipped kitchen', 'Washing machine', 'Min. 1 month'],
    minStayFr: 'À partir de 1 mois',
    minStayEn: 'From 1 month',
  },
  {
    id: 'appartement',
    nameFr: 'Appartement meublé',
    nameEn: 'Furnished Apartment',
    icon: '🏢',
    descFr: "Studio à 2LDK entièrement meublés. La formule la plus demandée par les expatriés. Sans garant possible. Je vous oriente vers les meilleures options et vous accompagne jusqu'à la signature.",
    descEn: 'Studio to 2LDK fully furnished. Most requested by expats. No guarantor possible. I point you to the best options and support you through to signing.',
    priceRange: { min: 80000, max: 200000 },
    features: ['Sans garant (selon profil)', 'Meublé complet', 'Internet inclus (selon)', 'Durée min. 1 mois', 'Accompagnement signature'],
    featuresEn: ['No guarantor (profile dependent)', 'Fully furnished', 'Internet included (varies)', 'Min. 1 month', 'Support at signing'],
    minStayFr: 'À partir de 1 mois',
    minStayEn: 'From 1 month',
  },
  {
    id: 'maison',
    nameFr: 'Maison / Famille',
    nameEn: 'House / Family',
    icon: '🏡',
    descFr: "Pour les familles et les groupes. 3-4 chambres, jardin, parking. Quartiers résidentiels proches des écoles internationales, dont le Lycée Français International de Tokyo (à Kita-ku).",
    descEn: 'For families and groups. 3-4 bedrooms, garden, parking. Residential areas near international schools, including the Lycee Francais International de Tokyo (in Kita-ku).',
    priceRange: { min: 200000, max: 450000 },
    features: ['3-4 chambres', 'Jardin (selon)', 'Parking (selon)', 'Proche écoles internationales', 'Durée min. 6 mois'],
    featuresEn: ['3-4 bedrooms', 'Garden (varies)', 'Parking (varies)', 'Near international schools', 'Min. 6 months'],
    minStayFr: 'À partir de 6 mois',
    minStayEn: 'From 6 months',
  },
]

// Zones couvertes par le réseau
export const ZONES: ZoneData[] = [
  {
    ward: 'Shinjuku-ku',
    nameEn: 'Shinjuku',
    types: ['share-house', 'appartement'],
    priceRange: { min: 50000, max: 185000 },
    highlights: ['Hyper-central', 'Toutes lignes', 'Très demandé'],
    highlightsEn: ['Hyper-central', 'All train lines', 'High demand'],
  },
  {
    ward: 'Shibuya-ku',
    nameEn: 'Shibuya',
    types: ['share-house', 'appartement'],
    priceRange: { min: 60000, max: 220000 },
    highlights: ['Premium', 'Daikanyama / Ebisu', 'Jeune cadre'],
    highlightsEn: ['Premium', 'Daikanyama / Ebisu', 'Young professional'],
  },
  {
    ward: 'Meguro-ku',
    nameEn: 'Meguro',
    types: ['share-house', 'appartement'],
    priceRange: { min: 55000, max: 200000 },
    highlights: ['Nakameguro', 'Canal & cafés', 'Très prisé'],
    highlightsEn: ['Nakameguro', 'Canal & cafes', 'Highly sought-after'],
  },
  {
    ward: 'Minato-ku',
    nameEn: 'Minato',
    types: ['appartement'],
    priceRange: { min: 120000, max: 280000 },
    highlights: ['Roppongi / Azabu', 'Quartier ambassades', 'Corporate'],
    highlightsEn: ['Roppongi / Azabu', 'Embassy district', 'Corporate expats'],
  },
  {
    ward: 'Bunkyo-ku',
    nameEn: 'Bunkyo',
    types: ['share-house', 'appartement'],
    priceRange: { min: 55000, max: 160000 },
    highlights: ['Universités', 'Calme', 'Bon rapport qualité-prix'],
    highlightsEn: ['Universities', 'Quiet', 'Great value'],
  },
  {
    ward: 'Shinagawa-ku',
    nameEn: 'Shinagawa',
    types: ['share-house', 'appartement'],
    priceRange: { min: 50000, max: 150000 },
    highlights: ['Shinkansen direct', 'Professionnel', 'Accès facile'],
    highlightsEn: ['Shinkansen direct', 'Business area', 'Easy access'],
  },
  {
    ward: 'Chiyoda-ku',
    nameEn: 'Chiyoda',
    types: ['appartement'],
    priceRange: { min: 100000, max: 200000 },
    highlights: ['Cœur de Tokyo', 'Marunouchi', 'Multi-lignes'],
    highlightsEn: ['Heart of Tokyo', 'Marunouchi', 'Multiple lines'],
  },
  {
    ward: 'Sumida-ku',
    nameEn: 'Sumida',
    types: ['appartement'],
    priceRange: { min: 75000, max: 140000 },
    highlights: ['Tokyo Skytree', 'En développement', 'Bon rapport prix'],
    highlightsEn: ['Tokyo Skytree', 'Up-and-coming', 'Affordable'],
  },
  {
    ward: 'Setagaya-ku',
    nameEn: 'Setagaya',
    types: ['appartement', 'maison'],
    priceRange: { min: 90000, max: 350000 },
    highlights: ['Sangenjaya', 'Résidentiel', 'Familles'],
    highlightsEn: ['Sangenjaya', 'Residential', 'Family-friendly'],
  },
  {
    ward: 'Nerima-ku',
    nameEn: 'Nerima',
    types: ['appartement', 'maison'],
    priceRange: { min: 80000, max: 280000 },
    highlights: ['Familial', 'Calme', 'Grand espace'],
    highlightsEn: ['Family-friendly', 'Quiet', 'Spacious'],
  },
  {
    ward: 'Suginami-ku',
    nameEn: 'Suginami',
    types: ['share-house', 'appartement'],
    priceRange: { min: 48000, max: 140000 },
    highlights: ['Koenji', 'Asagaya', 'Abordable'],
    highlightsEn: ['Koenji', 'Asagaya', 'Affordable'],
  },
  {
    ward: 'Kita-ku',
    nameEn: 'Kita',
    types: ['appartement', 'maison'],
    priceRange: { min: 70000, max: 260000 },
    highlights: ['Lycée Français International', 'Résidentiel', 'Abordable'],
    highlightsEn: ['French International School', 'Residential', 'Affordable'],
  },
  {
    ward: 'Musashino-shi',
    nameEn: 'Musashino',
    types: ['maison'],
    priceRange: { min: 200000, max: 400000 },
    highlights: ['Kichijoji', 'Parc Inokashira', 'Quartier rêvé'],
    highlightsEn: ['Kichijoji', 'Inokashira Park', 'Dream neighborhood'],
  },
]

export const STATS = {
  totalProperties: '300+',
  wards: ZONES.length,
  shareHouseMin: 35000,
  aptMin: 80000,
  houseMin: 200000,
  responseTime: '24h',
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 })
    .format(price)
}
