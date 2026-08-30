import type { Metadata, Viewport } from 'next';
import { Outfit, Cinzel } from 'next/font/google';
import './globals.css';
import GameClientWrapper from '@/components/GameClientWrapper';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'MythVerse - Discover the Myths That Shaped Civilizations',
  description: 'An immersive, game-like exploration of Greek, Norse, and Egyptian mythology. Explore world maps, trace relationship graphs, complete campaigns, take quizzes, and consult the AI Lore Companion.',
  keywords: 'mythology, greek, norse, egyptian, legends, database, game, rpg, educational, wiki, next.js, react',
  authors: [{ name: 'Antigravity staff' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${cinzel.variable} font-sans bg-neutral-950 text-neutral-100 antialiased`}
      >
        <GameClientWrapper>
          {children}
        </GameClientWrapper>
      </body>
    </html>
  );
}
