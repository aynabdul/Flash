import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'FLASH - Foundation for Liberation, Advancement, Solidarity and Hope',
  description = 'FLASH is a non-profit organization dedicated to helping individuals in need through various programs and initiatives.',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/FLASH Logo.jpg" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout; 