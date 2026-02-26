import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ReelFocus",
  description: "Catch Your Momentum, Not Just Your Goals. Reduce fear of failure and feeling of overwhelm and stop procrastinating today.",
  openGraph: {
    title: "ReelFocus",
    description: "Catch Your Momentum, Not Just Your Goals. Reduce fear of failure and feeling of overwhelm and stop procrastinating today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelFocus",
    description: "Catch Your Momentum, Not Just Your Goals. Reduce fear of failure and feeling of overwhelm and stop procrastinating today.",
  },
  icons: {
    icon: [
      {
        url: "/images/idevibelogo.png",
        type: "image/png",
        sizes: "32x32"
      },
      {
        url: "/images/idevibelogo.png",
        type: "image/png",
        sizes: "16x16"
      }
    ],
    apple: [
      {
        url: "/images/idevibelogo.png",
        type: "image/png",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/images/idevibelogo.png" }],
    other: [
      {
        rel: "icon",
        url: "/images/idevibelogo.png",
      },
    ],
  },
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/idevibelogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/idevibelogo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/idevibelogo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} bg-white bg-dotted-grid-light`}>{children}</body>
    </html>
  );
}
