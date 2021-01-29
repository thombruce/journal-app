<template lang="pug">
VContainer.pa-0(fluid fill-height)
  VEditor
</template>

<script>
import VEditor from '@/components/VEditor'

import { mapActions } from 'vuex'

export default {
  components: {
    VEditor
  },

  mounted () {
    this.show(this.$route.params.id)
    this.initializeEditor()
  },

  watch: {
    '$route.params.id' (id) {
      this.teardownEditor()
      this.show(id)
      this.initializeEditor()
    }
  },

  beforeDestroy () {
    this.teardownEditor()
  },

  methods: {
    ...mapActions('documents', [
      'show'
    ]),
    ...mapActions('editor', [
      'initializeEditor',
      'teardownEditor'
    ])
  }
}
</script>
