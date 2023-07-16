// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': resolve(__dirname, '/src'),
    },
  },
})