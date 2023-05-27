/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type Config } from "tailwindcss";
import tailwindColors from "tailwindcss/colors";

//Silences warnings
// @ts-ignore
delete tailwindColors["lightBlue"];
// @ts-ignore
delete tailwindColors["warmGray"];
// @ts-ignore
delete tailwindColors["trueGray"];
// @ts-ignore
delete tailwindColors["coolGray"];
// @ts-ignore
delete tailwindColors["blueGray"];

const colors = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
  background: "var(--background)",
  foreground: "var(--foreground)",
  success: "var(--success)",
  destructive: "var(--destructive)",
  "destructive-foreground": "var(--destructive-foreground)",
  "accent-1": "var(--accent-1)",
  "accent-2": "var(--accent-2)",
  "accent-3": "var(--accent-3)",
  "accent-1-foreground": "var(--accent-1-foreground)",
  "accent-2-foreground": "var(--accent-2-foreground)",
  "accent-3-foreground": "var(--accent-3-foreground)",
  ...tailwindColors,
};

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors,
  },
  plugins: [],
} satisfies Config;
