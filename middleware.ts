import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr', 'en']
const defaultLocale = 'fr'

function basicAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_USER
  const pass = process.env.ADMIN_PASSWORD

  if (!user || !pass) {
    return new NextResponse('Admin non configuré', { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
      const [inputUser, inputPass] = decoded.split(':')
      if (inputUser === user && inputPass === pass) {
        return null // accès autorisé
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

  // Protection admin
  if (pathname.startsWith('/admin')) {
    const denied = basicAuth(request)
    if (denied) return denied
    return NextResponse.next()
  }

  // Redirect locale
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
