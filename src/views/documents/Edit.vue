<template lang="pug">
div
  VContainer
    h2 Edit Document

    DocumentForm(v-if="document" :document="document" :submit="update")

    RouterLink(:to="{ name: 'Documents' }") Back
</template>

<script>
import DocumentForm from './_form.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DocumentForm
  },

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
      'show',
      'update'
    ])
  }
}
</script>
