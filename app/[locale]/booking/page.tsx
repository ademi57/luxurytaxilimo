"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BookingForm from "../../components/BookingForm";
import TouristSlider from "../../components/TouristSlider";

export default function BookingPage() {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden pt-32 pb-20">
      
      {/* PayPal SDK Scripti */}
      <script src={`https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=EUR`} async></script>

      {/* --- REZERVASYON SAYFASI HEADER --- */}
      <nav className="fixed top-0 left-0 w-full z-[2000] bg-black/90 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex justify-between items-center py-3 md:py-4">
          
          {/* LOGO VE MARKA ADI (Ana sayfa ile aynı) */}
          <Link href="/" className="flex items-center gap-5 group">
            <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full border-2 border-[#D4AF37]/40 bg-zinc-900 shadow-lg shadow-[#D4AF37]/10">
              <Image 
                src="/logo.jpg" 
                alt="Luxury Taxi Limo Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white leading-none">
                Luxury <span className="text-[#D4AF37]">Taxi</span> Limo
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold mt-1">
                Premium Chauffeur Service
              </span>
            </div>
          </Link>

          {/* GERİ DÖNÜŞ BUTONU (Şık gold buton) */}
          <Link 
            href="/" 
            className="text-[10px] md:text-xs font-black uppercase tracking-widest border border-[#D4AF37]/40 px-5 py-2.5 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            ← Back To Home
          </Link>
        </div>
      </nav>

      {/* --- FORM ALANI --- */}
      {/* max-w-3xl yerine max-w-7xl kullanarak ve px ayarlarıyla ekranı tam kaplamasını sağladık */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative">
        
        {/* Tasarım Dokunuşu: Formun arkasına hafif lüks bir gold glow efekti */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="text-center mb-16 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
            VIP <span className="text-[#D4AF37]">Reservation</span> Portal
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            Please fill out the form below to secure your luxury chauffeur service. Our dispatch team will confirm your itinerary shortly.
          </p>
          
          {/* Tasarım Dokunuşu: Başlığın altına şık, ince gold bir çizgi */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-6" />
        </div>

        {/* Lüks kutu (panel) kaldırıldı, form doğrudan geniş alana yayıldı */}
        <div className="w-full relative z-10 dynamic-form-container">
          <BookingForm />
        </div>
      </div>

      <div className="mt-28">
        <TouristSlider />
      </div>

      {/* FOOTER NOTU */}
      <div className="text-center mt-20">
        <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-650">
          Secure 256-Bit SSL Encrypted Booking System
        </p>
      </div>

    </main>
  );
}