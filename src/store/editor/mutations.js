const mutations = {
  init (state, editor) {
    state.editor = editor
  },

  markAsModified (state) {
    state.modified = true
  },

  deinit (state) {
    state.editor.destroy()
    state.editor = null
    state.modified = false
  }
}

export default mutations
