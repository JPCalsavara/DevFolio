import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import AppThemeProvider from "@/theme/AppThemeProvider";
import "./globals.css";

const titleFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "João Calsavara | Portfólio",
  description:
    "Portfólio em Next.js com identidade azul, foco em desenvolvimento e painel admin com Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${titleFont.variable} ${bodyFont.variable}`}
        suppressHydrationWarning
      >
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
