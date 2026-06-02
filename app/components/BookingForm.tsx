"use client";
import React, { useState } from "react";
import { sendBookingEmail } from "./actions";

// Üst Düzey Lüks Renk Paleti (Quiet Luxury)
const GOLD = "#C5A880";       
const BG_DARK = "#09090B";    
const SURFACE = "#141416";    
const BORDER = "#222226";     
const TEXT_MUTED = "#71717A"; 

interface TourOption {
  id: string;
  name: string;
  detail: string;
  price: string;
  mapsUrl: string;
  images?: string[]; // Google Harita/Lokasyon Fotoğrafları için yeni alan
}

export default function BookingForm() {
  // Ana Menü Seçimi artık 3 bağımsız kategoriye sahip: "ride" | "tours" | "helicopter"
  const [mainTab, setMainTab] = useState<"ride" | "tours" | "helicopter">("ride");
  const [loading, setLoading] = useState<boolean>(false);

  // Ortak İletişim State'leri
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  // 1. Kategori: Book a Ride State'leri
  const [serviceType, setServiceType] = useState<string>("transfer");
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("s-class");

  // 2. Kategori: Tours State'i
  const [selectedTour, setSelectedTour] = useState<string>("tour1");
  const [tourDate, setTourDate] = useState<string>("");
  const [tourPassengers, setTourPassengers] = useState<string>("1");

  // 3. Kategori: Helicopter State'i
  const [selectedHeliTour, setSelectedHeliTour] = useState<string>("heli-skyline");
  const [heliDate, setHeliDate] = useState<string>("");
  const [heliPassengers, setHeliPassengers] = useState<string>("1");

const heroSlides = {
  ride: [
    "https://images.unsplash.com/photo-1549921296-3a6b8a1a9f8f?w=1200",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200"
  ],
  tours: [
    "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200",
    "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?w=1200",
    "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=1200"
  ],
  helicopter: [
    "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=1200",
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200"
  ]
};

const [heroIndex, setHeroIndex] = useState(0);

React.useEffect(() => {
  const interval = setInterval(() => {
    setHeroIndex((prev) => {
      const slides = heroSlides[mainTab];
      return (prev + 1) % slides.length;
    });
  }, 4000);

  return () => clearInterval(interval);
}, [mainTab]);
  const vehicles = [
    { id: "s-class", name: "Mercedes-Benz S-Class", price: "€140", desc: "Max 3 Pax · 2 Bags" },
    { id: "v-class", name: "Mercedes-Benz V-Class", price: "€180", desc: "Max 7 Pax · 7 Bags" },
  ];

  // Kara Turları Listesi (Görseller lüks temayla uyumlu, yüksek kaliteli seçildi)
  const landTours: TourOption[] = [
    { 
      id: "tour1", 
      name: "Tour 1 — Windmills & Villages", 
      detail: "Zaanse Schans + Cheese Factory + Volendam", 
      price: "€350 / 5 Hours",
      mapsUrl: "https://www.google.com/maps/dir/Amsterdam/Zaanse+Schans/Volendam/",
      images: [
        "https://images.unsplash.com/photo-1601999109332-542b18dbec57?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1549294413-26f195afcbce?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80"
      ]
    },
    { 
      id: "tour2", 
      name: "Tour 2 — Giethoorn", 
      detail: "Venice of the North Experience", 
      price: "€600 / 6 Hours",
      mapsUrl: "https://www.google.com/maps/dir/Amsterdam/Giethoorn/",
      images: [
        "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&auto=format&fit=crop&q=80"
      ]
    },
    { 
      id: "tour3", 
      name: "Tour 3 — Amsterdam City Tour", 
      detail: "Tailored Historical City Guide", 
      price: "€85 / Hour",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Amsterdam+Centraal",
      images: [
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1601621915196-26200b0d6bab?w=400&auto=format&fit=crop&q=80"
      ]
    },
    { 
      id: "transfer", 
      name: "Transfer — Airport Private Transfer", 
      detail: "Direct Luxury Airport Service", 
      price: "€85",
      mapsUrl: "https://www.google.com/maps/dir/Amsterdam+Airport+Schiphol/Amsterdam/",
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&auto=format&fit=crop&q=80"
      ]
    },
    { 
      id: "vip", 
      name: "✦ VIP — Private Jet Pick-up", 
      detail: "Runway Meeting & VIP Escort", 
      price: "€125",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Schiphol+VIP+Centre",
      images: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?w=400&auto=format&fit=crop&q=80"
      ]
    },
  ];

  // Helikopter Turları Listesi
  const heliTours: TourOption[] = [
    {
      id: "heli-skyline",
      name: "🚁 Premium — Amsterdam & Countryside Flight",
      detail: "Exclusive Aerial Tour Departing from Private Heliport",
      price: "€850 / 45 Mins",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Amsterdam+Heliport",
      images: [
        "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "heli-vip",
      name: "💎 VIP — Tulip Fields & Coastline Scenic Flight",
      detail: "Seasonal Aerial View with Champagne Toast at Departure",
      price: "€1450 / 60 Mins",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Amsterdam+Heliport",
      images: [
        "https://images.unsplash.com/photo-1566996694954-90b052c413c4?w=400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format&fit=crop&q=80"
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please fill in your Name and Email address.");
      return;
    }

    setLoading(true);

    let payload: any = {
      client_name: fullName,
      client_email: email,
      category: "",
      selected_item: "",
      price: "",
      date: "",
      time: "",
      pickup_location: "",
      dropoff_location: "",
      passengers: ""
    };

    if (mainTab === "ride") {
      const v = vehicles.find(item => item.id === selectedVehicle);
      payload.category = "Book a Ride";
      payload.selected_item = v?.name || "";
      payload.price = v?.price || "";
      payload.date = date;
      payload.time = time;
      payload.pickup_location = pickup;
      payload.dropoff_location = serviceType === "transfer" ? dropoff : "Hourly Service";
      payload.passengers = "Max 3-7 Pax";
    } else if (mainTab === "tours") {
      const t = landTours.find(item => item.id === selectedTour);
      payload.category = "Tours & Packages";
      payload.selected_item = t?.name || "";
      payload.price = t?.price || "";
      payload.date = tourDate;
      payload.time = "To be coordinated";
      payload.pickup_location = "Custom Route Tour";
      payload.dropoff_location = "N/A";
      payload.passengers = tourPassengers;
    } else if (mainTab === "helicopter") {
      const h = heliTours.find(item => item.id === selectedHeliTour);
      payload.category = "Helicopter Tours";
      payload.selected_item = h?.name || "";
      payload.price = h?.price || "";
      payload.date = heliDate;
      payload.time = "To be coordinated";
      payload.pickup_location = "Private Heliport";
      payload.dropoff_location = "N/A";
      payload.passengers = heliPassengers;
    }

    const result = await sendBookingEmail(payload);

    if (result.success) {
      alert("Thank you! Your request has been sent. Please check your email for confirmation.");
      setFullName("");
      setEmail("");
    } else {
      alert("An error occurred while processing your request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: BG_DARK,
      padding: "16px", 
      fontFamily: "system-ui, -apple-system, sans-serif",
      boxSizing: "border-box",
      width: "100%",
      overflowX: "hidden" 
    }}>
      
      <div style={{
        width: "100%",
        maxWidth: "1100px", 
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: "20px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap", 
        overflow: "hidden",
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
        boxSizing: "border-box"
      }}>
        
        {/* SOL PANEL: Başlık ve 3'lü Bağımsız Menü Seçimi */}
        <div style={{
          flex: "1 1 320px", 
          background: "rgba(255, 255, 255, 0.01)",
          borderRight: `1px solid ${BORDER}`,
          padding: "30px 24px", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          width: "100%"
        }}>
          <div
  style={{
    position: "relative",
    height: "260px",
    borderRadius: "18px",
    overflow: "hidden",
    marginBottom: "24px",
    border: `1px solid ${BORDER}`
  }}
>
  <img
    src={
      mainTab === "ride"
        ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"
        : mainTab === "tours"
        ? "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200"
        : "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=1200"
    }
    alt=""
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />

  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.15))"
    }}
  />

  <div
    style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      right: "20px"
    }}
  >
    <div
      style={{
        color: GOLD,
        fontSize: "12px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "8px"
      }}
    >
      Premium Experiences
    </div>

    <h2
      style={{
        color: "#fff",
        margin: 0,
        fontSize: "28px",
        lineHeight: 1.2
      }}
    >
      {mainTab === "ride"
        ? "Luxury Chauffeur Service"
        : mainTab === "tours"
        ? "Private Amsterdam Tours"
        : "Helicopter Experiences"}
    </h2>

    <p
      style={{
        color: "#ddd",
        marginTop: "10px",
        marginBottom: 0
      }}
    >
      ★★★★★ 4.9 · Private Service · Instant Request
    </p>
  </div>
</div>
          <div>
            <span style={{ color: GOLD, fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Luxury Taxi Limo
            </span>
            <h2 style={{ color: "#FFF", fontSize: "clamp(24px, 2.5vw, 32px)", fontFamily: "serif", fontWeight: 400, marginTop: "8px", marginBottom: "24px", lineHeight: 1.3 }}>
              Exclusive Chauffeur & Premium Tours
            </h2>

            {/* 3 SEÇENEKLİ ANA MENÜ */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
              <button
                type="button"
                onClick={() => setMainTab("ride")}
                style={menuButtonStyle(mainTab === "ride")}
              >
                <span>📍 Book a Ride</span>
                {mainTab === "ride" && <span style={{ fontSize: "10px" }}>●</span>}
              </button>

              <button
                type="button"
                onClick={() => setMainTab("tours")}
                style={menuButtonStyle(mainTab === "tours")}
              >
                <span>🌍 Tours & Packages</span>
                {mainTab === "tours" && (
  <div style={{ width: "100%" }}>
    <h3
      style={{
        color: "#FFF",
        fontSize: "clamp(16px, 1.5vw, 20px)",
        fontWeight: 500,
        marginBottom: "6px"
      }}
    >
      Available Private Tours
    </h3>

    <p
      style={{
        color: TEXT_MUTED,
        fontSize: "clamp(12px, 1.1vw, 14px)",
        marginBottom: "20px"
      }}
    >
      Select a curated luxury experience below
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {landTours.map((tour) => {
        const isSelected = selectedTour === tour.id;

        return (
          <div
            key={tour.id}
            onClick={() => setSelectedTour(tour.id)}
            style={{
              border: `1px solid ${isSelected ? GOLD : BORDER}`,
              background: isSelected
                ? "rgba(197,168,128,0.05)"
                : "transparent",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.25s ease"
            }}
          >
            {/* IMAGE */}
            <div
              style={{
                width: "100%",
                height: "200px",
                overflow: "hidden"
              }}
            >
              <img
                src={tour.images?.[0] || ""}
                alt={tour.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ padding: "16px" }}>
              {/* TITLE */}
              <div
                style={{
                  color: isSelected ? GOLD : "#fff",
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "6px"
                }}
              >
                {tour.name}
              </div>

              {/* DETAIL */}
              <div
                style={{
                  color: TEXT_MUTED,
                  fontSize: "14px",
                  marginBottom: "12px",
                  lineHeight: 1.5
                }}
              >
                {tour.detail}
              </div>

              {/* BADGES */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "14px"
                }}
              >
                <span style={badgeStyle}>⭐ 4.9</span>
                <span style={badgeStyle}>🚘 Private Driver</span>
                <span style={badgeStyle}>🕒 Flexible</span>
              </div>

              {/* PRICE + SELECTED */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div
                    style={{
                      color: TEXT_MUTED,
                      fontSize: "12px"
                    }}
                  >
                    From
                  </div>

                  <div
                    style={{
                      color: GOLD,
                      fontSize: "22px",
                      fontWeight: 700
                    }}
                  >
                    {tour.price.split(" / ")[0]}
                  </div>
                </div>

                {isSelected && (
                  <div
                    style={{
                      background: GOLD,
                      color: BG_DARK,
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700
                    }}
                  >
                    SELECTED
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* DATE + PASSENGERS */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        marginTop: "20px"
      }}
    >
      <div style={{ flex: "1 1 200px" }}>
        <label style={labelStyle}>Tour Date</label>
        <input
          type="date"
          value={tourDate}
          onChange={(e) => setTourDate(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ flex: "1 1 200px" }}>
        <label style={labelStyle}>Passengers</label>
        <input
          type="number"
          min="1"
          max="7"
          value={tourPassengers}
          onChange={(e) => setTourPassengers(e.target.value)}
          style={inputStyle}
        />
      </div>
    </div>

    <button type="submit" disabled={loading} style={actionButtonStyle}>
      {loading ? "Processing..." : "Book Selected Private Tour"}
    </button>
  </div>
)}
              </button>

              <button
                type="button"
                onClick={() => setMainTab("helicopter")}
                style={menuButtonStyle(mainTab === "helicopter")}
              >
                <span>🚁 Helicopter Tours</span>
                {mainTab === "helicopter" && <span style={{ fontSize: "10px" }}>●</span>}
              </button>
            </div>
          </div>

          <div style={{ marginTop: "30px", color: TEXT_MUTED, fontSize: "clamp(12px, 1.1vw, 15px)", lineHeight: "1.6" }}>
            Professional drivers, pristine fleet, and custom private excursions across Europe.
          </div>
        </div>

        {/* SAĞ PANEL: Dinamik Değişen Form İçerikleri */}
        <div style={{
          flex: "2 1 500px",
          padding: "30px 24px", 
          boxSizing: "border-box",
          width: "100%",
          overflow: "hidden"
        }}>
          
          {/* ORTAK İLETİŞİM ALANLARI */}
          <div style={{ marginBottom: "24px", borderBottom: `1px solid ${BORDER}`, paddingBottom: "20px" }}>
            <h4 style={{ color: GOLD, fontSize: "clamp(12px, 1.1vw, 14px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "14px" }}>Contact Details</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Full Name</label>
                <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Email Address</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* 1. MENÜ: BOOK A RIDE PANELİ */}
            {mainTab === "ride" && (
              <div style={{ width: "100%" }}>
                <h3 style={{ color: "#FFF", fontSize: "clamp(16px, 1.5vw, 20px)", fontWeight: 500, marginBottom: "20px" }}>Ride Parameters</h3>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px", width: "100%" }}>
                  {["transfer", "hourly"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setServiceType(t)}
                      style={{
                        background: serviceType === t ? "rgba(197, 168, 128, 0.1)" : "transparent",
                        color: serviceType === t ? GOLD : TEXT_MUTED,
                        border: `1px solid ${serviceType === t ? GOLD : BORDER}`,
                        padding: "12px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "clamp(12px, 1vw, 14px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600,
                        flex: "1 1 140px",
                        boxSizing: "border-box"
                      }}
                    >
                      {t === "transfer" ? "Distance Transfer" : "By The Hour"}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px", width: "100%" }}>
                  <div style={{ width: "100%" }}>
                    <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Pickup Location</label>
                    <input type="text" placeholder="Enter pickup address, airport or hotel" value={pickup} onChange={(e) => setPickup(e.target.value)} style={inputStyle} />
                  </div>

                  {serviceType === "transfer" && (
                    <div style={{ width: "100%" }}>
                      <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Drop-off Location</label>
                      <input type="text" placeholder="Enter destination address" value={dropoff} onChange={(e) => setDropoff(e.target.value)} style={inputStyle} />
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "24px", width: "100%" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <h4 style={{ color: "#FFF", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 500, marginBottom: "12px" }}>Select Class</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      style={{
                        border: `1px solid ${selectedVehicle === v.id ? GOLD : BORDER}`,
                        background: selectedVehicle === v.id ? "rgba(197, 168, 128, 0.02)" : "transparent",
                        borderRadius: "10px", padding: "16px", cursor: "pointer",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        width: "100%", boxSizing: "border-box", gap: "10px"
                      }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ color: "#FFF", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: "clamp(12px, 1.1vw, 14px)", marginTop: "2px" }}>{v.desc}</div>
                      </div>
                      <span style={{ color: GOLD, fontWeight: 600, whiteSpace: "nowrap", fontSize: "clamp(14px, 1.2vw, 16px)" }}>{v.price}</span>
                    </div>
                  ))}
                </div>

                <button type="submit" disabled={loading} style={actionButtonStyle}>
                  {loading ? "Processing..." : "Confirm Ride Reservation"}
                  
                </button>
              </div>
              
            )}
            
            {/* 2. MENÜ: TOURS & PACKAGES PANELİ */}
            {mainTab === "tours" && (
              <div style={{ width: "100%" }}>
                <h3 style={{ color: "#FFF", fontSize: "clamp(16px, 1.5vw, 20px)", fontWeight: 500, marginBottom: "4px" }}>Available Private Tours</h3>
                <p style={{ color: TEXT_MUTED, fontSize: "clamp(12px, 1.1vw, 14px)", marginBottom: "20px" }}>Select a curated luxury experience below</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                 {landTours.map((tour) => (
                    <div
                      key={tour.id}
                      onClick={() => setSelectedTour(tour.id)}
                      style={tourCardStyle(selectedTour === tour.id)}
                      
                    >
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "12px" }}>
                        <div style={{ overflow: "hidden" }}>
                          <div style={{ color: selectedTour === tour.id ? GOLD : "#FFF", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 600, lineHeight: 1.3 }}>
                            {tour.name}
                          </div>
                          <div style={{ color: TEXT_MUTED, fontSize: "clamp(12px, 1.1vw, 14px)", marginTop: "4px" }}>
                            {tour.detail}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                          <span style={{ color: "#FFF", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 600, display: "block" }}>
                            {tour.price.split(" / ")[0]}
                          </span>
                          {tour.price.split(" / ")[1] && (
                            <span style={{ color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)" }}>
                              /{tour.price.split(" / ")[1]}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          window.open(tour.mapsUrl, "_blank", "noopener,noreferrer");
                        }}
                        style={mapsButtonStyle}
                      > 
                        🗺️ View Route on Google Maps ↗
                      </button>

                      {/* GOOGLE MAPS FOTOĞRAFLARI ALANI */}
                      {tour.images && tour.images.length > 0 && (
                        <div style={{ 
                          display: "flex", 
                          gap: "8px", 
                          marginTop: "4px", 
                          overflowX: "auto",
                          paddingBottom: "4px",
                          scrollbarWidth: "none"
                        }}>
                          {tour.images.map((imgUrl, index) => (
                            <img 
                              key={index} 
                              src={imgUrl} 
                              alt={`${tour.name} preview`} 
                              style={{
                                width: "120px",
                                height: "75px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                border: `1px solid ${BORDER}`,
                                opacity: selectedTour === tour.id ? 0.9 : 0.5,
                                transition: "all 0.3s ease"
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px", width: "100%" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Tour Date</label>
                    <input type="date" value={tourDate} onChange={(e) => setTourDate(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Passengers</label>
                    <input type="number" placeholder="1" min="1" max="7" value={tourPassengers} onChange={(e) => setTourPassengers(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <button type="submit" disabled={loading} style={actionButtonStyle}>
                  {loading ? "Processing..." : "Book Selected Private Tour"}
                </button>
              </div>
            )}

            {/* 3. MENÜ: HELICOPTER TOURS PANELİ */}
            {mainTab === "helicopter" && (
              <div style={{ width: "100%" }}>
                <h3 style={{ color: "#FFF", fontSize: "clamp(16px, 1.5vw, 20px)", fontWeight: 500, marginBottom: "4px" }}>Helicopter Flight Experience</h3>
                <p style={{ color: TEXT_MUTED, fontSize: "clamp(12px, 1.1vw, 14px)", marginBottom: "20px" }}>Private flights above the beautiful landscapes</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                  {heliTours.map((tour) => (
                    <div
                      key={tour.id}
                      onClick={() => setSelectedHeliTour(tour.id)}
                      style={tourCardStyle(selectedHeliTour === tour.id)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "12px" }}>
                        <div style={{ overflow: "hidden" }}>
                          <div style={{ color: selectedHeliTour === tour.id ? GOLD : "#FFF", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 600, lineHeight: 1.3 }}>
                            {tour.name}
                          </div>
                          <div style={{ color: TEXT_MUTED, fontSize: "clamp(12px, 1.1vw, 14px)", marginTop: "4px" }}>
                            {tour.detail}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                          <span style={{ color: "#FFF", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 600, display: "block" }}>
                            {tour.price.split(" / ")[0]}
                          </span>
                          {tour.price.split(" / ")[1] && (
                            <span style={{ color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)" }}>
                              /{tour.price.split(" / ")[1]}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          window.open(tour.mapsUrl, "_blank", "noopener,noreferrer");
                        }}
                        style={mapsButtonStyle}
                      >
                        🚁 View Flight Path on Google Maps ↗
                      </button>

                      {/* HELİKOPTER MAPS FOTOĞRAFLARI ALANI */}
                      {tour.images && tour.images.length > 0 && (
                        <div style={{ 
                          display: "flex", 
                          gap: "8px", 
                          marginTop: "4px", 
                          overflowX: "auto",
                          paddingBottom: "4px",
                          scrollbarWidth: "none"
                        }}>
                          {tour.images.map((imgUrl, index) => (
                            <img 
                              key={index} 
                              src={imgUrl} 
                              alt={`${tour.name} preview`} 
                              style={{
                                width: "120px",
                                height: "75px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                border: `1px solid ${BORDER}`,
                                opacity: selectedHeliTour === tour.id ? 0.9 : 0.5,
                                transition: "all 0.3s ease"
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px", width: "100%" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Flight Date</label>
                    <input type="date" value={heliDate} onChange={(e) => setHeliDate(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={{ display: "block", color: TEXT_MUTED, fontSize: "clamp(11px, 1vw, 13px)", textTransform: "uppercase", marginBottom: "6px" }}>Passengers</label>
                    <input type="number" placeholder="1" min="1" max="4" value={heliPassengers} onChange={(e) => setHeliPassengers(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <button type="submit" disabled={loading} style={actionButtonStyle}>
                  {loading ? "Processing..." : "Request Helicopter Booking"}
                </button>
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}

// Stil Fonksiyonları ve Ortak Tasarımlar
const menuButtonStyle = (isActive: boolean): React.CSSProperties => ({
  background: isActive ? GOLD : "transparent",
  color: isActive ? BG_DARK : "#FFF",
  border: `1px solid ${isActive ? GOLD : BORDER}`,
  padding: "14px 18px",
  borderRadius: "10px",
  fontSize: "clamp(13px, 1.1vw, 15px)",
  fontWeight: 600,
  textAlign: "left",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box"
});
const labelStyle: React.CSSProperties = {
  display: "block",
  color: TEXT_MUTED,
  fontSize: "12px",
  textTransform: "uppercase",
  marginBottom: "6px",
  letterSpacing: "0.05em"
};
const tourCardStyle = (
  isSelected: boolean
): React.CSSProperties => ({
  border: `1px solid ${isSelected ? GOLD : BORDER}`,
  background: isSelected
    ? "rgba(197,168,128,.04)"
    : SURFACE,
  borderRadius: "18px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all .25s ease",
  width: "100%",
  boxSizing: "border-box",
  boxShadow: isSelected
    ? "0 10px 30px rgba(197,168,128,.08)"
    : "none"
});
const badgeStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${BORDER}`,
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  color: "#ddd",
  whiteSpace: "nowrap"
};
const mapsButtonStyle: React.CSSProperties = {
  alignSelf: "flex-start",
  background: "rgba(255, 255, 255, 0.03)",
  border: `1px solid ${BORDER}`,
  borderRadius: "6px",
  padding: "6px 12px",
  color: GOLD,
  fontSize: "clamp(11px, 1vw, 12px)",
  fontWeight: 500,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  transition: "background 0.2s"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box", 
  background: "transparent",
  border: `1px solid ${BORDER}`,
  borderRadius: "8px",
  padding: "12px 14px",
  color: "#FFFFFF",
  fontSize: "clamp(13px, 1.1vw, 15px)",
  outline: "none",
};

const actionButtonStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: GOLD,
  color: BG_DARK,
  border: "none",
  padding: "16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "clamp(13px, 1.1vw, 15px)",
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  marginTop: "24px",
};