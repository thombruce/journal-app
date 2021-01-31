<template lang="pug">
VContainer.pa-0(fluid fill-height)
  VEditor
</template>

<script>
import VEditor from '@/components/VEditor'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    VEditor
  },

  computed: {
    ...mapState('editor', [
      'editor'
    ]),
    ...mapGetters('documents', {
      document: 'current'
    })
  },

  mounted () {
    this.show(this.$route.params.id)
    if (this.document) this.initializeEditor()
  },

  watch: {
    document () {
      if (this.editor) this.teardownEditor()
      if (this.document) this.initializeEditor()
    },
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
