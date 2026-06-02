"use client";
import React from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[]; 
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <>
      {/* ── Backdrop: alttaki sayfayı bulanıklaştırır, menüden ayrı katman ── */}
      <div
        className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
        onClick={onClose}
      />

      {/* ── Menü paneli: yukarıdan aşağıya kayar ── */}
      <div
        className={`fixed top-0 left-0 w-full z-[10000] lg:hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          isolation: "isolate",
          background:
            "linear-gradient(160deg, rgba(22,18,12,0.98) 0%, rgba(14,12,8,0.99) 100%)",
          backdropFilter: "blur(28px) saturate(1.4)",
          WebkitBackdropFilter: "blur(28px) saturate(1.4)",
          borderBottom: "1px solid rgba(212,175,55,0.18)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(212,175,55,0.12)",
        }}
      >
        {/* İnce altın yatay çizgi deseni */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px)",
            backgroundSize: "100% 48px",
          }}
        />

        {/* Dekor: sol üst ışık */}
        <div
          className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Dekor: sağ alt ışık */}
        <div
          className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(212,175,55,0.06) 0%, transparent 70%)",
          }}
        />

        {/* ── İçerik ── */}
        <div className="relative flex flex-col items-center w-full px-8 py-14">

          {/* Başlık çizgisi */}
          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-8 h-px"
              style={{ background: "linear-gradient(to right, transparent, #D4AF37)" }}
            />
            <span className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]/60">
              Menu
            </span>
            <div
              className="w-8 h-px"
              style={{ background: "linear-gradient(to left, transparent, #D4AF37)" }}
            />
          </div>

          {/* ── Navigasyon linkleri ── */}
          <nav className="flex flex-col items-center w-full">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="group relative text-[12px] uppercase tracking-[0.32em] font-medium text-white/60 hover:text-[#D4AF37] py-4 transition-all duration-300 block w-full text-center"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.07)" }}
              >
                {link.name}
                {/* hover alt çizgisi */}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-10 transition-all duration-300"
                  style={{ background: "#D4AF37" }}
                />
              </Link>
            ))}
          </nav>

          {/* Ayraç */}
          <div
            className="w-14 h-px mt-10 mb-8"
            style={{
              background:
                "linear-gradient(to right, transparent, #D4AF37, transparent)",
            }}
          />

          {/* Dil seçici */}
          <LanguageSwitcher />

          {/* Telefon */}
          <a
            href="tel:+31638352022"
            className="mt-8 text-[11px] tracking-[0.2em] text-white/25 hover:text-[#D4AF37] transition-colors duration-200"
          >
            +31 6 38 35 20 22
          </a>
        </div>
      </div>
    </>
  );
}