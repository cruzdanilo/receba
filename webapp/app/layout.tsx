import './globals.css';
import { type Metadata } from 'next';
import React, { type ReactNode } from 'react';
import Header from './Header';
import '../server/wagmi';

export const metadata: Metadata = {
  title: 'receba',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
