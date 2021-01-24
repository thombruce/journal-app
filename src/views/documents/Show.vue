<template lang="pug">
div
  VContainer
    div {{ document.content }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('documents', {
      find: 'find'
    }),
    document () {
      return this.find(this.$route.params.id)
    }
  },

  created () {
    this.show(this.$route.params.id)
  },

  methods: {
    ...mapActions('documents', [
      'show'
    ])
  }
}
</script>
