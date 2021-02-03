<template lang="pug">
RouterView(v-if="$route.params.id")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('account', [
      'authenticated'
    ])
  },

  methods: {
    ...mapActions('documents', [
      'index',
      'clear'
    ])
  },

  watch: {
    authenticated () {
      if (this.authenticated) {
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
