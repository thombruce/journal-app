<template lang="pug">
EditorContent.rte-content(:editor="editor" autocapitalize="on")
</template>

<script>
import { EditorContent } from 'tiptap'

import { mapState } from 'vuex'

export default {
  components: {
    EditorContent
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  }
}
</script>

<style lang="scss">
@import 'node_modules/vuetify/src/styles/settings/_variables.scss';
@import 'node_modules/vuetify/src/styles/elements/_blockquote.sass';

.rte-content {
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
  .ProseMirror {
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
  }
}

.ProseMirror[contenteditable]:focus {
  outline: 0px solid transparent;
}

.rte-content {
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 12px;
  }
  blockquote {
    line-height: 1em;
  }
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ol, ul {
    li {
      line-height: 1em;
    }
  }
  pre > code {
    padding:10px;
    display: block;
    &:before, &:after {
      content: "" !important;
    }
  }
  img {
    max-width: 100% !important;
  }

  table {
    width: 100% !important;
    text-align: center !important;
    th {
      // color: #eee;
      // background-color: #333;
    }
    td {
      // background-color: #eee;
    }
  }

  blockquote {
    @extend .blockquote;
  }

  // ul[data-type="todo_list"] {
  //   padding-left: 0;
  //   li[data-type="todo_item"] {
  //     display: flex;
  //     flex-direction: row;
  //     .todo-checkbox {
  //       border: 2px solid black;
  //       height: 0.9em;
  //       width: 0.9em;
  //       box-sizing: border-box;
  //       margin-right: 10px;
  //       margin-top: 0.3rem;
  //       user-select: none;
  //       -webkit-user-select: none;
  //       cursor: pointer;
  //       border-radius: 0.2em;
  //       background-color: transparent;
  //       transition: 0.4s background;
  //     }
  //     .todo-content {
  //       flex: 1;
  //       > p:last-of-type {
  //         margin-bottom: 0;
  //       }
  //       > ul[data-type="todo_list"] {
  //         margin: .5rem 0;
  //       }
  //     }
  //     &[data-done="true"] {
  //       > .todo-content {
  //         > p {
  //           text-decoration: line-through;
  //         }
  //       }
  //       > .todo-checkbox {
  //         background-color: black;
  //       }
  //     }
  //     &[data-done="false"] {
  //       text-decoration: none;
  //     }
  //   }
  // } // [1]
}
</style>
