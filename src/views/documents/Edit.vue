<template lang="pug">
VContainer.pa-0(fluid fill-height)
  VEditor
</template>

<script>
import VEditor from '@/components/VEditor'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

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
    }),
    documentLoaded () {
      return !!this.document
    }
  },

  mounted () {
    // TODO: Refactor initial document loading
    this.show(this.$route.params.id)
    if (this.documentLoaded) this.initializeEditor()
  },

  watch: {
    documentLoaded () {
      // TODO: Refactor initial document loading
      if (this.editor) this.teardownEditor()
      if (this.documentLoaded) this.initializeEditor()
    }
  },

  async beforeRouteUpdate (to, from, next) {
    await this.save()
    this.teardownEditor()
    next()
    this.show(to.params.id)
    if (!to.params.new) this.unmarkModified()
    this.initializeEditor()
  },

  beforeDestroy () {
    this.teardownEditor()
  },

  methods: {
    ...mapActions('documents', [
      'show',
      'save'
    ]),
    ...mapActions('editor', [
      'initializeEditor',
      'teardownEditor'
    ]),
    ...mapMutations('editor', [
      'unmarkModified'
    ])
  }
}
</script>
