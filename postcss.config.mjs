const config = {
  plugins: ["@tailwindcss/postcss"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["var(--font-archivo)"], // use variable
      },
    },
  },
};

export default config;
