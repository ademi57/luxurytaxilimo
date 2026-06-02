"use client";
import React, { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieBanner() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <CookieConsent
      location="none"
      buttonText="Accept All"
      declineButtonText="Reject"
      enableDeclineButton={true} // Reddet butonu eklendi
      cookieName="luxuryTaxiLimoCookie"
      onDecline={() => {
        // Burada reddetme durumunda çerezleri engelleyecek bir fonksiyon çalıştırabilirsiniz
        console.log("Cookies declined");
      }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: "450px",
        background: "#F7F3E9",
        color: "#2D2926",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        border: "1px solid #D4AF37",
        zIndex: "999999",
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
      }}
      buttonStyle={{
        background: "#D4AF37",
        color: "#16120C",
        fontSize: "14px",
        borderRadius: "6px",
        padding: "10px 25px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#2D2926",
        fontSize: "14px",
        textDecoration: "underline",
        cursor: "pointer",
        marginTop: "10px"
      }}
      expires={150}
    >
      <h3 style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "bold" }}>Cookie Preferences</h3>
      <p style={{ fontSize: "14px", marginBottom: "15px", lineHeight: "1.5" }}>
        In accordance with Dutch law (AVG/GDPR), we use cookies to provide a secure and personalized experience. 
        These include essential functional cookies, analytics for site improvement, and marketing cookies. 
        You can choose to accept or reject non-essential cookies.
      </p>
    </CookieConsent>
  );
}