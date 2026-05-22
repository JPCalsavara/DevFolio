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
  title: "João Calsavara | Backend Dev & SRE",
  description:
    "Engenheiro de software backend com foco em sistemas distribuídos, cloud e dados. Stack: .NET, Node.js, Kubernetes, AWS.",
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
