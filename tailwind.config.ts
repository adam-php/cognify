import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      button: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
      },
      toolbar: {
        background: "bg-gray-100",
      },
      button: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
      },
      toolbar: {
        background: "bg-gray-100",
      },
      whiteboard: {
        canvas: "border border-gray-300",
        toolButton: "bg-white text-black hover:bg-gray-200",
      },
      button: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
      },
      toolbar: {
        background: "bg-gray-100",
      },
      whiteboard: {
        canvas: "border border-gray-300",
        toolButton: "bg-white text-black hover:bg-gray-200",
      },
    },
  },
  plugins: [],
} satisfies Config;