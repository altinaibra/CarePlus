/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        borderSpin: {
          "0%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
          "100%": { transform: "rotate(-2deg)" },
        },
        borderSpinReverse: {
          "0%": { transform: "rotate(2deg)" },
          "50%": { transform: "rotate(-2deg)" },
          "100%": { transform: "rotate(2deg)" },
        },
        underlineSlide: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        underlineSlideReverse: {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        borderSpinSlow: "borderSpin 3s ease-in-out infinite",
        borderSpinSlower: "borderSpin 4s ease-in-out infinite",
        borderSpinReverse: "borderSpinReverse 3.5s ease-in-out infinite",
        underlineSlide: "underlineSlide 1.2s linear infinite",
        underlineSlideSlow: "underlineSlide 1.8s linear infinite",
        underlineSlideReverse: "underlineSlideReverse 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};
