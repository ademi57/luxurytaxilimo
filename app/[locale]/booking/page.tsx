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
      <div className="max-w-3xl mx-auto px-5 md:px-6 mt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
            VIP <span className="text-[#D4AF37]">Reservation</span> Portal
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            Please fill out the form below to secure your luxury chauffeur service. Our dispatch team will confirm your itinerary shortly.
          </p>
        </div>

        {/* Formu sarmalayan lüks panel kutusu */}
        <div className="bg-black border border-zinc-800 p-6 md:p-12 rounded-[40px] shadow-2xl relative shadow-[#D4AF37]/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          <BookingForm />
        </div>
      </div>

      <div className="mt-20">
        <TouristSlider />
      </div>

      {/* FOOTER NOTU */}
      <div className="text-center mt-16">
        <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-650">
          Secure 256-Bit SSL Encrypted Booking System
        </p>
      </div>

    </main>
  );
}