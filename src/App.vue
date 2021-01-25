<template lang="pug">
  div
    component(:is="layout")
      router-view
</template>

<script>
import ApplicationLayout from './views/layouts/Application.vue'
import AuthenticationLayout from './views/layouts/Authentication.vue'

const defaultLayout = 'authentication'

export default {
  name: 'App',
  components: {
    ApplicationLayout,
    AuthenticationLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>
