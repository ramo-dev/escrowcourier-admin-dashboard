import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  preview: {
    port: 5000,
    host: true,
  },
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
server: {
  host: "0.0.0.0",
  port: 5173, 
  hmr: {
    protocol: "ws",
    host: "0.0.0.0", 
    port: 5173, 
    clientPort: 5173,
  },
  cors: true,
  watch: {
    usePolling: true,
  },
}});
