import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr', 'en']
const defaultLocale = 'fr'

// Detecte la langue preferee du navigateur (Accept-Language) pour router les URLs
// SANS prefixe vers /en ou /fr. Evite d'envoyer un anglophone (ex. trafic Reddit US)
// sur la version francaise. Fallback = defaultLocale. Redirect 307 (varie selon en-tete).
function detectLocale(request: NextRequest): string {
  const accept = (request.headers.get('accept-language') || '').toLowerCase()
  const primary = accept.split(',')[0].trim()
  if (primary.startsWith('fr')) return 'fr'
  if (primary.startsWith('en')) return 'en'
  if (accept.includes('en') && !accept.includes('fr')) return 'en'
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${detectLocale(request)}${pathname}`, request.url)
    )
  }

  // Pass locale to server components via request header
  const locale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) || defaultLocale

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|devis|sitemap|api|og|.*\\..*).*)'],
}
