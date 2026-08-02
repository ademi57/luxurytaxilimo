"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/header";
import BookingForm from "../../components/BookingForm";
import TouristSlider from "../../components/TouristSlider";

export default function BookingPage() {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden pt-32 pb-20">
      
      {/* PayPal SDK Scripti */}
      <script src={`https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=EUR`} async></script>

      {/* --- HEADER BİLEŞENİ --- */}
      <div className="relative z-[9999] w-full"> </div>
      <Header />

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