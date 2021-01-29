<template lang="pug">
EditorMenuBubble(:editor="editor" keep-in-bounds v-slot="{ commands, isActive, getMarkAttrs, menu }")
  .menububble(
    :class="{ 'is-active': menu.isActive }"
    :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
  )
    VBtn(icon dark :input-value="isActive.bold()" @click="commands.bold")
      VIcon mdi-format-bold

    VBtn(icon dark :input-value="isActive.italic()" @click="commands.italic")
      VIcon mdi-format-italic

    VBtn(icon dark :input-value="isActive.strike()" @click="commands.strike")
      VIcon mdi-format-strikethrough

    VBtn(icon dark :input-value="isActive.code()" @click="commands.code")
      VIcon mdi-code-tags

    VForm(v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)")
      VTextField.ma-0.pa-0(
        label="URL"
        dark
        dense
        hide-details
        single-line
        clearable
        v-model="linkUrl"
        @keydown.esc="hideLinkMenu"
        @click:clear="setLinkUrl(commands.link, null)"
      )

    template(v-else)
      VBtn(icon dark :input-value="isActive.link()" @click="showLinkMenu(getMarkAttrs('link'))")
        VIcon mdi-link
</template>

<script>
import { EditorMenuBubble } from 'tiptap'

import { mapState } from 'vuex'

export default {
  components: {
    EditorMenuBubble
  },

  data () {
    return {
      linkUrl: null,
      linkMenuIsActive: false
    }
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
    }
  }
}
</script>

<style lang="scss">
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
  // &__button {
  //   display: inline-flex;
  //   background: transparent;
  //   border: 0;
  //   color: white;
  //   padding: 0.2rem 0.5rem;
  //   margin-right: 0.2rem;
  //   border-radius: 3px;
  //   cursor: pointer;
  //   &:last-child {
  //     margin-right: 0;
  //   }
  //   &:hover {
  //     background-color: rgba(white, 0.1);
  //   }
  //   &.is-active {
  //     background-color: rgba(white, 0.2);
  //   }
  // }
  // &__form {
  //   display: flex;
  //   align-items: center;
  // }
  // &__input {
  //   font: inherit;
  //   border: none;
  //   background: transparent;
  //   color: white;
  // }
}
</style>
