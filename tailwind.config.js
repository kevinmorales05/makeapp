/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

const colors = {
  primary: {
    red: "#c1272d",
    indigo: "#333d8d",
    black: "#000000",
    white: "#ffffff",
    DEFAULT: "#c1272d",
  },
  secondary: {
    teal: "#3e858c",
    azure: "#8fc5d6",
    crimson: "#da5054",
    DEFAULT: "#da5054",
  },
  // to color products
  brown: {
    500: "#bfa094",
  },
  cherry: {
    500: "#500",
  },
  cream: {
    500: "#dac0a7",
  },
  dusk: {
    purple: {
      500: "#bfa094",
    },
  },
  fuchsia: {
    500: "#E500FF",
  },
  glint: {
    pink: {
      500: "#E5679B",
    },
  },
  gold: {
    500: "#FFD500",
  },
  maple: {
    red: {
      500: "#bf514e",
    },
  },
  dusk: {
    purple: {
      500: "#C73D3D",
    },
  },
  olive: {
    500: "#75773C",
  },
  pumpkin: {
    500: "#FF7518",
  },
  silver: {
    500: "#c0c0c0",
  },
  

  red: {
    dark: "#c1272d",
    light: "#fcebe8",
    letter: "#d2567b",
    DEFAULT: "#c1272d",
  },
  rosa: "#f02888",
  accents: {
    0: "#fff",
    1: "#fafafa",
    2: "#eaeaea",
    3: "#999",
    4: "#888",
    5: "#666",
    6: "#444",
    7: "#333",
    8: "#111",
    9: "#000",
  },

  success: {
    DEFAULT: "#0070f3",
    dark: "#0761d1",
    light: "#3291ff",
    lighter: "#d3e5ff",
  },
  error: {
    DEFAULT: "#e00",
    dark: "#c50000",
    light: "#ff1a1a",
    lighter: "#f7d4d6",
  },
  warning: {
    DEFAULT: "#f5a623",
    dark: "#ab570a",
    light: "#f7b955",
    lighter: "#ffefcf",
  },
  violet: {
    DEFAULT: "#7928ca",
    dark: "#4c2889",
    light: "#8a63d2",
    lighter: "#e3d7fc",
  },
  cyan: {
    DEFAULT: "#50e3c2",
    dark: "#29bc9b",
    light: "#79ffe1",
    lighter: "#aaffec",
  },
  highlight: {
    purple: "#f81ce5",
    magenta: "#eb367f",
    pink: "#ff0080",
    yellow: "#fff500",
  },
  foreground: "#000",
  background: "#fff",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: { ...colors },
      fontFamily: {
        merienda: ["var(--font-merienda)", "cursive"],
        gandhi: ["var(--font-gandhi-serif)", "var(--font-roboto-serif)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
