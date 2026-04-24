"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCar, FaHelicopter, FaMapMarkedAlt, FaMapMarkerAlt, 
  FaCalendarAlt, FaClock, FaUsers, FaSuitcase, FaPlus, FaChevronRight 
} from 'react-icons/fa';

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState('car');

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* ANA FORM KONTEYNERI */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] shadow-2xl overflow-hidden p-6 md:p-12">
        
        {/* ÜST TAB MENÜ (Servis Seçimi) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="flex bg-black/40 p-1.5 rounded-2xl backdrop-blur-md border border-white/5">
            {[
              { id: 'car', label: 'Chauffeur', icon: FaCar },
              { id: 'heli', label: 'Helicopter', icon: FaHelicopter },
              { id: 'tour', label: 'Private Tour', icon: FaMapMarkedAlt }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' 
                  : 'text-zinc-400 hover:text-white'
                }`}
              >
                <tab.icon className="text-lg" />
                <span className="text-[11px] uppercase tracking-tighter">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="text-right hidden md:block">
            <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em]">Premium Support</p>
            <p className="text-white text-sm font-light">+31 20 123 4567</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* SOL KOLON: GÜZERGÂH (Google Maps Style) */}
          <div className="space-y-8 relative">
            <div className="absolute left-7 top-14 bottom-14 w-[1px] border-l border-dashed border-zinc-600"></div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] ml-1">
                {activeTab === 'heli' ? 'Heliport / Departure' : 'Pick-up Location'}
              </label>
              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 z-10 transition-transform group-focus-within:scale-125" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'heli' ? "Enter Departure Heliport" : "Address, Hotel or Airport"} 
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37] focus:bg-black/50 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] ml-1">
                {activeTab === 'heli' ? 'Heliport / Destination' : 'Drop-off Location'}
              </label>
              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-green-500 z-10 transition-transform group-focus-within:scale-125" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'heli' ? "Enter Destination Heliport" : "Where are you going?"} 
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37] focus:bg-black/50 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <button className="flex items-center gap-2 text-zinc-500 hover:text-[#D4AF37] text-[10px] font-black uppercase tracking-widest transition-all ml-1 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <FaPlus className="text-[8px]" /> Add Multi-Stop
            </button>
          </div>

          {/* SAĞ KOLON: DETAYLAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
            
            {/* Tarih ve Saat */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Flight/Drive Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="date" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#D4AF37] transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Departure Time</label>
              <div className="relative">
                <FaClock className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="time" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#D4AF37] transition-all" />
              </div>
            </div>

            {/* Kişi Sayısı & Bagaj */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Passengers</label>
              <div className="relative">
                <FaUsers className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="number" min="1" defaultValue="1" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37] transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Luggage (kg/pcs)</label>
              <div className="relative">
                <FaSuitcase className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="number" min="0" defaultValue="0" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37] transition-all" />
              </div>
            </div>

            {/* Helikoptere Özel Not Alanı */}
            {activeTab === 'heli' && (
              <div className="col-span-2 mt-2 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                <p className="text-[9px] text-yellow-500 uppercase tracking-widest font-bold">
                  ⚠️ Heli-Charter Note: Our flights are subject to weather conditions and air traffic control.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ALT KISIM: BUTON */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-white/10 pt-10">
          <div className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] max-w-xs text-center md:text-left">
            Total estimate will be calculated in the next step based on vehicle/aircraft type.
          </div>

          <button className="group relative w-full md:w-auto overflow-hidden bg-white text-black px-16 py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:pr-20 active:scale-95 shadow-2xl shadow-white/10">
            <span className="relative z-10 text-[12px]">Request Quotation</span>
            <FaChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
         <p className="text-[9px] text-white uppercase tracking-[0.5em]">Official Partner: Schiphol VIP</p>
         <p className="text-[9px] text-white uppercase tracking-[0.5em]">FAA Certified</p>
      </div>
    </div>
  );
}