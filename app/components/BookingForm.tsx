"use client";

import React, { useState } from 'react';

const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C96A';

const services = [
  {
    id: 'chauffeur',
    label: 'Chauffeur',
    sub: 'Door-to-door',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h1l2-4h12l2 4h1a2 2 0 012 2v6a2 2 0 01-2 2h-2M5 17a2 2 0 004 0M15 17a2 2 0 004 0" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="17" r="1.5" fill="currentColor"/>
        <circle cx="17" cy="17" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'airport',
    label: 'Airport Transfer',
    sub: 'AMS · BRU · CDG · LHR',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M22 16.5H2M17 3l5 5-5 5M3.5 8h9.5M6 20.5h12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'tours',
    label: 'Amsterdam Tour',
    sub: 'City · Canals · Museums',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'europe',
    label: 'Europe Routes',
    sub: 'Any city, any border',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'helicopter',
    label: 'Helicopter',
    sub: 'Sky transfers & tours',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 8h18M12 8v8M7 16h10M5 8a7 7 0 0114 0" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16l-2 4M14 16l2 4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const fleet = [
  {
    id: 1,
    name: 'Mercedes S 580',
    type: 'Luxury Sedan',
    capacity: 3,
    bags: 2,
    tag: 'Most Popular',
    color: '#1a1a2e',
    desc: 'Ultimate comfort for business & special occasions',
  },
  {
    id: 2,
    name: 'Mercedes V-Class',
    type: 'Executive Van',
    capacity: 7,
    bags: 7,
    tag: 'Groups',
    color: '#0f3460',
    desc: 'Spacious luxury for families and groups',
  },
  {
    id: 3,
    name: 'Range Rover Vogue',
    type: 'Premium SUV',
    capacity: 4,
    bags: 4,
    tag: 'SUV',
    color: '#16213e',
    desc: 'Prestige and performance across all roads',
  },
  {
    id: 4,
    name: 'Tesla Model S',
    type: 'Electric Luxury',
    capacity: 4,
    bags: 3,
    tag: 'Eco',
    color: '#0a2a1a',
    desc: 'Zero-emission premium travel',
  },
];

const popularRoutes = [
  { from: 'Amsterdam Schiphol', to: 'Amsterdam City', time: '25 min', price: '€65' },
  { from: 'Amsterdam', to: 'Brussels', time: '2h 30m', price: '€320' },
  { from: 'Amsterdam', to: 'Paris CDG', time: '4h 15m', price: '€580' },
  { from: 'Amsterdam', to: 'London Heathrow', time: '6h', price: '€890' },
];

const CarSVG = ({ color = '#1a1a2e' }) => (
  <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="200" height="80" fill="transparent"/>
    <ellipse cx="100" cy="68" rx="85" ry="8" fill="rgba(0,0,0,0.18)"/>
    <path d="M20 50 Q22 38 35 32 L60 22 Q78 14 100 14 Q120 14 135 18 L162 28 Q175 34 178 50 L180 58 Q180 64 174 64 L26 64 Q20 64 20 58 Z" fill={color}/>
    <path d="M48 32 L60 18 Q70 12 100 12 Q126 12 138 16 L152 24 Q162 30 162 32 Z" fill="rgba(150,180,220,0.25)"/>
    <path d="M52 32 L63 20 Q72 14 100 13 Q124 13 136 17 L148 24 L148 32 Z" fill="rgba(180,210,240,0.15)"/>
    <rect x="30" y="48" width="30" height="12" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="85" y="47" width="30" height="12" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="140" y="48" width="24" height="12" rx="3" fill="rgba(255,255,255,0.07)"/>
    <circle cx="50" cy="62" r="10" fill="#222" stroke="#444" strokeWidth="2"/>
    <circle cx="50" cy="62" r="6" fill="#333" stroke={GOLD} strokeWidth="1"/>
    <circle cx="50" cy="62" r="2" fill={GOLD}/>
    <circle cx="148" cy="62" r="10" fill="#222" stroke="#444" strokeWidth="2"/>
    <circle cx="148" cy="62" r="6" fill="#333" stroke={GOLD} strokeWidth="1"/>
    <circle cx="148" cy="62" r="2" fill={GOLD}/>
    <path d="M26 52 Q24 52 23 55 L22 60 L28 60 L30 52 Z" fill={GOLD} opacity="0.9"/>
    <path d="M174 52 Q176 52 177 55 L178 60 L172 60 L170 52 Z" fill={GOLD_LIGHT} opacity="0.7"/>
    <path d="M26 62 L174 62" stroke={GOLD} strokeWidth="1.5" opacity="0.4"/>
    <rect x="96" y="22" width="4" height="10" rx="1" fill="rgba(255,255,255,0.1)"/>
  </svg>
);

export default function BookingPage() {
  const [activeService, setActiveService] = useState('chauffeur');
  const [selectedVehicle, setSelectedVehicle] = useState(1);
  const [tripType, setTripType] = useState('oneway');
  const [stops, setStops] = useState<string[]>([]);
  const [fromVal, setFromVal] = useState('');
  const [toVal, setToVal] = useState('');

  const isHelicopter = activeService === 'helicopter';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0e0e1a 40%, #0a1020 100%)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        color: '#f0e8d5',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 80% 80%, rgba(201,168,76,0.04) 0%, transparent 60%)`,
      }}/>
      {/* Fine grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}/>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 16px 80px' }}>

        {/* HEADER - Mobilde alt alta gelecek şekilde flex-col yapıldı */}
        <header className="flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left" style={{ padding: '32px 0 48px' }}>
          <div className="flex flex-col items-center md:items-start">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 32, height: 2, background: GOLD }}/>
              <span style={{ color: GOLD, fontSize: 10, letterSpacing: '0.35em', fontFamily: 'sans-serif', fontWeight: 600, textTransform: 'uppercase' }}>Est. 2009 · Amsterdam</span>
              <div style={{ width: 32, height: 2, background: GOLD }}/>
            </div>
            <h1 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, letterSpacing: '0.08em', lineHeight: 1.1 }}>
              LUXURY TAXI LIMO<span style={{ color: GOLD }}> VIP</span><br/>
              <span style={{ fontSize: '0.55em', letterSpacing: '0.25em', fontFamily: 'sans-serif', fontWeight: 200, color: 'rgba(240,232,213,0.5)' }}>CHAUFFEUR · EUROPE</span>
            </h1>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div style={{ fontSize: 10, letterSpacing: '0.25em', color: GOLD, fontFamily: 'sans-serif', marginBottom: 6, textTransform: 'uppercase' }}>24/7 Concierge</div>
            <a href="tel:+31201234567" style={{ color: '#f0e8d5', fontSize: 'clamp(18px, 2vw, 20px)', textDecoration: 'none', letterSpacing: '0.06em', fontWeight: 300 }}>+31 20 123 4567</a>
            <div style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(240,232,213,0.35)', fontFamily: 'sans-serif', marginTop: 4 }}>WhatsApp · Telegram · Email</div>
          </div>
        </header>

        {/* SERVICE TABS */}
{/* SERVICE TABS WRAPPER */}
<div style={{ position: 'relative', marginBottom: 40, width: '100%' }}>
  
  {/* Yatay Kaydırılabilir Alan */}
  <div style={{ width: '100%', overflow: 'hidden' }}>
    <div 
      className="scrollbar-hidden" 
      style={{
        display: 'flex', 
        gap: 12, 
        overflowX: 'auto', 
        whiteSpace: 'nowrap', 
        borderBottom: `1px solid rgba(201,168,76,0.15)`,
        paddingBottom: 4,
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => setActiveService(s.id)}
          style={{
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '14px 20px 16px',
            borderBottom: activeService === s.id ? `2px solid ${GOLD}` : '2px solid transparent',
            color: activeService === s.id ? GOLD : 'rgba(240,232,213,0.4)',
            transition: 'all 0.3s',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 6,
            minWidth: '130px', // Okun altında kalmaması için min-width'i hafif artırdık
            flexShrink: 0,
          }}
        >
          <span style={{ color: activeService === s.id ? GOLD : 'rgba(240,232,213,0.35)' }}>{s.icon}</span>
          <span style={{ fontSize: 11, letterSpacing: '0.12em', fontFamily: 'sans-serif', fontWeight: 500, textTransform: 'uppercase' }}>{s.label}</span>
          <span style={{ fontSize: 9, letterSpacing: '0.08em', fontFamily: 'sans-serif', color: 'rgba(240,232,213,0.3)' }}>{s.sub}</span>
        </button>
      ))}
    </div>
  </div>

  {/* Sağa Kaydırma İpucu (Fade & Ok Efekti) */}
  <div 
    style={{
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 4, // Alttaki border çizgisiyle hizalı dursun diye
      width: '60px',
      background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.8))', // Arka plan siyahınızla bütünleşen degrade
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 8,
      pointerEvents: 'none', // Butonların tıklanmasını engellememesi için kritik
    }}
  >
    {/* Minimalist Altın Sarısı Ok */}
    <div style={{
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: `1px solid ${GOLD}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      boxShadow: `0 0 8px ${GOLD}33` // Hafif altın ışıltısı
    }}>
      <svg 
        width="6" 
        height="10" 
        viewBox="0 0 6 10" 
        fill="none" 
        style={{ stroke: GOLD, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
      >
        <path d="M1 1l4 4-4 4" />
      </svg>
    </div>
  </div>

</div>

        {/* MAIN BOOKING CARD */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(201,168,76,0.18)',
          borderRadius: 24,
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          marginBottom: 32,
        }}>
          {/* Trip type + decorative top bar - Mobilde butonlar kırılmasın diye flex-wrap yapıldı */}
          <div className="flex-wrap sm:flex-nowrap gap-4 justify-center sm:justify-between" style={{
            background: 'linear-gradient(90deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
            borderBottom: '1px solid rgba(201,168,76,0.12)',
            padding: '16px 24px',
            display: 'flex', alignItems: 'center',
          }}>
            <div className="flex flex-wrap sm:flex-nowrap">
              {['oneway', 'roundtrip', 'hourly'].map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTripType(t)}
                  style={{
                    background: tripType === t ? GOLD : 'transparent',
                    color: tripType === t ? '#0a0a0f' : 'rgba(240,232,213,0.4)',
                    border: `1px solid ${tripType === t ? GOLD : 'rgba(201,168,76,0.15)'}`,
                    borderRadius: i === 0 ? '6px 0 0 6px' : i === 2 ? '0 6px 6px 0' : 0,
                    padding: '7px 14px',
                    fontSize: 10, letterSpacing: '0.15em', fontFamily: 'sans-serif',
                    fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t === 'oneway' ? 'One Way' : t === 'roundtrip' ? 'Round Trip' : 'By the Hour'}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }}/>
              <span style={{ fontSize: 10, letterSpacing: '0.15em', fontFamily: 'sans-serif', color: 'rgba(240,232,213,0.4)' }}>AVAILABLE NOW</span>
            </div>
          </div>

          {/* GRID DEĞİŞİKLİĞİ: Mobilde 1, Masaüstünde 2 Sütun yapıldı */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ padding: '24px 20px' }}>

            {/* LEFT: Route */}
            <div>
              <label style={{ fontSize: 10, letterSpacing: '0.25em', fontFamily: 'sans-serif', color: GOLD, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Route</label>

              {/* From */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(240,232,213,0.35)', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: 6 }}>From</div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 10, height: 10, borderRadius: '50%', border: `2px solid #60a5fa`, background: 'transparent', zIndex: 1 }}/>
                  <input
                    value={fromVal}
                    onChange={e => setFromVal(e.target.value)}
                    placeholder="City, Airport, Hotel or Address…"
                    style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 10, padding: '14px 14px 14px 38px',
                      color: '#f0e8d5', fontSize: 13, fontFamily: "'Cormorant Garamond', serif",
                      outline: 'none', boxSizing: 'border-box',
                      letterSpacing: '0.03em',
                    }}
                  />
                </div>
              </div>

              {/* Divider line */}
              <div style={{ position: 'relative', margin: '6px 0', paddingLeft: 18 }}>
                <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', margin: '0 auto 0 4px', borderLeft: '1px dashed rgba(201,168,76,0.2)' }}/>
                <button
                  onClick={() => { const t = fromVal; setFromVal(toVal); setToVal(t); }}
                  style={{
                    position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(201,168,76,0.1)', border: `1px solid rgba(201,168,76,0.2)`,
                    borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
                    fontSize: 10, color: GOLD, letterSpacing: '0.1em', fontFamily: 'sans-serif',
                  }}
                  title="Swap"
                >⇅</button>
              </div>

              {/* To */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(240,232,213,0.35)', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: 6 }}>To</div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 10, height: 10, background: '#4ade80', borderRadius: '50%', zIndex: 1 }}/>
                  <input
                    value={toVal}
                    onChange={e => setToVal(e.target.value)}
                    placeholder="Destination…"
                    style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 10, padding: '14px 14px 14px 38px',
                      color: '#f0e8d5', fontSize: 13, fontFamily: "'Cormorant Garamond', serif",
                      outline: 'none', boxSizing: 'border-box',
                      letterSpacing: '0.03em',
                    }}
                  />
                </div>
              </div>

              {/* Multi-stop */}
              {stops.map((s, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, background: GOLD, borderRadius: '50%', opacity: 0.6 }}/>
                    <input
                      placeholder={`Stop ${i + 1}`}
                      style={{
                        width: '100%', background: 'rgba(0,0,0,0.25)',
                        border: '1px solid rgba(201,168,76,0.1)',
                        borderRadius: 10, padding: '11px 40px 11px 34px',
                        color: '#f0e8d5', fontSize: 12, fontFamily: "'Cormorant Garamond', serif",
                        outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                    <button onClick={() => setStops(stops.filter((_, j) => j !== i))}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(240,232,213,0.3)', cursor: 'pointer', fontSize: 16 }}>×</button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStops([...stops, ''])}
                style={{
                  background: 'none', 
                  border: '1px dashed rgba(201,168,76,0.2)',
                  borderRadius: 8, 
                  padding: '8px 14px', 
                  cursor: 'pointer',
                  color: 'rgba(201,168,76,0.5)', 
                  fontSize: 10, 
                  letterSpacing: '0.15em',
                  fontFamily: 'sans-serif', 
                  textTransform: 'uppercase',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  marginTop: 4,
                }}
              >
                <span>+ Add Stop</span>
              </button>

              {/* Popular Routes */}
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(201,168,76,0.4)', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: 10 }}>Popular Routes</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {popularRoutes.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => { setFromVal(r.from); setToVal(r.to); }}
                      style={{
                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: 8, padding: '8px 12px', cursor: 'pointer',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        color: '#f0e8d5', transition: 'border-color 0.2s',
                        gap: 10
                      }}
                    >
                      <span className="text-left" style={{ fontSize: 11, fontFamily: 'sans-serif', color: 'rgba(240,232,213,0.6)' }}>
                        {r.from} <span style={{ color: GOLD, margin: '0 2px' }}>→</span> <br className="block sm:hidden"/> {r.to}
                      </span>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <span style={{ fontSize: 12, color: GOLD, fontWeight: 600, fontFamily: 'sans-serif' }}>{r.price}</span>
                        <span style={{ fontSize: 9, color: 'rgba(240,232,213,0.3)', display: 'block', fontFamily: 'sans-serif' }}>{r.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Details + Vehicle */}
            <div>
              <label style={{ fontSize: 10, letterSpacing: '0.25em', fontFamily: 'sans-serif', color: GOLD, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Details</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                {[
                  { label: 'Date', type: 'date', placeholder: '' },
                  { label: 'Time', type: 'time', placeholder: '' },
                  { label: 'Passengers', type: 'number', placeholder: '1', min: 1, max: 16 },
                  { label: 'Luggage', type: 'number', placeholder: '0', min: 0, max: 20 },
                ].map((f) => (
                  <div key={f.label}>
                    <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(240,232,213,0.35)', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: 5 }}>{f.label}</div>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      min={f.min} max={f.max}
                      defaultValue={f.type === 'number' ? f.placeholder : undefined}
                      style={{
                        width: '100%', background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 8, padding: '11px 12px',
                        color: '#f0e8d5', fontSize: 12, fontFamily: "'Cormorant Garamond', serif",
                        outline: 'none', boxSizing: 'border-box',
                        colorScheme: 'dark',
                      }}
                    />
                  </div>
                ))}
              </div>

              {activeService === 'airport' && (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(240,232,213,0.35)', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: 5 }}>Flight Number (optional)</div>
                  <input
                    placeholder="e.g. KL1234"
                    style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 8, padding: '11px 12px',
                      color: '#f0e8d5', fontSize: 12, fontFamily: "'Cormorant Garamond', serif",
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}

              <label style={{ fontSize: 10, letterSpacing: '0.25em', fontFamily: 'sans-serif', color: GOLD, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                {isHelicopter ? 'Aircraft' : 'Vehicle'}
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {fleet.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => setSelectedVehicle(car.id)}
                    style={{
                      cursor: 'pointer',
                      border: `1px solid ${selectedVehicle === car.id ? GOLD : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 12,
                      padding: '12px 14px',
                      background: selectedVehicle === car.id
                        ? `linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)`
                        : 'rgba(0,0,0,0.25)',
                      transition: 'all 0.3s',
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}
                  >
                    <div style={{ width: 70, height: 35, flexShrink: 0, opacity: selectedVehicle === car.id ? 1 : 0.5 }}>
                      <CarSVG color={car.color}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex flex-wrap items-center gap-1.5" style={{ marginBottom: 2 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: selectedVehicle === car.id ? '#f0e8d5' : 'rgba(240,232,213,0.5)', fontFamily: 'sans-serif', letterSpacing: '0.05em' }}>{car.name}</span>
                        {car.tag && (
                          <span style={{
                            fontSize: 7, padding: '1px 4px', borderRadius: 3,
                            background: selectedVehicle === car.id ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)',
                            color: selectedVehicle === car.id ? GOLD : 'rgba(240,232,213,0.25)',
                            letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif',
                          }}>{car.tag}</span>
                        )}
                      </div>
                      <div style={{ fontSize: 9, color: GOLD, opacity: selectedVehicle === car.id ? 0.8 : 0.3, letterSpacing: '0.1em', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: 2 }}>{car.type}</div>
                      <div className="hidden sm:block" style={{ fontSize: 10, color: 'rgba(240,232,213,0.3)', fontFamily: 'sans-serif' }}>{car.desc}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'rgba(240,232,213,0.4)', fontFamily: 'sans-serif' }}>
                        <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/></svg>
                        {car.capacity}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'rgba(240,232,213,0.4)', fontFamily: 'sans-serif' }}>
                        <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10"><rect x="2" y="5" width="12" height="9" rx="1"/><path d="M5 5V3a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                        {car.bags}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM BUTTON & INFO - Mobilde alt alta gelecek şekilde revize edildi */}
          <div className="flex-col md:flex-row gap-6" style={{
            borderTop: '1px solid rgba(201,168,76,0.1)',
            padding: '24px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.15)',
          }}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {['Fixed Price', 'Free Cancellation', 'Flight Tracking', 'Meet & Greet'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD }}/>
                  <span style={{ fontSize: 10, color: 'rgba(240,232,213,0.35)', fontFamily: 'sans-serif', letterSpacing: '0.08em' }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full md:w-auto"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
                backgroundSize: '200% 100%',
                color: '#0a0a0f',
                border: 'none',
                borderRadius: 10,
                padding: '16px 40px',
                fontSize: 11,
                letterSpacing: '0.25em',
                fontFamily: 'sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: `0 8px 32px rgba(201,168,76,0.25)`,
              }}
            >
              Get Instant Quote →
            </button>
          </div>
        </div>

        {/* SERVICES STRIP - Mobilde 2x2, Masaüstünde 4'lü şerit yapıldı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: 32 }}>
          {[
            { icon: '✦', title: 'Amsterdam Tours', desc: 'Canals, Anne Frank House, Rijksmuseum — curated private tours' },
            { icon: '✈', title: 'Airport Transfers', desc: 'Schiphol · Eindhoven · Brussels · Frankfurt' },
            { icon: '⟡', title: 'Europe Intercity', desc: 'Paris · London · Berlin · Zurich — all borders, no stress' },
            { icon: '◈', title: 'Helicopter Charter', desc: 'Scenic flights, fast transfers, business aviation' },
          ].map((s) => (
            <div key={s.title} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(201,168,76,0.1)',
              borderRadius: 14, padding: '20px 18px',
              transition: 'border-color 0.3s',
            }}>
              <div style={{ fontSize: 18, marginBottom: 8, color: GOLD }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontFamily: 'sans-serif', fontWeight: 500, letterSpacing: '0.08em', color: '#f0e8d5', marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 11, color: 'rgba(240,232,213,0.35)', fontFamily: 'sans-serif', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* TRUST BAR - Küçük ekranlar için gap değerleri dengelendi */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px 40px',
          padding: '20px 0',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          flexWrap: 'wrap',
        }}>
          {[
            ['15+', 'Years Experience'],
            ['50,000+', 'Rides Completed'],
            ['4.98 ★', 'Average Rating'],
            ['30+', 'Countries Served'],
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', color: GOLD, fontWeight: 300, letterSpacing: '0.05em', marginBottom: 2 }}>{num}</div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(240,232,213,0.3)', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
        
        /* Yatay menü kaydırma çubuğunu gizler */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        input[type=date]::-webkit-calendar-picker-indicator,
        input[type=time]::-webkit-calendar-picker-indicator { filter: invert(0.5) sepia(1) saturate(2) hue-rotate(5deg); opacity: 0.5; }
        input::placeholder { color: rgba(240,232,213,0.2); }
        input:focus { border-color: rgba(201,168,76,0.4) !important; box-shadow: 0 0 0 2px rgba(201,168,76,0.06); }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}