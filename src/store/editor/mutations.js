const mutations = {
  init (state, editor) {
    state.editor = editor
  },

  deinit (state) {
    state.editor.destroy()
    state.editor = null
  }
}

export default mutations
