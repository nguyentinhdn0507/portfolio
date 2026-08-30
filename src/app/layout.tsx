import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/ui/Navbar';
import ParticleBackground from '@/components/3d/ParticleBackground';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nguyen Chi Tinh | Full-Stack Developer (Next.js, React, TypeScript, NestJS)',
  description: 'Portfolio of Nguyen Chi Tinh, an experienced Full-Stack Developer with ~3 years of experience specializing in Next.js, React, TypeScript, Node.js, NestJS, and enterprise e-commerce platforms.',
  keywords: [
    'Nguyen Chi Tinh',
    'Full-Stack Developer',
    'Frontend Developer',
    'Next.js Developer',
    'React Developer',
    'TypeScript',
    'NestJS',
    'Node.js',
    'Three.js',
    'Tailwind CSS',
    'Vietnam Developer',
    'Da Nang Developer',
  ],
  authors: [{ name: 'Nguyen Chi Tinh', url: 'https://www.linkedin.com/in/nguyentinh0507/' }],
  creator: 'Nguyen Chi Tinh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nguyenchitinh.dev',
    title: 'Nguyen Chi Tinh | Full-Stack Developer Portfolio',
    description: 'Specializing in Next.js, React, TypeScript & NestJS enterprise applications.',
    siteName: 'Nguyen Chi Tinh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nguyen Chi Tinh | Full-Stack Developer',
    description: 'Specializing in Next.js, React, TypeScript & NestJS enterprise applications.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#090a10' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-indigo-500/20 selection:text-indigo-400">
        <ThemeProvider>
          <LanguageProvider>
            {/* Ambient 3D Particle Background */}
            <ParticleBackground />
            
            {/* Floating Glass Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <main className="relative z-10 flex flex-col">
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
