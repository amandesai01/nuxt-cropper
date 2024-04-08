import type { Config } from "tailwindcss";

export default {
  content: ["./**/*.vue"],
  plugins: [require("daisyui")],
} satisfies Config;
