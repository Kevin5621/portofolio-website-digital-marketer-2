import './globals.css';
import type { Metadata } from 'next';
import ZoomPrevention from './ZoomPrevention';

export const metadata: Metadata = {
  title: 'Adhara Eka | Digital Marketer',
  description: 'Portfolio of Adhara Eka, a professional Digital Marketer',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-dark text-light">
        <ZoomPrevention />
        {children}
      </body>
    </html>
  );
}