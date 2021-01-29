import { JournalEditor as Editor } from '@/editor'

const actions = {
  initializeEditor ({ dispatch, commit, rootGetters }) {
    const document = rootGetters['documents/current']

    const editor = new Editor({
      content: document.content,
      onUpdate: ({ state, getJSON }) => {
        dispatch('documents/update', { id: document.id, content: getJSON(), text: state.doc.textContent }, { root: true })
      }
    })
    commit('init', editor)
  },

  teardownEditor ({ commit }) {
    commit('deinit')
  }
}

export default actions
