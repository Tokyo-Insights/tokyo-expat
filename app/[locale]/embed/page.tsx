import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import EmbedMap from '@/components/EmbedMap'

const BASE = 'https://www.tokyo-expat.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === 'en'
  return {
    title: en
      ? 'Free Tokyo Housing Data Widgets | Tokyo Expat'
      : 'Widgets gratuits sur les loyers de Tokyo | Tokyo Expat',
    description: en
      ? 'Embed our Tokyo rent maps and animated price map on your site, free. Original data from real listings and recorded transactions.'
      : 'Integrez gratuitement nos cartes des loyers et notre carte animee des prix de Tokyo. Donnees originales, annonces reelles et transactions enregistrees.',
    alternates: { canonical: `${BASE}/${locale}/embed` },
  }
}

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale
  const en = l === 'en'

  const widgets = [
    {
      key: 'ward',
      title: en ? 'Tokyo rent map, by ward' : 'Carte des loyers de Tokyo, par arrondissement',
      note: en
        ? 'Median monthly rent for a 1K studio across Tokyo’s 23 wards.'
        : 'Loyer mensuel median pour un studio 1K dans les 23 arrondissements de Tokyo.',
      img: '/tokyo-rent-map.png',
      alt: en
        ? 'Median 1K studio rent by Tokyo ward, 2026 (Tokyo Expat)'
        : 'Loyer median 1K par arrondissement de Tokyo, 2026 (Tokyo Expat)',
      animated: false,
    },
    {
      key: 'station',
      title: en ? 'Tokyo rent map, by station' : 'Carte des loyers de Tokyo, par station',
      note: en
        ? 'The same studio can cost nearly double depending on the station.'
        : 'Le meme studio peut couter pres du double selon la station.',
      img: '/tokyo-station-rent-map.png',
      alt: en
        ? 'Median 1K studio rent near 50 Tokyo stations, 2026 (Tokyo Expat)'
        : 'Loyer median 1K pres de 50 stations de Tokyo, 2026 (Tokyo Expat)',
      animated: false,
    },
    {
      key: 'anim',
      title: en ? 'Tokyo condo prices, animated (2021–2025)' : 'Prix des coproprietes de Tokyo, anime (2021–2025)',
      note: en
        ? 'Watch central Tokyo heat up: median price per m², quarter by quarter. Plays on its own like a GIF.'
        : 'Regardez le centre de Tokyo s’embraser : prix median au m², trimestre par trimestre. S’anime tout seul comme un GIF.',
      img: '/tokyo-price-heatmap.gif',
      alt: en
        ? 'Animated map of Tokyo condo prices per m2, 2021 to 2025 (Tokyo Expat)'
        : 'Carte animee des prix des coproprietes de Tokyo au m2, 2021 a 2025 (Tokyo Expat)',
      animated: true,
    },
  ]

  const codeFor = (img: string, alt: string) =>
    `<a href="${BASE}/${l}/data"><img src="${BASE}${img}" alt="${alt}" width="600" style="max-width:100%;height:auto" /></a>\n<p>Source: <a href="${BASE}/${l}/data">${en ? 'Tokyo Expat rent & price data' : 'Donnees loyers & prix Tokyo Expat'}</a></p>`

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-[#e84141] mb-3">
        {en ? 'Free to use · keep the link' : 'Libre · conservez le lien'}
      </p>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2744] leading-tight mb-4">
        {en ? 'Tokyo housing data, free to embed' : 'Donnees logement Tokyo, libres a integrer'}
      </h1>
      <p className="text-gray-600 max-w-2xl mb-3">
        {en
          ? 'Writers, bloggers and journalists: put any of these on your site for free. They come from original data (real listings and recorded transactions) that nobody else publishes at this level of detail.'
          : 'Redacteurs, blogueurs et journalistes : mettez n’importe lequel sur votre site, gratuitement. Ils proviennent de donnees originales (annonces reelles et transactions enregistrees) que personne d’autre ne publie a ce niveau de detail.'}
      </p>
      <p className="text-gray-600 max-w-2xl mb-10">
        {en
          ? 'All we ask: keep the small link back to the source. Copy the code, paste it anywhere.'
          : 'Nous demandons seulement : conservez le petit lien vers la source. Copiez le code, collez-le n’importe ou.'}
      </p>

      <div className="flex flex-col gap-14">
        {widgets.map((w) => (
          <section key={w.key}>
            <h2 className="text-xl font-bold text-[#0f2744] mb-1">{w.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{w.note}</p>
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-[#0e0e12]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.img}
                alt={w.alt}
                loading="lazy"
                className="w-full h-auto block"
                style={{ maxWidth: w.animated ? 620 : 720, margin: '0 auto' }}
              />
            </div>
            <EmbedMap
              code={codeFor(w.img, w.alt)}
              locale={l as 'en' | 'fr'}
              title={en ? 'Copy this widget' : 'Copier ce widget'}
            />
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-[#0f2744] text-white p-6 md:p-8">
        <h2 className="text-lg font-bold mb-2">
          {en ? 'How to add it' : 'Comment l’ajouter'}
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          {en
            ? 'Click “Copy this widget” under the one you want, then paste the code into your article’s HTML. The image (or animation) shows up with a small credit link underneath. That’s it.'
            : 'Cliquez sur « Copier ce widget » sous celui que vous voulez, puis collez le code dans le HTML de votre article. L’image (ou l’animation) apparait avec un petit lien de credit en dessous. C’est tout.'}
        </p>
        <Link
          href={`/${l}/data`}
          className="inline-block rounded-lg bg-[#e84141] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d13636] transition"
        >
          {en ? 'See the full data →' : 'Voir toutes les donnees →'}
        </Link>
      </div>
    </main>
  )
}
