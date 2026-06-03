import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { default as WhatsAppButton } from "../components/WhatsAppButton";
import CookieBanner from "../components/CookieBanner";
import StructuredData from "../components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://luxurytaxilimo.com"),

  title: {
    default: "Luxury Taxi Limo | Private Chauffeur & Tours",
    template: "%s | Luxury Taxi Limo",
  },

  description:
    "Premium private chauffeur services, airport transfers, luxury tours and helicopter experiences across Europe.",

  keywords: [
    "luxury taxi",
    "private chauffeur Amsterdam",
    "airport transfer Netherlands",
    "VIP transport Europe",
    "helicopter tour Amsterdam",
    "luxury tours Netherlands",
  ],

  openGraph: {
    title: "Luxury Taxi Limo",
    description:
      "Luxury chauffeur, airport transfers, tours and helicopter flights in Europe.",
    url: "https://luxurytaxilimo.com.com",
    siteName: "Luxury Taxi Limo",
    images: [
      {
        url: "/og-image.jpg", // public/ içine koyacağız
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxury Taxi Limo",
    description:
      "Private chauffeur & luxury travel experiences in Europe.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 1. Parametreleri güvenli şekilde çözüyoruz
  const { locale } = await params;
  
  // 2. getMessages() parametresiz çağrılmalı, 
  // çünkü zaten i18n/request.ts üzerinden locale'i otomatik tanıyacaktır.
  const messages = await getMessages(); 
  
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#F7F3E9] text-[#2D2926] relative`}>
        <StructuredData />
        {/* NextIntlClientProvider içinde locale ve messages kullanımı */}
        <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
          <Header />
          
          <main className="pt-[110px] flex-grow">
            {children}
          </main>
          
          <Footer />
          
          {/* WhatsApp Butonu eklendi */}
          <WhatsAppButton />
          <CookieBanner />
        </NextIntlClientProvider>
        
      </body>
    </html>
  );
}