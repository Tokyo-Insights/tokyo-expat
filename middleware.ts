import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr', 'en']
const defaultLocale = 'fr'

// Déclarées au niveau module pour que le bundler Edge les inline correctement
const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

function basicAuth(request: NextRequest): NextResponse | null {
  if (!ADMIN_USER || !ADMIN_PASSWORD) {
    return new NextResponse('Admin non configuré', { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const colonIndex = decoded.indexOf(':')
      const inputUser = decoded.slice(0, colonIndex)
      const inputPass = decoded.slice(colonIndex + 1)
      if (inputUser === ADMIN_USER && inputPass === ADMIN_PASSWORD) {
        return null
      }
    }
  }

  return new NextResponse('Accès refusé', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Tokyo Expat Admin", charset="UTF-8"',
    },
  })
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/admin')) {
    const denied = basicAuth(request)
    if (denied) return denied
    return NextResponse.next()
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|devis|sitemap|.*\\..*).*)'],
}
