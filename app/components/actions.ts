"use server";

import { Resend } from "resend";

export type BookingFormData = {
  client_name: string;
  client_email: string;
  category: string;
  selected_item: string;
  price: string;
  date: string;
  time?: string;
  pickup_location?: string;
  dropoff_location?: string;
  passengers?: string;
};

// Öncelikle .env dosyasındaki anahtarı kontrol et, yoksa doğrudan verdiğin anahtarı kullan (Yedekli Yapı)
const resendApiKey = process.env.RESEND_API_KEY || "re_VwsYN1Fj_6kKMXaSHFv3dnGRFeuvkV6gw";

if (!resendApiKey) {
  throw new Error(
    "Missing RESEND_API_KEY. Please add it to your environment variables or fallback configuration."
  );
}

const resend = new Resend(resendApiKey);

export async function sendBookingEmail(formData: BookingFormData) {
  try {
    const {
      client_name,
      client_email,
      category,
      selected_item,
      price,
      date,
      time,
      pickup_location,
      dropoff_location,
      passengers,
    } = formData;

    // Basit email kontrolü
    if (!client_email || !client_email.includes("@")) {
      return {
        success: false,
        error: "Invalid email address.",
      };
    }

    // =================================================================
    // 1. CUSTOMER EMAIL (Müşteriye Gidecek Sessiz Lüks İngilizce Onay)
    // =================================================================
    await resend.emails.send({
      from: "Luxury Taxi Limo <onboarding@resend.dev>",
      to: client_email,
      subject: "Reservation Request Received — Luxury Taxi Limo",
      html: `
        <div style="
          font-family: Georgia, serif;
          padding: 30px;
          background-color: #09090B;
          color: #FFFFFF;
          max-width: 600px;
          border: 1px solid #222226;
          border-radius: 12px;
          box-sizing: border-box;
        ">
          <h2 style="
            color: #C5A880;
            font-weight: normal;
            border-bottom: 1px solid #222226;
            padding-bottom: 15px;
            margin-top: 0;
          ">
            Luxury Taxi Limo
          </h2>

          <p style="font-size: 15px; line-height: 1.6; color: #E4E4E7;">Dear ${client_name},</p>

          <p style="font-size: 15px; line-height: 1.6; color: #E4E4E7;">
            Thank you for choosing Luxury Taxi Limo.
            We have successfully received your private booking request.
          </p>

          <div style="
            background-color: #141416;
            padding: 20px;
            border-radius: 8px;
            margin: 24px 0;
            border: 1px solid #222226;
          ">
            <h4 style="
              color: #C5A880;
              margin-top: 0;
              margin-bottom: 16px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              font-size: 14px;
            ">
              Reservation Summary
            </h4>

            <p style="margin: 8px 0; font-size: 14px; color: #E4E4E7;">
              <strong style="color: #A1A1AA;">Service:</strong> 
              ${category} (${selected_item})
            </p>

            <p style="margin: 8px 0; font-size: 14px; color: #E4E4E7;">
              <strong style="color: #A1A1AA;">Date / Time:</strong> 
              ${date}${time ? ` at ${time}` : ""}
            </p>

            ${pickup_location ? `
              <p style="margin: 8px 0; font-size: 14px; color: #E4E4E7;">
                <strong style="color: #A1A1AA;">Pickup:</strong> 
                ${pickup_location}
              </p>
            ` : ""}

            ${dropoff_location && dropoff_location !== "N/A" ? `
              <p style="margin: 8px 0; font-size: 14px; color: #E4E4E7;">
                <strong style="color: #A1A1AA;">Drop-off:</strong> 
                ${dropoff_location}
              </p>
            ` : ""}

            ${passengers ? `
              <p style="margin: 8px 0; font-size: 14px; color: #E4E4E7;">
                <strong style="color: #A1A1AA;">Passengers:</strong> 
                ${passengers}
              </p>
            ` : ""}

            <p style="margin: 16px 0 0 0; font-size: 15px; color: #C5A880; border-top: 1px solid #222226; padding-top: 12px;">
              <strong>Estimated Value:</strong> 
              ${price}
            </p>
          </div>

          <p style="
            color: #71717A;
            font-size: 13px;
            line-height: 1.5;
            margin-bottom: 0;
          ">
            Our concierge team is currently verifying availability for your requested schedule. We will reach out to you shortly.
          </p>

          <hr style="
            border: none;
            border-top: 1px solid #222226;
            margin: 24px 0;
          " />

          <p style="
            font-size: 11px;
            color: #71717A;
            margin: 0;
          ">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      `,
    });

    // =================================================================
    // 2. ADMIN EMAIL (Size Gelen Detaylı Türkçe/İngilizce Bildirim)
    // =================================================================
    await resend.emails.send({
      from: "System <onboarding@resend.dev>",
      to: "uyarhakki450@gmail.com", // BURAYI KENDİ ŞİRKET E-POSTANIZLA DEĞİŞTİRİN
      subject: `🚨 NEW BOOKING: ${client_name} - ${category}`,
      html: `
        <div style="
          font-family: Arial, sans-serif;
          padding: 25px;
          color: #333333;
          background-color: #FAFAFA;
          max-width: 600px;
          border: 1px solid #E4E4E7;
          border-radius: 8px;
        ">
          <h2 style="color: #09090B; margin-top: 0; border-bottom: 2px solid #E4E4E7; padding-bottom: 10px;">
            New Reservation Request Received
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A; width: 35%;">Customer:</td>
              <td style="padding: 8px 0; color: #09090B;">${client_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Email:</td>
              <td style="padding: 8px 0; color: #09090B;"><a href="mailto:${client_email}">${client_email}</a></td>
            </tr>
          </table>

          <h3 style="color: #C5A880; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #E4E4E7; padding-bottom: 5px;">
            Booking Details
          </h3>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A; width: 35%;">Category:</td>
              <td style="padding: 8px 0; color: #09090B; font-weight: bold;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Item/Vehicle:</td>
              <td style="padding: 8px 0; color: #09090B;">${selected_item}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Price:</td>
              <td style="padding: 8px 0; color: #16A34A; font-weight: bold;">${price}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Date:</td>
              <td style="padding: 8px 0; color: #09090B;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Time:</td>
              <td style="padding: 8px 0; color: #09090B;">${time || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Pickup:</td>
              <td style="padding: 8px 0; color: #09090B;">${pickup_location || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Dropoff:</td>
              <td style="padding: 8px 0; color: #09090B;">${dropoff_location || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717A;">Passengers:</td>
              <td style="padding: 8px 0; color: #09090B;">${passengers || "1"}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #E4E4E7; text-align: center; font-size: 12px; color: #A1A1AA;">
            Sent from Luxury Taxi Limo Web Platform
          </div>
        </div>
      `,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("sendBookingEmail error:", error);

    return {
      success: false,
      error: "Email could not be sent.",
    };
  }
}