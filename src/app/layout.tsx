import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adhara Eka | Digital Marketer',
  description: 'Portfolio of Adhara Eka, a professional Digital Marketer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark text-light">
        {children}
      </body>
    </html>
  );
}