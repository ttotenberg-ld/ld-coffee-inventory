import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ld-coffee-inventory/', // GitHub Pages repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
