import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../src/lib'),
      '@svg': resolve(__dirname, '../../src/lib/svg'),
      '@model': resolve(__dirname, '../../src/lib/models'),
      '@enum': resolve(__dirname, '../../src/lib/enums'),
    }
  },
  server: {
    port: 3001,
    open: true
  }
});
