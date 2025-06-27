export default {
  root: 'src',
  base: './', // Rutas relativas para file:// protocolo
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true, // Habilitar source maps en producción
    rollupOptions: {
      output: {
        sourcemap: true
      }
    }
  },
  server: {
    open: true
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehavior: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    devSourcemap: true // Habilitar source maps CSS en desarrollo
  },
  publicDir: '../public'
}
