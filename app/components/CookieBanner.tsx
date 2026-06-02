"use client";

import React, { useEffect, useState } from "react";

type Consent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultConsent: Consent = {
  essential: true,
  analytics: false,
  marketing: false,
};

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const [consent, setConsent] = useState<Consent>(defaultConsent);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("cookie-consent");
    if (!saved) {
      setVisible(true);
    }
  }, []);

  if (!mounted || !visible) return null;

  const saveConsent = (newConsent: Consent) => {
    localStorage.setItem("cookie-consent", JSON.stringify(newConsent));
    setVisible(false);

    // 🔥 burada ileride analytics/pixel kontrolü bağlanır
    console.log("CONSENT SAVED:", newConsent);
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        
        <h2 style={{ color: "#fff", marginBottom: "10px" }}>
          Cookie Preferences
        </h2>

        <p style={{ color: "#A1A1AA", fontSize: "13px", lineHeight: 1.5 }}>
          We use cookies to improve your experience. You can choose which cookies you allow.
        </p>

        {/* OPTIONS */}
        <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>

          <label style={row}>
            <input type="checkbox" checked disabled />
            <span>Essential (required)</span>
          </label>

          <label style={row}>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) =>
                setConsent({ ...consent, analytics: e.target.checked })
              }
            />
            <span>Analytics cookies</span>
          </label>

          <label style={row}>
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) =>
                setConsent({ ...consent, marketing: e.target.checked })
              }
            />
            <span>Marketing cookies</span>
          </label>
        </div>

        {/* BUTTONS */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          
          <button
            onClick={() => saveConsent({
              essential: true,
              analytics: true,
              marketing: true
            })}
            style={acceptBtn}
          >
            Accept All
          </button>

          <button
            onClick={() => saveConsent({
              essential: true,
              analytics: false,
              marketing: false
            })}
            style={rejectBtn}
          >
            Reject Non-Essential
          </button>

          <button
            onClick={() => saveConsent(consent)}
            style={saveBtn}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999999,
};

const modal: React.CSSProperties = {
  width: "92%",
  maxWidth: "420px",
  background: "#0B0F14",
  border: "1px solid #27272A",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
};

const row: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  color: "#E5E7EB",
  fontSize: "14px",
};

const acceptBtn: React.CSSProperties = {
  flex: 1,
  background: "#C6A26B",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

const rejectBtn: React.CSSProperties = {
  flex: 1,
  background: "transparent",
  border: "1px solid #444",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
};

const saveBtn: React.CSSProperties = {
  flex: 1,
  background: "#1F2937",
  border: "1px solid #374151",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
};