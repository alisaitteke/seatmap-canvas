import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../src/lib'),
      '@svg': resolve(__dirname, '../../src/lib/svg'),
      '@model': resolve(__dirname, '../../src/lib/models'),
      '@enum': resolve(__dirname, '../../src/lib/enums'),
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
