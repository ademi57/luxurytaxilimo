"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  FaCarSide,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaWifi,
} from "react-icons/fa";
import { use } from "react";
import Script from 'next/script';
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}


// ─── TYPES ────────────────────────────────────────────────
interface Tour {
  id: string;
  name: string;
  price: string;
  detail: string;
  category: "land" | "helicopter";
  images: string[];
  mapsUrl?: string;
}

// ─── ALL TOURS DATA ───────────────────────────────────────
const allTours: Tour[] = [
  {
    id: "giethoorn",
    name: "Giethoorn & Windmills Tour",
    price: " From €475 / 6 Hours",
    category: "land",
    detail: "Venice of the North Experience + 2-hour waiting time,Explore the Venice of the North and traditional Dutch windmills in full private luxury.",
    images: ["/giethoorn.jpg", "/giethoorn2.jpg"],
    mapsUrl: "https://www.google.com/maps/dir/Amsterdam/Giethoorn/",
  },
  {
    id: "keukenhof",
    name: "Keukenhof Tulip Experience",
    price: " From €295 / Sedan · €350 / Bus",
    category: "land",
    detail: "Keukenhof + Lisse + 2-hour waiting time, Immerse yourself in millions of blooming flowers with private door-to-door transfer.",
    images: ["/keukenhof.jpg", "/keukenhofff.jpg"],
    mapsUrl:
        "https://www.google.com/maps/dir/?api=1&origin=Amsterdam+Centraal&destination=Keukenhof+Lisse&travelmode=transit",
  },
  {
    id: "zaanse-schans",
    name: "Zaanse Schans & Volendam",
    price: "From €280",
    category: "land",
    detail: "Discover historic wooden windmills, cheese factories, and traditional fishing villages.",
    images: ["/Zaanse Schans.jpg", "/zaanse.jpg", "/CheeseFactory.jpg"],
    mapsUrl: "https://www.google.com/maps/dir/Amsterdam/Zaanse+Schans/Volendam/",
  },
  {
    id: "Amsterdam Cruise / Airport Transfer",
    name: "Amsterdam Cruise / Airport Transfer",
    price: " From €95",
    category: "land",
    detail: "Amsterdam Cruise Port ↔ Airport Transfer",
  mapsUrl:
        "https://www.google.com/maps/dir/?api=1&origin=Amsterdam+Cruise+Port&destination=Amsterdam+Airport+Schiphol&travelmode=driving",
      images: ["/curise.png"],
  },
  {
    id: "windmills-villages",
    name: "Windmills & Villages",
    price: " From €350 / 5 Hours",
    category: "land",
   detail: "Zaanse Schans + Cheese Factory + Volendam + 2-hour waiting time",
    images: ["/Zaanse Schans.jpg", "/zaanse.jpg", "/CheeseFactory.jpg"],
     mapsUrl: "https://www.google.com/maps/dir/Amsterdam/Zaanse+Schans/Volendam/",
  },
  {
    id: "grand-holland",
    name: "Grand Holland Private Helicopter Tour",
    price: "From €1,200",
    category: "helicopter",
    detail: "Exclusive sky tour covering flower fields, coastlines, and major historical landmarks.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
    ],
    mapsUrl: "https://maps.google.com"
  }

];
function FadeIn({ children, delay = 0, direction = "up", className = "" }: FadeInProps) {
  // useRef'e bir HTML div elementi tutacağını belirttik
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Gold shimmer line component ─── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
    </div>
  );
}
/* ─── Counter Bileşeni İçin Tip Tanımlaması (Satır 60 Çözümü) ─── */
interface CounterProps {
  target: number;   // Sayacın duracağı hedef sayı
  suffix?: string;  // Sayının sonuna gelecek ek (örn: "+", "%")
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: CounterProps) {
  const [count, setCount] = useState<number>(0);
  // useRef'e bir HTML span elementi tutacağını belirttik
  const ref = useRef<HTMLSpanElement>(null); 
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { 
        setCount(target); 
        clearInterval(timer); 
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
export default function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const pathname = usePathname();
  const heroBackgrounds = ["/car-1.jpg", "/car8-.png", "/car-2.jpg", "/car-3.jpg", "/car-4.jpg", "/car-5.png", "/car-6.png", "/car7-.png"];
    const currentLocale = pathname.split("/")[1] || "en";
  useEffect(() => {
    const iv = setInterval(() => setCurrentBgIndex(p => (p + 1) % heroBackgrounds.length), 6000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const scriptId = 'elfsight-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Fleet", href: "#vehicles" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Booking", href: "/booking" },
  ];

  const services = [
    { name: "Airport Transfer", icon: FaCarSide, desc: "First-class airport logistics, tracked flight arrivals, and meet-and-greet service." },
    { name: "Corporate Travel", icon: FaShieldAlt, desc: "Discreet executive transport. NDA-compliant chauffeurs, privacy glass, secure routing." },
    { name: "Special Events", icon: FaCalendarAlt, desc: "Weddings, galas, red carpet arrivals — arrive in unforgettable style." },
    { name: "City Tours", icon: FaMapMarkerAlt, desc: "Curated city experiences in pure luxury. Your personal driver, your agenda." },
  ];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const vehicles = [
    { name: "Mercedes S-Class", tag: "Flagship Sedan", image: "/car-1.jpg", features: ["Nappa Leather", "Burmester Sound", "Privacy Glass"] },
    { name: "Mercedes E-Class", tag: "E Class Luxury VIP", image: "/car-8.png", features: ["Business Class VIP Comfort", "Advanced Ambient Lighting", "Executive Seating"]},
    { name: "Mercedes Sprinter", tag: "Luxury VIP Group Drive", image: "/car-7.png", features: ["Spacious Group Configuration", "Family-Friendly Interior Comfort", "Seamless Group Travel Experience"] }, 
    { name: "Mercedes-Benz V-Class", tag: "Luxury Minivan", image: "/car-5.png", features: ["Business Class Comfort", "Ambient Lighting", "Panoramic Roof"] },
    { name: "BMW 7 Series", tag: "Executive Suite", image: "/car-2.jpg", features: ["Rear Theatre", "Ambient Lighting", "Massage Seats"] },
    { name: "Tesla Model S ", tag: "Luxury Electric", image: "/car-9.png", features: ["Adaptive Air Ride", "Night Vision", "Panoramic Roof"] },
  ];

  const testimonials = [
      { name: "Sarah J.", role: "CEO, Tech Solutions", stars: 5, quote: "Every journey feels like flying first class. The attention to detail and professionalism is unmatched anywhere in the city." },
      { name: "Michael C.", role: "Entrepreneur", stars: 5, quote: "I've used executive car services worldwide. This is the gold standard. The fleet is immaculate, the drivers are elite." },
      { name: "David L.", role: "Frequent Traveler", stars: 5, quote: "Punctual to the minute, every time. After three years of using them for my airport runs, they've never let me down once." },
  ];

  const stats = [
    { value: 12, suffix: "+", label: "Years of Service" },
    { value: 50000, suffix: "+", label: "Journeys Completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 24, suffix: "/7", label: "Available Hours" },
  ];
const [tourTab, setTourTab] = useState<"tours" | "helicopter">("tours");
const [activeGallery, setActiveGallery] = useState<{ tour: any; index: number } | null>(null);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Josefin+Sans:wght@300;400;600;700&display=swap');
        
        :root {
          --gold: #D4AF37;
          --gold-light: #F0D070;
          --gold-dark: #A07820;
          --black: rgba(247, 243, 233, 0.90);
          --black-2: #0F0F0F;
          --black-3: #141414;
          --black-4: #1A1A1A;
          --zinc-800: #27272A;  
          --zinc-600: #52525B;
          --zinc-400: #A1A1AA;
          --zinc-200: #E4E4E7;
          --white: #FAFAFA;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          background: var(--black);
          color: var(--white);
          font-family: 'Josefin Sans', sans-serif;
          overflow-x: hidden;
        }

        .font-display { font-family: 'Cormorant Garamond', serif; }

        /* Gold gradient text */
        .text-gold-gradient {
          background: linear-gradient(135deg, #D4AF37 0%, #F0D070 40%, #A07820 70%, #D4AF37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Noise texture overlay */
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Geometric border corners */
        .corner-border {
          position: relative;
        }
        .corner-border::before,
        .corner-border::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--gold);
          border-style: solid;
        }
        .corner-border::before {
          top: -1px; left: -1px;
          border-width: 1px 0 0 1px;
        }
        .corner-border::after {
          bottom: -1px; right: -1px;
          border-width: 0 1px 1px 0;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--black); }
        ::-webkit-scrollbar-thumb { background: var(--gold-dark); }

        /* Nav link underline hover */
        .nav-link {
          position: relative;
          text-decoration: none;
          color: var(--zinc-400);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.4s ease;
        }
        .nav-link:hover { color: var(--gold); }
        .nav-link:hover::after { width: 100%; }

        /* CTA Button */
        .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #C9A227, #D4AF37, #B8920E);
          color: #080808;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 16px 36px;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .btn-gold::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #F0D070, #C9A227);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(212,175,55,0.35); }
        .btn-gold:hover::before { opacity: 1; }
        .btn-gold span { position: relative; z-index: 1; }

        /* Outline gold button */
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--gold);
          font-family: 'Josefin Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: 1px solid rgba(212,175,55,0.5);
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .btn-outline:hover {
          background: rgba(212,175,55,0.08);
          border-color: var(--gold);
          box-shadow: 0 0 30px rgba(212,175,55,0.15);
        }

        /* Service card */
        .service-card {
          background: linear-gradient(145deg, #141414, #0F0F0F);
          border: 1px solid rgba(212,175,55,0.12);
          padding: 40px 32px;
          position: relative;
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .service-card::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
          transition: all 0.5s;
        }
        .service-card:hover {
          border-color: rgba(212,175,55,0.35);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08);
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover::after { bottom: -20px; right: -20px; }

        /* Vehicle card */
        .vehicle-card {
          background: var(--black-3);
          border: 1px solid rgba(212,175,55,0.08);
          overflow: hidden;
          position: relative;
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .vehicle-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: grayscale(40%) brightness(0.8);
          transition: all 0.6s ease;
        }
        .vehicle-card:hover {
          border-color: rgba(212,175,55,0.4);
          box-shadow: 0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.1);
          transform: translateY(-8px);
        }
        .vehicle-card:hover img { filter: grayscale(0%) brightness(1); transform: scale(1.05); }

        /* Testimonial card */
        .testimonial-card {
          background: linear-gradient(145deg, var(--black-3), var(--black-2));
          border: 1px solid rgba(212,175,55,0.1);
          padding: 40px;
          position: relative;
          transition: all 0.4s;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 16px; right: 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          color: rgba(212,175,55,0.08);
          line-height: 1;
        }
        .testimonial-card:hover {
          border-color: rgba(212,175,55,0.25);
          transform: translateY(-4px);
        }

        /* Section label */
        .section-label {
          font-size: 10px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--gold);
        }

        /* Gold horizontal rule */
        .gold-rule {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent);
        }

        /* Stat card */
        .stat-card {
          text-align: center;
          padding: 32px 24px;
          border-right: 1px solid rgba(212,175,55,0.1);
        }
        .stat-card:last-child { border-right: none; }

        /* Mobile nav */
        @media (max-width: 768px) {
          .stat-card { border-right: none; border-bottom: 1px solid rgba(212,175,55,0.1); }
          .stat-card:last-child { border-bottom: none; }
        }
      `}</style>


{/* Mobil Menü Bileşeni Tam Buraya Gelecek */}
   
      <main style={{ background: "var(--black)", color: "var(--white)", overflowX: "hidden" }}>

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section ref={heroRef} style={{ position: "relative", height: "calc(100vh - 110px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          
          {/* Background images */}
          <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentBgIndex}
                src={heroBackgrounds[currentBgIndex]}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.3, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="Luxury Vehicle"
              />
            </AnimatePresence>
          </motion.div>

          {/* Radial vignette */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.85) 70%)" }} />
          {/* Top/bottom gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.8) 0%, transparent 30%, transparent 70%, rgba(8,8,8,1) 100%)" }} />

          {/* Gold scan line */}
          <motion.div
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)", transformOrigin: "left" }}
          />

          {/* Hero content */}
          <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: "1100px" }}>
            
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{ fontSize: "10px", color: "#D4AF37", textTransform: "uppercase", fontWeight: 700, marginBottom: "32px" }}
            >
              ✦ &nbsp; Premier Chauffeur Service &nbsp; ✦
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display"
              style={{ fontSize: "clamp(52px, 9vw, 110px)", fontWeight: 300, lineHeight: 0.9, marginBottom: "24px", color: "#FAFAFA" }}
            >
              Where Every
              <br />
              <span className="text-gold-gradient" style={{ fontStyle: "italic", fontWeight: 400 }}>
                Journey
              </span>
              <br />
              Becomes{" "}
              <span style={{ fontStyle: "italic", color: "rgba(250,250,250,0.45)", fontWeight: 300 }}>
                Legend.
              </span>
            </motion.h1>

            <GoldDivider />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ fontSize: "13px", color: "rgba(250,250,250,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "48px", fontWeight: 300 }}
            >
              Elite Fleet · Expert Chauffeurs · 24/7 Dispatch
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link href={`/${locale}/booking`} className="btn-gold">
                <span>Reserve Your Chauffeur</span>
                <FaArrowRight size={10} />
              </Link>
              <a href="#vehicles" className="btn-outline">
                Explore the Fleet
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
          >
            <span style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)" }}
            />
          </motion.div>
        </section>

        {/* ═══════════════════════ STATS ═══════════════════════ */}
<section style={{ background: "var(--black-2)", borderTop: "1px solid rgba(212,175,55,0.1)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
  <div 
    style={{ maxWidth: "1100px", margin: "0 auto" }} 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-6"
  >
    {stats.map((stat, i) => (
      <FadeIn key={i} delay={i * 0.1}>
        <div className="stat-card flex flex-col items-center text-center">
          <div className="font-display" style={{ fontSize: "48px", fontWeight: 300, lineHeight: 1 }}>
            <span className="text-gold-gradient">
              <Counter target={stat.value} suffix={stat.suffix} />
            </span>
          </div>
          <p style={{ 
            fontSize: "10px", 
            letterSpacing: "0.25em", 
            color: "rgba(250,250,250,0.4)", 
            textTransform: "uppercase", 
            marginTop: "8px" 
          }}>
            {stat.label}
          </p>
        </div>
      </FadeIn>
    ))}
  </div>
</section>

{/* ═══════════════════════ SERVICES & EXPERIENCES ═══════════════════════ */}

<section id="services" style={{ padding: "120px 0", backgroundColor: "#0A0A0A", position: "relative" }}>
  
  {/* Izgara Arka Plan Deseni */}
  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(212,175,55,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

  <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
    
    {/* 👑 ÜST BAŞLIK VE AÇIKLAMA BÖLÜMÜ */}
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <p className="section-label" style={{ marginBottom: "16px", color: "#D4AF37", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700 }}>
          WHAT WE OFFER
        </p>
        <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#FFFFFF", lineHeight: 1.1 }}>
          Flawless Service,{" "}
          <span style={{ fontStyle: "italic", color: "#D4AF37" }}>Every Time</span>
        </h2>
        <GoldDivider />
        <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "13px", letterSpacing: "0.15em", maxWidth: "520px", margin: "16px auto 0", textTransform: "uppercase" }}>
          Tailored luxury transportation across every occasion
        </p>
      </div>
    </FadeIn>

    {/* 💼 4 ANA SERVİS KARTI GRIDI */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "80px" }}>
      {[
        { title: "Airport Transfer", desc: "First-class airport logistics, tracked flight arrivals, and meet-and-greet service.", icon: "✈️" },
        { title: "Corporate Travel", desc: "Discreet executive transport. NDA-compliant chauffeurs, privacy glass, secure routing.", icon: "💼" },
        { title: "Special Events", desc: "Weddings, galas, red carpet arrivals — arrive in unforgettable style.", icon: "🍷" },
        { title: "City Tours", desc: "Curated city experiences in pure luxury. Your personal driver, your agenda.", icon: "🏛️" }
      ].map((srv, idx) => (
        <FadeIn key={idx} delay={idx * 0.1}>
          <div 
            style={{ 
              backgroundColor: "#141414", 
              border: "1px solid rgba(212, 175, 55, 0.25)",
              borderRadius: "12px",
              padding: "36px 28px",
              height: "100%",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "#D4AF37";
              e.currentTarget.style.backgroundColor = "#1A1A1A";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.25)";
              e.currentTarget.style.backgroundColor = "#141414";
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "20px" }}>{srv.icon}</div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
              {srv.title}
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6, margin: 0 }}>
              {srv.desc}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>

    {/* 🖼️ TÜM TURLAR GRIDI */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
      {allTours.map((tour: Tour, i: number) => (
        <FadeIn key={tour.id || i} delay={i * 0.1}>
          <div 
            style={{ 
              backgroundColor: "#141414", 
              borderRadius: "12px", 
              overflow: "hidden", 
              border: "1px solid rgba(212, 175, 55, 0.25)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              transition: "transform 0.3s ease, border-color 0.3s ease",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "#D4AF37";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.25)";
            }}
          >
            {/* 📸 TIKLANABİLİR GÖRSEL ALANI */}
            <div 
              onClick={() => setActiveGallery({ tour, index: 0 })}
              style={{ 
                position: "relative", 
                height: "230px", 
                overflow: "hidden", 
                cursor: "pointer" 
              }}
            >
              <img 
                src={tour.images[0]} 
                alt={tour.name} 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  display: "block",
                  transition: "transform 0.5s ease"
                }} 
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
              
              {/* Fiyat Etiketi */}
              <div style={{ 
                position: "absolute", 
                top: "14px", 
                left: "14px", 
                backgroundColor: "#0A0A0A", 
                border: "1px solid #D4AF37", 
                padding: "6px 14px",
                borderRadius: "4px",
                zIndex: 2
              }}>
                <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700 }}>{tour.price}</span>
              </div>

              {/* Resim Sayısı Rozeti */}
              {tour.images && tour.images.length > 0 && (
                <div style={{ 
                  position: "absolute", 
                  bottom: "14px", 
                  right: "14px", 
                  backgroundColor: "rgba(0,0,0,0.85)", 
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  color: "#FFFFFF",
                  letterSpacing: "0.1em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  zIndex: 2
                }}>
                  📷 <span>{tour.images.length} PHOTOS</span>
                </div>
              )}
            </div>

            {/* İçerik */}
            <div style={{ padding: "28px 24px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px", letterSpacing: "0.03em" }}>
                  {tour.name}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "20px" }}>
                  {tour.detail}
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {/* 🔍 GALERİ AÇMA BUTONU */}
                <button
                  type="button"
                  onClick={() => setActiveGallery({ tour, index: 0 })}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "transparent",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    color: "#D4AF37",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer"
                  }}
                >
                  Explore Gallery
                </button>

                <Link
href={`/${currentLocale}/booking`}
  style={{
    flex: 1,
    padding: "12px",
    backgroundColor: "#D4AF37",
    color: "#000000",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textAlign: "center",
    textDecoration: "none"
  }}
>
  Book Now
</Link>
              </div>
            </div>

          </div>
        </FadeIn>
      ))}
    </div>

  </div>

  {/* 🖼️ GALERİ LIGHTBOX MODAL (Resimleri Oklar ile Değiştirme) */}
  {activeGallery && activeGallery.tour && activeGallery.tour.images && (
    <div 
      onClick={() => setActiveGallery(null)}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px 20px",
        backdropFilter: "blur(10px)"
      }}
    >
      {/* Modal Üst Başlık */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1000px", width: "100%", margin: "0 auto" }}>
        <div>
          <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {activeGallery.tour.price}
          </span>
          <h3 style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: 400, margin: "4px 0 0" }}>
            {activeGallery.tour.name}
          </h3>
        </div>
        <button 
          type="button"
          onClick={() => setActiveGallery(null)}
          style={{ background: "none", border: "none", color: "#D4AF37", fontSize: "36px", cursor: "pointer" }}
        >
          ✕
        </button>
      </div>

      {/* Modal Resim ve Oklar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "900px", width: "100%", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Sol Ok */}
        {activeGallery.tour.images.length > 1 && (
          <button 
            type="button"
            onClick={() => setActiveGallery(g => g ? { ...g, index: (g.index - 1 + g.tour.images.length) % g.tour.images.length } : null)}
            style={{ 
              position: "absolute", 
              left: "-20px", 
              backgroundColor: "rgba(0,0,0,0.8)", 
              border: "1px solid #D4AF37", 
              color: "#D4AF37", 
              width: "48px", 
              height: "48px", 
              borderRadius: "50%", 
              cursor: "pointer", 
              fontSize: "24px", 
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ‹
          </button>
        )}

        {/* Büyük Resim */}
        <img 
          src={activeGallery.tour.images[activeGallery.index]} 
          alt={activeGallery.tour.name} 
          style={{ maxWidth: "100%", maxHeight: "65vh", objectFit: "contain", borderRadius: "8px", border: "1px solid rgba(212,175,55,0.3)" }} 
        />

        {/* Sağ Ok */}
        {activeGallery.tour.images.length > 1 && (
          <button 
            type="button"
            onClick={() => setActiveGallery(g => g ? { ...g, index: (g.index + 1) % g.tour.images.length } : null)}
            style={{ 
              position: "absolute", 
              right: "-20px", 
              backgroundColor: "rgba(0,0,0,0.8)", 
              border: "1px solid #D4AF37", 
              color: "#D4AF37", 
              width: "48px", 
              height: "48px", 
              borderRadius: "50%", 
              cursor: "pointer", 
              fontSize: "24px", 
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ›
          </button>
        )}
      </div>

      {/* Alt Nokta İndikatörleri ve Detay */}
      <div onClick={(e) => e.stopPropagation()} style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        {activeGallery.tour.images.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            {activeGallery.tour.images.map((_: string, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setActiveGallery(g => g ? { ...g, index: idx } : null)}
                style={{
                  width: idx === activeGallery.index ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: idx === activeGallery.index ? "#D4AF37" : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
        )}

        {activeGallery.tour.mapsUrl && (
          <button
            type="button"
            onClick={() => window.open(activeGallery.tour.mapsUrl, "_blank", "noopener,noreferrer")}
            style={{
              background: "transparent",
              border: "1px solid #D4AF37",
              color: "#D4AF37",
              padding: "10px 24px",
              borderRadius: "4px",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer"
            }}
          >
            🗺️ View Route on Google Maps
          </button>
        )}
      </div>

    </div>
  )}
</section>
      {/* ═══════════════════════ VEHICLES ═══════════════════════ */}
<section id="vehicles" style={{ padding: "120px 0", background: "var(--black-2)" }}>
  <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <p className="section-label" style={{ marginBottom: "16px" }}>The Fleet</p>
        <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#FAFAFA", lineHeight: 1.1 }}>
          <span style={{ fontStyle: "italic" }} className="text-gold-gradient">Elite</span>{" "}
          Machines, Perfected
        </h2>
        <GoldDivider />
      </div>
    </FadeIn>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
      {vehicles.map((v, i) => {
        const nameUpper = v.name ? v.name.toUpperCase() : "";
        let pax = "3";
        let luggage = "2";

        if (nameUpper.includes("SPRINTER")) {
          pax = "12-16";
          luggage = "12+";
        } else if (nameUpper.includes("V-CLASS") || nameUpper.includes("VAN") || nameUpper.includes("MINIVAN")) {
          pax = "6";
          luggage = "6";
        } else if (nameUpper.includes("S-CLASS") || nameUpper.includes("E-CLASS")) {
          pax = "3";
          luggage = "2";
        }

        return (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="vehicle-card" style={{ borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
              
              {/* 📸 MODAL AÇAN TIKLANABİLİR GÖRSEL */}
              <div 
                onClick={() => setSelectedImage(v.image)}
                title="Görseli büyütmek için tıklayın"
                style={{ position: "relative", width: "100%", height: "220px", overflow: "hidden", cursor: "pointer" }}
              >
                <img 
                  src={v.image} 
                  alt={v.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />

                {/* Tag / Etiket Kutusu */}
                <div style={{ 
                  position: "absolute", 
                  top: "12px", 
                  right: "12px", 
                  background: "rgba(18, 18, 18, 0.85)", 
                  border: "1px solid #D4AF37", 
                  padding: "4px 10px",
                  backdropFilter: "blur(4px)",
                  zIndex: 2
                }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase" }}>
                    {v.tag}
                  </span>
                </div>
              </div>
              
              {/* 📝 AÇIK RENK KART GÖVDESİ */}
              <div style={{ padding: "24px 20px", background: "#F5F2EB", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A1A1A", marginBottom: "14px" }}>
                    {v.name}
                  </h3>

                  {/* 👥 ARACA ÖZEL KİŞİ VE BAGAJ SAYILARI */}
                  <div style={{ 
                    display: "flex", 
                    gap: "16px", 
                    marginBottom: "16px", 
                    paddingBottom: "12px", 
                    borderBottom: "1px solid rgba(0,0,0,0.08)" 
                  }}>
                    {/* Kişi Sayısı */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#1A1A1A", fontWeight: 700 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C59B27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>{pax} PASSENGERS</span>
                    </div>

                    {/* Bagaj Sayısı */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#1A1A1A", fontWeight: 700 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C59B27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                      <span>{luggage} LUGGAGE</span>
                    </div>
                  </div>
                  
                  {/* Özellik Listesi */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", padding: 0, margin: 0 }}>
                    {v.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "10px", color: "#555555", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                        <div style={{ width: "4px", height: "4px", background: "#C59B27", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </FadeIn>
        );
      })}
    </div>

    <FadeIn delay={0.3}>
      <div style={{ textAlign: "center", marginTop: "56px" }}>
        <Link href="/booking" className="btn-outline">
          View Full Fleet & Pricing
        </Link>
      </div>
    </FadeIn>
  </div>

  {/* 🖼️ RESİM GALERİSİ MODAL/LIGHTBOX */}
  {selectedImage && (
    <div 
      onClick={() => setSelectedImage(null)}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(5px)"
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
      >
        {/* ❌ KAPATMA DÜĞMESİ (Sağ Üst Köşe) */}
        <button
          onClick={() => setSelectedImage(null)}
          style={{
            position: "absolute",
            top: "-40px",
            right: "0",
            background: "none",
            border: "none",
            color: "#D4AF37",
            fontSize: "32px",
            fontWeight: 300,
            cursor: "pointer",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <span style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#FAFAFA", textTransform: "uppercase" }}>Close</span>
          ✕
        </button>

        {/* Modal Görseli */}
        <img 
          src={selectedImage} 
          alt="Enlarged view" 
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "4px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
          }}
        />
      </div>
    </div>
  )}
</section>
        {/* ═══════════════════════ PROMISE STRIP ═══════════════════════ */}
        <section style={{ padding: "80px 40px", background: "#0A0A0A", borderTop: "1px solid rgba(212,175,55,0.08)", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px", textAlign: "center" }}>
            {[
              { icon: FaShieldAlt, title: "Fully Insured", desc: "Every journey protected with premium coverage." },
              { icon: FaClock, title: "Zero Late Policy", desc: "On time, every time — tracked and guaranteed." },
              { icon: FaWifi, title: "Always Connected", desc: "Complimentary Wi-Fi and device charging." },
              { icon: FaStar, title: "5-Star Rated", desc: "Consistently rated exceptional by our clients." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <item.icon style={{ color: "#D4AF37", fontSize: "24px", marginBottom: "16px" }} />
                  <h4 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FAFAFA", marginBottom: "8px" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(250,250,250,0.35)", lineHeight: 1.7, letterSpacing: "0.05em" }}>
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section id="testimonials" style={{ padding: "120px 0", background: "var(--black)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <p className="section-label" style={{ marginBottom: "16px" }}>Client Voices</p>
              <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#000000", lineHeight: 1.1 }}>
                Trusted by the{" "}
                <span style={{ fontStyle: "italic" }} className="text-gold-gradient">Discerning</span>
              </h2>
              <GoldDivider />
            </div>
          </FadeIn>

          {/* Elfsight Google Reviews Widget */}
          <FadeIn>
            <div
              className="elfsight-app-a56f4651-0da2-46bc-a604-2d9893e11666"
              data-elfsight-app-lazy
            />
          </FadeIn>
        </div>
      </section>

        {/* ═══════════════════════ BOOKING CTA ═══════════════════════ */}
        <section id="booking" style={{ padding: "100px 40px", background: "var(--black-2)", position: "relative", overflow: "hidden" }}>
          
          {/* Bg glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

          <FadeIn>
            <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
              <div className="corner-border" style={{ border: "1px solid rgba(212,175,55,0.2)", padding: "64px 48px" }}>
                
                <p className="section-label" style={{ marginBottom: "20px" }}>Reserve Now</p>

                <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 300, lineHeight: 1.1, color: "#FAFAFA", marginBottom: "24px" }}>
                  Your Private Chauffeur{" "}
                  <span style={{ fontStyle: "italic", display: "block" }} className="text-gold-gradient">
                    Awaits
                  </span>
                </h2>

                <GoldDivider />

                <p style={{ color: "rgba(250,250,250,0.4)", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "48px" }}>
                  Available 24 hours · 7 days · 365 days
                </p>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href={`/${locale}/booking`} className="btn-gold">
                    <span>Open Reservation Portal</span>
                    <FaArrowRight size={10} />
                  </Link>
                  <a href="tel:+31638352022" className="btn-outline">
                    <FaPhone size={10} />
                    Call Direct
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        

      </main>
    </>
  );
}