const mutations = {
  init (state, editor) {
    state.editor = editor
  },

  markAsModified (state) {
    state.modified = true
  },

  unmarkModified (state) {
    state.modified = false
  },

  deinit (state) {
    state.editor.destroy()
    state.editor = null
  }
}

export default mutations
