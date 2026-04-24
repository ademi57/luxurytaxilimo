"use client";

import React from "react";
import Link from "next/link";
import BookingForm from "../components/BookingForm"; 

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <nav className="fixed top-0 w-full p-6 bg-black/50 backdrop-blur-md">
        <Link href="/" className="text-[#D4AF37] font-bold">← BACK TO HOME</Link>
      </nav>
      <div className="container mx-auto px-4">
        <BookingForm />
      </div>
    </main>
  );
}