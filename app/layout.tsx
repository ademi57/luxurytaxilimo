import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header"; // Header bileşenini import ettik

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Taxi Limo | VIP Chauffeur Service", // Markanıza uygun olarak güncellendi
  description: "Premium and luxury chauffeur service for your comfort.",
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
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-zinc-100">
        {/* Ortak Header tüm sayfalarda en üstte görünecek */}
        <Header />
        
        {/* Sayfa içerikleri */}
        {children}
      </body>
    </html>
  );
}