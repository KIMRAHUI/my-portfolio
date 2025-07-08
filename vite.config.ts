import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/set-availability': {
        target: 'http://localhost:10000',
        changeOrigin: true,
        secure: false,
      },
      '/missed-message': {
        target: 'http://localhost:10000',
        changeOrigin: true,
      },
      '/save-interviewer': {            // ✅ 이 부분 추가
        target: 'http://localhost:10000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:10000',
        ws: true,
      },
    },
  },
});
