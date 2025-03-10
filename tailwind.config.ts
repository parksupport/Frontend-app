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
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
      },
     fontSize: {
        'responsive-base': 'clamp(1rem, 2vw + 0.5rem, 2rem)', // Example values for base text
        'responsive-lg': 'clamp(1.75rem, 1.2vw + 1rem, 3.125rem)', // Example values for larger text
        'clamp-xl': 'clamp(1.5rem, 5vw, 4.5rem)',
        'clamp-md': 'clamp(1rem, 2.5vw, 1.5rem)',


      },
      fontFamily: {
        // Add your custom font here
        founders: ['"Test Founders Grotesk"', "sans-serif"],
      },
      lineHeight: {
        '90px': '90px',
        '44px': '44px',
        '18px': '18px',
        '84px': '84px',
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
      spacing: {
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
        '40': '10rem',    // 160px
        '48': '12rem',    // 192px
        '56': '14rem',    // 224px
        '64': '16rem',    // 256px
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

