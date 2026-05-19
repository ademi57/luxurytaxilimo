"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu"; // Yeni menüyü import ettik

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Vehicles", href: "/#vehicles" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Booking", href: "/booking" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-black/90 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6 flex justify-between items-center py-3 md:py-4">
        
        {/* LOGO VE MARKA ADI */}
        <Link href="/" className="flex items-center gap-5 group">
          <div className="relative w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-[#D4AF37]/40 bg-zinc-900 shadow-lg shadow-[#D4AF37]/10">
            <Image 
              src="/logo.jpg" 
              alt="Luxury Taxi Limo Logo"
              fill
              sizes="(max-width: 768px) 64px, 96px"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              Luxury <span className="text-[#D4AF37]">Taxi</span> Limo
            </span>
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-zinc-500 font-bold mt-1">
              Premium Chauffeur Service
            </span>
          </div>
        </Link>

        {/* MASAÜSTÜ MENÜ LİNKLERİ */}
        <div className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.25em] font-bold opacity-70">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-[#D4AF37] hover:opacity-100 transition-all">
              {link.name}
            </Link>
          ))}
        </div>

        {/* MOBİL MENÜ BUTONU (BURGER) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-2 outline-none z-[10001] relative"
        >
          <span className={`w-9 h-[2px] bg-[#D4AF37] block transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[10px]" : ""}`}/>
          <span className={`w-9 h-[2px] bg-white block transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}/>
          <span className={`w-9 h-[2px] bg-[#D4AF37] block transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[10px]" : ""}`}/>
        </button>
      </div>

      {/* Ayırdığımız Mobil Menüyü Buraya Temizce Yerleştirdik */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        links={navLinks} 
      />
    </nav>
  );
}