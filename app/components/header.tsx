"use client";
import React, { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl"; 
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu"; 
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale(); 
  const t = useTranslations("Nav");

  const navLinks = useMemo(() => [
    { name: t("services"), href: `/${locale}/#services` },
    { name: t("vehicles"), href: `/${locale}/#vehicles` },
    { name: t("testimonials"), href: `/${locale}/#testimonials` },
    { name: t("booking"), href: `/${locale}/booking` },
    { name: t("colofon"), href: `/${locale}/colofon` },
    { name: t("privacy"), href: `/${locale}/privacy` },
  ], [t, locale]);

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-[9999] backdrop-blur-md transition-colors duration-500 pr-[calc(100vw-100%)]" style={{ backgroundColor: "rgba(247, 243, 233, 0.90)", color: "#2D2926" }}
    >
      <div className="max-w-7xl mx-auto h-[110px] px-5 md:px-10 flex justify-between items-center">
        <Link href={`/${locale}`} className="flex items-center gap-5 group">
          <div className="relative w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-[#D4AF37]/40 bg-zinc-900 shadow-lg shadow-[#D4AF37]/10">
            <Image src="/logo.jpg" alt="Luxury Taxi Limo Logo" fill sizes="(max-width: 768px) 64px, 96px" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" priority />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#2D2926] leading-none">
              Luxury <span className="text-[#D4AF37]">Taxi</span> Limo
            </span>
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-[#5A544D] font-bold mt-1">
              Premium Chauffeur Service
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-10 text-[12px] uppercase tracking-[0.25em] font-bold text-[#2D2926] items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-[#D4AF37] transition-all duration-300">
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-2 outline-none z-[10001] relative"
          >
            <span className={`w-9 h-[2px] bg-[#D4AF37] block transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[10px]" : ""}`}/>
            <span className={`w-9 h-[2px] bg-[#2D2926] block transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}/>
            <span className={`w-9 h-[2px] bg-[#D4AF37] block transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[10px]" : ""}`}/>
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        links={navLinks} 
      />
    </nav>
  );
}