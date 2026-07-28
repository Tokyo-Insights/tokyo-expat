'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster: string
  className?: string
  ariaLabel?: string
}

// Charge et joue la video seulement quand elle entre dans le viewport (protege
// le chargement initial / les Core Web Vitals). Le poster s'affiche avant.
export default function LazyVideo({ src, poster, className, ariaLabel }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLoad(true)
            el.play?.().catch(() => {})
          } else {
            el.pause?.()
          }
        })
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      aria-label={ariaLabel}
    />
  )
}
