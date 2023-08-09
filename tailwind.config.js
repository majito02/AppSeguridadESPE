/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-primary": "#ffffff",
        "color-primary-light": "#020726",
        "color-primary-dark": "#240047",
        "color-secondary": "#8652ff",
        "color-gray": "#333",
        "color-gray-light": "#240047",
        "color-white": "#fff",
        "color-blob": "#A427DF",
        "color-blob-light": "#240047",
        'regal-blue': '#240047',
      }
    },
    fontFamily: {
      "geologica": ["Geologica", "sans-serif"],
      "outfit": ["Outfit", "sans-serif"],
      "poppins": ["Poppins", "sans-serif"],
      "sans-normal": ["Inter", "sans-serif"],
      // serif: ["Inter", "sans-serif"],
      // mono: ["Inter", "sans-serif"],
      // poppins: ['Poppins', 'sans-serif']
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
      }
    }
  },

  plugins: []
};
