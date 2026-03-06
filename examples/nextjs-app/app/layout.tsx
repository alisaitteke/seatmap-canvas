import type { Metadata } from 'next';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seatmap Canvas - Next.js App Router Example',
  description: 'Interactive seat selection with Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
