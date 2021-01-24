<template lang="pug">
v-btn(@click="toggleDarkMode()" icon)
  v-icon(v-if="$vuetify.theme.dark") mdi-weather-sunny
  v-icon(v-else) mdi-weather-night
</template>

<script>
export default {
  data () {
    return {
      toggled: false
    }
  },

  mounted () {
    this.initDarkMode()
  },

  methods: {
    initDarkMode () {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      darkMediaQuery.addEventListener('change', (e) => {
        if (!this.toggled) {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        }
      })

      if (darkMediaQuery.matches) {
        this.$vuetify.theme.dark = true
      }
    },

    toggleDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.toggled = true
    }
  }
}
</script>
