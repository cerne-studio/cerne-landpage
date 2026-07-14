import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sora } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "cerne — Sistema sob medida pro seu jeito de trabalhar",
  description:
    "CRM, financeiro, agenda e dashboard construídos do zero para o seu negócio — não o contrário. Sistemas sob medida para pequenas e médias empresas.",
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
  other: {
    "facebook-domain-verification": "v7cci8crqcn43bcfej9t12ct29ri0u",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${sora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
