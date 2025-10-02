import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans as DMSans } from 'next/font/google';
import Footer from '@/components/layout/Footer';

const dmsans = DMSans({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-dmsans' });

export const metadata: Metadata = {
  title: 'Crosspay Solutions',
  description: 'Solucionamos tus pagos internacionales',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmsans.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
