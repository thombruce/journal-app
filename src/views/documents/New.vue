<template lang="pug">
div
  VContainer
    h2 New Document

    DocumentForm(v-if="document" :document="document" :submit="create")

    RouterLink(:to="{ name: 'Documents' }") Back
</template>

<script>
import DocumentForm from './_form.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    DocumentForm
  },

  data () {
    return {
      document: null
    }
  },

  async created () {
    this.document = await this.new()
  },

  methods: {
    ...mapActions('documents', [
      'new',
      'create'
    ])
  }
}
</script>
