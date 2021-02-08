<template lang="pug">
VAppBar(app flat dense clipped-left)
  VAppBarNavIcon(@click.stop="toggleDrawer()")

  VBtn(icon @click="newDocument()")
    VIcon mdi-plus-box

  VSpacer

  template(v-if="editor")
    VEditorMenuBar(v-if="editor")

    VSpacer.d-none.d-sm-block

  VAccountDialog

  VConfirmBtn(v-if="currentDocument" :action="destroyDocument")
    template(#button="{ on, attrs }")
      VBtn.error--text(
        icon
        v-bind="attrs"
        v-on="on"
      )
        VIcon mdi-delete
    template(#dialog)
      VCardTitle.headline
        | Are you sure?
      VCardText
        | If you delete this document, you won't be able to retrieve it.
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import VEditorMenuBar from '@/components/editor/VEditorMenuBar'

export default {
  components: {
    VEditorMenuBar
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    }),
    ...mapState('documents', {
      currentDocument: 'currentId'
    })
  },

  methods: {
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
    ...mapActions('documents', [
      'create',
      'destroy'
    ]),
    newDocument () {
      this.create({ content: '', text: '' })
    },
    destroyDocument () {
      this.destroy(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.editor-menu-container {
  height: 100%;

  > .v-btn {
    margin-top: -32px;
  }
}
</style>
