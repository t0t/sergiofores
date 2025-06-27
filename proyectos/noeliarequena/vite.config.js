export default {
  root: 'src',
  base: '/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    sourcemap: true, // Habilitar source maps en producción

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
