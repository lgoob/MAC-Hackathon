// tailwind.config.js
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {

        'hero': "url('./pictures/Cafe (Night).jpg')",
        'whiteboards': "url('./pictures/whiteboardsbackground.png')",
        'whiteboard': "url('./pictures/Whiteboard_Background.jpg')",

      },
    },
  },
  variants: {},
  plugins: [],
};
