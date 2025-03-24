'use client';

import './globals.css'; 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { usePathname } from 'next/navigation';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import AdminHeader from '../components/admin/AdminHeader';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'FLASH',
//   description: 'Free Legal Aid Society for the Helpless',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {isAdminPage ? <AdminHeader /> : <Header />}
          <main className="min-h-screen">
            {children}
          </main>
          {!isAdminPage && <Footer />}
        </Providers>
      </body>
    </html>
  )
}
