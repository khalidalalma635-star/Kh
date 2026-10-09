import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KHALIDAI',
  description: 'Production-ready AI application foundation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
