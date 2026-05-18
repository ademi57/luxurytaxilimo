"use client";
import React from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <div 
      className={`fixed inset-0 bg-black/98 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center z-[10000] transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-3 text-center w-full px-6 pt-20">
        
        <div className="w-8 h-[1px] bg-[#D4AF37]/20 mb-4" />

        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            onClick={onClose} 
            className="!text-[11px] leading-none uppercase tracking-[0.45em] font-medium text-zinc-400 hover:text-[#D4AF37] active:text-[#D4AF37] py-2.5 transition-all block w-full"
          >
            {link.name}
          </Link>
        ))}

        <div className="w-8 h-[1px] bg-[#D4AF37]/20 mt-4" />
      </div>
    </div>
  );
}