export interface FaqItem {
  question: string
  answer: string
}

// FAQ schema data — keyed by article slug
// Used by blog/[slug]/page.tsx to inject FAQPage JSON-LD + render visual accordion
export const faqData: Record<string, FaqItem[]> = {

  'gaijin-house-tokyo-guide': [
    {
      question: 'What is a gaijin house in Tokyo?',
      answer:
        'A gaijin house is a shared residence aimed at foreigners, offering a private furnished room with shared kitchen and bathroom. It requires no Japanese guarantor and no key money, and you can usually move in within days.',
    },
    {
      question: 'How much does a gaijin house cost per month?',
      answer:
        'Rooms typically run 40,000 to 80,000 JPY per month, with dorm beds from around 30,000 JPY and central private rooms up to 100,000 JPY. Utilities are often included, and there is a one-time admin fee of 10,000 to 30,000 JPY instead of key money.',
    },
    {
      question: 'Do you need a guarantor for a gaijin house?',
      answer:
        'No. Gaijin houses are designed for foreigners without a Japanese guarantor. You generally only need a passport, a valid visa, and proof of funds, and many operators accept bookings from abroad.',
    },
    {
      question: 'What is the difference between a gaijin house and a share house?',
      answer:
        'The two have largely merged. Both offer furnished private rooms with shared common areas and no guarantor. "Gaijin house" historically referred to foreigner-focused shared housing, while "share house" is the broader modern term used across Japan.',
    },
  ],

  // ============================================================
  // EN: Finding an apartment as a foreigner
  // ============================================================
  'find-apartment-tokyo-foreigner': [
    {
      question: 'Can foreigners rent an apartment in Tokyo without a Japanese guarantor?',
      answer:
        'Yes. Most modern apartments in Tokyo accept a guarantee company (hoshougaisha) instead of a personal guarantor. The annual fee is typically 0.5-1 month of rent. Many furnished apartments and share houses require no guarantor at all.',
    },
    {
      question: 'How long does it take to find an apartment in Tokyo as a foreigner?',
      answer:
        'Typically 2-6 weeks with documents ready. The process speeds up considerably when working with an English-speaking agent or a service specialising in foreign applicants.',
    },
    {
      question: 'What documents are needed to rent an apartment in Tokyo as a foreigner?',
      answer:
        'It depends on the rental type. For a short-term furnished apartment or monthly mansion (the most accessible route for newcomers): passport, valid visa or residence card, and a credit card or proof of funds are usually sufficient. For a standard 2-year unfurnished Japanese rental: residence card (zairyu card), proof of income (employment contract or recent payslips), and sometimes a Japanese bank account are required. A property hunter or relocation agent can guide you to the right type for your situation.',
    },
    {
      question: 'Do you need to speak Japanese to rent an apartment in Tokyo?',
      answer:
        'Not necessarily. Operators of furnished apartments and share houses targeting foreigners usually work in English. For a standard Japanese apartment, a bilingual agent or relocation consultant is strongly recommended to review the contract.',
    },
  ],

  // ============================================================
  // EN: Furnished apartment without guarantor
  // ============================================================
  'furnished-apartment-tokyo-no-guarantor': [
    {
      question: 'Which operators offer furnished apartments in Tokyo without a guarantor?',
      answer:
        'Several operators specialise in foreign tenants: Sakura House, Oak House, Borderless House, and various furnished-apartment services. Most require only a valid visa and proof of funds (employment contract, bank statement, or freelance income) — no Japanese guarantor or Japanese bank account needed.',
    },
    {
      question: 'How much does a furnished apartment in Tokyo cost per month?',
      answer:
        'Expect to pay 80,000-180,000 JPY/month for a furnished studio or 1LDK in central Tokyo. This usually includes furniture, appliances, and sometimes Wi-Fi or utilities.',
    },
    {
      question: 'What is typically included in a furnished apartment in Tokyo?',
      answer:
        'Standard inclusions are a bed, sofa, desk, refrigerator, washing machine, air conditioning, and basic kitchenware. Some operators include Wi-Fi and partial utilities — always verify the contract.',
    },
    {
      question: 'What is the minimum rental period for a furnished apartment in Tokyo?',
      answer:
        'Most furnished apartments require a minimum of 1-3 months. Monthly (manshon-style) contracts are more flexible than fixed-term leases but can cost 15-30% more per month.',
    },
  ],

  // ============================================================
  // EN: Rental contract checklist
  // ============================================================
  'tokyo-rental-contract-checklist': [
    {
      question: 'What are the main clauses to check in a Tokyo rental contract?',
      answer:
        'Key clauses to verify: restoration costs on move-out (genjo kaifuku), early termination penalties, subletting restrictions, pet and guest policies, and whether common-area rules are clearly defined.',
    },
    {
      question: 'What is "reikin" in a Japanese rental contract?',
      answer:
        'Reikin (礼金) is non-refundable "key money" or "gift money" paid to the landlord at signing — typically 1-2 months of rent. It is not universal and can sometimes be negotiated down or waived for foreign tenants.',
    },
    {
      question: 'How much is the security deposit (shikikin) in Tokyo?',
      answer:
        'The security deposit (shikikin) is typically 1-2 months of rent. A portion may be deducted on move-out for cleaning or repairs beyond normal wear-and-tear. The restoration clause in the contract determines exactly what is charged.',
    },
    {
      question: 'Can a Tokyo rental contract be terminated early?',
      answer:
        'Yes, usually with 1-2 months written notice and sometimes a penalty of 1 month\'s rent. Fixed-term leases (teiki chintai) carry stricter conditions — early termination can be costly. Read this clause before signing.',
    },
  ],

  // ============================================================
  // EN: Guarantor for foreign renters
  // ============================================================
  'guarantor-japan-rental-foreigner': [
    {
      question: 'Do foreigners need a Japanese guarantor to rent in Japan?',
      answer:
        'Not always. While traditional landlords require a personal Japanese guarantor (hoshounin), most modern properties accept a licensed guarantee company (hoshougaisha) instead. This costs 0.5-1 month of rent per year and is the standard solution for foreigners.',
    },
    {
      question: 'What is a hoshougaisha and how does it work?',
      answer:
        'A hoshougaisha is a licensed rental guarantee company that acts as your financial guarantor. If you miss rent, they pay the landlord and recover from you. Annual fees are typically 0.5-1 month of rent. Most landlords in Tokyo now accept this system.',
    },
    {
      question: 'Which guarantee companies accept foreign tenants in Japan?',
      answer:
        'Major guarantee companies that commonly work with foreign tenants include ORICO Rent, Leopalace Guarantee, and Global Trust Networks (GTN), which specifically targets non-Japanese residents and accepts foreign bank statements.',
    },
    {
      question: 'Can you rent in Tokyo without any guarantor at all?',
      answer:
        'Yes — furnished apartments, share houses, and some monthly-contract (monthly mansion) operators do not require any guarantor. You pay a slightly higher rent in exchange for the lower barrier to entry.',
    },
  ],

  // ============================================================
  // EN: Share house guide
  // ============================================================
  'share-house-tokyo-guide-2026': [
    {
      question: 'What is a share house in Tokyo and how does it work?',
      answer:
        'A share house in Tokyo is a shared-living arrangement with private rooms and shared common areas (kitchen, bathroom, lounge). Monthly all-in costs range from 50,000 to 90,000 JPY, making it the most affordable option for central Tokyo.',
    },
    {
      question: 'Can foreigners live in Tokyo share houses?',
      answer:
        'Yes — share houses actively target the international community. Most residents are a mix of Japanese and foreign professionals. No Japanese language skills are required.',
    },
    {
      question: 'What is the difference between a gaijin house and a share house in Tokyo?',
      answer:
        'Both are shared accommodation for foreigners, but gaijin houses are typically older, cheaper, and more dormitory-style. Modern share houses offer private rooms, better facilities, and a more social atmosphere. "Gaijin house" is an outdated term largely replaced by "share house."',
    },
    {
      question: 'How do I find a reliable share house in Tokyo?',
      answer:
        'Search on platforms like ShareHouseJapan, Sakura House, Oak House, or Borderless House. Prioritise proximity to your nearest station (under 10 minutes walk) and verify exactly what is included in the monthly fee — base prices sometimes exclude utilities.',
    },
  ],

  // ============================================================
  // EN: Apartment hunting from abroad
  // ============================================================
  'tokyo-apartment-hunting-from-abroad': [
    {
      question: 'Can you rent an apartment in Tokyo before arriving in Japan?',
      answer:
        'Yes, but it is harder. Landlords generally require in-person signing. Furnished apartments, share houses, and monthly-contract services are the most foreigner-friendly options that allow remote booking and key handover on arrival day.',
    },
    {
      question: 'What are the best platforms for finding housing in Tokyo from abroad?',
      answer:
        'The most reliable English-language platforms are GaijinPot Housing, Sakura House, Oak House, Borderless House, and SUUMO (with a Japanese-reading agent). Relocation services can also search and shortlist properties on your behalf before you land.',
    },
    {
      question: 'How far in advance should I start looking for a Tokyo apartment from abroad?',
      answer:
        'Start 4-8 weeks before your intended move-in date. Japanese landlords rarely hold properties for more than 2-3 weeks, so avoid searching too early. If you need flexibility on arrival, book a short-term furnished rental first and search locally.',
    },
    {
      question: 'What is the typical move-in timeline for a Tokyo apartment?',
      answer:
        'Once your application is approved (typically 3-7 business days), move-in is usually possible within 1-2 weeks. The full process from initial search to key handover averages 3-5 weeks for foreigners with correct documentation.',
    },
  ],

  // ============================================================
  // EN: Share house vs alternatives comparison
  // ============================================================
  'share-house-tokyo-comparison-2026': [
    {
      question: 'What is cheaper in Tokyo: share house or standard apartment?',
      answer:
        'Share houses are significantly cheaper for furnished, bill-included living in central Tokyo. An all-in share house costs 55,000-90,000 JPY/month versus 100,000-180,000 JPY for a furnished studio apartment with separate utility costs.',
    },
    {
      question: 'Which share houses in Tokyo have the best locations?',
      answer:
        'Borderless House, Sakura House, and Oak House all have properties within walking distance of major JR and Metro lines. Look for rooms within 10 minutes walk of your main station — location premium is worth paying for daily commute savings.',
    },
    {
      question: 'Is Sakura House or Oak House better for English-speaking foreigners in Tokyo?',
      answer:
        'Both are reliable options. Sakura House offers more locations across Greater Tokyo and strong community events. Oak House has a wider range of room sizes including private studio options. Choice ultimately depends on your target neighbourhood and room type.',
    },
    {
      question: 'Can I move into a Tokyo share house the same week I arrive in Japan?',
      answer:
        'Yes, most major share house operators can arrange same-week or even same-day move-in if a room is available. This is one of their key advantages over standard apartments, which require 2-4 weeks of processing time.',
    },
  ],

  // ============================================================
  // EN: Oak House alternative
  // ============================================================
  'oak-house-alternative': [
    {
      question: 'What are the best Oak House alternatives in Tokyo?',
      answer:
        'The main alternatives to Oak House are Sakura House, Borderless House, Hituji Not Found, and Oakhouse Rent (their own newer platform). Each has different strengths on pricing, location coverage, and community style.',
    },
    {
      question: 'Why do people look for Oak House alternatives?',
      answer:
        'Common reasons include limited room availability in specific neighbourhoods, preference for newer buildings, community size (some prefer smaller houses), or wanting a more international mix of residents.',
    },
    {
      question: 'Is Oak House safe for foreigners in Tokyo?',
      answer:
        'Yes, Oak House has a strong track record with foreign residents. Contracts are available in English, staff speak English, and their process is foreigner-friendly. Alternatives often offer similar guarantees.',
    },
    {
      question: 'How does Oak House compare on price with other share houses in Tokyo?',
      answer:
        'Oak House pricing is mid-range: 55,000-90,000 JPY/month all-in depending on room type and location. Sakura House is comparable. Borderless House tends to be slightly more expensive but offers a more curated community experience.',
    },
  ],

  // ============================================================
  // EN: Gaijinpot housing alternative
  // ============================================================
  'gaijinpot-housing-alternative': [
    {
      question: 'What are the best GaijinPot Housing alternatives for finding apartments in Tokyo?',
      answer:
        'The main alternatives to GaijinPot Housing are: Tokyo Expat (personalised search service), SUUMO (largest Japanese database, needs agent support), LIFULL HOME\'S, At Home Japan, and Sakura House/Oak House for furnished share options.',
    },
    {
      question: 'Is GaijinPot Housing reliable for foreigners in Japan?',
      answer:
        'GaijinPot Housing aggregates listings from multiple sources and is a useful starting point. However, listings can be outdated and English support varies by landlord. A dedicated foreigner-focused search service tends to yield faster, higher-quality results.',
    },
    {
      question: 'Can I find unfurnished apartments through GaijinPot alternatives?',
      answer:
        'Yes. Platforms like SUUMO, LIFULL HOME\'S, and At Home list the full Japanese market including unfurnished properties. A bilingual agent or relocation service is needed to navigate these platforms and communicate with landlords.',
    },
    {
      question: 'What makes Tokyo Expat different from GaijinPot Housing?',
      answer:
        'Tokyo Expat offers a personalised advisory service rather than an aggregated listing database. We search across all platforms (including Japanese-only sites), screen properties, negotiate on your behalf, and support you through contract signing — all in English.',
    },
  ],

  // ============================================================
  // FR: Trouver appartement Tokyo
  // ============================================================
  'trouver-appartement-tokyo-etranger': [
    {
      question: 'Les étrangers peuvent-ils louer un appartement à Tokyo sans garant japonais?',
      answer:
        'Oui. La plupart des appartements modernes à Tokyo acceptent les sociétés de garantie (hoshougaisha) à la place d\'un garant personnel. Ces sociétés facturent 0,5 à 1 mois de loyer par an. De nombreux logements meublés et share houses ne demandent aucun garant.',
    },
    {
      question: 'Combien de temps faut-il pour trouver un appartement à Tokyo en tant qu\'étranger?',
      answer:
        'En général 2 à 6 semaines avec les documents prêts. Faire appel à un chasseur spécialisé pour étrangers réduit souvent ce délai à 10-15 jours.',
    },
    {
      question: 'Quels documents sont nécessaires pour louer un appartement à Tokyo?',
      answer:
        'Il vous faudra: une carte de résidence (zairyu card) ou un visa valide, un justificatif de revenus (contrat de travail ou fiches de paie), un compte bancaire japonais ou une preuve de virement international, et les coordonnées de votre employeur.',
    },
    {
      question: 'Faut-il parler japonais pour louer un appartement à Tokyo?',
      answer:
        'Pas obligatoirement. De nombreux opérateurs de logements meublés et share houses pour étrangers travaillent en anglais ou en français. Pour un appartement traditionnel japonais, un chasseur bilingue est fortement recommandé pour relire le contrat.',
    },
  ],

  // ============================================================
  // FR: Appartement meuble sans garant
  // ============================================================
  'appartement-meuble-tokyo-sans-garant': [
    {
      question: 'Quels opérateurs proposent des appartements meublés à Tokyo sans garant?',
      answer:
        'Plusieurs opérateurs ciblent spécifiquement les locataires étrangers: Sakura House, Oak House, Borderless House, et divers services d\'appartements meublés. La plupart n\'exigent qu\'un visa valide et un contrat de travail.',
    },
    {
      question: 'Quel est le loyer d\'un appartement meublé à Tokyo?',
      answer:
        'Comptez 80 000 à 180 000 JPY/mois pour un studio ou 1LDK meublé dans Tokyo central. Ce tarif inclut généralement les meubles, les électroménagers, et parfois le Wi-Fi ou certaines charges.',
    },
    {
      question: 'Qu\'est-ce qui est inclus dans un appartement meublé à Tokyo?',
      answer:
        'En général: lit, canapé, bureau, réfrigérateur, machine à laver, climatisation et équipements de cuisine de base. Certains opérateurs incluent le Wi-Fi et des charges partielles — à vérifier dans le contrat.',
    },
    {
      question: 'Quelle est la durée minimale de location d\'un appartement meublé à Tokyo?',
      answer:
        'La plupart des appartements meublés exigent un minimum de 1 à 3 mois. Les contrats mensuels sont plus flexibles que les baux à durée fixe mais coûtent généralement 15 à 30% de plus par mois.',
    },
  ],

  // ============================================================
  // FR: Checklist bail Tokyo
  // ============================================================
  'checklist-bail-tokyo': [
    {
      question: 'Quelles sont les clauses essentielles à vérifier dans un bail japonais?',
      answer:
        'Les clauses à contrôler: les frais de remise en état à la sortie (genjo kaifuku), les pénalités de résiliation anticipée, les restrictions de sous-location, la politique animaux et visiteurs, et le règlement des parties communes.',
    },
    {
      question: 'Qu\'est-ce que le "reikin" dans un bail japonais?',
      answer:
        'Le reikin (礼金) est une "clé de courtoisie" non remboursable versée au propriétaire à la signature, équivalant généralement à 1 ou 2 mois de loyer. Il n\'est pas systématique et peut parfois être négocié ou supprimé pour les locataires étrangers.',
    },
    {
      question: 'Quel est le montant du dépôt de garantie (shikikin) à Tokyo?',
      answer:
        'Le shikikin représente généralement 1 à 2 mois de loyer. Une partie peut être retenue à la sortie pour ménage ou réparations au-delà de l\'usure normale. La clause de remise en état du bail précise exactement ce qui est facturé.',
    },
    {
      question: 'Peut-on résilier un bail japonais avant son terme?',
      answer:
        'Oui, généralement avec 1 à 2 mois de préavis et parfois une indemnité d\'un mois de loyer. Les baux à durée fixe (teiki chintai) sont plus stricts: les pénalités de rupture anticipée peuvent être significatives. Lisez cette clause avant de signer.',
    },
  ],

  // ============================================================
  // FR: Garantie loyer étranger Japon
  // ============================================================
  'garantie-loyer-etranger-japon': [
    {
      question: 'Les étrangers ont-ils besoin d\'un garant japonais pour louer au Japon?',
      answer:
        'Pas toujours. Bien que les propriétaires traditionnels exigent un garant personnel (hoshounin) japonais, la plupart des biens modernes acceptent une société de garantie agréée (hoshougaisha). C\'est la solution standard pour les étrangers au Japon.',
    },
    {
      question: 'Comment fonctionne une société de garantie locative au Japon?',
      answer:
        'La hoshougaisha remplace le garant personnel. Si vous ne payez pas votre loyer, elle règle le propriétaire et se retourne contre vous. Les frais annuels s\'élèvent à 0,5 à 1 mois de loyer. La plupart des propriétaires à Tokyo acceptent désormais ce système.',
    },
    {
      question: 'Quelles sociétés de garantie acceptent les locataires étrangers au Japon?',
      answer:
        'Les principales sont ORICO Rent, Leopalace Guarantee et Global Trust Networks (GTN), cette dernière étant spécialisée dans les résidents non-japonais et acceptant les relevés bancaires étrangers.',
    },
    {
      question: 'Peut-on louer à Tokyo sans aucun garant?',
      answer:
        'Oui: les appartements meublés, les share houses et certains opérateurs de contrats mensuels ne demandent aucun garant. Le loyer est légèrement plus élevé en échange de cette souplesse.',
    },
  ],

  // ============================================================
  // FR: Share house guide complet
  // ============================================================
  'share-house-tokyo-guide-complet': [
    {
      question: 'Qu\'est-ce qu\'un share house à Tokyo et comment ça fonctionne?',
      answer:
        'Un share house à Tokyo est une colocation avec chambres privées et espaces communs partagés (cuisine, salle de bain, salon). Le coût mensuel tout inclus varie de 50 000 à 90 000 JPY, ce qui en fait l\'option la plus abordable pour vivre dans Tokyo intra-muros.',
    },
    {
      question: 'Les étrangers peuvent-ils vivre dans des share houses à Tokyo?',
      answer:
        'Oui, les share houses ciblent activement la communauté internationale. La plupart des résidents sont un mélange de Japonais et d\'étrangers. Aucune connaissance du japonais n\'est requise.',
    },
    {
      question: 'Quelle est la différence entre un gaijin house et un share house à Tokyo?',
      answer:
        'Les deux sont des logements partagés pour étrangers, mais les gaijin houses sont généralement plus vieilles, moins chères et en mode dortoir. Les share houses modernes offrent des chambres privées, de meilleures infrastructures et une ambiance plus sociale. Le terme "gaijin house" est aujourd\'hui désuet.',
    },
    {
      question: 'Comment trouver un bon share house à Tokyo?',
      answer:
        'Cherchez sur ShareHouseJapan, Sakura House, Oak House ou Borderless House. Privilégiez la proximité de votre station (moins de 10 minutes à pied) et vérifiez ce qui est inclus dans le loyer mensuel: certains opérateurs affichent des prix bas mais facturent les charges en supplément.',
    },
  ],

  // ============================================================
  // FR: Chercher appartement Tokyo depuis étranger
  // ============================================================
  'chercher-appartement-tokyo-depuis-etranger': [
    {
      question: 'Peut-on louer un appartement à Tokyo avant d\'arriver au Japon?',
      answer:
        'Oui, mais c\'est plus difficile. Les propriétaires exigent généralement une signature en personne. Les appartements meublés, share houses et services à contrat mensuel sont les options les plus adaptées pour une réservation à distance et une remise de clés le jour J.',
    },
    {
      question: 'Quelles plateformes utiliser pour trouver un logement à Tokyo depuis l\'étranger?',
      answer:
        'Les plateformes anglophones les plus fiables sont GaijinPot Housing, Sakura House, Oak House, Borderless House et SUUMO (avec l\'aide d\'un agent bilingue). Un service de relocation peut aussi chercher et présélectionner des biens avant votre arrivée.',
    },
    {
      question: 'Combien de temps à l\'avance faut-il chercher un appartement à Tokyo depuis l\'étranger?',
      answer:
        'Commencez 4 à 8 semaines avant votre date d\'emménagement prévue. Les propriétaires japonais maintiennent rarement un bien disponible plus de 2 à 3 semaines. Si vous manquez de flexibilité à l\'arrivée, réservez d\'abord une location de courte durée et cherchez sur place.',
    },
    {
      question: 'Quel est le délai habituel pour emménager dans un appartement à Tokyo?',
      answer:
        'Une fois le dossier accepté (généralement 3 à 7 jours ouvrés), l\'emménagement est possible sous 1 à 2 semaines. Le processus complet de la première recherche à la remise des clés prend en moyenne 3 à 5 semaines pour un étranger avec les bons documents.',
    },
  ],

  // ============================================================
  // EN: Moving to Tokyo checklist
  // ============================================================
  'moving-to-tokyo-checklist-2026': [
    {
      question: 'What are the most important things to do before moving to Tokyo?',
      answer: 'Before moving: secure your work visa and Certificate of Eligibility (CoE), arrange initial housing such as a share house or furnished apartment, and prepare physical copies of all documents: passport, visa, employment contract, and academic diplomas. Bring at least 3-6 months of living expenses in accessible funds.',
    },
    {
      question: 'What must I do within the first two weeks of arriving in Tokyo?',
      answer: 'Within 14 days of arrival: register your address at your local ward office (ku yakusho) to activate your residence card (zairyu card), enroll in National Health Insurance (kokumin kenko hoken), get a Japanese SIM card, and open a bank account at Japan Post Bank, which is the most accessible option for newcomers.',
    },
    {
      question: 'How much money do I need when first moving to Tokyo?',
      answer: 'Budget at least 400,000-600,000 JPY for the first month covering 2-3 months rent deposit, key money, agency fees, and initial living expenses for a standard apartment. Choosing a share house or furnished apartment dramatically reduces upfront costs to 100,000-200,000 JPY.',
    },
    {
      question: 'Can I bring my belongings to Tokyo by international shipping?',
      answer: 'Yes. International moving companies (Yamato, Crown Relocations, Asian Tigers) offer sea freight in 4-8 weeks and air freight in 1-2 weeks. Japan has strict quarantine rules: declare all food, plants, and animal products on arrival. Most personal effects are duty-free for residents.',
    },
  ],

  // ============================================================
  // EN: Cost of living
  // ============================================================
  'tokyo-expat-cost-of-living-2026': [
    {
      question: 'How much does it cost to live in Tokyo as an expat in 2026?',
      answer: 'A single expat in Tokyo needs approximately 200,000-350,000 JPY/month for a comfortable lifestyle. This includes rent (80,000-150,000 JPY for a furnished studio), food (40,000-60,000 JPY), transport (10,000-15,000 JPY with a commuter pass), utilities (15,000-25,000 JPY), and discretionary spending.',
    },
    {
      question: 'Is Tokyo more expensive than London or Paris for expats?',
      answer: 'Tokyo is comparable to London and Paris overall, but with a different cost structure. Rent in central Tokyo is lower than central London or Paris for equivalent space. Food and transport are often cheaper. However, Japanese apartments are smaller by Western standards, which affects rent comparisons.',
    },
    {
      question: 'What is the cheapest way to live in Tokyo as a foreigner?',
      answer: 'The most cost-effective setup is a share house in an inner suburb (50,000-70,000 JPY/month all-in), cooking at home using supermarket basics and convenience stores, using a commuter pass (teiki) for daily transport, and choosing a neighborhood on a local line rather than the Yamanote.',
    },
    {
      question: 'How much is a typical grocery bill in Tokyo?',
      answer: 'A single person cooking at home spends 25,000-40,000 JPY/month on groceries in Tokyo. Supermarkets (Seiyu, OK Supermarket, Hanamasa) are significantly cheaper than convenience stores. Imported products cost 2-3x more than Japanese equivalents.',
    },
  ],

  // ============================================================
  // EN: Open bank account
  // ============================================================
  'open-bank-account-japan-foreigner': [
    {
      question: 'Can foreigners open a bank account in Japan?',
      answer: 'Yes, but the process is more restrictive than in most Western countries. You need a valid residence card (zairyu card), a registered address in Japan, and a Japanese phone number. Japan Post Bank (Yucho) is the most accessible option for new arrivals and accepts applications with a residence card.',
    },
    {
      question: 'Which bank is easiest for foreigners to open an account in Japan?',
      answer: 'Japan Post Bank (Yucho Ginko) is the most foreigner-friendly with English support and no minimum balance. Sony Bank and Shinsei Bank are also recommended for expats as they offer English interfaces and international transfer features. Traditional megabanks (MUFG, SMBC, Mizuho) are harder to access without stable employment proof.',
    },
    {
      question: 'How long does it take to open a bank account in Japan as a foreigner?',
      answer: 'Japan Post Bank can open an account the same day at a branch. Online applications take 1-2 weeks by mail. Traditional banks typically take 1-3 weeks after submitting the required documents. Some banks require you to have been registered at your address for at least 6 months.',
    },
    {
      question: 'What documents are needed to open a bank account in Japan?',
      answer: 'Required documents typically include: residence card (zairyu card) or passport with valid visa, proof of address (resident registration certificate from the ward office), Japanese phone number, and in some cases proof of employment or student status.',
    },
  ],

  // ============================================================
  // EN: Rental traps
  // ============================================================
  'tokyo-rental-traps-foreigners': [
    {
      question: 'What are the most common rental scams or traps for foreigners in Tokyo?',
      answer: 'The most common issues are: bait-and-switch listings (advertised unit already rented when you visit), unexpectedly high restoration fees on move-out, hidden fees not disclosed upfront (cleaning deposits, lock replacement), and lease clauses banning subletting or remote work that are only discovered after signing.',
    },
    {
      question: 'What is "reikin" and is it still charged in Tokyo?',
      answer: 'Reikin (key money) is a non-refundable payment of 1-2 months rent made to the landlord at signing. It is still charged by some landlords, particularly for older buildings and in competitive areas. Many modern landlords and share house operators have dropped it. Always ask if reikin applies before viewing a property.',
    },
    {
      question: 'How do I avoid excessive move-out charges in Tokyo?',
      answer: 'Before signing, photograph and document every existing scratch, stain, and damage in the apartment. Have the landlord sign off on this inventory. Under Japanese guidelines, tenants are only responsible for damage beyond normal wear-and-tear. Request the restoration cost breakdown formula in writing before signing.',
    },
    {
      question: 'Are real estate agents in Tokyo trustworthy for foreigners?',
      answer: 'Most licensed agents (with the national real estate license, "takken") are legitimate. The main risk is an agent who does not explain key contract clauses in English. Always use an English-speaking agent or bring a bilingual helper to the signing, and never sign a document you do not understand.',
    },
  ],

  // ============================================================
  // EN: Work visa guide
  // ============================================================
  'japan-work-visa-foreigners-guide': [
    {
      question: 'What are the main work visa types available in Japan for foreigners?',
      answer: 'The most common categories are: Engineer/Specialist in Humanities/International Services (for office workers, IT, and language-related roles), Skilled Labor, Business Manager, Intra-company Transferee, and Instructor. The correct category depends on your industry and job description. A confirmed job offer is required for all categories.',
    },
    {
      question: 'How long does it take to get a Japanese work visa?',
      answer: 'The full process takes 2-4 months: your employer applies for a Certificate of Eligibility (CoE) which takes 1-3 months, then you apply for the visa at your country\'s Japanese embassy with the CoE, which takes 1-5 business days. Plan accordingly if you have a fixed start date.',
    },
    {
      question: 'Do you need a job offer to apply for a work visa in Japan?',
      answer: 'Yes. Japan does not issue a general job-seeker visa. You need a confirmed job offer from a Japanese employer who acts as your sponsor and files the Certificate of Eligibility (CoE) application with the Immigration Services Agency on your behalf.',
    },
    {
      question: 'Can you change employers in Japan on a work visa?',
      answer: 'Yes, but you must notify the Immigration Services Agency within 14 days of changing jobs. Your new position must fall under the same visa activity category. If the job type changes significantly (e.g., from engineer to manager), you may need to apply for a visa status change before switching.',
    },
  ],

  // ============================================================
  // EN: Health insurance
  // ============================================================
  'japan-health-insurance-expat-guide': [
    {
      question: 'Is health insurance mandatory for foreigners living in Japan?',
      answer: 'Yes. All residents of Japan, including foreigners with a residence card, must enroll in a health insurance plan. Most employees are enrolled in Shakai Hoken (employer-sponsored insurance). Self-employed individuals, freelancers, and those between jobs enroll in Kokumin Kenko Hoken (National Health Insurance) at their local ward office.',
    },
    {
      question: 'How much does health insurance cost in Japan for foreigners?',
      answer: 'For employer-sponsored insurance (Shakai Hoken), premiums are shared 50/50 with your employer, typically costing you 5-10% of your monthly salary. National Health Insurance premiums are income-based: roughly 5-10% of your previous year\'s income, with a maximum of around 1,000,000 JPY/year. New arrivals with no prior income pay a minimum of 20,000-30,000 JPY/year.',
    },
    {
      question: 'What does Japanese health insurance cover?',
      answer: 'The standard plans cover 70% of all approved medical costs at registered clinics and hospitals (you pay 30%). Dental, vision, and some preventive care have limited coverage. Prescription drugs at registered pharmacies are also covered at 70%. Most expats find the coverage comprehensive for everyday and emergency medical needs.',
    },
    {
      question: 'Can I use my home country health insurance in Japan instead?',
      answer: 'No. Foreign insurance plans are not accepted at Japanese hospitals for standard billing. You must enroll in the Japanese system. Some expats hold both Japanese public insurance and private international insurance for overseas travel coverage or for private hospital rooms, but Japanese public insurance is required by law.',
    },
  ],

  // ============================================================
  // EN: Income tax
  // ============================================================
  'japan-income-tax-foreigners-guide': [
    {
      question: 'Do foreigners have to pay income tax in Japan?',
      answer: 'Yes. All residents with a residence card who earn income in Japan are subject to Japanese income tax, regardless of nationality. If you live in Japan for more than 5 years, your worldwide income may also become taxable in Japan. Tax treaties between Japan and your home country may prevent double taxation.',
    },
    {
      question: 'What is the income tax rate for foreigners in Japan?',
      answer: 'Japan uses a progressive tax system. National income tax rates range from 5% (income under 1.95M JPY) to 45% (income over 40M JPY). On top of national tax, residents pay local inhabitant tax of approximately 10% on prior year income. Combined effective rates for typical expat salaries (5-15M JPY) are 25-40%.',
    },
    {
      question: 'How do foreigners file taxes in Japan?',
      answer: 'Employees at Japanese companies typically have taxes withheld monthly (gensen choshu) and receive a year-end adjustment (nenmatsu chosei) from their employer. Self-employed individuals and those with multiple income sources must file a final tax return (kakutei shinkoku) at their local tax office by March 15 of the following year.',
    },
    {
      question: 'Can foreigners get a tax refund in Japan?',
      answer: 'Yes. If too much tax was withheld, you receive a refund after the year-end adjustment or final tax return. Foreigners who leave Japan mid-year can file for a refund before departure. You can also claim deductions for dependents, medical expenses over 100,000 JPY/year, and housing loan interest.',
    },
  ],

  // ============================================================
  // EN: Residence card
  // ============================================================
  'residence-card-japan-zairyu-card-guide': [
    {
      question: 'What is the Japanese residence card (zairyu card)?',
      answer: 'The zairyu card (在留カード) is the official ID card issued to all foreign nationals staying in Japan for more than 3 months. It shows your name, nationality, address, visa status, and permitted work activity. It is required for renting an apartment, opening a bank account, and all official procedures.',
    },
    {
      question: 'How do I get a residence card in Japan?',
      answer: 'If you enter Japan with a long-term visa, the residence card is issued at the port of entry (major airports: Narita, Haneda, Kansai). Within 14 days, you must register your address at your local ward office, which activates the card. If arriving without the card, apply at the nearest Regional Immigration Services Bureau.',
    },
    {
      question: 'How long is the residence card valid?',
      answer: 'Validity depends on your visa status: typically 1-5 years. The card must be renewed before expiry. If you change your address, workplace, or visa status, you must update the card at your ward office within 14 days. Carrying the card at all times is legally required.',
    },
    {
      question: 'What happens if I lose my residence card in Japan?',
      answer: 'Report the loss to your local police station (koban) immediately and get a loss certificate (funshitsu todoke). Then apply for a replacement at the nearest Regional Immigration Services Bureau within 14 days. The replacement costs 1,600 JPY. Operating without a valid card can result in fines.',
    },
  ],

  // ============================================================
  // EN: Negotiating rent
  // ============================================================
  'negotiating-rent-tokyo-tips': [
    {
      question: 'Can you negotiate rent in Tokyo?',
      answer: 'Yes, negotiation is possible and more common than many expats realize. Landlords are typically open to negotiation on: monthly rent (5-10% reduction is realistic for vacant properties), reikin (key money, sometimes waived), free months at the start of the lease, or reduced agency fees. The best leverage is for properties vacant for 3+ months.',
    },
    {
      question: 'What is the best time of year to negotiate rent in Tokyo?',
      answer: 'The best periods to negotiate are June-August and November-January, outside the peak moving season (February-April). During peak season, landlords have many applicants and rarely negotiate. Outside peak season, vacancy rates rise and landlords are more flexible, especially for properties over 3 months vacant.',
    },
    {
      question: 'How do I negotiate rent in Tokyo as a foreigner?',
      answer: 'Always negotiate through your agent, not directly with the landlord. Ask your agent to submit a formal written offer (moshikomi) with your proposed terms. Concrete asks that work: "Remove the reikin," "Offer 2 free months," or "Reduce rent by 5,000 JPY/month." A polite, non-confrontational approach is essential in Japanese business culture.',
    },
    {
      question: 'What are realistic rent reductions in Tokyo?',
      answer: 'Realistic negotiations typically achieve: 3,000-10,000 JPY/month off for long-vacant properties, waiving of reikin (1-2 months value), 1-2 free months at the start, or landlord paying cleaning fees. Asking for reductions beyond 10% of asking rent is rarely successful in central Tokyo.',
    },
  ],

  // ============================================================
  // EN: Sakura House review
  // ============================================================
  'sakura-house-review': [
    {
      question: 'Is Sakura House a good option for foreigners in Tokyo?',
      answer: 'Sakura House is one of the most established share house operators in Tokyo with 20+ years of experience. It is a reliable option for its price range (55,000-90,000 JPY/month). Strengths include English support, no Japanese required, and many locations. Limitations include older building stock in some locations and variable management quality between properties.',
    },
    {
      question: 'How much does Sakura House cost per month in Tokyo?',
      answer: 'Sakura House monthly costs range from 55,000 JPY for a small shared room to 90,000-120,000 JPY for a private studio. Costs typically include furniture, Wi-Fi, and utilities (with usage caps). Initial fees include a registration fee of around 15,000 JPY and a deposit of 1 month\'s rent.',
    },
    {
      question: 'What are the main complaints about Sakura House?',
      answer: 'Common complaints include: aging buildings in some locations (thin walls, older bathrooms), utility overage charges beyond the included cap, limited flexibility on move-in dates, and inconsistent cleanliness of common areas depending on residents. Reading recent reviews per specific property is recommended before booking.',
    },
    {
      question: 'What are the best Sakura House alternatives in Tokyo?',
      answer: 'The main alternatives are Oak House (similar price range, more locations), Borderless House (more international community focus), Hituji Not Found (newer properties, higher design quality), and furnished private apartments via a relocation service for those seeking more privacy.',
    },
  ],

  // ============================================================
  // EN: Remoters alternative
  // ============================================================
  'remoters-alternative': [
    {
      question: 'What is Remoters and why do people look for alternatives?',
      answer: 'Remoters.io is an online platform matching remote workers with relocation services, including housing search in Japan. People look for alternatives because Remoters takes a 20% commission from service providers, which is passed to the client, and the platform has limited personalization compared to working directly with a local property hunter.',
    },
    {
      question: 'What are the best Remoters alternatives for finding housing in Tokyo?',
      answer: 'The main alternatives are: working directly with a bilingual property hunter in Tokyo (no platform commission), using GaijinPot Housing for self-service listings, or engaging a full-service relocation company like Crown Relocations or Asian Tigers for comprehensive packages including housing and logistics.',
    },
    {
      question: 'Is it cheaper to use Remoters or go directly to a Tokyo property hunter?',
      answer: 'Going directly to a Tokyo-based property hunter is typically cheaper. Remoters charges service providers a 20% platform fee, which is reflected in the client price. A direct engagement removes this layer and often yields better service since the agent\'s full attention is on your search rather than a platform-managed queue.',
    },
    {
      question: 'Can a Tokyo property hunter do everything Remoters offers?',
      answer: 'Yes. A local bilingual property hunter covers: property search across all platforms (including Japanese-only sites), application filing, contract review, landlord negotiation, and move-in coordination. For additional services like visa support or shipping, they can recommend trusted specialists rather than bundling everything at a platform markup.',
    },
  ],

  // ============================================================
  // EN: Digital nomad visa
  // ============================================================
  'japan-digital-nomad-visa-2026': [
    {
      question: 'Does Japan have a digital nomad visa in 2026?',
      answer: 'Japan launched a digital nomad visa in March 2024, allowing remote workers earning at least 10 million JPY/year (approx. 65,000 USD) from non-Japanese companies to stay for up to 6 months (non-renewable). Applicants must have private health insurance covering Japan.',
    },
    {
      question: 'Who is eligible for Japan\'s digital nomad visa?',
      answer: 'Eligibility requirements are: foreign national employed by a non-Japanese company or self-employed, annual income of at least 10 million JPY (approx. 65,000 USD), valid private health insurance covering Japan, and nationals of countries with a tax treaty with Japan. Check the Japan Immigration Services Agency website for the current eligible nationality list.',
    },
    {
      question: 'Can digital nomads rent an apartment in Japan on this visa?',
      answer: 'Yes, but it is harder than for work visa holders. Most standard landlords prefer residents with employer-sponsored visas. Share houses and furnished short-term apartments are the most practical options for digital nomad visa holders, as they require less documentation and offer shorter contracts matching the 6-month visa.',
    },
    {
      question: 'Can the Japan digital nomad visa be renewed or converted?',
      answer: 'The digital nomad visa cannot currently be renewed and does not convert to a standard work visa directly. After the 6-month period, you must leave Japan. To stay longer, you would need to qualify for a standard work visa, which requires a Japanese employer. This is the main limitation compared to digital nomad visas in other countries.',
    },
  ],

  // ============================================================
  // EN: Working holiday visa
  // ============================================================
  'japan-working-holiday-visa-guide-2026': [
    {
      question: 'Which countries can get a working holiday visa for Japan?',
      answer: 'As of 2026, Japan\'s working holiday program (Waking Holiday Visa/Work and Holiday Visa) is open to nationals of: Australia, New Zealand, Canada, South Korea, France, Germany, Ireland, Denmark, Norway, Portugal, Poland, Slovakia, Austria, Hungary, Spain, Argentina, Czech Republic, Chile, Iceland, Lithuania, Sweden, and several others. Check the Ministry of Foreign Affairs of Japan for the current list.',
    },
    {
      question: 'How old do you have to be to apply for a Japan working holiday visa?',
      answer: 'Generally 18-30 years old, with some countries extending the upper limit to 35 (Australia, Canada, Ireland, Denmark, Norway, Portugal, Poland, Slovakia, Austria, Hungary, Czech Republic). You must apply before your 31st (or 36th) birthday. The visa is a once-in-a-lifetime grant per country pair.',
    },
    {
      question: 'Can you work full-time in Japan on a working holiday visa?',
      answer: 'Yes, but with restrictions depending on your nationality. Most WHV holders can work in any sector. Some nationalities have limits on entertainment industry work or require employer registration. The visa allows you to work to supplement travel, not as the primary purpose. Maximum stay is typically 12 months, sometimes extendable to 24 months.',
    },
    {
      question: 'How do I find housing in Japan on a working holiday visa?',
      answer: 'Share houses and gaijin houses are the most practical options. They offer month-to-month contracts, no guarantor, and English support. Monthly mansions (short-term furnished apartments) are a more private but pricier alternative. Standard rental apartments are difficult to access on a WHV as landlords prefer longer-term visa holders.',
    },
  ],

  // ============================================================
  // EN: Tokyo neighbourhoods for expats
  // ============================================================
  'tokyo-neighbourhoods-expats-guide': [
    {
      question: 'Which Tokyo neighbourhoods are best for expats?',
      answer: 'The most popular Tokyo neighbourhoods for expats are: Shinjuku and Shibuya (central, international, premium), Ebisu and Daikanyama (upscale, Western restaurants, quieter), Nakameguro (trendy, creative crowd), Shimokitazawa (bohemian, affordable), and Koenji or Nakano (more local, significantly cheaper while still well-connected).',
    },
    {
      question: 'Which Tokyo area is cheapest for expats to rent?',
      answer: 'Adachi, Katsushika, Edogawa, and Arakawa in northeast Tokyo offer rents 20-35% below the Yamanote loop average while remaining on the metro network. Suginami and Nerima in the west are also affordable. The trade-off is a longer commute and fewer Western amenities nearby.',
    },
    {
      question: 'Is English widely spoken in Tokyo neighborhoods?',
      answer: 'English is more prevalent in Shinjuku, Shibuya, Minato, and Roppongi, where many international businesses and expat services are concentrated. In residential areas further from the center (Adachi, Edogawa), everyday English is rare. Having a translation app is useful across all Tokyo neighborhoods.',
    },
    {
      question: 'Which Tokyo neighborhood has the best access to international food?',
      answer: 'Shinjuku (Korean, Vietnamese, Southeast Asian), Roppongi (Western restaurants), Hiroo (European, American supermarkets like National Azabu), and Nakameguro (French, Italian) offer the widest international food options. Supermarkets like Kaldi, Costco (Tamasakai/Chiba), and National Azabu stock imported products across the city.',
    },
  ],

  // ============================================================
  // EN: Best neighborhoods for families
  // ============================================================
  'best-neighbourhoods-families-tokyo-guide': [
    {
      question: 'Which Tokyo neighborhoods are best for expat families with children?',
      answer: 'Top family-friendly neighborhoods for expats in Tokyo are: Hiroo and Azabu-Juban (close to major international schools, Western amenities), Setagaya and Denenchofu (spacious, green, quiet, near international schools), and Bunkyo (family-oriented, close to universities and good public schools). These areas prioritize walkability, parks, and school access.',
    },
    {
      question: 'Where are the international schools located in Tokyo?',
      answer: 'Major international schools are clustered in Minato (British School in Tokyo, Azabu), Bunkyo (Tokyo International School), Setagaya (Deutsche Schule Tokyo Yokohama), and Yokohama (Canadian Academy, International School of the Sacred Heart). Choose your neighborhood based on your preferred school\'s location to minimize commute.',
    },
    {
      question: 'Is Tokyo safe for families with young children?',
      answer: 'Tokyo is consistently ranked among the safest cities in the world for families. Crime rates are very low, children regularly commute to school independently from age 6-7, and parks and public spaces are clean and well-maintained. Traffic safety near schools is well managed, and community watchgroups (bohan patrol) are active in residential areas.',
    },
    {
      question: 'How much does a family apartment cost in Tokyo?',
      answer: 'A 2LDK (2 bedrooms plus living/dining/kitchen) in a family-friendly Tokyo neighborhood costs 150,000-250,000 JPY/month in Minato or Setagaya. More affordable family-friendly options exist in Nerima, Suginami, or Edogawa at 100,000-160,000 JPY/month for similar space, with a slightly longer school commute.',
    },
  ],

  // ============================================================
  // EN: Student housing guide
  // ============================================================
  'student-housing-tokyo-guide': [
    {
      question: 'What are the housing options for international students in Tokyo?',
      answer: 'International students in Tokyo typically choose between: university dormitories (cheapest, 20,000-50,000 JPY/month, limited availability), share houses targeting students (50,000-75,000 JPY/month all-in), gaijin houses (the cheapest option, 35,000-55,000 JPY/month, often older facilities), and private furnished apartments (80,000+ JPY/month, most private).',
    },
    {
      question: 'Can international students rent a private apartment in Tokyo?',
      answer: 'Yes, but it is challenging without Japanese income. Most students need a guarantor: either a Japanese citizen or a guarantee company. Some landlords accept international students with a proof of enrollment and bank statements showing sufficient funds. Furnished apartments targeting students with flexible lease terms are the most accessible option.',
    },
    {
      question: 'How far in advance should international students look for housing in Tokyo?',
      answer: 'For April enrollment (spring semester), start looking in December-January. For October enrollment, start in July-August. University dormitories require application 3-6 months before the start of term. Share houses and private apartments can be arranged 1-2 months in advance.',
    },
    {
      question: 'What is the cheapest housing option for students in Tokyo?',
      answer: 'Gaijin houses (also called foreigner-friendly houses) are the cheapest option at 35,000-55,000 JPY/month, often including utilities and internet. They are older, sometimes with shared bathrooms, but located near student neighborhoods like Waseda, Shinjuku, or Nakano. Quality varies significantly: read recent reviews before booking.',
    },
  ],

  // ============================================================
  // EN: Student housing 2026
  // ============================================================
  'student-housing-tokyo-guide-2026': [
    {
      question: 'What has changed in Tokyo student housing in 2026?',
      answer: 'In 2026, student housing demand in Tokyo has increased due to Japan\'s record international student enrollment. New co-living buildings targeting students have opened in Shinjuku, Shibuya, and Bunkyo. Competition for affordable share houses and university dorms has intensified, making early booking (3-4 months in advance) more important than before.',
    },
    {
      question: 'What is the average rent for student housing in Tokyo in 2026?',
      answer: 'Average 2026 rents for student housing: gaijin houses 40,000-60,000 JPY/month, share houses 55,000-85,000 JPY/month all-in, private furnished studios 80,000-130,000 JPY/month. University dormitories remain the cheapest at 20,000-50,000 JPY/month but are very limited.',
    },
    {
      question: 'Is it better to live in a share house or university dorm as an international student in Tokyo?',
      answer: 'University dormitories are cheaper and ensure a structured community, but are limited (typically only for the first year). Share houses offer more independence, easier internet and utilities setup, and a mix of Japanese and international residents that helps language learning. Share houses are the preferred choice for students after the first year.',
    },
    {
      question: 'Which neighborhoods are best for students in Tokyo?',
      answer: 'Best student neighborhoods are: Waseda and Takadanobaba (near Waseda University, affordable and very student-oriented), Hongo and Nezu (near Tokyo University), Nakano and Koenji (affordable, creative, excellent transport), and Sangenjaya (popular, mid-range, good nightlife). Avoid renting in Minato or Shibuya: the premium is not justified for students.',
    },
  ],

  // ============================================================
  // EN: Utilities setup
  // ============================================================
  'setting-up-utilities-tokyo-apartment': [
    {
      question: 'How do I set up electricity, gas, and water in a Tokyo apartment?',
      answer: 'Electricity and gas require contacting the provider listed by your landlord or the default provider for your area (Tokyo Electric Power for electricity, Tokyo Gas for most of Tokyo). Call or use their English online forms to register your name and move-in date. Water is registered at the ward office during address registration. Setup takes 1-3 business days.',
    },
    {
      question: 'Are there English-speaking utility providers in Tokyo?',
      answer: 'Tokyo Electric Power (TEPCO) has an English phone line (+81-3-6375-9811). Tokyo Gas has an English registration form online. Most providers have moved their registration online. If calling in Japanese is difficult, your landlord or a bilingual agent can register utilities on your behalf on move-in day.',
    },
    {
      question: 'How much are monthly utilities in a Tokyo apartment?',
      answer: 'For a standard studio or 1K apartment: electricity 5,000-10,000 JPY/month (more in summer/winter for AC/heating), gas 3,000-6,000 JPY/month, water is often included in rent or costs 2,000-3,000 JPY/month. Internet (fiber) is 4,000-6,000 JPY/month separately. Share houses and furnished apartments typically bundle these costs.',
    },
    {
      question: 'Do I need Japanese to set up internet in Tokyo?',
      answer: 'Not necessarily. NTT Hikari (fiber) and SoftBank offer English customer support for registration. Pocket Wi-Fi routers (available from Japan Travel SIM or IIJmio) are a faster alternative requiring no setup: plug in on arrival day. Fixed fiber takes 1-4 weeks to install due to technician scheduling.',
    },
  ],

  // ============================================================
  // EN: SIM card
  // ============================================================
  'japan-sim-card-foreigners-2026': [
    {
      question: 'What is the best SIM card for foreigners living in Japan?',
      answer: 'For long-term residents, the best options are: IIJmio (reliable, affordable at 2,000-3,000 JPY/month), Y! Mobile (Softbank network, English support, 2,000-4,000 JPY/month), and Rakuten Mobile (cheapest unlimited data at 3,278 JPY/month). All require a residence card and Japanese bank account or credit card. Avoid tourist SIMs for stays over 3 months.',
    },
    {
      question: 'Can foreigners get a SIM card in Japan without a residence card?',
      answer: 'Tourist data-only SIMs are available without a residence card (IIJmio Tourist SIM, Docomo data SIM). However, voice SIMs (with phone number) require a residence card. If you are waiting for your residence card, a tourist SIM bridges the gap for the first weeks.',
    },
    {
      question: 'How long does it take to get a SIM card in Japan?',
      answer: 'Physical SIMs purchased at electronics stores (Yodobashi, BIC Camera) or convenience stores are available immediately. Online SIM applications take 3-7 business days for delivery. eSIMs from IIJmio or Rakuten can be activated within hours of online registration if you have a residence card and payment method ready.',
    },
    {
      question: 'What documents are needed to buy a SIM card in Japan?',
      answer: 'For a resident SIM: residence card (zairyu card), valid credit card or Japanese bank account, and a Japanese address. Store staff will photograph your residence card for verification. Some providers also accept a passport with a valid long-stay visa stamp if your residence card has not yet been issued.',
    },
  ],

  // ============================================================
  // EN: Send money to Japan
  // ============================================================
  'send-money-to-japan-from-abroad': [
    {
      question: 'What is the cheapest way to send money to Japan from abroad?',
      answer: 'Wise (formerly TransferWise) consistently offers the lowest fees and best exchange rates for international transfers to Japan, typically 0.4-0.7% of the transfer amount. Revolut is comparable. Avoid traditional bank wire transfers (typically 25-50 USD fee per transfer plus poor exchange rates). For large amounts, Wise Business is worth considering.',
    },
    {
      question: 'How long does an international transfer to a Japanese bank account take?',
      answer: 'Wise transfers typically arrive in 1-2 business days to major Japanese banks (Yucho, MUFG, SMBC, Mizuho, Shinsei). Weekend transfers take longer. Same-day transfers are available for some currency pairs. Traditional SWIFT wire transfers can take 3-5 business days.',
    },
    {
      question: 'Can I use Revolut or N26 in Japan?',
      answer: 'Revolut cards work in Japan for ATM withdrawals and card payments (Mastercard or Visa accepted widely). N26 does not currently support JPY accounts. For regular living in Japan, you will still need a local Japanese bank account for rent payments, utilities, and domestic transfers.',
    },
    {
      question: 'Are there limits on how much money I can transfer to Japan?',
      answer: 'Japan requires reporting of any cross-border transfer over 1 million JPY (approximately 7,000 USD). This is handled automatically by your bank and is not a barrier for legitimate transfers. Large transfers (over 50,000 USD) may trigger additional compliance review by both your sending bank and the Japanese receiving bank.',
    },
  ],

  // ============================================================
  // EN: Tokyo vs Osaka
  // ============================================================
  'tokyo-vs-osaka-expat-living-comparison': [
    {
      question: 'Is Tokyo or Osaka better for expats?',
      answer: 'Tokyo is better for expats working in finance, tech, international business, or those seeking the widest job market and English services. Osaka is better for expats prioritizing lower cost of living (rents 20-35% cheaper), a more relaxed social culture, and proximity to Kyoto and Nara. Both cities have strong expat communities.',
    },
    {
      question: 'Is Osaka cheaper than Tokyo for rent?',
      answer: 'Yes. A furnished studio in central Osaka costs 60,000-100,000 JPY/month versus 80,000-150,000 JPY in central Tokyo. Restaurants and daily expenses are also 10-20% cheaper in Osaka. The cost difference is significant for those not on a Tokyo-level salary package.',
    },
    {
      question: 'Which city has better job opportunities for foreigners: Tokyo or Osaka?',
      answer: 'Tokyo has approximately 5-10x more international job opportunities. Most multinational company Japan offices, tech companies, and finance firms are headquartered in Tokyo. Osaka has opportunities in manufacturing, healthcare, and trade, but the English-language job market is significantly smaller than Tokyo.',
    },
    {
      question: 'How easy is it to find housing as a foreigner in Osaka versus Tokyo?',
      answer: 'Both cities have similar requirements for foreign tenants (residence card, guarantor or guarantee company, income proof). Osaka has fewer specialized foreigner-friendly operators than Tokyo, but the overall process is comparable. Prices are more favorable in Osaka, and competition for apartments is lower than in Tokyo\'s peak season.',
    },
  ],

  // ============================================================
  // EN: Gaijin house vs share house
  // ============================================================
  'gaijin-house-vs-share-house-tokyo': [
    {
      question: 'What is the difference between a gaijin house and a share house in Tokyo?',
      answer: 'A gaijin house (foreigner house) is the older term for shared accommodation built specifically for non-Japanese residents, typically with dormitory-style rooms, lower prices, and older facilities. A modern share house offers private rooms, better common areas, mixed Japanese and foreign residents, and higher standards. Most operators now use the term "share house."',
    },
    {
      question: 'Are gaijin houses still available in Tokyo?',
      answer: 'Yes, though the term is less common. What remains of traditional gaijin houses offers the cheapest accommodation in Tokyo at 35,000-55,000 JPY/month. They typically have older buildings, shared bathrooms, and basic kitchens. Search for "foreigner-friendly houses" or "guest house Tokyo" to find this category.',
    },
    {
      question: 'Is a gaijin house or share house better for meeting people in Tokyo?',
      answer: 'Modern share houses are generally better for social connections, especially those with Japanese residents (Borderless House, Hituji Not Found). Traditional gaijin houses tend to attract shorter-term travelers and the community is more transient. If building a Tokyo social network is important, choose a share house with structured community events.',
    },
    {
      question: 'How much cheaper is a gaijin house versus a share house in Tokyo?',
      answer: 'Gaijin houses are typically 15,000-25,000 JPY/month cheaper than comparable share houses. A gaijin house shared room runs 35,000-50,000 JPY/month versus a share house private room at 55,000-80,000 JPY/month. The trade-off is older facilities, shared bathrooms, and less privacy.',
    },
  ],

  // ============================================================
  // EN: Public transport guide
  // ============================================================
  'tokyo-public-transport-expat-guide': [
    {
      question: 'How does public transport work in Tokyo for expats?',
      answer: 'Tokyo\'s public transport combines JR lines (Yamanote loop and regional), Tokyo Metro (9 lines), Toei Subway (4 lines), and private railways (Keio, Odakyu, Tokyu, Seibu, Tobu). A Suica or Pasmo IC card covers all of these and can be charged at any station machine. Monthly commuter passes (teiki) offer significant savings for regular routes.',
    },
    {
      question: 'How do I get a Suica card in Tokyo?',
      answer: 'Suica cards are available at JR ticket machines at any JR station (deposit 500 JPY, load any amount). You can also get a Suica on your iPhone or Apple Watch via the Wallet app (no physical card needed). Pasmo is equivalent and available at Tokyo Metro stations. Both work identically on all transport and many convenience stores.',
    },
    {
      question: 'How much does a monthly commuter pass cost in Tokyo?',
      answer: 'Monthly commuter passes (teiki) are calculated by route and distance. A typical inner-city commute (e.g., Shinjuku to Shibuya) costs around 3,000-5,000 JPY/month. A longer commute (e.g., Chiba to Shinjuku) costs 10,000-18,000 JPY/month. Passes are valid for one specific route and direction but allow unlimited rides on that route.',
    },
    {
      question: 'Can I use a bicycle in Tokyo for commuting?',
      answer: 'Yes, cycling is practical in flat central Tokyo. Many expats cycle for short commutes (under 5-6km). Register your bicycle at your local ward office (required by law) and follow traffic rules: cycling on sidewalks is technically illegal outside designated areas. Bicycle sharing (Docomo Cycle) is available in many central wards for occasional use without ownership.',
    },
  ],

  // ============================================================
  // EN: Working in Tokyo guide
  // ============================================================
  'working-in-tokyo-expat-guide-2026': [
    {
      question: 'What industries hire foreigners in Tokyo?',
      answer: 'The most active sectors hiring foreigners in Tokyo are: technology (software engineering, product management), finance (banking, fintech, private equity), English education (ALT, private tutoring, corporate training), international trade and logistics, hospitality and tourism, and creative industries (design, marketing for global brands).',
    },
    {
      question: 'Do I need to speak Japanese to work in Tokyo?',
      answer: 'Not for all roles. Many international companies in Tokyo operate in English, especially in tech, finance, and consulting. However, Japanese language skills (N3 or above) significantly expand your job options and salary range. Roles requiring Japanese (N2-N1) typically offer better compensation and longer-term stability.',
    },
    {
      question: 'What is the average salary for expats in Tokyo?',
      answer: 'Entry-level international hires typically earn 3,000,000-5,000,000 JPY/year (approx. 20,000-33,000 USD). Mid-career professionals earn 6,000,000-12,000,000 JPY/year. Senior roles and finance positions reach 15,000,000-30,000,000 JPY/year. Packages may include housing allowance, children\'s school fees, and home leave for expat contracts.',
    },
    {
      question: 'What is Japanese work culture like for foreigners?',
      answer: 'Japanese workplace culture emphasizes hierarchy, consensus-building (nemawashi), and punctuality. For foreigners, key adjustments include: arriving on time (being late is very negatively perceived), communicating directly but politely, participating in after-work socializing (nomikai) which is important for building relationships, and understanding that overtime is common in traditional industries.',
    },
  ],

  // ============================================================
  // EN: Bringing pets to Japan
  // ============================================================
  'bringing-pets-to-japan-guide': [
    {
      question: 'Can I bring my dog or cat to Japan?',
      answer: 'Yes, but Japan has one of the strictest pet import processes in the world. For dogs and cats from most Western countries: the process takes a minimum of 180 days from microchipping and rabies vaccination to the blood titer test and waiting period. Arriving without completing all steps results in 180 days of government quarantine at your expense.',
    },
    {
      question: 'How long does it take to import a pet to Japan?',
      answer: 'From most Western countries (USA, UK, EU, Australia), the minimum process takes 7-8 months from start to finish: microchip, two rabies vaccinations, blood titer test, 180-day wait, USDA/official vet documentation, Japanese quarantine authority pre-approval, and arrival inspection. The 180-day waiting period cannot be shortened.',
    },
    {
      question: 'Can I find a pet-friendly apartment in Tokyo?',
      answer: 'Pet-friendly apartments in Tokyo exist but are limited, typically 10-20% of the market. They often charge a higher deposit (1-3 months extra) and some require additional restoration fees at move-out. Search specifically for "petto kyodai" (ペット共生) buildings. Share houses generally do not allow pets.',
    },
    {
      question: 'How much does it cost to bring a pet to Japan?',
      answer: 'The total cost to import a pet to Japan typically ranges from 3,000-8,000 USD: veterinary preparations 500-2,000 USD, USDA/official endorsement 200-500 USD, airline pet cargo fee 300-700 USD, Japanese quarantine inspection fee 20,000-40,000 JPY, and optional pet transport specialist service 1,000-3,000 USD.',
    },
  ],

  // ============================================================
  // EN: International schools for families
  // ============================================================
  'family-expat-tokyo-international-schools': [
    {
      question: 'How much do international schools cost in Tokyo?',
      answer: 'International school tuition in Tokyo ranges from 1,500,000-3,500,000 JPY/year (approx. 10,000-23,000 USD) depending on the school and grade level. Top-tier schools (British School in Tokyo, American School in Japan) are at the higher end. Many corporate expat packages cover school fees entirely.',
    },
    {
      question: 'What are the best international schools in Tokyo?',
      answer: 'Highly regarded international schools in Tokyo include: American School in Japan (ASIJ) in Chofu, British School in Tokyo (BST) in Shinjuku/Shibuya, Tokyo International School (TIS) in Minato, Canadian International School (CIS) in Minami-Azabu, and German Swiss International School (GSIS). Each follows a different national curriculum.',
    },
    {
      question: 'How far in advance should I apply to international schools in Tokyo?',
      answer: 'Apply 12-18 months in advance for popular schools like ASIJ and BST, which have waiting lists. Less competitive schools may have availability 3-6 months out. If your company is relocating you, HR should begin the school application process at the same time as your visa process.',
    },
    {
      question: 'Are there good public schools for foreigners in Tokyo?',
      answer: 'Japanese public schools are free and legally required to accept foreign children. However, instruction is entirely in Japanese with limited English support. Children who speak no Japanese typically need 1-2 years to adapt. Some wards have dedicated Japanese language support programs. Public school is a good option for families committing long-term to Japan.',
    },
  ],

  // ============================================================
  // EN: Renters insurance
  // ============================================================
  'renters-insurance-japan-guide': [
    {
      question: 'Is renters insurance required in Japan?',
      answer: 'Yes, renters insurance (kasai hoken or kaketsuke hoken) is mandatory in virtually all Japanese rental contracts. Landlords require it to protect against fire, water damage to neighbors, and liability. The cost is very low: typically 10,000-20,000 JPY for a 2-year policy.',
    },
    {
      question: 'What does renters insurance cover in Japan?',
      answer: 'Standard Japanese renters insurance covers: fire and smoke damage, water damage from pipes or neighboring apartments, theft, and third-party liability (e.g., your bathtub overflows and damages the apartment below). It does not typically cover earthquake damage, which requires a separate earthquake insurance rider.',
    },
    {
      question: 'Where can foreigners buy renters insurance in Japan?',
      answer: 'Many landlords and agencies offer renters insurance at signing through their affiliated insurer. You can also purchase independently from: Tokio Marine, Sompo Japan, AIG Japan, or through some English-language platforms. Purchasing independently is sometimes cheaper. Online plans from companies like Chubb Japan accept foreign card payments.',
    },
    {
      question: 'Does renters insurance cover earthquake damage in Japan?',
      answer: 'Standard renters insurance does not cover earthquake damage. You must add an earthquake rider (jishin hoken) separately. Given Japan\'s seismic activity, an earthquake rider is highly recommended. The additional cost is typically 5,000-15,000 JPY per year. Check whether your building\'s structure (wooden vs. reinforced concrete) affects the premium.',
    },
  ],

  // ============================================================
  // EN: Jiko bukken
  // ============================================================
  'jiko-bukken-cheap-apartments-tokyo': [
    {
      question: 'What is jiko bukken in Japan?',
      answer: 'Jiko bukken (事故物件) are apartments where an incident occurred on the premises: typically a death (natural causes, suicide, or accident) or serious crime. Japanese law requires landlords to disclose these incidents for a period of time (typically 3 years for suicide or homicide). These apartments are priced 15-30% below market rate.',
    },
    {
      question: 'Are jiko bukken apartments safe to live in?',
      answer: 'Jiko bukken apartments are structurally and physically safe. The reduced price reflects social stigma and psychological discomfort, not physical danger. After professional cleaning and any needed renovation, these units are equivalent to any other apartment. Many practical-minded foreigners choose them for the significant cost savings.',
    },
    {
      question: 'How do I find jiko bukken apartments in Tokyo?',
      answer: 'The main platform for jiko bukken listings is Oshimaland.co.jp (Japanese only). Some general listing sites (SUUMO, AtHome) may include jiko bukken with disclosure notes. Real estate agents are required to disclose the status if asked directly. Specifying "jiko bukken OK" to your agent will surface options.',
    },
    {
      question: 'What is the biggest risk with a jiko bukken apartment?',
      answer: 'The main practical risk is resale/re-rental stigma if you need to leave early: some landlords charge extra fees or the landlord may decline to renew after discounting below market. The psychological aspect is a personal decision. Budget for thorough cleaning if moving in after a disclosed incident, even if the landlord has already cleaned the unit.',
    },
  ],

  // ============================================================
  // EN: Find apartment in September
  // ============================================================
  'find-apartment-tokyo-september': [
    {
      question: 'Is September a good time to find an apartment in Tokyo?',
      answer: 'September is a moderately good time to search. It falls outside the main peak season (February-April), so competition is lower and some landlords are more willing to negotiate. However, it coincides with the October academic intake, creating moderate demand from students and early corporate relocations. Availability is better than spring but fewer units than summer.',
    },
    {
      question: 'How much notice do I need to give for a September move-in in Tokyo?',
      answer: 'Start your search 4-6 weeks before your target move-in date. Properties typically become available 2-4 weeks before the listed move-in date. For September 1 move-in, start searching in late July or early August. Share houses and furnished apartments have more flexible timing and can sometimes arrange same-week move-in.',
    },
    {
      question: 'Are rents cheaper in September in Tokyo?',
      answer: 'Rents are typically 5-10% more negotiable in September than during the February-April peak season. Landlords with units vacant since spring are motivated to rent before the next peak cycle. This makes September one of the better months to secure price reductions, free months, or waived key money.',
    },
    {
      question: 'What neighborhoods are easiest to find apartments in during September in Tokyo?',
      answer: 'Neighborhoods with higher turnover rates are easiest to find units in September: Shinjuku, Shibuya, Nakano, Koenji, and areas around major university campuses (Waseda, Hongo). These areas have higher student and young professional populations with frequent move cycles.',
    },
  ],

  // ============================================================
  // EN: Furnished apartment for expats
  // ============================================================
  'furnished-apartment-tokyo-expats': [
    {
      question: 'What is the difference between a furnished apartment and a share house for expats in Tokyo?',
      answer: 'A furnished apartment gives you a self-contained private unit with your own kitchen, bathroom, and entrance. A share house gives you a private bedroom with shared common areas. Furnished apartments cost more (80,000-180,000 JPY/month) but provide full privacy and autonomy. Share houses are cheaper (50,000-90,000 JPY/month all-in) but involve communal living.',
    },
    {
      question: 'Can I find furnished apartments in Tokyo with month-to-month contracts?',
      answer: 'Yes. Monthly mansion (マンスリーマンション) operators offer furnished apartments on 1-6 month rolling contracts. Companies like Sakura House, Leopalace21, and various operators list these. They cost 10-25% more per month than standard leases but offer flexibility without long-term commitment or large upfront deposits.',
    },
    {
      question: 'What is typically included in a furnished apartment in Tokyo for expats?',
      answer: 'Standard furnished expat apartments include: bed frame and mattress, desk and chair, refrigerator, washing machine (sometimes combined washer-dryer), microwave, air conditioning (reverse-cycle), basic kitchen equipment, and curtains. Internet and utilities are sometimes included. Always confirm the exact inclusions before signing.',
    },
    {
      question: 'Are furnished apartments in Tokyo available without a guarantor?',
      answer: 'Many furnished apartment operators targeting expats waive the guarantor requirement. Requirements instead focus on: a valid visa with at least 3-6 months remaining, an employment contract or proof of income, and payment of the first and last month upfront. This makes furnished apartments the most accessible option for new arrivals.',
    },
  ],

  // ============================================================
  // EN: Student housing October
  // ============================================================
  'student-housing-tokyo-october': [
    {
      question: 'When should international students arriving in October start looking for housing in Tokyo?',
      answer: 'Start your search in June-July for October enrollment. University dormitory applications often close in May-June. Share houses with availability in October fill up from August onwards as students finalize enrollment. Waiting until September significantly limits your options for October move-in.',
    },
    {
      question: 'Is October a competitive time for student housing in Tokyo?',
      answer: 'Yes, moderately. October is the second enrollment peak (after April). Universities with October intake (Waseda, Sophia, several graduate programs) generate significant housing demand. Share houses within walking distance of these campuses fill up quickly. Book 2-3 months in advance for the best selection.',
    },
    {
      question: 'Can I find student housing in Tokyo with a short lease for October?',
      answer: 'Yes. Short-term options for October enrollment include: furnished apartments with 3-6 month contracts, share houses with month-to-month agreements (most operators), and university accommodation if available. These allow you to settle in and search for a longer-term apartment after arriving and understanding the city.',
    },
    {
      question: 'What neighborhood should I live in as a student starting in October in Tokyo?',
      answer: 'Choose based on your university: Waseda students should look in Takadanobaba or Waseda. Sophia students in Yotsuya or Shinjuku. Keio students in Mita or Shibuya. The extra cost of proximity to campus is usually worth it in the first semester while you are building your Tokyo network and daily routine.',
    },
  ],

  // ============================================================
  // EN: Furnished apartment top 5
  // ============================================================
  'furnished-apartment-tokyo-top-5-expats': [
    {
      question: 'What are the best furnished apartment services for expats in Tokyo?',
      answer: 'Top furnished apartment options for Tokyo expats include: Sakura House (wide coverage, English support), Oak House (various room types including private studios), Borderless House (international community focus), Tokyo Monthly (premium furnished apartments, monthly contracts), and direct furnished listings on GaijinPot Housing and Suumo (with bilingual agent support).',
    },
    {
      question: 'How do I compare furnished apartment options in Tokyo?',
      answer: 'Compare on: total monthly cost (rent plus utilities plus internet), minimum contract length, deposit amount, location (station distance), included furniture quality (check photos), and cancellation policy. Request a virtual tour or detailed photos of the actual unit, not just the building exterior.',
    },
    {
      question: 'Are top-rated furnished apartments in Tokyo worth the extra cost?',
      answer: 'For the first 1-3 months in Tokyo, a premium furnished apartment removes setup friction (no furniture shopping, no utility registration, faster move-in) and provides a stable base to search for a longer-term apartment. The cost premium of 20-30% over a bare apartment is typically justified for a short initial stay.',
    },
    {
      question: 'Can I negotiate furnished apartment prices in Tokyo?',
      answer: 'Yes, especially for stays over 3 months. Ask operators for a monthly rate discount for longer commitments, waived registration fees, or a free first week. Large operators like Sakura House and Oak House have less flexibility on price but may offer upgraded rooms at the same price if occupancy is low.',
    },
  ],

  // ============================================================
  // EN: Convert driving licence
  // ============================================================
  'convert-foreign-driving-licence-japan': [
    {
      question: 'Can foreigners drive in Japan with an international driving permit?',
      answer: 'Yes, but only for the first year of residence. An International Driving Permit (IDP) from your home country, combined with your home country licence, allows driving in Japan for up to 12 months from your arrival. After that, you must convert to a Japanese driving licence (gaimen kirikae).',
    },
    {
      question: 'How do I convert my foreign driving licence to a Japanese licence?',
      answer: 'The conversion process (gaimen kirikae) is done at your local Driver\'s Licence Centre (Unten Menkyo Centre). Requirements: passport, residence card, current foreign licence, certified Japanese translation of your licence (by JAF or an embassy), residence certificate (juminchyo), and application fee (approx. 4,000 JPY). Processing takes 1-3 hours if all documents are correct.',
    },
    {
      question: 'Which countries have simplified driving licence conversion in Japan?',
      answer: 'EU countries (France, Germany, UK, etc.), Australia, Canada, New Zealand, Switzerland, and the US (some states) have reciprocal arrangements that simplify conversion: a written knowledge test is not required. Countries without reciprocal arrangements must pass a written test and sometimes a practical driving test at the licence centre.',
    },
    {
      question: 'How long does it take to convert a driving licence in Japan?',
      answer: 'If your country has a reciprocal agreement with Japan: the conversion is completed in one visit (3-5 hours total). Without a reciprocal agreement, the process may include a translation review, knowledge test, and practical test, taking multiple visits over 1-4 weeks. Make an appointment in advance at the Licence Centre as walk-in slots are limited.',
    },
  ],

  // ============================================================
  // EN: International moving company
  // ============================================================
  'international-moving-company-japan-guide': [
    {
      question: 'Which international moving companies operate in Japan?',
      answer: 'Major international movers with Japan operations include: Yamato Transport (Ta-Q-Bin, Japan\'s leading domestic mover with international services), Crown Relocations, Asian Tigers Japan, Nippon Express, Allied Pickfords, and Santa Fe Relocation. For smaller moves, services like Pack & Send or Sendico handle international parcel shipping at lower cost.',
    },
    {
      question: 'How much does an international move to Japan cost?',
      answer: 'International moving costs to Japan vary widely by origin and volume: a studio apartment volume from the US typically costs 3,000-6,000 USD by sea freight (6-8 weeks). Air freight is 2-4x more expensive but takes 1-2 weeks. Corporate relocation packages often cover these costs. Get at least 3 quotes as prices vary significantly.',
    },
    {
      question: 'What are the customs rules for bringing personal items to Japan?',
      answer: 'Personal household effects are generally duty-free when moving to Japan as a new resident. You must submit an inventory list with approximate values. Restricted items include: firearms, certain pharmaceuticals (check Japanese customs), alcohol over personal-use quantities, and fresh food products. A customs broker (tsukan gyosha) handles clearance for most international moves.',
    },
    {
      question: 'How do I receive my shipment in a small Tokyo apartment?',
      answer: 'Large elevator-equipped buildings accept standard moving trucks. Narrow street access is common in Tokyo: confirm access with your moving company before booking. For buildings without elevator access, a crane service (crane delivery) may be needed for large furniture at additional cost. Your moving company will assess the delivery logistics during the quote visit.',
    },
  ],

  // ============================================================
  // EN: Japanese language schools
  // ============================================================
  'japanese-language-schools-tokyo-guide': [
    {
      question: 'What are the best Japanese language schools in Tokyo for expats?',
      answer: 'Top Japanese language schools in Tokyo for expats include: Coto Academy (Ginza, professional-focused, small classes), ISI Language School (multiple locations, recognized for student visas), Human Academy Japanese Language School (competitive pricing), Naganuma School (long-established, quality instruction), and Nihon Language School (Shinjuku, popular with Western students).',
    },
    {
      question: 'How much do Japanese language schools cost in Tokyo?',
      answer: 'Group classes at reputable Tokyo language schools cost 15,000-30,000 JPY/month for 4 lessons/week. Private tutoring runs 3,000-8,000 JPY/hour. Intensive programs (20+ hours/week) cost 100,000-200,000 JPY/semester. Online platforms like Preply or iTalki offer budget alternatives at 1,500-4,000 JPY/hour with native speakers.',
    },
    {
      question: 'Do I need to enroll in a language school to get a student visa for Japan?',
      answer: 'If you want to study Japanese on a student visa (not a work or tourist visa), yes. You must be accepted into a Japanese government-recognized language school and apply through them. The school files the student visa application. Language school student visas allow part-time work (up to 28 hours/week) which helps offset living costs.',
    },
    {
      question: 'Can I learn Japanese in Tokyo without enrolling in a formal school?',
      answer: 'Yes. Many expats learn effectively through: private tutors (3-5x/week), language exchange apps (HelloTalk, Tandem), community groups such as language exchanges at local cafes, and self-study with structured resources (Genki textbooks, Anki flashcards). JLPT preparation courses are available at many community centers for low cost.',
    },
  ],

  // ============================================================
  // EN: Tokyo Osaka Kyoto which city
  // ============================================================
  // ============================================================
  // FR: Demenager au Japon checklist
  // ============================================================
  'demenager-japon-checklist-complete': [
    {
      question: 'Quelles sont les choses les plus importantes a faire avant de demenager au Japon?',
      answer: 'Avant de partir: obtenez votre visa de travail et le Certificat d\'Eligibilite (CoE) sponsorise par votre employeur, reservez un logement temporaire (share house ou appartement meuble), et preparez des copies physiques de tous vos documents: passeport, visa, contrat de travail et diplomes.',
    },
    {
      question: 'Que faire dans les deux premieres semaines apres l\'arrivee au Japon?',
      answer: 'Dans les 14 jours apres l\'arrivee: enregistrez votre adresse a la mairie de votre arrondissement (ku yakusho) pour activer votre carte de residence (zairyu card), inscrivez-vous a l\'assurance maladie nationale, procurez-vous une carte SIM japonaise et ouvrez un compte a la Japan Post Bank (le plus accessible pour les nouveaux arrivants).',
    },
    {
      question: 'Combien d\'argent faut-il prevoir pour le premier mois au Japon?',
      answer: 'Prevoyez au moins 400 000 a 600 000 JPY pour le premier mois dans un appartement standard: 2 a 3 mois de depot de garantie, reikin, frais d\'agence et frais de vie initiaux. Opter pour un share house ou un appartement meuble reduit considerablement les frais initiaux a 100 000-200 000 JPY.',
    },
    {
      question: 'Puis-je envoyer mes affaires au Japon par voie internationale?',
      answer: 'Oui. Les demenageurs internationaux (Yamato, Crown Relocations, Asian Tigers) proposent le transport maritime (4-8 semaines) et aerien (1-2 semaines). Le Japon applique des regles strictes de quarantaine: declarez tous les aliments, plantes et produits d\'origine animale a l\'arrivee. La plupart des effets personnels sont exempts de droits de douane.',
    },
  ],

  // ============================================================
  // FR: Cout de la vie Tokyo
  // ============================================================
  'cout-vie-tokyo-expatrie-2026': [
    {
      question: 'Combien coute la vie a Tokyo pour un expatrie en 2026?',
      answer: 'Un expatrie celibataire a Tokyo a besoin d\'environ 200 000 a 350 000 JPY/mois pour un mode de vie confortable: loyer 80 000-150 000 JPY (studio meuble), alimentation 40 000-60 000 JPY, transport 10 000-15 000 JPY avec un abonnement mensuel, charges 15 000-25 000 JPY, et depenses personnelles.',
    },
    {
      question: 'Tokyo est-elle plus chere que Paris ou Londres pour les expatries?',
      answer: 'Tokyo est comparable a Paris et Londres dans l\'ensemble, mais avec une structure de couts differente. Le loyer a Tokyo est inferieur a Paris ou Londres pour une surface equivalente. L\'alimentation et les transports sont souvent moins chers. Cependant, les appartements japonais sont plus petits que les standards occidentaux, ce qui affecte les comparaisons de loyers.',
    },
    {
      question: 'Quel est le mode de vie le moins cher pour un etranger a Tokyo?',
      answer: 'La solution la plus economique est un share house en banlieue proche (50 000-70 000 JPY/mois tout inclus), cuisiner a la maison avec des produits de supermarche, utiliser un abonnement mensuel de transport (teiki) et choisir un quartier sur une ligne locale plutot que la Yamanote.',
    },
    {
      question: 'Combien coute l\'alimentation par mois a Tokyo?',
      answer: 'Une personne qui cuisine chez elle depense 25 000-40 000 JPY/mois en courses a Tokyo. Les supermarchesDes supermarchesTels que Seiyu, OK Supermarket et Hanamasa sont nettement moins chers que les combinis. Les produits importes coutent 2 a 3 fois plus que leurs equivalents japonais.',
    },
  ],

  // ============================================================
  // FR: Ouvrir compte bancaire Japon
  // ============================================================
  'ouvrir-compte-bancaire-japon-etranger': [
    {
      question: 'Les etrangers peuvent-ils ouvrir un compte bancaire au Japon?',
      answer: 'Oui, mais le processus est plus restrictif que dans la plupart des pays occidentaux. Il faut: une carte de residence (zairyu card), une adresse enregistree au Japon et un numero de telephone japonais. La Japan Post Bank (Yucho) est l\'option la plus accessible pour les nouveaux arrivants.',
    },
    {
      question: 'Quelle banque est la plus facile d\'acces pour un etranger au Japon?',
      answer: 'La Japan Post Bank (Yucho Ginko) est la plus accessible avec un service en anglais et sans solde minimum. Sony Bank et Shinsei Bank sont aussi recommandees pour les expatries car elles proposent une interface en anglais et des fonctionnalites de virement international. Les grandes banques traditionnelles (MUFG, SMBC, Mizuho) sont plus difficiles d\'acces sans justificatif d\'emploi stable.',
    },
    {
      question: 'Combien de temps faut-il pour ouvrir un compte bancaire au Japon en tant qu\'etranger?',
      answer: 'La Japan Post Bank peut ouvrir un compte le jour meme en agence. Les demandes en ligne prennent 1 a 2 semaines par courrier. Les banques traditionnelles prennent generalement 1 a 3 semaines apres depot des documents. Certaines banques exigent que vous soyez inscrit a votre adresse depuis au moins 6 mois.',
    },
    {
      question: 'Quels documents sont necessaires pour ouvrir un compte bancaire au Japon?',
      answer: 'Documents generalement requis: carte de residence (zairyu card) ou passeport avec visa valide, justificatif de domicile (certificat de residence de la mairie), numero de telephone japonais, et dans certains cas justificatif d\'emploi ou de statut etudiant.',
    },
  ],

  // ============================================================
  // FR: Pieges location Tokyo
  // ============================================================
  'pieges-location-tokyo-etranger': [
    {
      question: 'Quels sont les pieges les plus courants pour les etrangers qui louent a Tokyo?',
      answer: 'Les problemes les plus frequents: les annonces leurres (le bien affiche est deja loue lors de la visite), les frais de remise en etat excessifs a la sortie, les frais caches non divulgues (nettoyage, remplacement de serrure), et les clauses du bail interdisant la sous-location ou le teletravail, decouverts apres signature.',
    },
    {
      question: 'Qu\'est-ce que le "reikin" et est-il encore pratique a Tokyo?',
      answer: 'Le reikin (cle de courtoisie) est un paiement non remboursable de 1 a 2 mois de loyer verse au proprietaire a la signature. Il est encore pratique par certains proprietaires, notamment pour les immeubles anciens. De nombreux proprietaires modernes et operateurs de share houses ont supprime cette pratique. Verifiez toujours si le reikin s\'applique avant de visiter.',
    },
    {
      question: 'Comment eviter les frais de remise en etat excessifs a Tokyo?',
      answer: 'Avant de signer: photographiez et documentez chaque rayure, tache et degat existant dans l\'appartement. Faites contresigner cet inventaire par le proprietaire. Selon les directives japonaises, le locataire n\'est responsable que des deteriorations au-dela de l\'usure normale. Demandez par ecrit la formule de calcul des frais de remise en etat avant signature.',
    },
    {
      question: 'Les agents immobiliers de Tokyo sont-ils de confiance pour les etrangers?',
      answer: 'La plupart des agents agrees (avec la licence nationale "takken") sont fiables. Le principal risque est un agent qui n\'explique pas les clauses cles du contrat en anglais ou en francais. Utilisez toujours un agent bilingue ou faites-vous accompagner par quelqu\'un de bilingue lors de la signature, et ne signez jamais un document que vous ne comprenez pas.',
    },
  ],

  // ============================================================
  // FR: Visa travail Japon francophone
  // ============================================================
  'visa-travail-japon-francophone-2026': [
    {
      question: 'Quels sont les principaux types de visas de travail disponibles au Japon?',
      answer: 'Les categories principales sont: Ingenieur/Specialiste en sciences humaines/Services internationaux (la plus courante pour les employes de bureau, l\'IT et les postes de communication), Travailleur qualifie, Chef d\'entreprise, Transfert interne d\'entreprise et Instructeur. La categorie correcte depend de votre secteur et du descriptif de poste. Une offre d\'emploi confirmee est requise.',
    },
    {
      question: 'Combien de temps faut-il pour obtenir un visa de travail japonais?',
      answer: 'Le processus complet prend 2 a 4 mois: votre employeur depose une demande de Certificat d\'Eligibilite (CoE) qui prend 1 a 3 mois, puis vous demandez le visa a l\'ambassade japonaise de votre pays avec le CoE, ce qui prend 1 a 5 jours ouvrables. Planifiez en consequence si vous avez une date de debut fixe.',
    },
    {
      question: 'Faut-il une offre d\'emploi pour demander un visa de travail au Japon?',
      answer: 'Oui. Le Japon ne delivre pas de visa "chercheur d\'emploi" general. Vous avez besoin d\'une offre d\'emploi confirmee d\'un employeur japonais qui agit comme votre garant et depose la demande de CoE aupres de l\'Agence des Services d\'Immigration en votre nom.',
    },
    {
      question: 'Peut-on changer d\'employeur au Japon avec un visa de travail?',
      answer: 'Oui, mais vous devez notifier l\'Agence des Services d\'Immigration dans les 14 jours suivant le changement d\'emploi. Votre nouveau poste doit relever de la meme categorie de visa. Si le type de poste change considerablement (par exemple d\'ingenieur a manager), vous devrez peut-etre demander un changement de statut avant de changer.',
    },
  ],

  // ============================================================
  // FR: Assurance maladie Japon
  // ============================================================
  'assurance-maladie-japon-expatrie': [
    {
      question: 'L\'assurance maladie est-elle obligatoire pour les etrangers vivant au Japon?',
      answer: 'Oui. Tous les residents au Japon, y compris les etrangers titulaires d\'une carte de residence, doivent souscrire a un regime d\'assurance maladie. Les salaries sont generalement affilies au Shakai Hoken (assurance de l\'employeur). Les independants et personnes entre deux emplois s\'inscrivent au Kokumin Kenko Hoken (assurance maladie nationale) a leur mairie.',
    },
    {
      question: 'Combien coute l\'assurance maladie au Japon pour un etranger?',
      answer: 'Pour l\'assurance de l\'employeur (Shakai Hoken), les cotisations sont partagees a 50/50 avec votre employeur, soit generalement 5 a 10% de votre salaire mensuel. Les cotisations au Kokumin Kenko Hoken sont basees sur les revenus: environ 5 a 10% des revenus de l\'annee precedente. Les nouveaux arrivants sans revenus anterieurs paient un minimum de 20 000 a 30 000 JPY/an.',
    },
    {
      question: 'Que couvre l\'assurance maladie japonaise?',
      answer: 'Les regimes standard couvrent 70% de tous les frais medicaux agrees dans les cliniques et hopitaux enregistres (vous payez 30%). Les soins dentaires, la vue et certains soins preventifs ont une couverture limitee. Les medicaments prescrits dans les pharmacies enregistrees sont couverts a 70%.',
    },
    {
      question: 'Puis-je utiliser mon assurance maladie de mon pays d\'origine au Japon?',
      answer: 'Non. Les assurances etrangeres ne sont pas acceptees pour la facturation standard dans les hopitaux japonais. Vous devez vous inscrire au systeme japonais. Certains expatries conservent l\'assurance publique japonaise et une assurance internationale privee pour les sejours a l\'etranger, mais l\'assurance publique japonaise est obligatoire.',
    },
  ],

  // ============================================================
  // FR: Impots revenus Japon expatrie
  // ============================================================
  'impots-revenus-japon-expatrie-2026': [
    {
      question: 'Les etrangers doivent-ils payer des impots sur le revenu au Japon?',
      answer: 'Oui. Tous les residents avec une carte de residence qui gagnent un revenu au Japon sont soumis a l\'impot sur le revenu japonais, quelle que soit leur nationalite. Si vous vivez au Japon depuis plus de 5 ans, vos revenus mondiaux peuvent aussi etre imposables au Japon. Les conventions fiscales entre le Japon et votre pays d\'origine peuvent eviter la double imposition.',
    },
    {
      question: 'Quel est le taux d\'imposition pour les etrangers au Japon?',
      answer: 'Le Japon applique un systeme progressif. Les taux nationaux vont de 5% (revenus inferieurs a 1,95M JPY) a 45% (revenus superieurs a 40M JPY). S\'y ajoute l\'impot local d\'habitation d\'environ 10% sur les revenus de l\'annee precedente. Les taux effectifs combines pour les salaires expatries typiques (5-15M JPY) sont de 25 a 40%.',
    },
    {
      question: 'Comment les etrangers declarent-ils leurs impots au Japon?',
      answer: 'Les salaries en entreprise japonaise ont generalement leurs impots preleves mensuellement (gensen choshu) et recoivent un ajustement de fin d\'annee (nenmatsu chosei) de leur employeur. Les independants et ceux ayant plusieurs sources de revenus doivent deposer une declaration fiscale finale (kakutei shinkoku) au bureau des impots avant le 15 mars de l\'annee suivante.',
    },
    {
      question: 'Les etrangers peuvent-ils obtenir un remboursement d\'impots au Japon?',
      answer: 'Oui. Si trop d\'impots ont ete preleves, vous recevez un remboursement apres l\'ajustement annuel ou la declaration finale. Les etrangers quittant le Japon en cours d\'annee peuvent deposer une demande de remboursement avant leur depart. Des deductions sont possibles pour les personnes a charge, les frais medicaux depassant 100 000 JPY/an et les interets d\'emprunt immobilier.',
    },
  ],

  // ============================================================
  // FR: Carte de residence Japon
  // ============================================================
  'carte-residence-japon-zairyu-card': [
    {
      question: 'Qu\'est-ce que la carte de residence japonaise (zairyu card)?',
      answer: 'La zairyu card (在留カード) est la carte d\'identite officielle delivree a tous les ressortissants etrangers sejournant au Japon plus de 3 mois. Elle indique votre nom, nationalite, adresse, statut de visa et activites autorisees. Elle est indispensable pour louer un appartement, ouvrir un compte bancaire et toutes les demarches administratives.',
    },
    {
      question: 'Comment obtenir la carte de residence au Japon?',
      answer: 'Si vous entrez au Japon avec un visa long sejour, la carte de residence est delivree au point d\'entree (principaux aeroports: Narita, Haneda, Kansai). Dans les 14 jours, vous devez enregistrer votre adresse a la mairie de votre arrondissement pour activer la carte. En cas de probleme, rendez-vous au Bureau Regional des Services d\'Immigration.',
    },
    {
      question: 'Combien de temps est valable la carte de residence?',
      answer: 'La validite depend de votre statut de visa: generalement 1 a 5 ans. La carte doit etre renouvelee avant son expiration. Si vous changez d\'adresse, d\'employeur ou de statut de visa, vous devez mettre a jour la carte a la mairie dans les 14 jours. Vous etes legalement tenu de la porter sur vous en permanence.',
    },
    {
      question: 'Que faire si je perds ma carte de residence au Japon?',
      answer: 'Signalez la perte au poste de police (koban) le plus proche et obtenez un certificat de perte (funshitsu todoke). Demandez ensuite un remplacement au Bureau Regional des Services d\'Immigration le plus proche dans les 14 jours. Le remplacement coute 1 600 JPY. Circuler sans carte valide peut entrainer des amendes.',
    },
  ],

  // ============================================================
  // FR: Negocier loyer Tokyo
  // ============================================================
  'negocier-loyer-tokyo-conseils': [
    {
      question: 'Peut-on negocier le loyer a Tokyo?',
      answer: 'Oui, la negociation est possible et plus courante que beaucoup d\'expatries ne le pensent. Les proprietaires sont generalement ouverts a negocier sur: le loyer mensuel (une reduction de 5 a 10% est realiste pour les biens vacants depuis longtemps), le reikin (parfois supprime), les mois gratuits en debut de bail ou les frais d\'agence reduits.',
    },
    {
      question: 'Quel est le meilleur moment pour negocier un loyer a Tokyo?',
      answer: 'Les meilleures periodes sont juin-aout et novembre-janvier, en dehors de la haute saison de demenagement (fevrier-avril). En haute saison, les proprietaires ont de nombreux candidats et negocient rarement. En dehors de cette periode, les taux de vacance augmentent et les proprietaires sont plus flexibles, surtout pour les biens vacants depuis plus de 3 mois.',
    },
    {
      question: 'Comment negocier un loyer a Tokyo en tant qu\'etranger?',
      answer: 'Negociez toujours par l\'intermediaire de votre agent, jamais directement avec le proprietaire. Demandez a votre agent de soumettre une offre formelle ecrite (moshikomi) avec vos conditions proposees. Les demandes qui fonctionnent: "Supprimez le reikin", "Offrez 2 mois gratuits" ou "Reduisez le loyer de 5 000 JPY/mois". Une approche polie et non conflictuelle est essentielle dans la culture des affaires japonaises.',
    },
    {
      question: 'Quelles reductions de loyer sont realistes a Tokyo?',
      answer: 'Les negociations aboutissent generalement a: 3 000-10 000 JPY/mois de reduction pour les biens vacants longtemps, suppression du reikin (valeur de 1 a 2 mois), 1 a 2 mois gratuits en debut, ou proprietaire prenant en charge les frais de nettoyage. Demander des reductions de plus de 10% du loyer affiche est rarement efficace dans le centre de Tokyo.',
    },
  ],

  // ============================================================
  // FR: Avis Sakura House
  // ============================================================
  'avis-sakura-house-tokyo': [
    {
      question: 'Sakura House est-il une bonne option pour les etrangers a Tokyo?',
      answer: 'Sakura House est l\'un des operateurs de share houses les plus etablis de Tokyo avec plus de 20 ans d\'experience. C\'est une option fiable dans sa gamme de prix (55 000-90 000 JPY/mois). Ses points forts incluent le service en anglais, aucune exigence de japonais et de nombreux emplacements. Ses limites: certains immeubles anciens et une qualite de gestion variable selon les proprietes.',
    },
    {
      question: 'Combien coute Sakura House par mois a Tokyo?',
      answer: 'Les tarifs mensuels de Sakura House vont de 55 000 JPY pour une petite chambre partagee a 90 000-120 000 JPY pour un studio prive. Les couts incluent generalement les meubles, le Wi-Fi et les charges (avec plafond de consommation). Les frais initiaux comprennent un frais d\'inscription d\'environ 15 000 JPY et un depot d\'un mois de loyer.',
    },
    {
      question: 'Quels sont les principaux reproches faits a Sakura House?',
      answer: 'Les reproches recurrents incluent: immeubles vieillissants dans certains emplacements (murs fins, salles de bain anciennes), frais supplementaires de consommation au-dela du forfait inclus, flexibilite limitee sur les dates d\'emmenagement, et proprete variable des espaces communs selon les residents. Il est recommande de lire les avis recents specifiques a chaque bien avant de reserver.',
    },
    {
      question: 'Quelles sont les meilleures alternatives a Sakura House a Tokyo?',
      answer: 'Les principales alternatives sont: Oak House (gamme de prix similaire, plus d\'emplacements), Borderless House (plus axe communaute internationale), Hituji Not Found (biens plus recents, meilleure qualite de design) et des appartements prives meubles via un service de relocation pour ceux qui cherchent plus d\'intimite.',
    },
  ],

  // ============================================================
  // FR: Alternative Remoters
  // ============================================================
  'alternative-remoters-chasseur-tokyo': [
    {
      question: 'Qu\'est-ce que Remoters et pourquoi chercher des alternatives?',
      answer: 'Remoters.io est une plateforme qui met en relation des travailleurs a distance avec des services de relocation, dont la recherche de logement au Japon. Les gens cherchent des alternatives car Remoters prend une commission de 20% sur les prestataires, repercutee sur le client, et la plateforme offre moins de personnalisation que de travailler directement avec un chasseur immobilier local.',
    },
    {
      question: 'Quelles sont les meilleures alternatives a Remoters pour trouver un logement a Tokyo?',
      answer: 'Les principales alternatives sont: travailler directement avec un chasseur immobilier bilingue a Tokyo (sans commission de plateforme), utiliser GaijinPot Housing pour des recherches en autonomie, ou faire appel a une societe de relocation complete comme Crown Relocations ou Asian Tigers pour des packages comprenant logement et logistique.',
    },
    {
      question: 'Est-il moins cher de passer par Remoters ou par un chasseur immobilier directement a Tokyo?',
      answer: 'Passer directement par un chasseur immobilier a Tokyo est generalement moins cher. Remoters facture aux prestataires une commission de plateforme de 20%, refletee dans le prix client. Un engagement direct supprime cette couche et offre souvent un meilleur service, l\'agent se concentrant entierement sur votre recherche.',
    },
    {
      question: 'Un chasseur immobilier local peut-il faire tout ce que propose Remoters?',
      answer: 'Oui. Un chasseur immobilier bilingue local couvre: la recherche de biens sur toutes les plateformes (y compris les sites japonais uniquement), le depot de dossier, la verification du contrat, la negociation avec le proprietaire et la coordination de l\'emmenagement, le tout en anglais ou en francais. Pour d\'autres services comme le visa ou le transport, il peut recommander des specialistes de confiance.',
    },
  ],

  // ============================================================
  // FR: Visa nomade digital Japon
  // ============================================================
  'visa-nomade-digital-japon-2026': [
    {
      question: 'Le Japon propose-t-il un visa nomade digital en 2026?',
      answer: 'Oui. Le Japon a lance un visa nomade digital en mars 2024, permettant aux travailleurs a distance gagnant au moins 10 millions JPY/an (environ 65 000 USD) aupres d\'entreprises non japonaises de sejour jusqu\'a 6 mois (non renouvelable). Une assurance sante privee couvrant le Japon est requise.',
    },
    {
      question: 'Qui peut beneficier du visa nomade digital japonais?',
      answer: 'Conditions d\'eligibilite: etre ressortissant etranger employe par une entreprise non japonaise ou independant, avoir un revenu annuel d\'au moins 10 millions JPY (environ 65 000 USD), disposer d\'une assurance sante privee couvrant le Japon, et etre ressortissant d\'un pays ayant une convention fiscale avec le Japon.',
    },
    {
      question: 'Les nomades digitaux peuvent-ils louer un appartement au Japon avec ce visa?',
      answer: 'Oui, mais c\'est plus difficile qu\'avec un visa de travail classique. La plupart des proprietaires preferent les locataires titulaires de visas sponsorises par un employeur. Les share houses et appartements meubles a courte duree sont les options les plus pratiques pour les titulaires du visa nomade digital, car ils necessitent moins de documents et offrent des contrats de duree correspondant au visa de 6 mois.',
    },
    {
      question: 'Le visa nomade digital japonais peut-il etre renouvele ou converti?',
      answer: 'Le visa nomade digital ne peut pas etre renouvele et ne se convertit pas directement en visa de travail standard. Apres 6 mois, vous devez quitter le Japon. Pour rester plus longtemps, vous devrez satisfaire aux conditions d\'un visa de travail standard, ce qui necessite un employeur japonais.',
    },
  ],

  // ============================================================
  // FR: PVT Japon visa vacances travail
  // ============================================================
  'pvt-japon-visa-vacances-travail-2026': [
    {
      question: 'Quels pays francophones peuvent obtenir un PVT pour le Japon?',
      answer: 'La France, la Belgique, la Suisse et le Canada font partie des pays ayant un accord de Permis Vacances Travail avec le Japon. Chaque pays a ses propres quotas annuels. Les ressortissants doivent en general avoir entre 18 et 30 ans (certains pays jusqu\'a 35 ans) et n\'avoir jamais obtenu ce visa pour ce pays auparavant.',
    },
    {
      question: 'Peut-on travailler a temps plein au Japon avec un PVT?',
      answer: 'Oui, avec des restrictions selon la nationalite. La plupart des titulaires de PVT peuvent travailler dans n\'importe quel secteur. Le PVT permet de travailler pour financer le voyage, pas a titre principal. La duree maximale de sejour est generalement de 12 mois, parfois extensible a 24 mois selon les accords bilateraux.',
    },
    {
      question: 'Comment trouver un logement au Japon avec un PVT?',
      answer: 'Les share houses et les logements pour etrangers (gaijin houses) sont les options les plus pratiques. Ils proposent des contrats mois par mois, sans garant, avec un support en anglais. Les appartements meublies en contrat mensuel sont une alternative plus onereuse mais plus privee. Les appartements standards sont difficiles d\'acces avec un PVT car les proprietaires preferent des titulaires de visa plus long terme.',
    },
    {
      question: 'Combien faut-il d\'argent pour faire un PVT au Japon?',
      answer: 'La plupart des accords PVT avec le Japon exigent de justifier d\'au moins 200 000-300 000 JPY (environ 1 200-2 000 EUR) de fonds disponibles lors de la demande. En pratique, prevoyez 500 000-800 000 JPY pour les 3 premiers mois (logement, nourriture, transport, installation) avant de percevoir votre premier salaire japonais.',
    },
  ],

  // ============================================================
  // FR: Quartiers Tokyo expatries
  // ============================================================
  'quartiers-tokyo-expatries-guide': [
    {
      question: 'Quels sont les meilleurs quartiers de Tokyo pour les expatries?',
      answer: 'Les quartiers les plus populaires pour les expatries a Tokyo sont: Shinjuku et Shibuya (centraux, internationaux, haut de gamme), Ebisu et Daikanyama (chic, restaurants occidentaux, plus calme), Nakameguro (tendance, ambiance creative), Shimokitazawa (boheme, abordable), et Koenji ou Nakano (plus local, nettement moins cher tout en etant bien desservi).',
    },
    {
      question: 'Quel quartier de Tokyo est le moins cher pour les expatries?',
      answer: 'Adachi, Katsushika, Edogawa et Arakawa dans le nord-est de Tokyo offrent des loyers 20 a 35% inferieurs a la moyenne de la boucle Yamanote tout en restant sur le reseau de metro. Suginami et Nerima a l\'ouest sont aussi abordables. La contrepartie est un trajet plus long et moins d\'equipements occidentaux a proximite.',
    },
    {
      question: 'L\'anglais est-il courant dans les quartiers de Tokyo?',
      answer: 'L\'anglais est plus repandu a Shinjuku, Shibuya, Minato et Roppongi, ou se concentrent de nombreuses entreprises internationales et services pour expatries. Dans les quartiers residentiels eloignes du centre (Adachi, Edogawa), l\'anglais quotidien est rare. Une application de traduction est utile dans tous les quartiers de Tokyo.',
    },
    {
      question: 'Quel quartier de Tokyo offre le meilleur acces aux produits alimentaires internationaux?',
      answer: 'Shinjuku (coreen, vietnamien, sud-est asiatique), Roppongi (restaurants occidentaux), Hiroo (europeens, supermarches occidentaux comme National Azabu) et Nakameguro (francais, italien) offrent la plus large selection de produits internationaux. Les supermarches Kaldi, Costco et National Azabu approvisionnent en produits importes dans toute la ville.',
    },
  ],

  // ============================================================
  // FR: Quartiers Tokyo familles
  // ============================================================
  'quartiers-tokyo-familles-expatriees-guide': [
    {
      question: 'Quels quartiers de Tokyo sont les mieux adaptes aux familles expatriees avec enfants?',
      answer: 'Les meilleurs quartiers familiaux pour expatries a Tokyo sont: Hiroo et Azabu-Juban (proches des grandes ecoles internationales, equipements occidentaux), Setagaya et Denenchofu (spacieux, verdoyant, calme, proche des ecoles internationales) et Bunkyo (oriente famille, proche des universites et de bonnes ecoles publiques).',
    },
    {
      question: 'Ou sont situees les ecoles internationales a Tokyo?',
      answer: 'Les principales ecoles internationales sont concentrees a Minato (British School in Tokyo, Azabu), Bunkyo (Tokyo International School), Setagaya (Deutsche Schule Tokyo Yokohama) et Yokohama (Canadian Academy, International School of the Sacred Heart). Choisissez votre quartier en fonction de l\'ecole preferee pour minimiser le trajet.',
    },
    {
      question: 'Tokyo est-elle sure pour les familles avec de jeunes enfants?',
      answer: 'Tokyo est regulierement classee parmi les villes les plus sures au monde pour les familles. Les taux de criminalite sont tres faibles, les enfants font souvent leurs trajets scolaires seuls des 6-7 ans, et les parcs et espaces publics sont propres et bien entretenus. La securite aux abords des ecoles est bien geree et les patrouilles de quartier (bohan patrol) sont actives dans les zones residentielles.',
    },
    {
      question: 'Combien coute un appartement familial a Tokyo?',
      answer: 'Un 2LDK (2 chambres plus sejour/salle a manger/cuisine) dans un quartier familial de Tokyo coute 150 000-250 000 JPY/mois a Minato ou Setagaya. Des options familiales plus abordables existent a Nerima, Suginami ou Edogawa a 100 000-160 000 JPY/mois pour une surface similaire, avec un trajet scolaire legerement plus long.',
    },
  ],

  // ============================================================
  // FR: Logement etudiant Tokyo guide
  // ============================================================
  'logement-etudiant-tokyo-guide': [
    {
      question: 'Quelles sont les options de logement pour les etudiants etrangers a Tokyo?',
      answer: 'Les etudiants etrangers a Tokyo choisissent generalement entre: les residences universitaires (les moins cheres, 20 000-50 000 JPY/mois, places limitees), les share houses pour etudiants (50 000-75 000 JPY/mois tout inclus), les gaijin houses (l\'option la moins chere, 35 000-55 000 JPY/mois, souvent plus anciennes) et les appartements prives meubles (80 000+ JPY/mois, plus d\'intimite).',
    },
    {
      question: 'Les etudiants etrangers peuvent-ils louer un appartement prive a Tokyo?',
      answer: 'Oui, mais c\'est difficile sans revenus japonais. La plupart des etudiants ont besoin d\'un garant: soit un citoyen japonais, soit une societe de garantie. Certains proprietaires acceptent les etudiants etrangers avec une preuve d\'inscription et des releves bancaires demontrant des fonds suffisants. Les appartements meubles ciblant les etudiants avec des baux flexibles sont les plus accessibles.',
    },
    {
      question: 'Combien de temps a l\'avance les etudiants etrangers doivent-ils chercher un logement a Tokyo?',
      answer: 'Pour l\'inscription d\'avril (semestre de printemps), commencez a chercher en decembre-janvier. Pour l\'inscription d\'octobre, commencez en juillet-aout. Les residences universitaires necessitent une demande 3 a 6 mois avant la rentree. Les share houses et appartements prives peuvent etre organises 1 a 2 mois a l\'avance.',
    },
    {
      question: 'Quelle est l\'option de logement la moins chere pour les etudiants a Tokyo?',
      answer: 'Les gaijin houses sont l\'option la moins chere a 35 000-55 000 JPY/mois, souvent avec les charges et internet inclus. Elles sont plus anciennes, parfois avec des salles de bain communes, mais situees dans des quartiers etudiants comme Waseda, Shinjuku ou Nakano. La qualite varie: lisez les avis recents avant de reserver.',
    },
  ],

  // ============================================================
  // FR: Logement etudiant Tokyo 2026
  // ============================================================
  'logement-etudiant-tokyo-2026': [
    {
      question: 'Qu\'est-ce qui a change dans le logement etudiant a Tokyo en 2026?',
      answer: 'En 2026, la demande de logement etudiant a Tokyo a augmente avec l\'inscription record d\'etudiants etrangers au Japon. De nouveaux immeubles de co-living ciblant les etudiants ont ouvert a Shinjuku, Shibuya et Bunkyo. La competition pour les share houses abordables et les residences universitaires s\'est intensifiee, rendant la reservation anticipee (3 a 4 mois avant) plus importante.',
    },
    {
      question: 'Quel est le loyer moyen pour un logement etudiant a Tokyo en 2026?',
      answer: 'Loyers moyens 2026 pour le logement etudiant: gaijin houses 40 000-60 000 JPY/mois, share houses 55 000-85 000 JPY/mois tout inclus, studios prives meubles 80 000-130 000 JPY/mois. Les residences universitaires restent les moins cheres a 20 000-50 000 JPY/mois mais sont tres limitees en nombre de places.',
    },
    {
      question: 'Vaut-il mieux vivre en share house ou en residence universitaire en tant qu\'etudiant etranger a Tokyo?',
      answer: 'Les residences universitaires sont moins cheres et garantissent une communaute structuree, mais sont limitees (generalement seulement pour la premiere annee). Les share houses offrent plus d\'independance, une configuration internet et charges plus facile, et un melange de residents japonais et etrangers qui aide a l\'apprentissage de la langue. Les share houses sont le choix prefere apres la premiere annee.',
    },
    {
      question: 'Quels quartiers sont les meilleurs pour les etudiants a Tokyo?',
      answer: 'Les meilleurs quartiers pour etudiants sont: Waseda et Takadanobaba (pres de l\'universite Waseda, abordable et tres etudiant), Hongo et Nezu (pres de l\'universite de Tokyo), Nakano et Koenji (abordable, ambiance creative, excellent transport), et Sangenjaya (populaire, milieu de gamme, bonne ambiance). Evitez de louer a Minato ou Shibuya: la prime de prix n\'est pas justifiee pour les etudiants.',
    },
  ],

  // ============================================================
  // FR: Internet et utilites Tokyo appartement
  // ============================================================
  'internet-utilitaires-tokyo-appartement': [
    {
      question: 'Comment installer l\'electricite, le gaz et l\'eau dans un appartement a Tokyo?',
      answer: 'L\'electricite et le gaz necessitent de contacter le fournisseur indique par votre proprietaire ou le fournisseur par defaut de votre zone (Tokyo Electric Power pour l\'electricite, Tokyo Gas pour la plupart de Tokyo). Appelez ou utilisez leurs formulaires en ligne en anglais pour enregistrer votre nom et votre date d\'emmenagement. L\'eau est enregistree a la mairie lors de l\'enregistrement d\'adresse.',
    },
    {
      question: 'Y a-t-il des fournisseurs d\'utilites anglophones a Tokyo?',
      answer: 'Tokyo Electric Power (TEPCO) dispose d\'une ligne telephonique en anglais. Tokyo Gas propose un formulaire d\'inscription en anglais en ligne. Si appeler en japonais est difficile, votre proprietaire ou un agent bilingue peut enregistrer les charges en votre nom le jour de l\'emmenagement.',
    },
    {
      question: 'Combien coutent les charges mensuelles dans un appartement a Tokyo?',
      answer: 'Pour un studio ou 1K standard: electricite 5 000-10 000 JPY/mois (plus en ete/hiver pour la climatisation), gaz 3 000-6 000 JPY/mois, eau souvent incluse dans le loyer ou 2 000-3 000 JPY/mois. Internet (fibre) coute 4 000-6 000 JPY/mois separement. Les share houses et appartements meubles regroupent generalement ces couts.',
    },
    {
      question: 'Faut-il parler japonais pour installer internet a Tokyo?',
      answer: 'Pas necessairement. NTT Hikari (fibre) et SoftBank proposent un support client en anglais pour l\'inscription. Les routeurs Wi-Fi portables (disponibles aupres de Japan Travel SIM ou IIJmio) sont une alternative plus rapide ne necessitant aucune installation: branchement immediat le jour de l\'arrivee. La fibre fixe prend 1 a 4 semaines a installer en raison du planning des techniciens.',
    },
  ],

  // ============================================================
  // FR: Carte SIM Japon etranger
  // ============================================================
  'carte-sim-japon-etranger-2026': [
    {
      question: 'Quelle est la meilleure carte SIM pour les etrangers vivant au Japon?',
      answer: 'Pour les residents de longue duree, les meilleures options sont: IIJmio (fiable, abordable a 2 000-3 000 JPY/mois), Y! Mobile (reseau SoftBank, support anglais, 2 000-4 000 JPY/mois) et Rakuten Mobile (donnees illimitees les moins cheres a 3 278 JPY/mois). Toutes necessitent une carte de residence et un compte bancaire ou carte de credit japonais. Evitez les SIM touristes pour des sejours de plus de 3 mois.',
    },
    {
      question: 'Les etrangers peuvent-ils obtenir une carte SIM au Japon sans carte de residence?',
      answer: 'Des SIM de donnees uniquement pour touristes sont disponibles sans carte de residence (SIM touriste IIJmio, SIM donnees Docomo). Cependant, les SIM voix (avec numero de telephone) necessite une carte de residence. Si vous attendez votre carte de residence, une SIM touriste comble l\'ecart pendant les premieres semaines.',
    },
    {
      question: 'Combien de temps faut-il pour obtenir une carte SIM au Japon?',
      answer: 'Les SIM physiques achetees dans les magasins d\'electronique (Yodobashi, BIC Camera) ou les combinis sont disponibles immediatement. Les demandes de SIM en ligne prennent 3 a 7 jours ouvrables pour la livraison. Les eSIM d\'IIJmio ou Rakuten peuvent etre activees en quelques heures apres l\'inscription en ligne si vous avez une carte de residence et un moyen de paiement pret.',
    },
    {
      question: 'Quels documents sont necessaires pour acheter une carte SIM au Japon?',
      answer: 'Pour une SIM de resident: carte de residence (zairyu card), carte de credit valide ou compte bancaire japonais et adresse japonaise. Le personnel du magasin photographiera votre carte de residence pour verification. Certains fournisseurs acceptent un passeport avec un cachet de visa long sejour valide si votre carte de residence n\'a pas encore ete emise.',
    },
  ],

  // ============================================================
  // FR: Virement international Japon
  // ============================================================
  'virement-international-japon-wise-revolut': [
    {
      question: 'Quel est le moyen le moins cher pour envoyer de l\'argent au Japon depuis l\'etranger?',
      answer: 'Wise (anciennement TransferWise) propose regulierement les frais les plus bas et les meilleurs taux de change pour les virements internationaux vers le Japon, generalement 0,4 a 0,7% du montant transfere. Revolut est comparable. Evitez les virements bancaires traditionnels (generalement 25-50 USD de frais par virement avec de mauvais taux de change).',
    },
    {
      question: 'Combien de temps prend un virement international vers un compte bancaire japonais?',
      answer: 'Les virements Wise arrivent generalement en 1 a 2 jours ouvrables dans les principales banques japonaises (Yucho, MUFG, SMBC, Mizuho, Shinsei). Les virements du week-end prennent plus longtemps. Les virements SWIFT traditionnels peuvent prendre 3 a 5 jours ouvrables.',
    },
    {
      question: 'Peut-on utiliser Revolut ou N26 au Japon?',
      answer: 'Les cartes Revolut fonctionnent au Japon pour les retraits DAB et les paiements par carte (Mastercard ou Visa acceptes largement). N26 ne prend pas en charge les comptes JPY actuellement. Pour vivre regulierement au Japon, vous aurez quand meme besoin d\'un compte bancaire local japonais pour le loyer, les charges et les virements nationaux.',
    },
    {
      question: 'Y a-t-il des limites sur le montant que je peux transferer au Japon?',
      answer: 'Le Japon exige la declaration de tout transfert transfrontalier superieur a 1 million JPY (environ 7 000 USD). Cela est gere automatiquement par votre banque et ne constitue pas un obstacle pour les transferts legitimes. Les gros virements (superieur a 50 000 USD) peuvent declencher un examen de conformite supplementaire par votre banque expeditrice et la banque japonaise receptrice.',
    },
  ],

  // ============================================================
  // FR: Tokyo vs Osaka comparatif
  // ============================================================
  'tokyo-osaka-ou-vivre-expatrie-comparatif': [
    {
      question: 'Tokyo ou Osaka est-elle la meilleure ville pour les expatries?',
      answer: 'Tokyo est superieure pour les expatries travaillant dans la finance, la tech, les affaires internationales, ou ceux cherchant le marche de l\'emploi le plus large et les services anglophones. Osaka est meilleure pour les expatries privilegiant un cout de la vie plus bas (loyers 20 a 35% moins chers), une culture sociale plus detendue et la proximite de Kyoto et Nara.',
    },
    {
      question: 'Osaka est-elle moins chere que Tokyo pour les loyers?',
      answer: 'Oui. Un studio meuble dans le centre d\'Osaka coute 60 000-100 000 JPY/mois contre 80 000-150 000 JPY dans le centre de Tokyo. Les restaurants et les depenses quotidiennes sont aussi 10 a 20% moins chers a Osaka. La difference de cout est significative pour ceux qui ne beneficient pas d\'un salaire de niveau tokyoite.',
    },
    {
      question: 'Quelle ville offre de meilleures opportunites d\'emploi pour les etrangers: Tokyo ou Osaka?',
      answer: 'Tokyo compte environ 5 a 10 fois plus d\'opportunites d\'emploi internationales. La plupart des bureaux japonais de multinationales, entreprises tech et societes de finance ont leur siege a Tokyo. Osaka offre des opportunites dans l\'industrie manufacturiere, la sante et le commerce, mais le marche de l\'emploi anglophone est nettement plus petit.',
    },
    {
      question: 'Est-il facile de trouver un logement en tant qu\'etranger a Osaka par rapport a Tokyo?',
      answer: 'Les deux villes ont des exigences similaires pour les locataires etrangers (carte de residence, garant ou societe de garantie, justificatif de revenus). Osaka a moins d\'operateurs specialises pour etrangers que Tokyo, mais le processus global est comparable. Les prix sont plus favorables a Osaka et la competition pour les appartements est moins forte qu\'a Tokyo en haute saison.',
    },
  ],

  // ============================================================
  // FR: Gaijin house vs share house difference
  // ============================================================
  'gaijin-house-vs-share-house-difference': [
    {
      question: 'Quelle est la difference entre un gaijin house et un share house a Tokyo?',
      answer: 'Un gaijin house (maison pour etrangers) est l\'ancien terme designant les logements partages construits specifiquement pour les residents non-japonais, generalement en style dortoir, moins chers et avec des installations plus anciennes. Un share house moderne propose des chambres privees, de meilleures parties communes, un melange de residents japonais et etrangers, et des standards plus eleves.',
    },
    {
      question: 'Les gaijin houses existent-ils encore a Tokyo?',
      answer: 'Oui, bien que le terme soit moins courant. Ce qui reste des gaijin houses traditionnels propose les logements les moins chers de Tokyo a 35 000-55 000 JPY/mois. Ils ont generalement des immeubles plus anciens, des salles de bain communes et des cuisines basiques. Cherchez "foreigner-friendly houses" ou "guest house Tokyo" pour trouver cette categorie.',
    },
    {
      question: 'Un gaijin house ou un share house est-il meilleur pour rencontrer des gens a Tokyo?',
      answer: 'Les share houses modernes sont generalement meilleurs pour les connexions sociales, surtout ceux avec des residents japonais (Borderless House, Hituji Not Found). Les gaijin houses traditionnels attirent davantage les voyageurs de courte duree et la communaute est plus ephemere. Si construire un reseau social a Tokyo est important, choisissez un share house avec des evenements communautaires organises.',
    },
    {
      question: 'Combien un gaijin house est-il moins cher qu\'un share house a Tokyo?',
      answer: 'Les gaijin houses sont generalement 15 000-25 000 JPY/mois moins chers que les share houses comparables. Une chambre partagee en gaijin house coute 35 000-50 000 JPY/mois contre une chambre privee en share house a 55 000-80 000 JPY/mois. La contrepartie est des installations plus anciennes, des salles de bain communes et moins d\'intimite.',
    },
  ],

  // ============================================================
  // FR: Transport Tokyo expatrie
  // ============================================================
  'transport-tokyo-expatrie-guide': [
    {
      question: 'Comment fonctionnent les transports en commun a Tokyo pour les expatries?',
      answer: 'Les transports de Tokyo combinent les lignes JR (boucle Yamanote et lignes regionales), le Tokyo Metro (9 lignes), le metro Toei (4 lignes) et les lignes privees (Keio, Odakyu, Tokyu, Seibu, Tobu). Une carte IC Suica ou Pasmo couvre tous ces reseaux et se recharge a n\'importe quelle machine de station. Les abonnements mensuels (teiki) offrent des economies significatives pour les trajets reguliers.',
    },
    {
      question: 'Comment obtenir une carte Suica a Tokyo?',
      answer: 'Les cartes Suica sont disponibles dans les machines a billets JR de toutes les gares JR (depot de 500 JPY, rechargement libre). Vous pouvez aussi obtenir une Suica sur iPhone ou Apple Watch via l\'application Wallet (sans carte physique). Pasmo est equivalent et disponible dans les stations Tokyo Metro. Les deux fonctionnent sur tous les transports et dans de nombreux combinis.',
    },
    {
      question: 'Combien coute un abonnement mensuel de transport a Tokyo?',
      answer: 'Les abonnements mensuels (teiki) sont calcules par trajet et distance. Un trajet typique intra-muros (ex: Shinjuku-Shibuya) coute environ 3 000-5 000 JPY/mois. Un trajet plus long (ex: Chiba-Shinjuku) coute 10 000-18 000 JPY/mois. L\'abonnement est valable pour un trajet specifique mais permet un nombre illimite de trajets sur cet itineraire.',
    },
    {
      question: 'Peut-on se deplacer a velo a Tokyo?',
      answer: 'Oui, le velo est pratique dans le centre plat de Tokyo. De nombreux expatries pedalent pour les courts trajets (moins de 5-6 km). Enregistrez votre velo a la mairie de votre arrondissement (obligatoire par la loi) et respectez le code de la route: circuler sur les trottoirs est techniquement illegal sauf dans les zones designees. Le velo en libre-service Docomo Cycle est disponible dans de nombreux arrondissements centraux.',
    },
  ],

  // ============================================================
  // FR: Travailler a Tokyo expatrie
  // ============================================================
  'travailler-tokyo-expatrie-guide-2026': [
    {
      question: 'Quels secteurs recrutent des etrangers a Tokyo?',
      answer: 'Les secteurs les plus actifs pour les etrangers a Tokyo sont: la technologie (ingenierie logicielle, gestion de produit), la finance (banque, fintech, private equity), l\'enseignement de l\'anglais (ALT, tutorat prive, formation corporate), le commerce international et la logistique, l\'hotellerie et le tourisme, et les industries creatives (design, marketing pour marques mondiales).',
    },
    {
      question: 'Faut-il parler japonais pour travailler a Tokyo?',
      answer: 'Pas pour tous les postes. De nombreuses entreprises internationales a Tokyo fonctionnent en anglais, notamment dans la tech, la finance et le conseil. Cependant, la maitrise du japonais (N3 ou superieur) elargit considerablement vos options et votre niveau de salaire. Les postes necessitant le japonais (N2-N1) offrent generalement une meilleure remuneration et une plus grande stabilite a long terme.',
    },
    {
      question: 'Quel est le salaire moyen pour les expatries a Tokyo?',
      answer: 'Les recrutements internationaux en debut de carriere gagnent generalement 3 000 000 a 5 000 000 JPY/an. Les professionnels en milieu de carriere gagnent 6 000 000 a 12 000 000 JPY/an. Les postes seniors et financiers atteignent 15 000 000 a 30 000 000 JPY/an. Les packages d\'expatries peuvent inclure une indemnite de logement, les frais de scolarite des enfants et le retour au pays.',
    },
    {
      question: 'Comment est la culture de travail japonaise pour les etrangers?',
      answer: 'La culture de travail japonaise valorise la hierarchie, la recherche de consensus (nemawashi) et la ponctualite. Pour les etrangers: arrivez a l\'heure (le retard est tres mal percu), communiquez de facon directe mais polie, participez aux sorties apres le travail (nomikai) importantes pour les relations professionnelles, et comprenez que les heures supplementaires sont courantes dans les secteurs traditionnels.',
    },
  ],

  // ============================================================
  // FR: Importer animal de compagnie Japon
  // ============================================================
  'importer-animal-compagnie-japon-guide': [
    {
      question: 'Puis-je amener mon chien ou mon chat au Japon?',
      answer: 'Oui, mais le Japon a l\'un des processus d\'importation d\'animaux les plus stricts au monde. Pour les chiens et chats en provenance de la plupart des pays occidentaux: le processus prend au minimum 180 jours depuis la micropuce et la vaccination antirabique jusqu\'au test de titre d\'anticorps et a la periode d\'attente. Arriver sans completer toutes les etapes entraine 180 jours de quarantaine gouvernementale a vos frais.',
    },
    {
      question: 'Combien de temps faut-il pour importer un animal de compagnie au Japon?',
      answer: 'Depuis la plupart des pays occidentaux, le processus minimum prend 7 a 8 mois: micropuce, deux vaccinations antirabiques, test de titre d\'anticorps, attente de 180 jours, documentation officielle du veterinaire, pre-approbation de l\'autorite japonaise de quarantaine et inspection a l\'arrivee. La periode d\'attente de 180 jours ne peut pas etre raccourcie.',
    },
    {
      question: 'Peut-on trouver un appartement avec animaux a Tokyo?',
      answer: 'Les appartements acceptant les animaux a Tokyo existent mais sont limites, representant typiquement 10 a 20% du marche. Ils demandent souvent un depot plus eleve (1 a 3 mois supplementaires) et certains exigent des frais de restauration supplementaires a la sortie. Cherchez specifiquement les immeubles "petto kyodai" (ペット共生). Les share houses n\'acceptent generalement pas les animaux.',
    },
    {
      question: 'Combien coute l\'importation d\'un animal de compagnie au Japon?',
      answer: 'Le cout total pour importer un animal de compagnie au Japon varie generalement de 3 000 a 8 000 USD: preparation veterinaire 500-2 000 USD, endossement officiel 200-500 USD, frais de transport aerien 300-700 USD, inspection de quarantaine japonaise 20 000-40 000 JPY, et service optionnel de transport d\'animaux 1 000-3 000 USD.',
    },
  ],

  // ============================================================
  // FR: Famille expatriee Tokyo ecoles internationales
  // ============================================================
  'famille-expatriee-tokyo-ecoles-internationales': [
    {
      question: 'Combien coutent les ecoles internationales a Tokyo?',
      answer: 'Les frais de scolarite dans les ecoles internationales de Tokyo varient de 1 500 000 a 3 500 000 JPY/an (environ 10 000 a 23 000 USD) selon l\'ecole et le niveau scolaire. Les ecoles de premier plan (British School in Tokyo, American School in Japan) se situent dans la fourchette haute. De nombreux packages d\'expatries couvrent entierement les frais de scolarite.',
    },
    {
      question: 'Quelles sont les meilleures ecoles internationales de Tokyo?',
      answer: 'Les ecoles internationales bien considerees a Tokyo incluent: American School in Japan (ASIJ) a Chofu, British School in Tokyo (BST) a Shinjuku/Shibuya, Tokyo International School (TIS) a Minato, Canadian International School (CIS) a Minami-Azabu, et German Swiss International School (GSIS). Chacune suit un programme national different.',
    },
    {
      question: 'Combien de temps a l\'avance faut-il postuler dans les ecoles internationales de Tokyo?',
      answer: 'Postulez 12 a 18 mois a l\'avance pour les ecoles populaires comme ASIJ et BST qui ont des listes d\'attente. Les ecoles moins sollicitees peuvent avoir des places disponibles 3 a 6 mois avant. Si votre entreprise vous relocalise, les RH doivent commencer le processus de candidature scolaire en meme temps que le processus de visa.',
    },
    {
      question: 'Y a-t-il de bonnes ecoles publiques pour les etrangers a Tokyo?',
      answer: 'Les ecoles publiques japonaises sont gratuites et legalement tenues d\'accepter les enfants etrangers. Cependant, l\'enseignement est entierement en japonais avec un support anglais limite. Les enfants qui ne parlent pas japonais ont generalement besoin de 1 a 2 ans pour s\'adapter. Certains arrondissements ont des programmes de soutien en japonais. L\'ecole publique est une bonne option pour les familles s\'installant durablement au Japon.',
    },
  ],

  // ============================================================
  // FR: Assurance habitation Japon locataire
  // ============================================================
  'assurance-habitation-japon-locataire': [
    {
      question: 'L\'assurance habitation est-elle obligatoire au Japon?',
      answer: 'Oui, l\'assurance habitation locataire (kasai hoken ou kaketsuke hoken) est obligatoire dans pratiquement tous les contrats de location japonais. Les proprietaires l\'exigent pour se proteger contre les incendies, les degats des eaux chez les voisins et la responsabilite civile. Le cout est tres faible: environ 10 000-20 000 JPY pour une police de 2 ans.',
    },
    {
      question: 'Que couvre l\'assurance habitation au Japon?',
      answer: 'L\'assurance habitation standard japonaise couvre: les degats d\'incendie et de fumee, les degats des eaux (canalisations ou appartement voisin), le vol, et la responsabilite civile (ex: votre baignoire deborde et endommage l\'appartement du dessous). Elle ne couvre generalement pas les degats sismiques, qui necessitent une garantie tremblement de terre separee.',
    },
    {
      question: 'Ou les etrangers peuvent-ils souscrire une assurance habitation au Japon?',
      answer: 'De nombreux proprietaires et agences proposent une assurance habitation a la signature par leur assureur affilie. Vous pouvez aussi souscrire independamment aupres de: Tokio Marine, Sompo Japan, AIG Japan, ou via des plateformes anglophones. Souscrire independamment est parfois moins cher. Les offres en ligne de societes comme Chubb Japan acceptent les paiements par carte etrangere.',
    },
    {
      question: 'L\'assurance habitation couvre-t-elle les tremblements de terre au Japon?',
      answer: 'L\'assurance habitation standard ne couvre pas les degats sismiques. Vous devez ajouter une garantie tremblement de terre (jishin hoken) separement. Vue l\'activite sismique du Japon, cette garantie est vivement recommandee. Le cout supplementaire est generalement de 5 000-15 000 JPY par an. Verifiez si la structure de votre immeuble (bois ou beton arme) influence la prime.',
    },
  ],

  // ============================================================
  // FR: Jiko bukken appartements pas chers Tokyo
  // ============================================================
  'jiko-bukken-appartements-pas-chers-tokyo': [
    {
      question: 'Qu\'est-ce qu\'un jiko bukken au Japon?',
      answer: 'Les jiko bukken (事故物件) sont des appartements ou un incident s\'est produit: generalement un deces (causes naturelles, suicide ou accident) ou un crime grave. La loi japonaise oblige les proprietaires a divulguer ces incidents pendant une periode definie (generalement 3 ans pour suicide ou homicide). Ces appartements sont affiches 15 a 30% en dessous du prix du marche.',
    },
    {
      question: 'Les appartements jiko bukken sont-ils dangereux?',
      answer: 'Les appartements jiko bukken sont structurellement et physiquement surs. La reduction de prix reflete la stigmatisation sociale et un inconfort psychologique, pas un danger physique. Apres nettoyage professionnel et renovation eventuelle, ces appartements sont equivalents a n\'importe quel autre. De nombreux etrangers pragmatiques les choisissent pour les economies significatives.',
    },
    {
      question: 'Comment trouver des appartements jiko bukken a Tokyo?',
      answer: 'La principale plateforme pour les annonces jiko bukken est Oshimaland.co.jp (en japonais uniquement). Certains sites d\'annonces generaux (SUUMO, AtHome) peuvent inclure des jiko bukken avec des notes de divulgation. Les agents immobiliers sont tenus de divulguer le statut si on leur pose la question directement. Preciser "jiko bukken OK" a votre agent fera remonter des options.',
    },
    {
      question: 'Quel est le principal risque avec un appartement jiko bukken?',
      answer: 'Le principal risque pratique est la stigmatisation a la revente ou a la re-location si vous devez partir avant terme: certains proprietaires facturent des frais supplementaires ou peuvent refuser de renouveler apres avoir propose un prix inferieur au marche. L\'aspect psychologique est une decision personnelle. Prevoyez un nettoyage approfondi a l\'emmenagement apres un incident divulgue, meme si le proprietaire a deja fait nettoyer.',
    },
  ],

  // ============================================================
  // FR: Appartement Tokyo septembre guide
  // ============================================================
  'appartement-tokyo-septembre-guide': [
    {
      question: 'Septembre est-il un bon moment pour trouver un appartement a Tokyo?',
      answer: 'Septembre est un moment moderement favorable pour chercher. Il se situe en dehors de la haute saison principale (fevrier-avril), donc la concurrence est plus faible et certains proprietaires sont plus enclins a negocier. Cependant, il coincide avec l\'entree universitaire d\'octobre, creant une demande moderee de la part des etudiants. La disponibilite est meilleure qu\'au printemps.',
    },
    {
      question: 'Combien de temps a l\'avance faut-il chercher pour un emmenagement en septembre a Tokyo?',
      answer: 'Commencez votre recherche 4 a 6 semaines avant votre date d\'emmenagement cible. Les biens deviennent generalement disponibles 2 a 4 semaines avant la date d\'emmenagement affichee. Pour un emmenagement le 1er septembre, commencez a chercher fin juillet ou debut aout. Les share houses et appartements meubles ont une flexibilite plus grande et peuvent parfois organiser un emmenagement en quelques jours.',
    },
    {
      question: 'Les loyers sont-ils moins chers en septembre a Tokyo?',
      answer: 'Les loyers sont generalement 5 a 10% plus negociables en septembre qu\'en haute saison (fevrier-avril). Les proprietaires dont les biens sont vacants depuis le printemps sont motives pour louer avant le prochain pic. Cela fait de septembre l\'un des meilleurs mois pour obtenir des reductions de prix, des mois gratuits ou la suppression du reikin.',
    },
    {
      question: 'Dans quels quartiers est-il le plus facile de trouver un appartement en septembre a Tokyo?',
      answer: 'Les quartiers avec un taux de rotation eleve sont les plus faciles en septembre: Shinjuku, Shibuya, Nakano, Koenji et les zones autour des grands campus universitaires (Waseda, Hongo). Ces zones ont des populations plus importantes d\'etudiants et de jeunes professionnels avec des cycles de demenagement frequents.',
    },
  ],

  // ============================================================
  // FR: Appartement meuble Tokyo expats
  // ============================================================
  'appartement-meuble-tokyo-expats': [
    {
      question: 'Quelle est la difference entre un appartement meuble et un share house pour les expatries a Tokyo?',
      answer: 'Un appartement meuble vous donne une unite privee independante avec votre propre cuisine, salle de bain et entree. Un share house vous donne une chambre privee avec des espaces communs partages. Les appartements meubles coutent plus cher (80 000-180 000 JPY/mois) mais offrent une totale intimite. Les share houses sont moins chers (50 000-90 000 JPY/mois tout inclus) mais impliquent une vie communautaire.',
    },
    {
      question: 'Peut-on trouver des appartements meubles a Tokyo avec des contrats mois par mois?',
      answer: 'Oui. Les operateurs de "monthly mansion" (マンスリーマンション) proposent des appartements meubles sur des contrats de 1 a 6 mois renouvelables. Ces appartements coutent 10 a 25% de plus par mois que les baux standard mais offrent de la flexibilite sans engagement a long terme ni grands depots initiaux.',
    },
    {
      question: 'Qu\'est-ce qui est generalement inclus dans un appartement meuble a Tokyo pour les expatries?',
      answer: 'Les appartements meubles standard pour expatries incluent: lit et matelas, bureau et chaise, refrigerateur, machine a laver, micro-ondes, climatisation reversible, equipement de cuisine de base et rideaux. Internet et les charges sont parfois inclus. Verifiez toujours les inclusions exactes avant de signer.',
    },
    {
      question: 'Les appartements meubles a Tokyo sont-ils disponibles sans garant?',
      answer: 'De nombreux operateurs d\'appartements meubles ciblant les expatries renoncent a l\'exigence de garant. Les conditions portent plutot sur: un visa valide avec au moins 3 a 6 mois restants, un contrat de travail ou justificatif de revenus, et le paiement du premier et dernier mois a l\'avance. Cela fait des appartements meubles l\'option la plus accessible pour les nouveaux arrivants.',
    },
  ],

  // ============================================================
  // FR: Logement etudiant Tokyo octobre
  // ============================================================
  'logement-etudiant-tokyo-octobre': [
    {
      question: 'Quand les etudiants etrangers arrivant en octobre doivent-ils commencer a chercher un logement a Tokyo?',
      answer: 'Commencez votre recherche en juin-juillet pour une inscription en octobre. Les dossiers de residence universitaire ferment souvent en mai-juin. Les share houses avec disponibilite en octobre se remplissent a partir d\'aout, car les etudiants finalisent leurs inscriptions. Attendre septembre limite considerablement vos options pour un emmenagement en octobre.',
    },
    {
      question: 'Octobre est-il une periode competitive pour le logement etudiant a Tokyo?',
      answer: 'Oui, moderement. Octobre est le deuxieme pic d\'inscription (apres avril). Les universites avec entree en octobre (Waseda, Sophia, plusieurs programmes de master) generent une demande importante de logement. Les share houses a proximite de ces campus se remplissent rapidement. Reservez 2 a 3 mois a l\'avance pour le meilleur choix.',
    },
    {
      question: 'Peut-on trouver un logement etudiant a Tokyo avec un bail court pour octobre?',
      answer: 'Oui. Les options courte duree pour l\'entree d\'octobre incluent: appartements meubles avec contrats de 3 a 6 mois, share houses avec accords mois par mois (la plupart des operateurs), et logement universitaire si disponible. Cela vous permet de vous installer et de chercher un appartement plus long terme apres etre arrive et avoir explore la ville.',
    },
    {
      question: 'Dans quel quartier habiter en tant qu\'etudiant commencant en octobre a Tokyo?',
      answer: 'Choisissez en fonction de votre universite: les etudiants de Waseda a Takadanobaba ou Waseda, de Sophia a Yotsuya ou Shinjuku, de Keio a Mita ou Shibuya. Le cout supplementaire de la proximite du campus vaut generalement la peine pour le premier semestre pendant lequel vous construisez votre reseau tokyoite.',
    },
  ],

  // ============================================================
  // FR: Appartements meubles Tokyo top 5
  // ============================================================
  'appartement-meuble-tokyo-expats-top-5': [
    {
      question: 'Quels sont les meilleurs services d\'appartements meubles pour les expatries a Tokyo?',
      answer: 'Parmi les meilleures options d\'appartements meubles pour expatries a Tokyo: Sakura House (large couverture, support anglais), Oak House (differents types de chambres dont studios prives), Borderless House (communaute internationale), Tokyo Monthly (appartements meubles premium, contrats mensuels), et les annonces meublees directes sur GaijinPot Housing et Suumo (avec agent bilingue).',
    },
    {
      question: 'Comment comparer les options d\'appartements meubles a Tokyo?',
      answer: 'Comparez sur: le cout mensuel total (loyer plus charges plus internet), la duree minimale du contrat, le montant du depot, l\'emplacement (distance de la station), la qualite du mobilier inclus (verifiez les photos), et la politique d\'annulation. Demandez une visite virtuelle ou des photos detaillees du logement reel, pas seulement de la facade.',
    },
    {
      question: 'Les appartements meubles haut de gamme a Tokyo valent-ils le supplement de cout?',
      answer: 'Pour les 1 a 3 premiers mois a Tokyo, un appartement meuble premium elimine les frictions d\'installation (pas d\'achat de mobilier, pas d\'enregistrement de charges, emmenagement rapide) et offre une base stable pour chercher un appartement plus long terme. Le supplement de 20 a 30% par rapport a un appartement nu est generalement justifie pour un court sejour initial.',
    },
    {
      question: 'Peut-on negocier le prix d\'un appartement meuble a Tokyo?',
      answer: 'Oui, surtout pour des sejours de plus de 3 mois. Demandez aux operateurs une reduction du tarif mensuel pour des engagements plus longs, une suppression des frais d\'inscription ou une premiere semaine gratuite. Les grands operateurs comme Sakura House et Oak House ont moins de flexibilite sur les prix mais peuvent proposer des chambres de meilleur niveau au meme prix si le taux d\'occupation est faible.',
    },
  ],

  // ============================================================
  // FR: Permis de conduire etranger Japon
  // ============================================================
  'permis-conduire-etranger-japon-conversion': [
    {
      question: 'Les etrangers peuvent-ils conduire au Japon avec un permis de conduire international?',
      answer: 'Oui, mais seulement pendant la premiere annee de residence. Un Permis de Conduire International (PCI) de votre pays d\'origine, combine avec votre permis national, permet de conduire au Japon pendant 12 mois maximum a compter de votre arrivee. Ensuite, vous devez convertir en permis de conduire japonais (gaimen kirikae).',
    },
    {
      question: 'Comment convertir son permis de conduire etranger en permis japonais?',
      answer: 'La conversion (gaimen kirikae) se fait au Centre de Permis de Conduire de votre zone (Unten Menkyo Centre). Documents requis: passeport, carte de residence, permis etranger actuel, traduction japonaise certifiee du permis (par le JAF ou une ambassade), certificat de residence (juminchyo) et frais de dossier (environ 4 000 JPY). Le traitement prend 1 a 3 heures si tous les documents sont corrects.',
    },
    {
      question: 'Quels pays beneficient d\'une conversion simplifiee du permis de conduire au Japon?',
      answer: 'Les pays de l\'UE (France, Allemagne, etc.), l\'Australie, le Canada, la Nouvelle-Zelande, la Suisse et certains Etats americains ont des accords de reciprocite qui simplifient la conversion: aucun examen theorique n\'est requis. Les pays sans accord de reciprocite doivent passer un examen theorique et parfois pratique au centre de permis.',
    },
    {
      question: 'Combien de temps faut-il pour convertir un permis de conduire au Japon?',
      answer: 'Si votre pays a un accord de reciprocite avec le Japon: la conversion est realisee en une seule visite (3 a 5 heures au total). Sans accord de reciprocite, le processus peut inclure une verification de traduction, un examen theorique et un examen pratique, necessitant plusieurs visites sur 1 a 4 semaines. Prenez rendez-vous a l\'avance car les creneaux sans rendez-vous sont limites.',
    },
  ],

  // ============================================================
  // FR: Demenageur international Japon
  // ============================================================
  'demenageur-international-japon-guide': [
    {
      question: 'Quelles entreprises de demenagement international opèrent au Japon?',
      answer: 'Les grands demenageurs internationaux avec des operations au Japon incluent: Yamato Transport (Ta-Q-Bin, leader japonais avec services internationaux), Crown Relocations, Asian Tigers Japan, Nippon Express, Allied Pickfords et Santa Fe Relocation. Pour les petits volumes, des services comme Pack & Send ou Sendico gerent l\'expedition internationale de colis a moindre cout.',
    },
    {
      question: 'Combien coute un demenagement international vers le Japon?',
      answer: 'Les couts varient selon l\'origine et le volume: un studio depuis les Etats-Unis coute generalement 3 000-6 000 USD par voie maritime (6 a 8 semaines). La voie aerienne est 2 a 4 fois plus chere mais prend 1 a 2 semaines. Les packages de relocation d\'entreprise couvrent souvent ces couts. Obtenez au moins 3 devis car les prix varient significativement.',
    },
    {
      question: 'Quelles sont les regles douanieres pour amener ses affaires personnelles au Japon?',
      answer: 'Les effets personnels sont generalement exoneres de droits de douane pour les nouveaux residents au Japon. Vous devez soumettre une liste d\'inventaire avec les valeurs approximatives. Articles restreints: armes a feu, certains medicaments (verifiez la douane japonaise), alcool en quantite superieure a l\'usage personnel et produits alimentaires frais. Un courtier en douane gere le dedouanement pour la plupart des demenagements internationaux.',
    },
    {
      question: 'Comment recevoir ma livraison dans un petit appartement de Tokyo?',
      answer: 'Les immeubles equipes d\'ascenseurs spacieux acceptent les camions de demenagement standard. L\'acces aux rues etroites est courant a Tokyo: confirmez l\'acces avec votre demenageur avant la reservation. Pour les immeubles sans ascenseur, un service de grue peut etre necessaire pour les gros meubles, a cout supplementaire. Votre demenageur evaluera la logistique de livraison lors de la visite de devis.',
    },
  ],

  // ============================================================
  // FR: Cours japonais Tokyo expatries
  // ============================================================
  'cours-japonais-tokyo-expatries-guide': [
    {
      question: 'Quelles sont les meilleures ecoles de japonais a Tokyo pour les expatries?',
      answer: 'Parmi les meilleures ecoles de japonais a Tokyo pour expatries: Coto Academy (Ginza, axee professionnels, petites classes), ISI Language School (plusieurs sites, reconnue pour les visas etudiants), Human Academy Japanese Language School (tarifs competitifs), Naganuma School (etablie de longue date, enseignement de qualite) et Nihon Language School (Shinjuku, populaire aupres des etudiants occidentaux).',
    },
    {
      question: 'Combien coutent les cours de japonais a Tokyo?',
      answer: 'Les cours collectifs dans les ecoles de langues serieuses de Tokyo coutent 15 000-30 000 JPY/mois pour 4 cours par semaine. Les cours particuliers sont a 3 000-8 000 JPY/heure. Les programmes intensifs (20+ heures/semaine) coutent 100 000-200 000 JPY/semestre. Les plateformes en ligne comme Preply ou iTalki proposent des alternatives budgetaires a 1 500-4 000 JPY/heure avec des locuteurs natifs.',
    },
    {
      question: 'Dois-je m\'inscrire dans une ecole de langue pour obtenir un visa etudiant au Japon?',
      answer: 'Si vous souhaitez etudier le japonais avec un visa etudiant (et non un visa touriste ou de travail), oui. Vous devez etre accepte dans une ecole de langue reconnue par le gouvernement japonais et postuler via elle. L\'ecole deposera la demande de visa etudiant. Ce visa permet de travailler a temps partiel (jusqu\'a 28 heures/semaine), ce qui aide a couvrir les frais de vie.',
    },
    {
      question: 'Peut-on apprendre le japonais a Tokyo sans s\'inscrire dans une ecole formelle?',
      answer: 'Oui. De nombreux expatries apprennent efficacement grace aux: professeurs particuliers (3 a 5x/semaine), applications d\'echange linguistique (HelloTalk, Tandem), groupes communautaires comme les echanges linguistiques dans les cafes locaux, et l\'auto-apprentissage avec des ressources structurees (manuels Genki, fiches Anki). Des cours de preparation au JLPT sont disponibles dans de nombreux centres communautaires a bas cout.',
    },
  ],

  // ============================================================
  // FR: Tokyo Osaka Kyoto ou s'installer
  // ============================================================
  'tokyo-osaka-kyoto-ou-s-installer': [
    {
      question: 'Faut-il s\'installer a Tokyo, Osaka ou Kyoto en tant qu\'expatrie?',
      answer: 'Choisissez Tokyo pour le marche de l\'emploi le plus large, les connexions internationales et les equipements urbains. Choisissez Osaka pour un cout de la vie plus bas (20 a 30% moins cher en loyers), une culture sociale plus detendue et la proximite de Kyoto et Nara. Choisissez Kyoto pour un mode de vie japonais traditionnel et une atmosphere paisible, mais avec un marche de l\'emploi international tres limite.',
    },
    {
      question: 'Kyoto est-elle un bon endroit pour vivre en tant qu\'expatrie etranger?',
      answer: 'Kyoto est un endroit magnifique mais avec des opportunites limitees pour les etrangers sur le marche de l\'emploi international. Elle convient aux expatries avec des revenus a distance, ceux qui enseignent l\'anglais, etudient la culture ou les arts japonais, ou qui sont maries a un partenaire japonais avec des attaches locales. La qualite de vie est tres elevee mais l\'evolution professionnelle est limitee par rapport a Tokyo ou Osaka.',
    },
    {
      question: 'Combien Osaka est-elle moins chere que Tokyo pour les loyers?',
      answer: 'Les loyers dans le centre d\'Osaka sont generalement 20 a 30% inferieurs aux biens equivalents dans le centre de Tokyo. Un studio meuble a Namba ou Umeda coute 60 000-90 000 JPY/mois contre 80 000-130 000 JPY a Shinjuku ou Shibuya. Plus on s\'eloigne du centre, plus l\'ecart se reduit. Le cout global de la vie a Osaka est 15 a 20% inferieur a Tokyo.',
    },
    {
      question: 'Peut-on facilement faire des allers-retours entre Tokyo et Osaka pour le travail?',
      answer: 'Le Shinkansen (train a grande vitesse) relie Tokyo et Osaka en environ 2h30 et circule plusieurs dizaines de fois par jour. Un billet simple coute 13 500-14 500 JPY. Les navettes regulieres entre les deux villes sont peu courantes en raison du cout et du temps, mais les voyages d\'affaires mensuels ou bimensuels sont courants pour les professionnels ayant des responsabilites dans les deux villes.',
    },
  ],

  // ============================================================
  // FR: Alternative Oak House Tokyo
  // ============================================================
  'alternative-oak-house-tokyo': [
    {
      question: 'Quelles sont les meilleures alternatives a Oak House a Tokyo?',
      answer: 'Les principales alternatives a Oak House sont: Sakura House (gamme de prix similaire, plus de sites a Tokyo), Borderless House (communaute internationale plus curatee), Hituji Not Found (biens plus recents, meilleure qualite de design), et des services d\'appartements meubles prives pour ceux qui recherchent plus d\'intimite.',
    },
    {
      question: 'Pourquoi les gens cherchent-ils des alternatives a Oak House?',
      answer: 'Les raisons frequentes incluent: disponibilite limitee dans certains quartiers specifiques, preference pour des immeubles plus recents, taille de la communaute (certains preferent les petites maisons), ou souhait d\'un melange plus international de residents. Oak House a souvent un nombre eleve de residents japonais, ce qui est un avantage pour les uns et un inconvenient pour les autres.',
    },
    {
      question: 'Oak House est-il sur pour les etrangers a Tokyo?',
      answer: 'Oui, Oak House a un solide historique aupres des residents etrangers. Les contrats sont disponibles en anglais, le personnel parle anglais et leur processus est adapte aux etrangers. Les alternatives offrent des garanties similaires.',
    },
    {
      question: 'Comment Oak House se compare-t-il en prix aux autres share houses de Tokyo?',
      answer: 'Oak House est dans la gamme moyenne: 55 000-90 000 JPY/mois tout inclus selon le type de chambre et l\'emplacement. Sakura House est comparable. Borderless House tend a etre legerement plus cher mais offre une experience communautaire plus curatee avec des evenements reguliers entre residents japonais et etrangers.',
    },
  ],

  // ============================================================
  // FR: Comparatif share house Tokyo 2026
  // ============================================================
  'comparatif-share-house-tokyo-2026': [
    {
      question: 'Qu\'est-ce qui est moins cher a Tokyo: share house ou appartement standard?',
      answer: 'Les share houses sont nettement moins chers pour un logement meuble tout inclus dans le centre de Tokyo. Un share house tout inclus coute 55 000-90 000 JPY/mois contre 100 000-180 000 JPY pour un studio meuble avec les charges separees.',
    },
    {
      question: 'Quels share houses de Tokyo ont les meilleurs emplacements?',
      answer: 'Borderless House, Sakura House et Oak House ont tous des proprietes a moins de 10 minutes a pied des principales lignes JR et Metro. Privilegiez les chambres a moins de 10 minutes a pied de votre station principale: la prime de localisation vaut la peine pour les economies de temps de trajet quotidien.',
    },
    {
      question: 'Sakura House ou Oak House est-il meilleur pour les etrangers francophones a Tokyo?',
      answer: 'Les deux sont des options fiables. Sakura House offre plus d\'emplacements dans le Grand Tokyo et de bons evenements communautaires. Oak House propose une gamme plus large de tailles de chambres dont des options studio privees. Le choix depend finalement du quartier cible et du type de chambre recherche.',
    },
    {
      question: 'Peut-on emmenager dans un share house de Tokyo la semaine de son arrivee au Japon?',
      answer: 'Oui, la plupart des grands operateurs de share houses peuvent organiser un emmenagement dans la meme semaine, voire le jour meme, si une chambre est disponible. C\'est l\'un de leurs principaux avantages sur les appartements standards qui necessitent 2 a 4 semaines de traitement.',
    },
  ],

  // ============================================================
  // EN: Tokyo-Osaka-Kyoto which city (already placed below)
  // ============================================================
  // ============================================================
  // FR: Alternative GaijinPot logement Tokyo
  // ============================================================
  'alternative-gaijinpot-logement-tokyo': [
    {
      question: 'Qu\'est-ce que GaijinPot Housing et pourquoi chercher des alternatives?',
      answer: 'GaijinPot Housing est une plateforme de recherche d\'appartements ciblant les etrangers au Japon, avec des annonces en anglais de proprietaires acceptant les non-Japonais. Les gens cherchent des alternatives car la selection est limitee par rapport aux plateformes japonaises (SUUMO, AtHome), les biens affichent souvent une prime de prix, et un chasseur immobilier local donne acces a l\'ensemble du marche sans surcoût.',
    },
    {
      question: 'Quelles sont les meilleures alternatives a GaijinPot Housing pour trouver un appartement a Tokyo?',
      answer: 'Les principales alternatives sont: un chasseur immobilier bilingue local (acces a toutes les plateformes japonaises et sans-frontières), SUUMO et AtHome via un agent bilingue (le plus grand choix de biens), les operateurs de share houses directs (Sakura House, Oak House, Borderless House) pour les logements partages, et les services de co-living (Hituji, Tokyo Monthly) pour les appartements meubles sans garant.',
    },
    {
      question: 'GaijinPot Housing est-il moins cher que de passer par un chasseur immobilier?',
      answer: 'Pas necessairement. GaijinPot affiche des biens avec une prime pour les etrangers. Un chasseur immobilier vous donne acces aux 95% du marche absent de GaijinPot, negocie en japonais et connait les quartiers en detail. Les honoraires du chasseur sont souvent compenses par une meilleure offre ou la suppression du reikin lors de la negociation.',
    },
    {
      question: 'Peut-on trouver un appartement a Tokyo sans passer par GaijinPot en ne parlant pas japonais?',
      answer: 'Oui, completement. Un chasseur immobilier ou un agent bilingue gere toute la communication en japonais avec les proprietaires et les agences locales. Vous n\'avez jamais besoin de parler japonais dans le processus: de la recherche a la signature du contrat. C\'est la solution la plus complete pour un expatrie qui ne parle pas japonais.',
    },
  ],

  // ============================================================
  // FR+EN: Art de la Guerre batch — session 8 — 2026-06-25
  // ============================================================

  'dossier-location-refuse-tokyo-etranger': [
    {
      question: 'Pourquoi mon dossier de location a-t-il été refusé à Tokyo?',
      answer:
        'Les causes les plus courantes sont: absence de garant japonais (hoshounin), visa expirant dans moins de 12 mois, statut professionnel atypique (freelance, entrepreneur, télétravailleur), et barrière de la langue. Pour les étrangers, il vaut mieux cibler les agences spécialisées dans les profils expatriés ou passer par un chasseur immobilier qui connaît les propriétaires ouverts aux étrangers.',
    },
    {
      question: 'Peut-on louer un appartement à Tokyo sans garant japonais après un refus?',
      answer:
        'Oui. La plupart des appartements meublés et des share houses accessibles aux étrangers n\'exigent pas de garant japonais. Pour les appartements traditionnels, une société de garantie (hoshougaisha) se substitue au garant humain contre une prime annuelle d\'environ 0,5 à 1 mois de loyer. C\'est la solution la plus courante pour les profils étrangers.',
    },
    {
      question: 'Combien de temps faut-il pour trouver un appartement à Tokyo après un refus?',
      answer:
        'Sans changer de stratégie, un étranger peut perdre 3 à 4 semaines supplémentaires après un refus. Avec un intermédiaire spécialisé dans les profils étrangers, la recherche peut aboutir en 7 à 14 jours, même après un ou plusieurs refus préalables.',
    },
    {
      question: 'Que faire si on ne parle pas japonais et que son dossier est refusé à Tokyo?',
      answer:
        'Faire appel à un chasseur immobilier ou un agent bilingue est la solution la plus efficace. Ces intermédiaires gèrent toutes les communications avec les agences japonaises en votre nom, présentent votre dossier dans les structures adaptées, et connaissent les propriétaires disposés à louer à des étrangers non-japonophones.',
    },
  ],

  'rental-application-rejected-japan-foreigner': [
    {
      question: 'Why was my rental application rejected in Japan?',
      answer:
        'The most common reasons are: no Japanese guarantor (hoshounin), visa expiring within 12 months, non-standard employment (freelance, entrepreneur, remote worker), and language barriers. Landlords in Japan apply a conservative risk model. Targeting agencies specialized in foreign profiles, or working with a real estate hunter, significantly increases acceptance rates.',
    },
    {
      question: 'Can foreigners rent a normal apartment in Japan without a Japanese guarantor?',
      answer:
        'Yes. A guarantee company (hoshougaisha) substitutes for a personal Japanese guarantor at an annual cost of roughly 0.5-1 month of rent. Many furnished apartments and monthly mansions require no guarantor at all. The key is targeting the right type of property through the right channel.',
    },
    {
      question: 'How long does it take to find housing in Tokyo after an application rejection?',
      answer:
        'Without changing strategy, 3-4 additional weeks are commonly lost after a first rejection. A real estate hunter specializing in foreign profiles can typically deliver a lease within 7-14 days from the initial brief, even after a previous rejection.',
    },
    {
      question: 'Is it discrimination when Japanese landlords reject foreign applicants?',
      answer:
        'It is rarely explicit discrimination. It reflects risk management in a market where eviction is legally difficult and communication barriers increase perceived risk. The solution is not confrontation but selecting channels where foreign profiles are pre-accepted: expat-focused agencies, furnished operators, or a real estate hunter with trusted landlord relationships.',
    },
  ],

  'chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup': [
    {
      question: 'Combien coûte un chasseur immobilier à Tokyo?',
      answer:
        'Les honoraires se situent généralement entre 80 000 et 150 000 JPY en forfait fixe, ou l\'équivalent d\'un mois de loyer en pourcentage. Ces honoraires couvrent la recherche complète, les visites, la négociation et la constitution du dossier. Ils ne sont dus qu\'en cas de signature d\'un bail.',
    },
    {
      question: 'Est-ce que faire appel à un chasseur immobilier vaut le coup à Tokyo?',
      answer:
        'Dans la plupart des cas oui, surtout pour les profils étrangers. Un chasseur réduit le délai de recherche à 7-14 jours contre 4-8 semaines en autonome. L\'économie sur le logement temporaire (80 000 à 200 000 JPY par mois en hôtel ou serviced apartment) couvre souvent l\'intégralité des honoraires, sans compter les erreurs de contrat évitées.',
    },
    {
      question: 'Le chasseur immobilier facture-t-il si je ne trouve pas d\'appartement?',
      answer:
        'Un bon chasseur travaille sur résultat: ses honoraires ne sont dus qu\'à la signature du bail. Si la mission n\'aboutit pas, aucun frais n\'est facturé. C\'est un point essentiel à vérifier avant de signer le mandat.',
    },
    {
      question: 'Quand est-il particulièrement rentable de faire appel à un chasseur immobilier à Tokyo?',
      answer:
        'Le recours à un chasseur est particulièrement pertinent dans ces situations: relocalisation depuis l\'étranger (impossible de visiter en présentiel), délai serré (prise de poste dans 3 semaines), profil atypique (freelance, expatrié sans garant japonais), budget supérieur à 150 000 JPY par mois (marché peu visible sur les portails publics).',
    },
  ],

  'real-estate-hunter-tokyo-cost-worth-it': [
    {
      question: 'How much does a real estate hunter cost in Tokyo?',
      answer:
        'Real estate hunter fees in Tokyo typically range from 80,000 to 150,000 JPY as a fixed fee, or the equivalent of one month\'s rent as a percentage. This covers the full search, visits, negotiation, and application preparation. Fees are only due upon signing a lease.',
    },
    {
      question: 'Is a real estate hunter worth the cost in Tokyo?',
      answer:
        'For most foreign profiles, yes. A hunter reduces the search timeline to 7-14 days versus 4-8 weeks searching alone. Savings on temporary accommodation (hotel or serviced apartment: 80,000-200,000 JPY per month) typically cover the hunter\'s fee entirely, not counting the application rejections and contract errors avoided.',
    },
    {
      question: 'Does a real estate hunter charge if they do not find you an apartment?',
      answer:
        'A legitimate real estate hunter works on results: fees are only due upon signing a lease. If the mission is unsuccessful, no fee is charged. This is a critical point to verify before signing the mandate.',
    },
    {
      question: 'What type of expat benefits most from a real estate hunter in Tokyo?',
      answer:
        'Real estate hunters add the most value for: expats relocating from abroad (no in-person visits possible), tight timelines (job start within 3 weeks), atypical profiles (freelancer, no Japanese guarantor), and mid-to-high budgets above 150,000 JPY per month where quality supply is rarely visible on public portals.',
    },
  ],

  'chasseur-immobilier-vs-agence-tokyo-comparatif': [
    {
      question: 'Quelle est la différence entre un chasseur immobilier et une agence à Tokyo?',
      answer:
        'L\'agence immobilière travaille pour le propriétaire et présente uniquement son propre portefeuille. Le chasseur travaille pour vous: il contacte 10 à 20 agences simultanément, accède à des biens hors marché, et défend activement votre dossier. Pour un profil étranger, le chasseur offre un avantage structurel sur le taux de refus et le délai de recherche.',
    },
    {
      question: 'Une agence immobilière japonaise peut-elle aider un étranger à Tokyo?',
      answer:
        'Certaines oui, mais leur efficacité est limitée pour les profils étrangers. Les agences classiques ne travaillent qu\'avec leur propre portefeuille, ne parlent souvent pas anglais, et ne défendent pas activement les dossiers étrangers. Certaines agences spécialisées expatriés sont meilleures, mais leur offre reste plus réduite qu\'un chasseur multi-agences.',
    },
    {
      question: 'Combien coûte une agence immobilière japonaise par rapport à un chasseur?',
      answer:
        'Une agence japonaise facture généralement 1 mois de loyer en frais d\'agence (shoukoukin), dans tous les cas, que la recherche dure une semaine ou trois mois. Un chasseur facture un montant comparable (80 000 à 150 000 JPY) mais uniquement sur résultat, avec couverture multi-agences et accompagnement bilingue inclus.',
    },
    {
      question: 'Quel est le délai pour trouver un appartement à Tokyo avec un chasseur versus une agence?',
      answer:
        'Avec une agence classique, le délai pour un profil étranger est de 4 à 10 semaines (incluant les refus et recommencements). Avec un chasseur, la recherche aboutit en 7 à 21 jours grâce à la recherche parallèle et à la présélection des dossiers sur les bons canaux.',
    },
  ],

  'real-estate-hunter-vs-agency-tokyo': [
    {
      question: 'What is the difference between a real estate hunter and a standard agency in Tokyo?',
      answer:
        'A standard Japanese agency works for the landlord and only shows its own portfolio. A real estate hunter works for you: they contact 10-20 agencies simultaneously, access off-market properties, and actively advocate for your application. For foreign profiles, the hunter provides a structural advantage in both rejection rate and search timeline.',
    },
    {
      question: 'Can a Japanese real estate agency help foreigners find an apartment in Tokyo?',
      answer:
        'Some can, but effectiveness is limited for foreign profiles. Standard agencies only work with their own portfolio, often do not speak English, and do not actively advocate for foreign applications. Some expat-focused agencies are better but their supply remains narrower than a multi-agency hunter.',
    },
    {
      question: 'How much does a Japanese real estate agency cost compared to a real estate hunter?',
      answer:
        'A Japanese agency charges 1 month of rent as an agency fee (shoukoukin), always, regardless of whether the process takes one week or three months. A hunter charges a comparable fee (80,000-150,000 JPY) but only on results, with multi-agency coverage and bilingual support included.',
    },
    {
      question: 'How much faster is a real estate hunter compared to a standard agency in Tokyo?',
      answer:
        'For a foreign profile, a standard agency search takes 4-10 weeks including rejections and restarts. A real estate hunter delivers in 7-21 days through parallel search and pre-selection of applications on the right channels. This difference is structural, not incidental.',
    },
  ],

  'service-chasseur-immobilier-tokyo-comment-ca-marche': [
    {
      question: 'Quelles sont les étapes du service d\'un chasseur immobilier à Tokyo?',
      answer:
        'Le processus se déroule en 6 étapes: (1) appel de brief en français ou anglais, (2) recherche active auprès de 10 à 20 agences simultanément, (3) présélection de 5 à 10 biens pertinents, (4) visites organisées en présentiel ou en virtuel, (5) négociation et dossier adapté au profil étranger, (6) accompagnement à la signature et remise des clés. Le délai total est généralement de 7 à 21 jours.',
    },
    {
      question: 'Peut-on faire appel à un chasseur immobilier à Tokyo depuis l\'étranger?',
      answer:
        'Oui, c\'est l\'un des cas d\'usage principaux. Le brief se fait par appel ou visio. Les visites peuvent être organisées en virtuel avec retransmission en direct. Le dossier est constitué et présenté à distance. Vous pouvez signer le bail et recevoir les clés sans être sur place avant votre date d\'arrivée.',
    },
    {
      question: 'Est-ce que le chasseur accompagne à la signature du bail en japonais?',
      answer:
        'Oui. La lecture et l\'explication du contrat en japonais font partie du service. Le chasseur traduit les clauses essentielles (conditions de résiliation, obligations de remise en état, règles de copropriété) et coordonne le versement du dépôt et des frais d\'entrée.',
    },
    {
      question: 'Faut-il parler japonais pour utiliser un chasseur immobilier à Tokyo?',
      answer:
        'Non. Le chasseur prend en charge toutes les communications avec les agences et propriétaires japonais en votre nom. Vous n\'avez besoin de parler japonais à aucune étape du processus: brief, visites, négociation, dossier, signature. C\'est précisément ce service linguistique qui constitue l\'une des valeurs clés du chasseur pour les profils étrangers.',
    },
  ],

  'how-real-estate-hunter-works-tokyo': [
    {
      question: 'What are the steps in the real estate hunting process in Tokyo?',
      answer:
        'The process has 6 steps: (1) initial brief call in English or French, (2) active search across 10-20 agencies simultaneously, (3) pre-selection of 5-10 relevant properties, (4) visit coordination in person or virtually, (5) negotiation and application preparation for a foreign profile, (6) lease signing support and key handover. Total timeline is typically 7-21 days.',
    },
    {
      question: 'Can I use a real estate hunter in Tokyo while I am still abroad?',
      answer:
        'Yes, this is one of the primary use cases. The initial brief is done by call or video. Visits can be organized virtually with live walkthroughs. The application is built and submitted remotely. You can sign the lease and receive keys without being in Tokyo before your arrival date.',
    },
    {
      question: 'Does a real estate hunter help with the Japanese lease signing?',
      answer:
        'Yes. Lease reading and explanation in Japanese is part of the service. The hunter translates key clauses including termination conditions, restoration obligations, and building rules, and coordinates deposit and entry fee payments on your behalf.',
    },
    {
      question: 'How does a real estate hunter find properties not listed on public portals?',
      answer:
        'A hunter with an established network contacts agencies directly, maintains relationships with property managers who fill vacancies through trusted intermediaries, and receives notifications before listings go public. In central Tokyo, quality properties often rent within 48-72 hours of becoming available, frequently before being posted online.',
    },
  ],

  'hiroo-minami-azabu-guide-expatries-tokyo': [
    {
      question: 'Pourquoi Hiroo est-il le quartier préféré des expatriés à Tokyo?',
      answer:
        'Hiroo concentre plusieurs ambassades étrangères, un supermarché international (National Azabu), des restaurants occidentaux et une communauté expatriée dense. L\'ambiance est calme, arborée et sécurisée. Le quartier est directement relié à Roppongi et Ginza par la ligne Hibiya. C\'est historiquement l\'adresse de référence pour les expatriés de haut niveau à Tokyo.',
    },
    {
      question: 'Quel est le loyer moyen à Hiroo et Minami-Azabu?',
      answer:
        'A Hiroo, un appartement 1LDK se loue entre 180 000 et 280 000 JPY par mois. Un 2LDK familial dépasse souvent 300 000 JPY. Minami-Azabu est encore plus cher: un 2LDK se loue couramment entre 300 000 et 450 000 JPY. Ce sont parmi les loyers les plus élevés de Tokyo pour les expatriés.',
    },
    {
      question: 'Quelles écoles internationales se trouvent près de Hiroo et Minami-Azabu?',
      answer:
        'Le lycée franco-japonais de Tokyo (LFJTK) est accessible depuis Azabu-Juban sur la ligne Oedo en environ 15 minutes. Plusieurs structures bilingues se trouvent dans un rayon de 20 minutes. La forte densité de familles diplomatiques dans le secteur crée aussi une offre de garde d\'enfants bilingue relativement développée.',
    },
    {
      question: 'Quels quartiers proches de Hiroo sont moins chers avec un profil similaire?',
      answer:
        'Ebisu (ligne Hibiya, même ligne que Hiroo), Daikanyama et certaines parties de Nishi-Azabu offrent une ambiance similaire avec des loyers 15 à 20% inférieurs. Ces quartiers sont à considérer si le budget ne permet pas Hiroo ou Minami-Azabu mais que l\'environnement international reste une priorité.',
    },
  ],

  'hiroo-minami-azabu-expat-neighborhood-guide': [
    {
      question: 'Why is Hiroo the most popular neighborhood for expats in Tokyo?',
      answer:
        'Hiroo combines several foreign embassies, an international supermarket (National Azabu), Western restaurants, and a dense expat community. The atmosphere is quiet, tree-lined and safe. The neighborhood connects directly to Roppongi and Ginza via the Hibiya Line. It has historically been the reference address for high-level expats in Tokyo.',
    },
    {
      question: 'What are typical rents in Hiroo and Minami-Azabu in Tokyo?',
      answer:
        'In Hiroo, a 1LDK apartment rents for 180,000-280,000 JPY per month. A family 2LDK frequently exceeds 300,000 JPY. Minami-Azabu is even more expensive: a 2LDK commonly rents between 300,000 and 450,000 JPY per month. These are among the highest rents in Tokyo.',
    },
    {
      question: 'What international schools are near Hiroo and Minami-Azabu in Tokyo?',
      answer:
        'The French high school in Tokyo (LFJTK) is accessible from Azabu-Juban on the Oedo Line in about 15 minutes. Several bilingual structures are within a 20-minute radius. The high density of diplomatic families in the area also supports a relatively well-developed bilingual childcare offering.',
    },
    {
      question: 'Which nearby neighborhoods offer a similar feel to Hiroo at lower rents?',
      answer:
        'Ebisu (Hibiya Line, same line as Hiroo), Daikanyama, and parts of Nishi-Azabu offer a similar international atmosphere with rents 15-20% lower. These neighborhoods are worth considering if the budget does not reach Hiroo or Minami-Azabu but an expat-friendly environment remains a priority.',
    },
  ],

  'tokyo-osaka-kyoto-which-city-to-live': [
    {
      question: 'Should I live in Tokyo, Osaka, or Kyoto as an expat?',
      answer: 'Choose Tokyo for the broadest job market, international connections, and urban amenities. Choose Osaka for a lower cost of living (20-30% cheaper rent), a warmer social culture, and proximity to Kyoto and Nara. Choose Kyoto for a traditional Japanese lifestyle, quieter pace, and scenic environment, but with a very limited international job market.',
    },
    {
      question: 'Is Kyoto a good place to live as a foreign expat?',
      answer: 'Kyoto is a beautiful place to live but has limited opportunities for foreigners in the international job market. It suits expats with remote income, those teaching English, those studying Japanese culture or arts, or those married to a Japanese partner with local ties. The quality of life is very high but professional growth is limited compared to Tokyo or Osaka.',
    },
    {
      question: 'How much cheaper is Osaka than Tokyo for rent?',
      answer: 'Rent in central Osaka is typically 20-30% lower than equivalent properties in central Tokyo. A furnished 1K in Namba or Umeda costs 60,000-90,000 JPY/month versus 80,000-130,000 JPY in Shinjuku or Shibuya. The further from the center, the smaller the gap. Overall cost of living in Osaka is 15-20% lower than Tokyo.',
    },
    {
      question: 'Can you easily commute between Tokyo and Osaka for work?',
      answer: 'The Shinkansen (bullet train) connects Tokyo and Osaka in approximately 2.5 hours and runs dozens of times daily. A one-way ticket costs 13,500-14,500 JPY. Regular commuting between the two cities is uncommon due to cost and time, but monthly or biweekly business trips are routine for professionals with responsibilities in both cities.',
    },
  ],

  // ============================================================
  // Axes supplementaires batch — session 8b — 2026-06-25
  // ============================================================

  'tokyo-rent-by-neighborhood-2026': [
    {
      question: 'What is the average rent in Tokyo for expats in 2026?',
      answer:
        'Rents in central Tokyo for expats range from 70,000-100,000 JPY/month for a studio in outer neighborhoods (Koenji, Nakano) to 200,000-300,000 JPY/month for a 1LDK in prime expat areas (Hiroo, Minami-Azabu). The most common budget for a single professional is 110,000-160,000 JPY for a furnished 1K in a mid-range neighborhood such as Ebisu or Nakameguro.',
    },
    {
      question: 'Which Tokyo neighborhood has the cheapest rent for foreigners?',
      answer:
        'The most affordable central neighborhoods for foreigners are Koenji, Nakano, Shimokitazawa, and Sangenjaya, with studios from 70,000-100,000 JPY/month. These areas offer excellent metro access and good quality of life, though with fewer English-speaking services than the Hiroo or Roppongi areas.',
    },
    {
      question: 'How much more expensive is Hiroo than other Tokyo neighborhoods?',
      answer:
        'Hiroo and Minami-Azabu are 40-80% more expensive than comparable neighborhoods. A 1LDK in Hiroo costs 200,000-300,000 JPY/month versus 150,000-220,000 JPY in Nakameguro or 140,000-210,000 JPY in Meguro. The premium reflects proximity to embassies, international schools, and the National Azabu international supermarket.',
    },
    {
      question: 'What are the total upfront costs when renting in Tokyo?',
      answer:
        'For a 150,000 JPY/month apartment, expect 500,000-800,000 JPY upfront: 1-2 months security deposit (shikikin), 1 month agency fee (shoukoukin), 0-2 months key money (reikin, increasingly negotiable), and 0.5-1 month guarantor company fee. Furnished monthly mansions have lower entry costs of 1-2 months total.',
    },
  ],

  'loyers-tokyo-par-quartier-2026': [
    {
      question: 'Quel est le loyer moyen à Tokyo pour un expatrié en 2026?',
      answer:
        'Les loyers à Tokyo pour les expatriés varient de 70 000 à 100 000 JPY/mois pour un studio dans les quartiers périphériques (Koenji, Nakano) à 200 000 à 300 000 JPY/mois pour un 1LDK dans les zones diplomatiques (Hiroo, Minami-Azabu). Le budget le plus courant pour un professionnel seul est 110 000 à 160 000 JPY pour un appartement meublé 1K dans un quartier intermédiaire comme Ebisu ou Nakameguro.',
    },
    {
      question: 'Quels sont les quartiers les moins chers de Tokyo pour les étrangers?',
      answer:
        'Les quartiers les plus abordables du centre de Tokyo pour les étrangers sont Koenji, Nakano, Shimokitazawa et Sangenjaya, avec des studios à partir de 70 000 à 100 000 JPY/mois. Ces quartiers offrent un bon accès aux transports et une excellente qualité de vie, avec moins de services anglophones que les zones Hiroo ou Roppongi.',
    },
    {
      question: 'Combien coûtent les frais d\'entrée pour louer un appartement à Tokyo?',
      answer:
        'Pour un appartement à 150 000 JPY/mois, prévoyez 500 000 à 800 000 JPY à l\'entrée: 1 à 2 mois de dépôt de garantie (shikikin), 1 mois de frais d\'agence (shoukoukin), 0 à 2 mois de reikin (de plus en plus négociable), et 0,5 à 1 mois de frais de société de garantie. Les monthly mansions meublés ont des coûts d\'entrée plus faibles de 1 à 2 mois au total.',
    },
    {
      question: 'Vaut-il mieux louer meublé ou non meublé à Tokyo?',
      answer:
        'Cela dépend de la durée du séjour. Pour moins de 2 ans: un appartement meublé est généralement moins cher au total (pas de mobilier à acheter, frais d\'entrée inférieurs, flexibilité de résiliation). Pour plus de 2 ans: un bail standard non meublé est moins cher au mois mais demande un investissement initial plus élevé en mobilier et en frais d\'entrée.',
    },
  ],

  'renting-tokyo-entrepreneur-startup-guide': [
    {
      question: 'Can freelancers and entrepreneurs rent apartments in Tokyo?',
      answer:
        'Yes, but not through standard channels. The traditional Japanese rental market systematically deprioritizes non-salaried profiles. The most reliable paths are: furnished monthly mansions with simplified screening, expat-specialist agencies with pre-screened landlords open to self-employed tenants, or a real estate hunter who knows which landlords accept entrepreneur profiles.',
    },
    {
      question: 'What income documents can a freelancer use to rent in Tokyo?',
      answer:
        'Without standard pay slips, use: 2-3 years of tax returns (kakutei shinkoku) showing stable income, 3-6 months of bank statements showing regular cash flow, a letter from your accountant certifying your annual income, and client contracts or invoices demonstrating ongoing activity. A guarantee company (hoshougaisha) eliminates the personal guarantor requirement.',
    },
    {
      question: 'How long does it take a freelancer to find an apartment in Tokyo?',
      answer:
        'Via the traditional market: unpredictable, potentially 6-10 weeks with multiple rejections. Via furnished operators: 1-2 weeks. Via a real estate hunter with a specialist network: 7-14 days for an unfurnished long-term solution. Entrepreneurs should target furnished operators first and unfurnished solutions second.',
    },
    {
      question: 'Does holding a Japan Business Manager Visa affect a rental application?',
      answer:
        'It is neutral to slightly negative with agencies unfamiliar with this visa type. The Business Manager Visa is not as immediately recognized as a standard work visa. Target operators and agencies familiar with international entrepreneurs, or use a real estate hunter who has handled startup visa profiles previously.',
    },
  ],

  'appartement-tokyo-entrepreneur-freelance': [
    {
      question: 'Les entrepreneurs et freelances peuvent-ils louer un appartement à Tokyo?',
      answer:
        'Oui, mais pas par les canaux classiques. Le marché locatif japonais traditionnel déprioritise systématiquement les profils non-salariés. Les voies les plus fiables sont: les monthly mansions meublés à sélection simplifiée, les agences spécialisées expatriés avec des propriétaires ouverts aux indépendants, ou un chasseur immobilier qui connaît les propriétaires acceptant les entrepreneurs.',
    },
    {
      question: 'Quels documents de revenus un freelance peut-il utiliser pour louer à Tokyo?',
      answer:
        'Sans bulletins de salaire classiques: 2 à 3 ans de déclarations fiscales (kakutei shinkoku) montrant des revenus stables, 3 à 6 mois de relevés bancaires démontrant un cash-flow régulier, une lettre de votre expert-comptable certifiant votre revenu annuel, et des contrats clients ou factures prouvant une activité continue. Une société de garantie (hoshougaisha) élimine l\'exigence de garant personnel.',
    },
    {
      question: 'Combien de temps faut-il à un freelance pour trouver un appartement à Tokyo?',
      answer:
        'Via le marché traditionnel: imprévisible, potentiellement 6 à 10 semaines avec plusieurs refus. Via les opérateurs meublés: 1 à 2 semaines. Via un chasseur avec réseau spécialisé: 7 à 14 jours pour une solution non meublée. Les entrepreneurs devraient cibler les opérateurs meublés en priorité, les solutions non meublées en second.',
    },
    {
      question: 'Faut-il déclarer son statut d\'indépendant dans un dossier de location à Tokyo?',
      answer:
        'Oui, il faut être honnête dans le dossier. Dissimuler son statut peut entraîner une rupture de bail. La bonne stratégie n\'est pas de cacher son profil mais de choisir les canaux où ce profil est acceptable, et de présenter les documents dans le bon ordre et avec le bon contexte. Un chasseur expérimenté sait cadrer votre profil sans tromperie.',
    },
  ],

  'corporate-relocation-tokyo-hr-housing-guide': [
    {
      question: 'How long does a corporate relocation to Tokyo typically take?',
      answer:
        'The full process from brief to key handover takes 4-6 weeks under ideal conditions: 1-2 weeks for pre-arrival preparation, 2-3 weeks for property search and landlord review, and 1 week for lease signing and setup. Budget for 2-4 weeks of temporary accommodation before the lease is signed.',
    },
    {
      question: 'What is the typical corporate housing budget for Tokyo in 2026?',
      answer:
        'For a single professional: 130,000-180,000 JPY/month rent plus 500,000-700,000 JPY upfront entry costs. For a family in a 2LDK: 200,000-350,000 JPY/month plus 700,000-1,200,000 JPY entry costs. Add 50,000-150,000 JPY/month for temporary accommodation during the search period.',
    },
    {
      question: 'Does a company need to provide a guarantor for employee housing in Tokyo?',
      answer:
        'The most practical solution is a guarantee company (hoshougaisha) at 0.5-1 month of rent per year. Some landlords accept a corporate guarantee letter instead. Budget this cost explicitly in the relocation package. Japanese subsidiaries can sometimes provide a corporate guarantor directly.',
    },
    {
      question: 'Should HR use a full relocation company or a real estate hunter for Tokyo?',
      answer:
        'A full relocation company manages the entire move (shipping, visa, schools) at significantly higher cost. A real estate hunter specializes in housing only, at a fraction of the cost, with faster results on that specific component. For companies whose primary bottleneck is finding suitable housing quickly, a real estate hunter is typically more efficient and cost-effective.',
    },
  ],

  'relocation-entreprise-tokyo-guide-rh': [
    {
      question: 'Combien de temps faut-il pour relocaliser un employé à Tokyo?',
      answer:
        'Le processus complet prend 4 à 6 semaines dans les meilleures conditions: 1 à 2 semaines de préparation, 2 à 3 semaines de recherche et étude de dossier, 1 semaine pour la signature et l\'installation. Il est fortement recommandé de prévoir 2 à 4 semaines d\'hébergement temporaire avant la signature du bail.',
    },
    {
      question: 'Quel est le budget moyen pour une relocalisation corporate à Tokyo en 2026?',
      answer:
        'Pour un professionnel seul: 130 000 à 180 000 JPY/mois de loyer plus 500 000 à 700 000 JPY de frais d\'entrée. Pour une famille en 2LDK: 200 000 à 350 000 JPY/mois plus 700 000 à 1 200 000 JPY à l\'entrée. Ajoutez 50 000 à 150 000 JPY/mois pour l\'hébergement temporaire pendant la recherche.',
    },
    {
      question: 'L\'entreprise doit-elle fournir un garant pour le logement d\'un employé au Japon?',
      answer:
        'La solution la plus pratique est une société de garantie (hoshougaisha) à 0,5 à 1 mois de loyer par an. Certains propriétaires acceptent une lettre de garantie d\'entreprise à la place. Ce coût doit être explicitement prévu dans le budget de relocalisation.',
    },
    {
      question: 'Vaut-il mieux une société de relocation ou un chasseur immobilier pour Tokyo?',
      answer:
        'Une société de relocation complète gère l\'intégralité du déménagement (transport, visa, écoles) mais à un coût nettement plus élevé. Un chasseur immobilier se spécialise dans le logement uniquement, à une fraction du coût, avec des délais plus courts sur cette composante. Pour les entreprises dont le principal point de blocage est le logement, un chasseur avec expertise locale est généralement plus efficace.',
    },
  ],

  'ebisu-daikanyama-nakameguro-expat-guide': [
    {
      question: 'What is the difference between Ebisu, Daikanyama and Nakameguro for expats?',
      answer:
        'Ebisu is the most connected (JR Yamanote + Hibiya Line) and suits professionals needing broad commute flexibility. Daikanyama is the quietest and most design-oriented, preferred by creative professionals. Nakameguro is the most dynamic and trendy, attracting a younger demographic. All three are walkable and share a cosmopolitan, international character.',
    },
    {
      question: 'How much cheaper are Ebisu and Nakameguro compared to Hiroo?',
      answer:
        'Roughly 20-35% cheaper for equivalent apartment types. A 1LDK in Hiroo costs 200,000-300,000 JPY versus 160,000-240,000 JPY in Ebisu or 150,000-220,000 JPY in Nakameguro. The main trade-off is slightly less expat infrastructure: fewer international supermarkets and international schools within walking distance.',
    },
    {
      question: 'Is Nakameguro a good place to live as an expat in Tokyo?',
      answer:
        'Yes, especially for expats without school-age children. The canal area is visually striking, the restaurant and cafe scene is excellent, and the English-speaking community is active. Transport is strong (Hibiya and Tokyu Toyoko lines). The main considerations are weekend crowds near the canal and rapidly rising rents compared to five years ago.',
    },
    {
      question: 'Which of the three neighborhoods is best for expat families in Tokyo?',
      answer:
        'Ebisu is the most family-friendly of the three, with better access to international schools and more residential space. Nakameguro suits singles and couples better. Daikanyama is quiet but international school access requires more planning. For families prioritizing school proximity, Hiroo or Minami-Azabu remain the stronger choice.',
    },
  ],

  'ebisu-daikanyama-nakameguro-guide-expatries': [
    {
      question: 'Quelle est la différence entre Ebisu, Daikanyama et Nakameguro pour les expatriés?',
      answer:
        'Ebisu est le mieux connecté (ligne JR Yamanote + Hibiya) et convient aux professionnels ayant besoin de flexibilité dans leurs déplacements. Daikanyama est le plus calme et le plus design, préféré des profils créatifs. Nakameguro est le plus dynamique et tendance, avec une démographie plus jeune. Les trois quartiers sont piétons et partagent un caractère cosmopolite et international.',
    },
    {
      question: 'Combien moins chers sont Ebisu et Nakameguro par rapport à Hiroo?',
      answer:
        'Environ 20 à 35% moins chers pour des types d\'appartements équivalents. Un 1LDK à Hiroo coûte 200 000 à 300 000 JPY contre 160 000 à 240 000 JPY à Ebisu ou 150 000 à 220 000 JPY à Nakameguro. La contrepartie principale est une infrastructure expatriée légèrement moins dense: moins de supermarchés internationaux et d\'écoles internationales à proximité immédiate.',
    },
    {
      question: 'Est-ce que Nakameguro est un bon endroit pour vivre en tant qu\'expatrié à Tokyo?',
      answer:
        'Oui, surtout pour les expatriés sans enfants en âge scolaire. Le canal est visuellement remarquable, la scène restaurants-cafés est excellente, et la communauté anglophone est active. Les transports sont forts (lignes Hibiya et Tokyu Toyoko). Les points de vigilance sont l\'affluence le week-end près du canal et la hausse rapide des loyers ces dernières années.',
    },
    {
      question: 'Lequel de ces trois quartiers est le meilleur pour une famille expatriée à Tokyo?',
      answer:
        'Ebisu est le plus adapté aux familles des trois, avec un meilleur accès aux écoles internationales et plus d\'espace résidentiel. Nakameguro convient mieux aux célibataires et couples. Daikanyama est calme mais l\'accès aux écoles internationales demande plus de planification. Pour les familles qui priorisent la proximité des écoles, Hiroo ou Minami-Azabu restent le meilleur choix.',
    },
  ],
}
