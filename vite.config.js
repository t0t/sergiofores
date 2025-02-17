import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    pugPlugin({
      localImports: true
    })
  ],
  assetsInclude: ['**/*.pug', '**/*.mp4', '**/*.svg'],
  base: './',
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./sass/variables.scss";`
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dev: resolve(__dirname, 'dev.html'),
        lab: resolve(__dirname, 'lab.html'),
        obra: resolve(__dirname, 'obra.html'),
        vision: resolve(__dirname, 'vision.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `media/[name][extname]`;
          }
          if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
            return `images/[name][extname]`;
          }
          if (ext === 'css') {
            return `css/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    manifest: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@js': resolve(__dirname, './js'),
      '@assets': resolve(__dirname, './assets')
    }
  },
  server: {
    open: true,
    host: true
  },
  preview: {
    port: 4173
  }
})
