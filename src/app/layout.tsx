import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";

import { appConfig } from "../config/app";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import AuthBanner from "@/components/auth-banner";

import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

import { EventJsonLd } from "@/components/seo/event-json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.siteUrl),
  title: {
    default: appConfig.title,
    template: `%s | ${appConfig.shortTitle}`,
  },
  description: appConfig.description,
  keywords: appConfig.keywords,
  authors: [{ name: "Curso de Direito - UEMS Aquidauana" }],
  creator: "UEMS Aquidauana",
  publisher: "Universidade Estadual de Mato Grosso do Sul",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: appConfig.siteUrl,
    title: appConfig.title,
    description: appConfig.description,
    siteName: appConfig.shortTitle,
    images: [
      {
        url: appConfig.ogImage,
        width: 1200,
        height: 630,
        alt: appConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.title,
    description: appConfig.description,
    images: [appConfig.ogImage],
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon-light.svg",
        href: "/icon-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon-dark.svg",
        href: "/icon-dark.svg",
      },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <EventJsonLd />
        <Providers>
          <AuthBanner />
          {children}
        </Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
