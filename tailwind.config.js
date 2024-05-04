// tailwind.config.js
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {     
      backgroundImage: {
        'hero': "url('./pictures/Cafe (Night).jpg')",
      },
    },
  },
  variants: {},
  plugins: [],
};
