'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

const GA_ID = 'G-NL25TL3LDG'

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      ;(window as { gtag: (...args: unknown[]) => void }).gtag('config', GA_ID, { page_path: pathname })
    }
  }, [pathname])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
