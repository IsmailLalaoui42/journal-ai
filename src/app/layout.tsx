import './globals.css'
import './animations.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
} from '@clerk/nextjs'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Journal en ligne ENSA Beni Mellal',
  description: 'Actualités, événements et activités de l\'École Nationale des Sciences Appliquées de Beni Mellal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>
          <div id="notification-container"></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  )
}
