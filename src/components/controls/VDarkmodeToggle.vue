<template lang="pug">
v-btn(@click="toggleDarkMode()" icon)
  v-icon(v-if="system") mdi-theme-light-dark
  v-icon(v-else-if="$vuetify.theme.dark") mdi-weather-night
  v-icon(v-else) mdi-weather-sunny
</template>

<script>
export default {
  data () {
    return {
      system: true
    }
  },

  mounted () {
    this.initDarkMode()
  },

  methods: {
    initDarkMode () {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      darkMediaQuery.addEventListener('change', (e) => {
        if (this.system) {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        }
      })

      if (darkMediaQuery.matches) {
        this.$vuetify.theme.dark = true
      }
    },

    toggleDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.system = false
    }
  }
}
</script>
