import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add your custom font here
        founders: ['"Test Founders Grotesk"', "sans-serif"],
      },
      colors: {
        customBlue: "#3957D7",
        customText: "#667185",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'custom-hover': '-2px 4px 4px 0px #3957D71F, -2px 8px 66px 6px #3957D71A',
      },
    },
    
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

