<template lang="pug">
RouterView(v-if="$route.params.id")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('documents', [
      'index'
    ])
  },

  created () {
    this.index()
  }
}
</script>
