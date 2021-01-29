<template lang="pug">
  div
    component(:is="layout")
      router-view
</template>

<script>
import EditorLayout from './views/layouts/Editor.vue'
import AuthenticationLayout from './views/layouts/Authentication.vue'

const defaultLayout = 'authentication'

export default {
  name: 'App',
  components: {
    EditorLayout,
    AuthenticationLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>
