import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import AppThemeProvider from "@/theme/AppThemeProvider";
import { profileData } from "@/data/portfolioData";
import "./globals.css";

const titleFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#05101E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://joaocalsavara.dev",
  ),
  title: {
    default: `${profileData.name} | Portfólio`,
    template: `%s | ${profileData.name}`,
  },
  description: profileData.bio || profileData.headline,
  keywords: [
    "João Calsavara",
    "Desenvolvedor Backend",
    ".NET",
    "C#",
    "Kubernetes",
    "PostgreSQL",
    "Software Engineer",
    "Unicamp",
    "Mottu",
    "SRE",
    "Cloud",
  ],
  authors: [{ name: profileData.name }],
  creator: profileData.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: `${profileData.name} | ${profileData.headline}`,
    description: profileData.bio,
    siteName: `${profileData.name} Portfólio`,
    images: [
      {
        url: profileData.heroImageUrl || "/images/hero-img.jpg",
        width: 1200,
        height: 630,
        alt: `${profileData.name} - Portfólio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} | ${profileData.headline}`,
    description: profileData.bio,
    images: [profileData.heroImageUrl || "/images/hero-img.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      data-theme="blue-terminal"
      suppressHydrationWarning
    >
      <body
        className={`${titleFont.variable} ${bodyFont.variable}`}
        suppressHydrationWarning
      >
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
