import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // methode secret hahaah pour cachée l'api on utilisée un proxy qui vas rediriger les requete "/api" vers l'api real sans que l'utilisateurs ou les personne mal intentionner puisse voir l'api real
      "/api": {
        target: "http://localhost:3310",
        changeOrigin: true,
      },
    },
  },
});
