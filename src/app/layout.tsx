import { type ReactNode } from 'react';
// global styles
import './globals.css';

// metadata
export const metadata = {
  title: 'Quiz Chat',
  description: 'A chat application that demonstrates the use of AI tools in conversation.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
      <html lang="en">
        <body>{children}</body>
      </html>
  );
}