import type { ReactNode } from 'react'
import RootHtml, { rootMetadata, rootViewport } from '@/components/RootHtml'

// Layout racine de /devis (hors middleware : la langue y valait toujours 'fr').
export const metadata = rootMetadata
export const viewport = rootViewport

export default function DevisLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="fr">{children}</RootHtml>
}
