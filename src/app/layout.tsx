import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Starlight de Prince',
    default: 'Starlight de Prince | Leading Construction Materials Supplier',
  },
  description: 'Premium industrial MDF, HDF, Blockboard, and Plywood materials in Nigeria. Certified for quality, durable, and reliable.',
  keywords: ['construction', 'mdf', 'hdf', 'blockboard', 'plywood', 'wood boards', 'Nigeria', 'industrial supplier', 'Starlight de Prince'],
  authors: [{ name: 'Starlight de Prince' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
