<template lang="pug">
  div
    component(:is="layout")
      router-view
</template>

<script>
import EditorLayout from './views/layouts/Editor.vue'

const defaultLayout = 'editor'

export default {
  name: 'App',
  components: {
    EditorLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>
