module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Repo.vue',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      exclude: [
        '_redirects'
      ]
    }
  }
}
