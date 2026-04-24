/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lüks Altın ve Siyah Paleti
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F4DF4E",
          dark: "#AA8A2E",
        },
        premium: {
          black: "#050505",
          gray: "#1A1A1A",
          beige: "#F5F5DC",

          
        }
      },
    },
  },
  plugins: [],
};