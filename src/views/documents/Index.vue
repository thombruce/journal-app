<template lang="pug">
RouterView(v-if="$route.params.id")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('documents', [
      'index',
      'clear'
    ])
  },

  watch: {
    '$user.authenticated' () {
      if (this.$user.authenticated) {
        this.index()
      } else {
        this.clear()
      }
    }
  }
}
</script>
