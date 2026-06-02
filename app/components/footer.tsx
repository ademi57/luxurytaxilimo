"use client";

import { useLocale } from 'next-intl';
import { Link } from '../../i18n/routing';
import { 
  FaInstagram, 
  FaFacebook, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope,
  FaGoogle 
} from "react-icons/fa";

export default function Footer() {
  const locale = useLocale();

  return (
    <footer style={{ background: "#F7F3E9", borderTop: "1px solid rgba(212,175,55,0.2)", padding: "64px 40px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px", marginBottom: "64px" }}>
          
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div className="font-display" style={{ fontSize: "34px", fontWeight: 300, color: "#2D2926", fontStyle: "italic", letterSpacing: "0.08em" }}>Luxury</div>
              <div style={{ fontSize: "11px", letterSpacing: "0.45em", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase" }}>TAXI · LIMO</div>
            </div>
            <p style={{ fontSize: "14px", color: "#5A544D", lineHeight: 1.9, maxWidth: "220px" }}>
              The premier choice for discerning clients who demand excellence in every detail.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "12px", letterSpacing: "0.3em", fontWeight: 700, textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>Services</h4>
            {["Airport Transfer", "Corporate Travel", "Special Events", "City Tours"].map(s => (
              <div key={s} style={{ fontSize: "14px", color: "#2D2926", marginBottom: "10px", letterSpacing: "0.05em", cursor: "pointer" }}>{s}</div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: "12px", letterSpacing: "0.3em", fontWeight: 700, textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>Legal</h4>
            <Link href="/colofon" style={{ display: "block", fontSize: "14px", color: "#2D2926", marginBottom: "10px", letterSpacing: "0.05em", textDecoration: "none" }}>Colofon</Link>
            <Link href="/privacy" style={{ display: "block", fontSize: "14px", color: "#2D2926", marginBottom: "10px", letterSpacing: "0.05em", textDecoration: "none" }}>Privacyverklaring</Link>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "12px", letterSpacing: "0.3em", fontWeight: 700, textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: FaPhone, text: "+31638352022" },
                { icon: FaEnvelope, text: "info@luxurytaxilimo.com" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <c.icon style={{ color: "#D4AF37", fontSize: "15px" }} />
                  <span style={{ fontSize: "14px", color: "#2D2926", letterSpacing: "0.05em" }}>{c.text}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                
                <a href="https://www.instagram.com/luxurytaxilimo" target="_blank" rel="noopener noreferrer">
                  <FaInstagram style={{ color: "#A07820", fontSize: "22px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"} onMouseLeave={e => e.currentTarget.style.color = "#A07820"} />
                </a>

                <a href="https://share.google/SAqkTcGVyvkVpbky4" target="_blank" rel="noopener noreferrer">
                  <FaGoogle style={{ color: "#A07820", fontSize: "22px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"} onMouseLeave={e => e.currentTarget.style.color = "#A07820"} />
                </a>

                <FaFacebook style={{ color: "#A07820", fontSize: "22px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"} onMouseLeave={e => e.currentTarget.style.color = "#A07820"} />
                <FaLinkedin style={{ color: "#A07820", fontSize: "22px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"} onMouseLeave={e => e.currentTarget.style.color = "#A07820"} />
                
              </div>
            </div>
          </div>
        </div>

        <hr style={{ marginBottom: "32px", border: "0", borderTop: "1px solid rgba(212,175,55,0.3)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontSize: "12px", letterSpacing: "0.3em", color: "#5A544D", textTransform: "uppercase" }}>
            © 2026 Luxury Taxi Limo · All Rights Reserved 
          </p>
          <a 
           href="https://www.aonsi.de" 
           target="_blank" 
           rel="noopener noreferrer" 
           style={{ 
             fontSize: "12px", 
             letterSpacing: "0.2em", 
             color: "#D4AF37", 
             textTransform: "uppercase",
             textDecoration: "none",
             cursor: "pointer"
           }}
           onMouseOver={(e) => e.currentTarget.style.opacity = "0.7"}
           onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
          >
            Design by Aonsi Digital
          </a>
          <p style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#D4AF37", textTransform: "uppercase" }}>
            Champagne & Gold Edition
          </p>
        </div>
      </div>
    </footer>
  );
}