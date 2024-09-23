import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import imageminSVGO from 'imagemin-svgo';

export default defineConfig({
  publicDir: 'public',
  base: '/',
  server: {
    host: 'localhost',
    port: 3000,
    open: false,
  },
  plugins: [
    react(),
    svgr(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngquant(),
        svg: imageminSVGO(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
        },
      },
    }),
    visualizer({ open: false }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-router-dom': ['react-router-dom'],
        },
      },
    },
  },
});
