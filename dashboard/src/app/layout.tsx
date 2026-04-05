import type { Metadata } from 'next'
import { Sidebar } from '@/components/layout/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Le Présent — wiki-copro',
  description: 'Dashboard de gestion de copropriété · copro-intel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: 'var(--bg-0)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <Sidebar />
        <main
          style={{
            flex: 1,
            minWidth: 0,
            overflowY: 'auto',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
