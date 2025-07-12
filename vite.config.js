import { defineConfig } from 'vite';

export default defineConfig({
  // Directorio de desarrollo
  root: '.',
  
  // Build configuration
  build: {
    // Output directory for static deployment
    outDir: 'docs',
    
    // Clean output directory before build
    emptyOutDir: true,
    
    // Generate source maps for debugging
    sourcemap: true,
    
    // Assets optimization
    assetsDir: 'assets',
    
    // Rollup options for advanced configuration
    rollupOptions: {
      output: {
        // Asset naming for better caching
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  
  // Server configuration for development
  server: {
    port: 8001,
    open: true,
    host: true,
  },
  
  // Preview server (for testing build)
  preview: {
    port: 8002,
    open: true,
  },
  
  // Asset handling
  assetsInclude: ['**/*.webm', '**/*.mp4'],
  
  // Public base path for GitHub Pages
  base: './',
});