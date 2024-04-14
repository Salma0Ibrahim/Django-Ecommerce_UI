import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default defineConfig(({ mode }) => {
  const { VITE_base_url } = process.env; // Access environment variables

  return {
    plugins: [react()],
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },
    define: {
      'process.env.VITE_base_url': JSON.stringify(VITE_base_url), // Define the environment variable
    },
  };
});
