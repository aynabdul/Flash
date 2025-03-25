/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        gold: '#FFD700',
        blue: '#00A2E8',
        navy: '#000052',
        black: '#000000',
      },
    },
  },
  plugins: [],
}


