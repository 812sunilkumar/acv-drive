import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Drive - Electric Vehicle Test Drive Service',
  description: 'Experience the future of driving. Book your test drive today and discover your perfect electric vehicle across Ireland.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full bg-gray-50">
        {children}
      </body>
    </html>
  );
}

