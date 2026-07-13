// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 5175,
//     https: false, // Keep false if you're using reverse proxy with HTTPS outside
//     hmr: {
//       protocol: 'wss',
//       host: 'gproducts.thefederal.com',
//       port: 443,
//     },
//     proxy: {
//       '/api': {
//         target: 'https://gproducts.thefederal.com',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });





import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5175,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});



