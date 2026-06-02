"use client";
import React from "react";
import { motion } from "framer-motion";

const places = [
  { name: "Amsterdam Canals", image: "/amsterdam.jpg" },
  { name: "Keukenhof Gardens", image: "/keukenhof.jpg" },
  { name: "Giethoorn Village", image: "/giethoorn.jpg" },
  { name: "Zaanse Schans", image: "/zaanse.jpg" },
  { name: "Giethoorn Village", image: "/giethoorn2.jpg"  },
];

export default function TouristSlider() {
  return (
    <div className="w-full py-12 overflow-hidden bg-[#F7F3E9]">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#2D2926]">Explore The Netherlands</h2>
      <motion.div 
        className="flex gap-6 cursor-grab"
        drag="x"
        dragConstraints={{ right: 0, left: -1000 }} // İçeriğin genişliğine göre ayarlanmalı
      >
        {places.map((place, index) => (
          <div key={index} className="min-w-[300px] h-[400px] relative rounded-2xl overflow-hidden shadow-xl">
            <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
              <h3 className="text-white text-xl font-semibold">{place.name}</h3>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}