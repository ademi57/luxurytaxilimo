"use client";
import Head from "next/head";
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

/* ─── FadeIn Bileşeni İçin Tip Tanımlaması ─── */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

/* ─── Reusable fade-in-view wrapper ─── */
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
export default function IndexPage() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroBackgrounds = ["/car-1.jpg", "/car-2.jpg", "/car-3.jpg", "/car-4.jpg"];

  useEffect(() => {
    const iv = setInterval(() => setCurrentBgIndex(p => (p + 1) % heroBackgrounds.length), 6000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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

  const vehicles = [
    { name: "Mercedes S-Class", tag: "Flagship Sedan", image: "/car-1.jpg", features: ["Nappa Leather", "Burmester Sound", "Privacy Glass"] },
    { name: "BMW 7 Series", tag: "Executive Suite", image: "/car-2.jpg", features: ["Rear Theatre", "Ambient Lighting", "Massage Seats"] },
    { name: "Audi A8 L", tag: "Prestige Saloon", image: "/car-3.jpg", features: ["Adaptive Air Ride", "Night Vision", "Panoramic Roof"] },
    { name: "Range Rover LWB", tag: "Luxury SUV", image: "/car-4.jpg", features: ["Executive Rear", "Terrain Response", "Refrigerator"] },
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Josefin+Sans:wght@300;400;600;700&display=swap');
        
        :root {
          --gold: #D4AF37;
          --gold-light: #F0D070;
          --gold-dark: #A07820;
          --black: #080808;
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

      {/* ═══════════════════════ NAVBAR ═══════════════════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isScrolled ? "14px 40px" : "24px 40px",
          background: isScrolled ? "rgba(8,8,8,0.96)" : "transparent",
          borderBottom: isScrolled ? "1px solid rgba(212,175,55,0.12)" : "none",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          transition: "all 0.5s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span className="font-display" style={{ fontSize: "22px", fontWeight: 300, color: "#FAFAFA", letterSpacing: "0.08em", fontStyle: "italic" }}>
              Luxury
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "0.45em", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", marginTop: "2px" }}>
              TAXI · LIMO
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "40px" }} className="hidden md:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">{link.name}</a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a href="tel:+1234567890" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#D4AF37", fontSize: "11px", letterSpacing: "0.15em", textDecoration: "none" }}>
            <FaPhone size={10} />
            <span className="hidden md:block">+1 (800) VIP-LIMO</span>
          </a>
          <Link href="/booking" className="btn-gold" style={{ padding: "12px 24px" }}>
            <span>Book Now</span>
          </Link>
        </div>
      </motion.header>

      <main style={{ background: "var(--black)", color: "var(--white)", overflowX: "hidden" }}>

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section ref={heroRef} style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          
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
          <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "1100px" }}>
            
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
              <Link href="/booking" className="btn-gold">
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
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="stat-card">
                  <div className="font-display" style={{ fontSize: "48px", fontWeight: 300, lineHeight: 1 }}>
                    <span className="text-gold-gradient">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <p style={{ fontSize: "10px", letterSpacing: "0.25em", color: "rgba(250,250,250,0.4)", textTransform: "uppercase", marginTop: "8px" }}>
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ SERVICES ═══════════════════════ */}
        <section id="services" style={{ padding: "120px 0", background: "var(--black)", position: "relative" }}>
          
          {/* Bg pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(212,175,55,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: "80px" }}>
                <p className="section-label" style={{ marginBottom: "16px" }}>What We Offer</p>
                <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#FAFAFA", lineHeight: 1.1 }}>
                  Flawless Service,{" "}
                  <span style={{ fontStyle: "italic" }} className="text-gold-gradient">Every Time</span>
                </h2>
                <GoldDivider />
                <p style={{ color: "rgba(250,250,250,0.4)", fontSize: "13px", letterSpacing: "0.12em", maxWidth: "480px", margin: "0 auto" }}>
                  Tailored luxury transportation across every occasion
                </p>
              </div>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2px" }}>
              {services.map((service, i) => (
                <FadeIn key={i} delay={i * 0.12} direction="up">
                  <div className="service-card" style={{ height: "100%" }}>
                    <div style={{ marginBottom: "28px", position: "relative", display: "inline-block" }}>
                      <div style={{ position: "absolute", inset: -8, background: "rgba(212,175,55,0.06)", borderRadius: "50%" }} />
                      <service.icon style={{ fontSize: "28px", color: "#D4AF37", position: "relative" }} />
                    </div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FAFAFA", marginBottom: "16px" }}>
                      {service.name}
                    </h3>
                    <p style={{ fontSize: "13px", color: "rgba(250,250,250,0.45)", lineHeight: 1.8, letterSpacing: "0.02em" }}>
                      {service.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {vehicles.map((v, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="vehicle-card">
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img src={v.image} alt={v.name} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", padding: "4px 12px" }}>
                        <span style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase" }}>{v.tag}</span>
                      </div>
                    </div>
                    <div style={{ padding: "28px 24px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAFAFA", marginBottom: "16px" }}>
                        {v.name}
                      </h3>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                        {v.features.map(f => (
                          <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "rgba(250,250,250,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            <div style={{ width: "4px", height: "4px", background: "#D4AF37", flexShrink: 0 }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div style={{ textAlign: "center", marginTop: "56px" }}>
                <Link href="/booking" className="btn-outline">
                  View Full Fleet & Pricing
                </Link>
              </div>
            </FadeIn>
          </div>
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
                <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#FAFAFA", lineHeight: 1.1 }}>
                  Trusted by the{" "}
                  <span style={{ fontStyle: "italic" }} className="text-gold-gradient">Discerning</span>
                </h2>
                <GoldDivider />
              </div>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div className="testimonial-card">
                    <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                      {[...Array(t.stars)].map((_, j) => (
                        <FaStar key={j} style={{ color: "#D4AF37", fontSize: "11px" }} />
                      ))}
                    </div>
                    <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(250,250,250,0.65)", marginBottom: "28px", fontStyle: "italic" }} className="font-display">
                      "{t.quote}"
                    </p>
                    <hr className="gold-rule" style={{ marginBottom: "20px" }} />
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FAFAFA" }}>{t.name}</p>
                      <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#D4AF37", textTransform: "uppercase", marginTop: "4px" }}>{t.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
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
                  <Link href="/booking" className="btn-gold">
                    <span>Open Reservation Portal</span>
                    <FaArrowRight size={10} />
                  </Link>
                  <a href="tel:+1800VIPLIMO" className="btn-outline">
                    <FaPhone size={10} />
                    Call Direct
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ═══════════════════════ FOOTER ═══════════════════════ */}
        <footer style={{ background: "var(--black)", borderTop: "1px solid rgba(212,175,55,0.1)", padding: "64px 40px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px", marginBottom: "64px" }}>
              
              {/* Brand */}
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <div className="font-display" style={{ fontSize: "28px", fontWeight: 300, color: "#FAFAFA", fontStyle: "italic", letterSpacing: "0.08em" }}>Luxury</div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.45em", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase" }}>TAXI · LIMO</div>
                </div>
                <p style={{ fontSize: "12px", color: "rgba(250,250,250,0.35)", lineHeight: 1.9, maxWidth: "220px" }}>
                  The premier choice for discerning clients who demand excellence in every detail.
                </p>
              </div>

              {/* Services */}
              <div>
                <h4 style={{ fontSize: "10px", letterSpacing: "0.3em", fontWeight: 700, textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>Services</h4>
                {["Airport Transfer", "Corporate Travel", "Special Events", "City Tours"].map(s => (
                  <div key={s} style={{ fontSize: "12px", color: "rgba(250,250,250,0.4)", marginBottom: "10px", letterSpacing: "0.05em", cursor: "pointer" }} className="nav-link">{s}</div>
                ))}
              </div>

              {/* Fleet */}
              <div>
                <h4 style={{ fontSize: "10px", letterSpacing: "0.3em", fontWeight: 700, textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>The Fleet</h4>
                {["Mercedes S-Class", "BMW 7 Series", "Audi A8 L", "Range Rover LWB"].map(v => (
                  <div key={v} style={{ fontSize: "12px", color: "rgba(250,250,250,0.4)", marginBottom: "10px", letterSpacing: "0.05em" }}>{v}</div>
                ))}
              </div>

              {/* Contact */}
              <div>
                <h4 style={{ fontSize: "10px", letterSpacing: "0.3em", fontWeight: 700, textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>Contact</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { icon: FaPhone, text: "+1 (800) VIP-LIMO" },
                    { icon: FaEnvelope, text: "reservations@luxurylimo.com" },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <c.icon style={{ color: "#D4AF37", fontSize: "12px" }} />
                      <span style={{ fontSize: "12px", color: "rgba(250,250,250,0.4)", letterSpacing: "0.05em" }}>{c.text}</span>
                    </div>
                  ))}
                 <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                {[FaInstagram, FaFacebook, FaLinkedin].map((Icon, i) => (
                <Icon 
                 key={i} 
              style={{ color: "rgba(212,175,55,0.5)", fontSize: "18px", cursor: "pointer", transition: "color 0.3s" }}
              // e.currentTarget kullanarak doğrudan ikona odaklandık ve SVGElement olarak cast ettik
               onMouseEnter={e => (e.currentTarget as SVGElement).style.color = "#D4AF37"}
                onMouseLeave={e => (e.currentTarget as SVGElement).style.color = "rgba(212,175,55,0.5)"}
              />
               ))}
              </div>
                </div>
              </div>
            </div>

            <hr className="gold-rule" style={{ marginBottom: "32px" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(250,250,250,0.2)", textTransform: "uppercase" }}>
                © 2026 Luxury Taxi Limo · All Rights Reserved
              </p>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(212,175,55,0.35)", textTransform: "uppercase" }}>
                Black & Gold Edition
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}