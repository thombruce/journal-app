<template lang="pug">
EditorMenuBar(:editor="editor" v-slot="{ commands, isActive }")
  .editor-menu-container
    VMenu
      template(v-slot:activator="{ on }")
        VBtn.d-none.d-md-inline(
          icon
          v-on="on"
          :input-value="isActive.heading()"
        )
          VIcon mdi-format-title

      VList
        VListItem(
          :input-value="isActive.heading({ level: 1 })"
          @click="commands.heading({ level: 1 })"
        )
          VListItemTitle Heading 1

        VListItem(
          :input-value="isActive.heading({ level: 2 })"
          @click="commands.heading({ level: 2 })"
        )
          VListItemTitle Heading 2

        VListItem(
          :input-value="isActive.heading({ level: 3 })"
          @click="commands.heading({ level: 3 })"
        )
          VListItemTitle Heading 3

        VListItem(
          :input-value="isActive.heading({ level: 4 })"
          @click="commands.heading({ level: 4 })"
        )
          VListItemTitle Heading 4

        VListItem(
          :input-value="isActive.heading({ level: 5 })"
          @click="commands.heading({ level: 5 })"
        )
          VListItemTitle Heading 5

        VListItem(
          :input-value="isActive.heading({ level: 6 })"
          @click="commands.heading({ level: 6 })"
        )
          VListItemTitle Heading 6

    VDivider.mx-2.d-none.d-md-inline-block(vertical)

    VBtn.d-none.d-sm-inline(icon :input-value="isActive.bold()" @click="commands.bold")
      VIcon mdi-format-bold

    VBtn.d-none.d-sm-inline(icon :input-value="isActive.italic()" @click="commands.italic")
      VIcon mdi-format-italic

    VBtn.d-none.d-sm-inline(icon :input-value="isActive.strike()" @click="commands.strike")
      VIcon mdi-format-strikethrough

    VDivider.mx-2.d-none.d-sm-inline-block(vertical)

    VBtn.d-none.d-md-inline(icon :input-value="isActive.horizontal_rule()" @click="commands.horizontal_rule")
      VIcon mdi-minus

    VBtn.d-none.d-md-inline(icon :input-value="isActive.blockquote()" @click="commands.blockquote")
      VIcon mdi-format-quote-close

    VBtn.d-none.d-md-inline(icon :input-value="isActive.bullet_list()" @click="commands.bullet_list")
      VIcon mdi-format-list-bulleted

    VBtn.d-none.d-md-inline(icon :input-value="isActive.ordered_list()" @click="commands.ordered_list")
      VIcon mdi-format-list-numbered

    //VBtn(icon :input-value="isActive.todo_list()" @click="commands.todo_list") // [1]
    //  VIcon mdi-format-list-checkbox // [1]

    // VDivider.mx-2(vertical)

    //VBtn(icon :input-value="isActive.table()" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })")
    //  VIcon mdi-table

    // rte-image-dialog(:command="commands.image")

    //VBtn(icon :input-value="isActive.image()" @click="commands.image")
    //  VIcon mdi-image

    //VBtn(icon :input-value="isActive.link()" @click="commands.link")
    //  VIcon mdi-link

    VDivider.mx-2.d-none.d-md-inline-block(vertical)

    VBtn.d-none.d-sm-inline(icon :input-value="isActive.code()" @click="commands.code")
      VIcon mdi-code-tags

    VBtn.d-none.d-md-inline(icon :input-value="isActive.code_block()" @click="commands.code_block")
      VIcon mdi-code-brackets

    VDivider.mx-2.d-none.d-sm-inline-block(vertical)

    VBtn(icon @click="commands.undo")
      VIcon mdi-undo

    VBtn(icon @click="commands.redo")
      VIcon mdi-redo

    VDivider.mx-2.d-inline-block.d-sm-none(vertical)
</template>

<script>
import { EditorMenuBar } from 'tiptap'

import { mapState } from 'vuex'

export default {
  components: {
    EditorMenuBar
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  }
}
</script>
