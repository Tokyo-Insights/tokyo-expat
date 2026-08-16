import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://formspree.io https://api.telegram.org https://api.hunter.io https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com",
      "frame-src https://calendly.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    // Anciennes pages supprimees (404 encore indexees) nommant des concurrents.
    // 301 vers nos pages generiques: protege la commission + capture le trafic residuel.
    return [
      { source: '/en/blog/sakura-house-review', destination: '/en/blog/gaijin-house-tokyo-guide', permanent: true },
      { source: '/fr/blog/sakura-house-review', destination: '/fr/blog/gaijin-house-tokyo-guide-complet', permanent: true },
      { source: '/en/blog/gaijinpot-housing-alternative', destination: '/en/blog/gaijin-house-tokyo-guide', permanent: true },
      { source: '/fr/blog/gaijinpot-housing-alternative', destination: '/fr/blog/gaijin-house-tokyo-guide-complet', permanent: true },
      // 404 encore indexees avec du trafic (GSC 16/08): oak-house-alternative 680 impr, share-house-comparison 324 impr.
      { source: '/en/blog/oak-house-alternative', destination: '/en/blog/gaijin-house-tokyo-guide', permanent: true },
      { source: '/fr/blog/oak-house-alternative', destination: '/fr/blog/gaijin-house-tokyo-guide-complet', permanent: true },
      { source: '/en/blog/share-house-tokyo-comparison-2026', destination: '/en/blog/share-house-tokyo-guide-2026', permanent: true },
    ]
  },
}

export default nextConfig
