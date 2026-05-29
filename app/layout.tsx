import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'makram-png | Developer & Designer Portfolio',
  description: 'A dark-themed portfolio for a developer and graphic designer with projects, designs, blog, and admin tools.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-surface text-white`}> 
        <Navbar />
        <main className="min-h-[calc(100vh-170px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
