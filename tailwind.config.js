/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

const colors = {
  blue: "#2882ef",
  lightblue: "#2882ef",
  violet: "#8524c3",
  rosa: "#f02888",
  yellow: "#f9c32a",
  orange: "#f97449",
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
      colors: {
        red: {
          dark: "#c1272d",
          light: "#fcebe8",
          letter: "#d2567b",
          DEFAULT: "#c1272d",
        },
        // secondary: {
        //   dark: "#3e858c",
        //   DEFAULT: "#3e858c",
        // },
        secondary: {
          DEFAULT: colors.accents[5],
          dark: colors.accents[7],
          light: colors.accents[3],
          lighter: colors.accents[2],
        },
      },
      fontFamily: {
        merienda: ["var(--font-merienda)", "cursive"],
        gandhi: ["var(--font-gandhi-serif)", "var(--font-roboto-serif)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
