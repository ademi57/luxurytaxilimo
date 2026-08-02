"use client";
import React, { useState, useEffect, useCallback } from "react";
import { sendBookingEmail } from "./actions";

/* ============================================================
   DESIGN TOKENS — Quiet Luxury (Chauffeur Noir)
   ============================================================ */
const GOLD = "#C6A26B";
const GOLD_SOFT = "rgba(198, 162, 107, 0.12)";
const GOLD_BRIGHT = "#E4C48F";
const BG_DARK = "#0A0A0B";
const SURFACE = "#141416";
const SURFACE_RAISED = "#1B1B1D";
const BORDER = "#26262A";
const BORDER_SOFT = "#1F1F22";
const TEXT_MUTED = "#8C8C92";
const TEXT_FAINT = "#5C5C61";
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

/* ============================================================
   TYPES
   ============================================================ */
interface TourOption {
  id: string;
  name: string;
  detail: string;
  price: string;
  mapsUrl: string;
  images?: string[]; // Bu diziye istediğiniz kadar bölge fotoğrafı ekleyebilirsiniz
}

/* ============================================================
   COMPONENT
   ============================================================ */
export default function BookingForm() {
  const [mainTab, setMainTab] = useState<"ride" | "tours" | "helicopter">("ride");
  const [loading, setLoading] = useState<boolean>(false);

  // İletişim
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Book a Ride
  const [serviceType, setServiceType] = useState<string>("transfer");
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("s-class");

  // Tours
  const [selectedTour, setSelectedTour] = useState<string>("tour1");
  const [tourDate, setTourDate] = useState<string>("");
  const [tourPassengers, setTourPassengers] = useState<string>("1");

  // Helicopter
  const [selectedHeliTour, setSelectedHeliTour] = useState<string>("heli-skyline");
  const [heliDate, setHeliDate] = useState<string>("");
  const [heliPassengers, setHeliPassengers] = useState<string>("1");

  // Galeri (lightbox) durumu — hangi tur, hangi fotoğraf
  const [gallery, setGallery] = useState<{ tour: TourOption; index: number } | null>(null);

  const vehicles = [
    { id: "s-class", name: "Mercedes-Benz S-Class", desc: "Max 3 Pax · 2 Bags" },
    { id: "v-class", name: "Mercedes-Benz V-Class", desc: "Max 7 Pax · 7 Bags" },
    { id: "e-class", name: "Mercedes-Benz E-Class", desc: "Max 5 Pax · 5 Bags" },
    { id: "sprinter", name: "Mercedes-Benz Sprinter", desc: "18 seater · Max 7 Pax · 7 Bags" },
    { id: "BMW", name: "BMW 7 Series", desc: "Max 5 Pax · 5 Bags" },
  ];

  const landTours: TourOption[] = [
    {
      id: "tour1",
      name: "Windmills & Villages",
      detail: "Zaanse Schans + Cheese Factory + Volendam + 2-hour waiting time",
      price: "€350 / 5 Hours",
      mapsUrl: "https://www.google.com/maps/dir/Amsterdam/Zaanse+Schans/Volendam/",
      images: ["/Zaanse Schans.jpg", "/zaanse.jpg", "/CheeseFactory.jpg"],
    },
    {
      id: "tour2",
      name: "Giethoorn",
      detail: "Venice of the North Experience + 2-hour waiting time",
      price: "€475 / 6 Hours",
      mapsUrl: "https://www.google.com/maps/dir/Amsterdam/Giethoorn/",
      images: ["/giethoorn.jpg", "/giethoorn2.jpg"],
    },
    {
      id: "tour3",
      name: "Amsterdam City Tour",
      detail: "Tailored Historical City Guide",
      price: "€85 / Hour",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Amsterdam+Centraal",
      images: ["/amsterdam.jpg", "/amsterdamcity.jpg"],
    },
    {
      id: "tour4",
      name: "Keukenhof Tulip Tour",
      detail: "Keukenhof + Lisse + 2-hour waiting time",
      price: "€295 / Sedan · €350 / Bus",
      mapsUrl:
        "https://www.google.com/maps/dir/?api=1&origin=Amsterdam+Centraal&destination=Keukenhof+Lisse&travelmode=transit",
      images: ["/keukenhof.jpg", "/keukenhofff.jpg"],
    },
    {
      id: "tour5",
      name: "Amsterdam Cruise / Airport Transfer",
      detail: "Amsterdam Cruise Port ↔ Airport Transfer",
      price: "€95",
      mapsUrl:
        "https://www.google.com/maps/dir/?api=1&origin=Amsterdam+Cruise+Port&destination=Amsterdam+Airport+Schiphol&travelmode=driving",
      images: ["/curise.png"],
    },
    {
      id: "tour6",
      name: "Amsterdam → Rotterdam Cruise Transfer",
      detail: "Amsterdam City / Airport to Rotterdam Cruise Port",
      price: "€225 / Sedan",
      mapsUrl:
        "https://www.google.com/maps/dir/?api=1&origin=Amsterdam+Centraal&destination=Cruise+Port+Rotterdam&travelmode=driving",
      images: ["/cruiseairport.png"],
    },
    {
      id: "transfer",
      name: "Airport Private Transfer",
      detail: "Direct Luxury Airport Service",
      price: "€85",
      mapsUrl: "https://www.google.com/maps/dir/Amsterdam+Airport+Schiphol/Amsterdam/",
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80",
      ],
    },
    {
      id: "vip",
      name: "VIP Private Jet Pick-up",
      detail: "Runway Meeting & VIP Escort",
      price: "€125",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Schiphol+VIP+Centre",
      images: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?w=800&auto=format&fit=crop&q=80",
      ],
    },
  ];

  const heliTours: TourOption[] = [
    {
      id: "heli-skyline",
      name: "Amsterdam & Countryside Flight",
      detail: "Exclusive Aerial Tour Departing from Private Heliport",
      price: "€850 / 45 Mins",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Amsterdam+Heliport",
      images: [
        "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=80",
      ],
    },
    {
      id: "heli-vip",
      name: "Tulip Fields & Coastline Scenic Flight",
      detail: "Seasonal Aerial View with Champagne Toast at Departure",
      price: "€1450 / 60 Mins",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Amsterdam+Heliport",
      images: [
        "https://images.unsplash.com/photo-1566996694954-90b052c413c4?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
      ],
    },
  ];

  /* ---------------- Gallery keyboard navigation ---------------- */
  const closeGallery = useCallback(() => setGallery(null), []);
  const nextImage = useCallback(() => {
    setGallery((g) => {
      if (!g || !g.tour.images) return g;
      return { ...g, index: (g.index + 1) % g.tour.images.length };
    });
  }, []);
  const prevImage = useCallback(() => {
    setGallery((g) => {
      if (!g || !g.tour.images) return g;
      return { ...g, index: (g.index - 1 + g.tour.images.length) % g.tour.images.length };
    });
  }, []);

  useEffect(() => {
    if (!gallery) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gallery, closeGallery, nextImage, prevImage]);

  /* ---------------- Submit ---------------- */
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
      client_phone: phone,
      category: "",
      selected_item: "",
      price: "",
      date: "",
      time: "",
      pickup_location: "",
      dropoff_location: "",
      passengers: "",
    };

    if (mainTab === "ride") {
      const v = vehicles.find((item) => item.id === selectedVehicle);
      payload.category = "Book a Ride";
      payload.selected_item = v?.name || "";
      payload.date = date;
      payload.time = time;
      payload.pickup_location = pickup;
      payload.dropoff_location = serviceType === "transfer" ? dropoff : "Hourly Service";
      payload.passengers = "Max 3-7 Pax";
    } else if (mainTab === "tours") {
      const t = landTours.find((item) => item.id === selectedTour);
      payload.category = "Tours & Packages";
      payload.selected_item = t?.name || "";
      payload.price = t?.price || "";
      payload.date = tourDate;
      payload.time = "To be coordinated";
      payload.pickup_location = "Custom Route Tour";
      payload.dropoff_location = "N/A";
      payload.passengers = tourPassengers;
    } else if (mainTab === "helicopter") {
      const h = heliTours.find((item) => item.id === selectedHeliTour);
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
      setPhone("");
    } else {
      alert("An error occurred while processing your request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={pageWrap}>
      <div style={shell}>
        {/* ============ SOL PANEL ============ */}
        <div style={sidebar}>
          <div>
            <span style={eyebrow}>Luxury Taxi Limo</span>
            <h1 style={heroTitle}>
              Exclusive Chauffeur
              <br />& Private Tours
            </h1>
            <p style={heroSub}>
              Professional drivers, a pristine fleet, and curated excursions across the Netherlands —
              tailored to you.
            </p>

            <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
              <TabButton active={mainTab === "ride"} onClick={() => setMainTab("ride")} icon="🚘" label="Book a Ride" sub="Transfers & hourly hire" />
              <TabButton active={mainTab === "tours"} onClick={() => setMainTab("tours")} icon="🌷" label="Tours & Packages" sub="Curated day trips" />
              <TabButton active={mainTab === "helicopter"} onClick={() => setMainTab("helicopter")} icon="🚁" label="Helicopter Tours" sub="Aerial scenic flights" />
            </nav>
          </div>

          <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: `1px solid ${BORDER_SOFT}` }}>
            <div style={{ color: TEXT_FAINT, fontSize: "12px", letterSpacing: "0.06em", lineHeight: 1.7 }}>
              Questions before booking?
              <br />
              <span style={{ color: GOLD }}>Every request is confirmed by our concierge team within 1 hour.</span>
            </div>
          </div>
        </div>

        {/* ============ SAĞ PANEL ============ */}
        <div style={content}>
          {/* İletişim */}
          <section style={{ marginBottom: "28px", paddingBottom: "24px", borderBottom: `1px solid ${BORDER_SOFT}` }}>
            <SectionLabel>Contact Details</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "14px" }}>
              <Field label="Full Name" style={{ flex: "1 1 200px" }}>
                <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} required />
              </Field>
              <Field label="Email Address" style={{ flex: "1 1 200px" }}>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
              </Field>
              <Field label="Phone Number" style={{ flex: "1 1 200px" }}>
                <input type="tel" placeholder="+31 6 00 00 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} required />
              </Field>
            </div>
          </section>

          <form onSubmit={handleSubmit}>
            {/* ================= RIDE ================= */}
            {mainTab === "ride" && (
              <div>
                <SectionLabel>Ride Parameters</SectionLabel>

                <div style={{ display: "flex", gap: "10px", margin: "16px 0 20px" }}>
                  {(["transfer", "hourly"] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setServiceType(t)} style={pillButton(serviceType === t)}>
                      {t === "transfer" ? "Distance Transfer" : "By The Hour"}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
                  <Field label="Pickup Location">
                    <input type="text" placeholder="Enter pickup address, airport or hotel" value={pickup} onChange={(e) => setPickup(e.target.value)} style={inputStyle} />
                  </Field>
                  {serviceType === "transfer" && (
                    <Field label="Drop-off Location">
                      <input type="text" placeholder="Enter destination address" value={dropoff} onChange={(e) => setDropoff(e.target.value)} style={inputStyle} />
                    </Field>
                  )}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "26px" }}>
                  <Field label="Date" style={{ flex: "1 1 180px" }}>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
                  </Field>
                  <Field label="Time" style={{ flex: "1 1 180px" }}>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
                  </Field>
                </div>

                <SectionLabel>Select Class</SectionLabel>
                <div style={{ display: "grid", gap: "10px", marginTop: "14px" }}>
                  {vehicles.map((v) => (
                    <div key={v.id} onClick={() => setSelectedVehicle(v.id)} style={selectRow(selectedVehicle === v.id)}>
                      <RadioDot active={selectedVehicle === v.id} />
                      <div style={{ overflow: "hidden", flex: 1 }}>
                        <div style={rowTitle(selectedVehicle === v.id)}>{v.name}</div>
                        <div style={rowSub}>{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="submit" disabled={loading} style={actionButtonStyle}>
                  {loading ? "Processing…" : "Confirm Ride Reservation"}
                </button>
              </div>
            )}

            {/* ================= TOURS ================= */}
            {mainTab === "tours" && (
              <div>
                <SectionLabel>Available Private Tours</SectionLabel>
                <p style={sectionHint}>Tap a photo to preview the destination, or select a tour to book it.</p>

                <div style={cardGrid}>
                  {landTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      selected={selectedTour === tour.id}
                      onSelect={() => setSelectedTour(tour.id)}
                      onOpenGallery={(idx) => setGallery({ tour, index: idx })}
                    />
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "26px" }}>
                  <Field label="Tour Date" style={{ flex: "1 1 180px" }}>
                    <input type="date" value={tourDate} onChange={(e) => setTourDate(e.target.value)} style={inputStyle} />
                  </Field>
                  <Field label="Passengers" style={{ flex: "1 1 180px" }}>
                    <input type="number" placeholder="1" min="1" max="7" value={tourPassengers} onChange={(e) => setTourPassengers(e.target.value)} style={inputStyle} />
                  </Field>
                </div>

                <button type="submit" disabled={loading} style={actionButtonStyle}>
                  {loading ? "Processing…" : "Book Selected Private Tour"}
                </button>
              </div>
            )}

            {/* ================= HELICOPTER ================= */}
            {mainTab === "helicopter" && (
              <div>
                <SectionLabel>Helicopter Flight Experience</SectionLabel>
                <p style={sectionHint}>Private flights above the most beautiful landscapes in Holland.</p>

                <div style={cardGrid}>
                  {heliTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      selected={selectedHeliTour === tour.id}
                      onSelect={() => setSelectedHeliTour(tour.id)}
                      onOpenGallery={(idx) => setGallery({ tour, index: idx })}
                    />
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "26px" }}>
                  <Field label="Flight Date" style={{ flex: "1 1 180px" }}>
                    <input type="date" value={heliDate} onChange={(e) => setHeliDate(e.target.value)} style={inputStyle} />
                  </Field>
                  <Field label="Passengers" style={{ flex: "1 1 180px" }}>
                    <input type="number" placeholder="1" min="1" max="4" value={heliPassengers} onChange={(e) => setHeliPassengers(e.target.value)} style={inputStyle} />
                  </Field>
                </div>

                <button type="submit" disabled={loading} style={actionButtonStyle}>
                  {loading ? "Processing…" : "Request Helicopter Booking"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* ============ FULLSCREEN GALLERY (Lightbox) ============ */}
      {gallery && gallery.tour.images && (
        <div style={lightboxOverlay} onClick={closeGallery}>
          <div style={lightboxTop}>
            <div>
              <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {gallery.tour.price}
              </div>
              <div style={{ color: "#FFF", fontSize: "clamp(18px, 2.5vw, 26px)", fontFamily: SERIF, fontWeight: 600 }}>
                {gallery.tour.name}
              </div>
            </div>
            <button type="button" onClick={closeGallery} style={closeButtonStyle} aria-label="Close gallery">
              ✕
            </button>
          </div>

          <div style={lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
            {gallery.tour.images.length > 1 && (
              <button type="button" onClick={prevImage} style={{ ...navArrow, left: "12px" }} aria-label="Previous photo">
                ‹
              </button>
            )}
            <img
              src={gallery.tour.images[gallery.index]}
              alt={`${gallery.tour.name} — photo ${gallery.index + 1}`}
              style={lightboxImage}
            />
            {gallery.tour.images.length > 1 && (
              <button type="button" onClick={nextImage} style={{ ...navArrow, right: "12px" }} aria-label="Next photo">
                ›
              </button>
            )}
          </div>

          <div style={lightboxBottom} onClick={(e) => e.stopPropagation()}>
            <p style={{ color: TEXT_MUTED, fontSize: "13px", maxWidth: "560px", margin: "0 auto 14px", lineHeight: 1.6 }}>
              {gallery.tour.detail}
            </p>
            {gallery.tour.images.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                {gallery.tour.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setGallery((g) => (g ? { ...g, index: i } : g))}
                    style={{
                      width: i === gallery.index ? "22px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      border: "none",
                      background: i === gallery.index ? GOLD : BORDER,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    aria-label={`Go to photo ${i + 1}`}
                  />
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                window.open(gallery.tour.mapsUrl, "_blank", "noopener,noreferrer");
              }}
              style={{ ...mapsButtonStyle, margin: "16px auto 0" }}
            >
              🗺️ View Route on Google Maps
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

function TabButton({ active, onClick, icon, label, sub }: { active: boolean; onClick: () => void; icon: string; label: string; sub: string }) {
  return (
    <button type="button" onClick={onClick} style={tabButtonStyle(active)}>
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span style={{ flex: 1, textAlign: "left" }}>
        <span style={{ display: "block", fontWeight: 600, fontSize: "14px" }}>{label}</span>
        <span style={{ display: "block", fontSize: "11.5px", opacity: 0.7, marginTop: "2px", fontWeight: 400 }}>{sub}</span>
      </span>
      {active && <span style={{ color: "inherit", fontSize: "12px" }}>→</span>}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={{ color: GOLD, fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
      {children}
    </h4>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label style={{ display: "block", color: TEXT_MUTED, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function RadioDot({ active }: { active: boolean }) {
  return (
    <span
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        border: `1.5px solid ${active ? GOLD : BORDER}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {active && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: GOLD }} />}
    </span>
  );
}

/**
 * TourCard — küçük bir fotoğraf mozaiği (1 büyük + küçük kareler) gösterir.
 * Herhangi bir fotoğrafa tıklamak tam ekran galeriyi açar; kartın geri kalanına
 * tıklamak turu seçer. `tour.images` dizisine istediğiniz kadar fotoğraf ekleyebilirsiniz.
 */
function TourCard({
  tour,
  selected,
  onSelect,
  onOpenGallery,
}: {
  tour: TourOption;
  selected: boolean;
  onSelect: () => void;
  onOpenGallery: (index: number) => void;
}) {
  const images = tour.images && tour.images.length > 0 ? tour.images : null;
  const [priceMain, pricePer] = tour.price.split(" / ");

  return (
    <div style={tourCardStyle(selected)}>
      {/* Fotoğraf Mozaiği */}
      <div
        onClick={() => (images ? onOpenGallery(0) : onSelect())}
        style={{
          position: "relative",
          cursor: "pointer",
          borderRadius: "10px",
          overflow: "hidden",
          aspectRatio: "16 / 10",
          background: BORDER_SOFT,
        }}
      >
        {images ? (
          <>
            <img src={images[0]} alt={tour.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={imageOverlay} />
            {images.length > 1 && (
              <div style={photoCountBadge}>
                📷 {images.length}
              </div>
            )}
            <div style={viewGalleryHint}>View gallery ↗</div>
          </>
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: TEXT_FAINT, fontSize: "12px" }}>
            + Add photo
          </div>
        )}
      </div>

      {/* İçerik */}
      <div onClick={onSelect} style={{ padding: "14px 4px 4px", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={{ marginTop: "3px" }}>
              <RadioDot active={selected} />
            </span>
            <div>
              <div style={rowTitle(selected)}>{tour.name}</div>
              <div style={rowSub}>{tour.detail}</div>
            </div>
          </div>
          <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
            <div style={{ color: GOLD, fontWeight: 700, fontSize: "15px" }}>{priceMain}</div>
            {pricePer && <div style={{ color: TEXT_FAINT, fontSize: "11px" }}>{pricePer}</div>}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            window.open(tour.mapsUrl, "_blank", "noopener,noreferrer");
          }}
          style={{ ...mapsButtonStyle, marginTop: "12px" }}
        >
          🗺️ Route
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */
const pageWrap: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: BG_DARK,
  padding: "16px",
  fontFamily: SANS,
  boxSizing: "border-box",
  width: "100%",
};

const shell: React.CSSProperties = {
  width: "100%",
  maxWidth: "1140px",
  background: SURFACE,
  border: `1px solid ${BORDER}`,
  borderRadius: "22px",
  display: "flex",
  flexWrap: "wrap",
  overflow: "hidden",
  boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
  boxSizing: "border-box",
};

const sidebar: React.CSSProperties = {
  flex: "1 1 320px",
  background: "linear-gradient(180deg, rgba(198,162,107,0.05), transparent 40%)",
  borderRight: `1px solid ${BORDER}`,
  padding: "34px 28px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
};

const content: React.CSSProperties = {
  flex: "2 1 520px",
  padding: "34px 28px",
  boxSizing: "border-box",
  maxHeight: "92vh",
  overflowY: "auto",
};

const eyebrow: React.CSSProperties = {
  color: GOLD,
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
};

const heroTitle: React.CSSProperties = {
  color: "#FFF",
  fontSize: "clamp(28px, 3vw, 38px)",
  fontFamily: SERIF,
  fontWeight: 600,
  marginTop: "10px",
  marginBottom: "14px",
  lineHeight: 1.2,
};

const heroSub: React.CSSProperties = {
  color: TEXT_MUTED,
  fontSize: "14px",
  lineHeight: 1.65,
  maxWidth: "34ch",
};

const sectionHint: React.CSSProperties = {
  color: TEXT_FAINT,
  fontSize: "12.5px",
  marginTop: "4px",
  marginBottom: "0",
};

const cardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "16px",
  marginTop: "18px",
};

const tabButtonStyle = (active: boolean): React.CSSProperties => ({
  background: active ? GOLD_SOFT : "transparent",
  color: active ? GOLD_BRIGHT : "#E5E5E7",
  border: `1px solid ${active ? GOLD : BORDER_SOFT}`,
  padding: "14px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
  fontFamily: SANS,
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: SURFACE_RAISED,
  border: `1px solid ${BORDER}`,
  borderRadius: "9px",
  padding: "12px 14px",
  color: "#FFFFFF",
  fontSize: "14px",
  outline: "none",
  fontFamily: SANS,
  transition: "border-color 0.2s ease",
};

const pillButton = (active: boolean): React.CSSProperties => ({
  background: active ? GOLD_SOFT : "transparent",
  color: active ? GOLD : TEXT_MUTED,
  border: `1px solid ${active ? GOLD : BORDER}`,
  padding: "11px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  fontWeight: 600,
  flex: "1 1 140px",
  boxSizing: "border-box",
  fontFamily: SANS,
});

const selectRow = (active: boolean): React.CSSProperties => ({
  border: `1px solid ${active ? GOLD : BORDER}`,
  background: active ? GOLD_SOFT : SURFACE_RAISED,
  borderRadius: "10px",
  padding: "14px 16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
});

const rowTitle = (active: boolean): React.CSSProperties => ({
  color: active ? GOLD_BRIGHT : "#FFF",
  fontSize: "14.5px",
  fontWeight: 600,
  lineHeight: 1.35,
});

const rowSub: React.CSSProperties = {
  color: TEXT_MUTED,
  fontSize: "12.5px",
  marginTop: "3px",
  lineHeight: 1.5,
};

const tourCardStyle = (selected: boolean): React.CSSProperties => ({
  border: `1px solid ${selected ? GOLD : BORDER}`,
  background: selected ? "rgba(198,162,107,0.045)" : SURFACE_RAISED,
  borderRadius: "14px",
  padding: "10px",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, background 0.2s ease",
});

const imageOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
};

const photoCountBadge: React.CSSProperties = {
  position: "absolute",
  top: "8px",
  left: "8px",
  background: "rgba(10,10,11,0.65)",
  backdropFilter: "blur(4px)",
  color: "#FFF",
  fontSize: "11px",
  padding: "4px 8px",
  borderRadius: "20px",
};

const viewGalleryHint: React.CSSProperties = {
  position: "absolute",
  bottom: "8px",
  right: "10px",
  color: "#FFF",
  fontSize: "11.5px",
  fontWeight: 600,
  letterSpacing: "0.02em",
};

const mapsButtonStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: `1px solid ${BORDER}`,
  borderRadius: "7px",
  padding: "8px 14px",
  color: GOLD,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: SANS,
};

const actionButtonStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: `linear-gradient(135deg, ${GOLD_BRIGHT}, ${GOLD})`,
  color: BG_DARK,
  border: "none",
  padding: "16px",
  borderRadius: "9px",
  cursor: "pointer",
  fontSize: "13.5px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginTop: "26px",
  fontFamily: SANS,
};

/* ---- Lightbox ---- */
const lightboxOverlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(6,6,7,0.92)",
  backdropFilter: "blur(6px)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  boxSizing: "border-box",
};

const lightboxTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  maxWidth: "900px",
  width: "100%",
  margin: "0 auto",
};

const closeButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: `1px solid ${BORDER}`,
  color: "#FFF",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "15px",
};

const lightboxImageWrap: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  maxWidth: "900px",
  width: "100%",
  margin: "16px auto",
};

const lightboxImage: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "62vh",
  objectFit: "contain",
  borderRadius: "12px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
};

const navArrow: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(20,20,22,0.7)",
  border: `1px solid ${BORDER}`,
  color: "#FFF",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const lightboxBottom: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: "8px",
};