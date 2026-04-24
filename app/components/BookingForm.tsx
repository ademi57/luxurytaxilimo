"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FaCar, FaHelicopter, FaMapMarkedAlt, FaMapMarkerAlt, 
  FaCalendarAlt, FaClock, FaUsers, FaSuitcase, FaPlus, FaChevronRight 
} from 'react-icons/fa';

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState('car');
  const [selectedVehicle, setSelectedVehicle] = useState(1);

  const fleet = [
    { id: 1, name: 'Mercedes S-Class', type: 'Luxury Sedan', capacity: '3', bags: '2' },
    { id: 2, name: 'Mercedes V-Class', type: 'Executive Van', capacity: '7', bags: '6' },
    { id: 3, name: 'Range Rover Vogue', type: 'Premium SUV', capacity: '4', bags: '3' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-20">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] shadow-2xl overflow-hidden p-6 md:p-12">
        
        {/* ÜST TAB MENÜ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5">
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
                  ? 'bg-[#D4AF37] text-black shadow-lg' 
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
          {/* SOL KOLON: GÜZERGÂH */}
          <div className="space-y-8 relative">
            <div className="absolute left-7 top-14 bottom-14 w-[1px] border-l border-dashed border-zinc-600"></div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] ml-1">Pick-up Location</label>
              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 z-10" />
                <input type="text" placeholder="Address, Hotel or Airport" className="w-full bg-black/30 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37] transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] ml-1">Drop-off Location</label>
              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-green-500 z-10" />
                <input type="text" placeholder="Where are you going?" className="w-full bg-black/30 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37] transition-all" />
              </div>
            </div>
            <button className="flex items-center gap-2 text-zinc-500 hover:text-[#D4AF37] text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5 transition-all">
              <FaPlus className="text-[8px]" /> Add Multi-Stop
            </button>
          </div>

          {/* SAĞ KOLON: DETAYLAR VE ARAÇ SEÇİMİ */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Date</label>
                <input type="date" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#D4AF37]" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Time</label>
                <input type="time" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#D4AF37]" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Passengers</label>
                <div className="relative">
                  <FaUsers className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input type="number" min="1" defaultValue="1" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Luggage</label>
                <div className="relative">
                  <FaSuitcase className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input type="number" min="0" defaultValue="0" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* ARAÇ SEÇİM BLOKLARI (BURAYA TAŞINDI) */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] ml-1">Select Your Vehicle</label>
              <div className="flex flex-col gap-3">
                {fleet.map((car) => (
                  <motion.div 
                    key={car.id}
                    onClick={() => setSelectedVehicle(car.id)}
                    whileHover={{ x: 5 }}
                    className={`cursor-pointer flex items-center justify-between p-5 rounded-3xl border transition-all duration-500 ${
                      selectedVehicle === car.id 
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/5' 
                      : 'bg-black/20 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      {/* Araba Resim Alanı (Gelecekte Image eklenecek) */}
                      <div className="w-20 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-[8px] text-zinc-700 font-bold uppercase tracking-tighter text-center">
                        Photo
                      </div>
                      <div>
                        <h4 className={`text-sm font-black uppercase tracking-tight ${selectedVehicle === car.id ? 'text-white' : 'text-zinc-400'}`}>
                          {car.name}
                        </h4>
                        <p className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">{car.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 opacity-40">
                      <div className="flex items-center gap-1 text-[10px] text-white"><FaUsers size={12}/> {car.capacity}</div>
                      <div className="flex items-center gap-1 text-[10px] text-white"><FaSuitcase size={12}/> {car.bags}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ALT BUTON */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-white/10 pt-10">
          <div className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] max-w-xs text-center md:text-left">
            Best price guaranteed for premium chauffeured services in Europe.
          </div>
          <button className="group relative overflow-hidden w-full md:w-auto bg-white text-black px-16 py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:pr-20 shadow-2xl">
            <span className="relative z-20 text-[12px]">Request Quotation</span>
            <FaChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all z-20" />
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
}