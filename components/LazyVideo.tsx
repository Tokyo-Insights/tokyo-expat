'use client'

import { useEffect, useRef } from 'react'

type Props = {
  src: string
  poster: string
  className?: string
  ariaLabel?: string
}

// Autoplay conserve (garantit la lecture) + preload="none" et pause hors viewport
// pour proteger le chargement initial / les Core Web Vitals.
export default function LazyVideo({ src, poster, className, ariaLabel }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.play?.().catch(() => {})
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.play?.().catch(() => {})
          else el.pause?.()
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
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className={className}
      aria-label={ariaLabel}
    />
  )
}
