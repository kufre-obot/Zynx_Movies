import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/zynx-movies/',
  server: {
    port: 5173,
    open: true,
  },
});
