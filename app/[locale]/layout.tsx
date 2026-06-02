import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { default as WhatsAppButton } from "../components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Taxi Limo | VIP Chauffeur Service",
  description: "Premium and luxury chauffeur service for your comfort.",
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
        {/* NextIntlClientProvider içinde locale ve messages kullanımı */}
        <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
          <Header />
          
          <main className="pt-[110px] flex-grow">
            {children}
          </main>
          
          <Footer />
          
          {/* WhatsApp Butonu eklendi */}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}