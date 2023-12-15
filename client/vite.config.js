import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "../config/config.js";
const { PORT = config.port } = process.env;
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://${config.baseURL}:${PORT}`,
        changeOrigin: true,
      },
      "/auth": {
        target: `http://${config.baseURL}:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../dist/app",
  },
});
