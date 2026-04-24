"use client";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// BookingForm artık bu sayfada değil, yönlendirilen sayfada kullanılacak.
import { 
  FaCarSide, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaStar, 
  FaChevronDown, 
  FaInstagram, 
  FaFacebook, 
  FaGoogle, 
  FaLinkedin 
} from "react-icons/fa";

export default function IndexPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Airport Transfer");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const heroBackgrounds = ["/car-1.jpg", "/car-2.jpg", "/car-3.jpg", "/car-4.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Vehicles", href: "#vehicles" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Booking", href: "/booking" }, // Yönlendirme buraya eklendi
  ];

  const services = [
    { name: "Airport Transfer", icon: FaCarSide, desc: "Seamless and stress-free airport transfers to and from your destination." },
    { name: "Corporate Travel", icon: FaMapMarkerAlt, desc: "Professional and discreet corporate transportation for your business needs." },
    { name: "Special Events", icon: FaCalendarAlt, desc: "Elevate your special moments with our elegant and stylish event transportation." },
    { name: "City Tours", icon: FaMapMarkerAlt, desc: "Discover the city in comfort and style with our personalized city tours." },
  ];

  const vehicles = [
    { name: "Mercedes S-Class", image: "/car-1.jpg", features: ["Leather Seats", "Wi-Fi", "Bottled Water"] },
    { name: "BMW 7 Series", image: "/car-2.jpg", features: ["Panoramic Sunroof", "Rear Entertainment", "Premium Sound"] },
    { name: "Audi A8", image: "/car-3.jpg", features: ["Adaptive Air Suspension", "Advanced Safety", "Climate Control"] },
    { name: "Range Rover", image: "/car-4.jpg", features: ["Off-Road Capability", "Luxury Interior", "Spacious Cargo"] },
  ];

  const testimonials = [
    { name: "Sarah J.", role: "CEO, Tech Solutions", quote: "Luxury Taxi Limo exceeds expectations every time. Their service is truly VIP." },
    { name: "Michael C.", role: "Entrepreneur", quote: "The most comfortable and reliable transportation I've ever experienced." },
    { name: "David L.", role: "Frequent Traveler", quote: "I appreciate the attention to detail and professionalism. Highly recommended." },
  ];

  return (
    <>
      <main className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
        
       {/* --- HEADER --- */}
<nav className="fixed top-0 left-0 w-full z-[2000] bg-black/90 backdrop-blur-md border-b border-zinc-900">
  <div className="max-w-7xl mx-auto px-5 md:px-6 flex justify-between items-center py-3 md:py-4">
    
    {/* LOGO VE MARKA ADI (BÜYÜTÜLMÜŞ) */}
    <Link href="/" className="flex items-center gap-5 group">
      <div className="relative w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-[#D4AF37]/40 bg-zinc-900 shadow-lg shadow-[#D4AF37]/10">
        <Image 
          src="/download.jpg" 
          alt="Luxury Taxi Limo Logo"
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
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

    {/* MOBİL MENÜ BUTONU */}
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-2 outline-none">
      <motion.span animate={isMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }} className="w-9 h-[2px] bg-[#D4AF37] block origin-center"/>
      <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-9 h-[2px] bg-white block"/>
      <motion.span animate={isMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }} className="w-9 h-[2px] bg-[#D4AF37] block origin-center"/>
    </button>
  </div>
</nav>
        {/* --- HERO SECTION --- */}
        <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentBgIndex}
                src={heroBackgrounds[currentBgIndex]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.35, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="w-full h-full object-cover grayscale-[20%]"
                alt="Luxury Car Background"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
          </div>

          <div className="max-w-7xl mx-auto px-5 md:px-6 text-center relative z-10">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 uppercase"
            >
              VIP <span className="text-[#D4AF37]">Comfort</span>, <br /> <span className="text-zinc-400">Every</span> <span className="italic font-light text-zinc-500">Journey.</span>
            </motion.h1>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              {/* Buradaki href de yeni sayfaya yönlendirildi */}
              <Link href="/booking" className="bg-[#D4AF37] text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-all duration-300">
                Book Your VIP Chauffeur
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- SERVICES --- */}
        <section id="services" className="py-24 bg-[#0F0F0F] relative z-10">
          <div className="max-w-7xl mx-auto px-5 md:px-6 text-center">
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#D4AF37] mb-4">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <div key={i} className="bg-black border border-zinc-800 p-8 rounded-[32px] hover:border-[#D4AF37] transition-all group">
                  <service.icon className="text-4xl text-[#D4AF37] mb-6 mx-auto group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold uppercase text-white mb-3">{service.name}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- VEHICLES --- */}
        <section id="vehicles" className="py-24 bg-black relative z-10">
          <div className="max-w-7xl mx-auto px-5 md:px-6">
            <h2 className="text-center text-[10px] uppercase tracking-[0.5em] font-black text-[#D4AF37] mb-12">The Elite Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {vehicles.map((v, i) => (
                <div key={i} className="bg-zinc-950 border border-zinc-800 p-6 rounded-[32px] hover:border-[#D4AF37] transition-all group">
                  <img src={v.image} className="w-full h-40 object-cover rounded-2xl mb-6 grayscale group-hover:grayscale-0 transition-all" />
                  <h4 className="text-lg font-bold text-white uppercase">{v.name}</h4>
                  <ul className="text-[10px] text-zinc-500 uppercase tracking-widest mt-4">
                    {v.features.map(f => <li key={f}>• {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- BOOKING SECTION (REVİZE EDİLDİ) --- */}
        <section id="booking" className="py-24 bg-[#0F0F0F] relative z-10">
          <div className="max-w-4xl mx-auto px-5 md:px-6 text-center">
            <div className="bg-black border border-zinc-800 p-10 md:p-16 rounded-[40px] shadow-2xl">
              <h3 className="text-3xl font-black uppercase text-white mb-6 italic">Ready for <span className="text-[#D4AF37]">Luxury?</span></h3>
              <p className="text-zinc-500 mb-10 text-sm tracking-widest uppercase">Select your service, fleet and route in our VIP booking portal.</p>
              
              <Link href="/booking" className="inline-block bg-[#D4AF37] text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105">
                Go to Reservation Portal
              </Link>
            </div>
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section className="py-24 bg-black text-center border-t border-zinc-900">
            <div className="flex justify-center gap-10 text-[#D4AF37] mb-8">
              <FaInstagram size={22} className="hover:text-white cursor-pointer" />
              <FaFacebook size={22} className="hover:text-white cursor-pointer" />
              <FaLinkedin size={22} className="hover:text-white cursor-pointer" />
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-600">Luxury Taxi Limo • © 2026 Black & Gold Edition</p>
        </section>
      </main>
    </>
  );
}