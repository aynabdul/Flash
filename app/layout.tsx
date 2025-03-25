import './globals.css'; 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FLASH',
  description: 'Free Legal Aid Society for the Helpless',
  icons: {
    icon: '/images/FLASH Logo.jpg',
    apple: '/images/FLASH Logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
