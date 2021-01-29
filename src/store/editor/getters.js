const getters = {
  content: (state, _getters, _rootState, _rootGetters) => {
    if (state.editor) {
      return state.editor.getJSON()
    }
  }
}

export default getters
