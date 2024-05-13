import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
        'neon-gradient': 'linear-gradient(90deg, #ae53ba, #2a8af6 100%)',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      fontSize: {
        xxs: '8px',
      },
      colors: {
        neonPurple: '#ae53ba',
        neonBlue: '#2a8af6'
      }
    },
  },
  plugins: [],
};
export default config;
