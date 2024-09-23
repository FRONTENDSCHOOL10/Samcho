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
          // 주요 React 관련 라이브러리
          react: ['react', 'react-dom'],
          'react-router-dom': ['react-router-dom'],

          // UI 관련 라이브러리
          'ui-libs': ['react-hot-toast', 'react-icons', 'react-spinners'],

          // 유틸리티 라이브러리
          utils: ['lodash', 'query-string', 'date-fns'],

          // 이미지 처리 관련
          'image-processing': ['browser-image-compression'],

          // 기타 라이브러리
          misc: ['pocketbase', 'react-helmet-async'],

          components: [
            './src/components/common/DiaryDetail.jsx',
            './src/pages/diary/DetailDiary.jsx',
          ],
        },
      },
    },
  },
});
