<template lang="pug">
  VSheet.editor-sheet.pa-4(width="100%" height="100%")
    template(v-if="editor")
      VEditorMenuBubble

      VEditorFloatingMenu

      VEditorContent
</template>

<script>
import VEditorContent from './editor/VEditorContent.vue'
import VEditorMenuBubble from './editor/VEditorMenuBubble.vue'
import VEditorFloatingMenu from './editor/VEditorFloatingMenu.vue'

import { mapState } from 'vuex'

export default {
  components: {
    VEditorContent,
    VEditorMenuBubble,
    VEditorFloatingMenu
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  }
}
</script>

<style lang="scss">
.editor-sheet {
  cursor: text;
}
</style>
