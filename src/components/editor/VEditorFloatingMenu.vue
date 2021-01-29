<template lang="pug">
EditorFloatingMenu(:editor="editor" v-slot="{ commands, isActive, getMarkAttrs, menu }")
  .floating-menu(
    :class="{ 'is-active': menu.isActive }"
    :style="`top: ${menu.top}px`"
  )
    VBtn(icon :input-value="isActive.heading({ level: 1 })" @click="commands.heading({ level: 1 })")
      VIcon(size="24px") mdi-format-header-1

    VBtn(icon :input-value="isActive.heading({ level: 2 })" @click="commands.heading({ level: 2 })")
      VIcon(size="20px") mdi-format-header-2

    VBtn(icon :input-value="isActive.heading({ level: 3 })" @click="commands.heading({ level: 3 })")
      VIcon(size="16px") mdi-format-header-3

    VBtn(icon :input-value="isActive.horizontal_rule()" @click="commands.horizontal_rule")
      VIcon mdi-minus

    VBtn(icon :input-value="isActive.blockquote()" @click="commands.blockquote")
      VIcon mdi-format-quote-close

    VBtn(icon :input-value="isActive.bullet_list()" @click="commands.bullet_list")
      VIcon mdi-format-list-bulleted

    VBtn(icon :input-value="isActive.ordered_list()" @click="commands.ordered_list")
      VIcon mdi-format-list-numbered

    // rte-image-dialog(:command="commands.image")

    VBtn(icon :input-value="isActive.code_block()" @click="commands.code_block")
      VIcon mdi-code-brackets
</template>

<script>
import { EditorFloatingMenu } from 'tiptap'

import { mapState } from 'vuex'

export default {
  components: {
    EditorFloatingMenu
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  }
}
</script>

<style lang="scss">
.floating-menu {
  position: absolute;
  z-index: 1;
  margin-top: -0.35rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
