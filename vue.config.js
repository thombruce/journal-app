module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Journal',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      exclude: [
        '_redirects'
      ]
    }
  }
}
