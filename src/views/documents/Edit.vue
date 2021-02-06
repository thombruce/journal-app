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
    })
  },

  watch: {
    $route: {
      immediate: true,
      handler: async function (to, _from) {
        if (this.document) await this.save()
        if (this.editor) this.teardownEditor()
        await this.show(to.params.id)
        if (!to.params.new) this.unmarkModified()
      }
    }
  },

  beforeDestroy () {
    this.teardownEditor()
    this.setCurrent(null)
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
    ...mapMutations('documents', [
      'setCurrent'
    ]),
    ...mapMutations('editor', [
      'unmarkModified'
    ])
  }
}
</script>
