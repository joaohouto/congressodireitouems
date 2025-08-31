import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { appConfig } from "./config";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import AuthBanner from "@/components/auth-banner";

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
    default: appConfig.title,
    template: `%s | ${appConfig.shortTitle}`,
  },
  description: appConfig.description,

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_HOSTNAME,
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthBanner />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
