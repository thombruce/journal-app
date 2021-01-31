<template lang="pug">
RouterView(v-if="$route.params.id")
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('account', [
      'user'
    ])
  },

  methods: {
    ...mapActions('documents', [
      'index',
      'clear'
    ])
  },

  watch: {
    user () {
      if (this.user) {
        this.index()
      } else {
        this.clear()
      }
    }
  },

  created () {
    this.index()
  }
}
</script>
