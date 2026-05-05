import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remote Tax Hub - Calculate Your Take-Home Pay in 30+ Countries",
  description: "Calculate your net salary after taxes as a remote worker, digital nomad, or freelancer. Compare tax rates, cost of living, and disposable income across 30+ countries worldwide.",
  keywords: "remote work tax calculator, digital nomad taxes, freelance tax calculator, take home pay calculator, net salary calculator, expat taxes, international tax comparison",
  authors: [{ name: "Remote Tax Hub" }],
  openGraph: {
    title: "Remote Tax Hub - Global Tax Calculator for Remote Workers",
    description: "Calculate your take-home pay in 30+ countries. Perfect for digital nomads and remote workers.",
    type: "website",
    url: "https://remotetaxhub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote Tax Hub - Global Tax Calculator",
    description: "Calculate your take-home pay in 30+ countries",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://remotetaxhub.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
