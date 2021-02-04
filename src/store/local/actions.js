const actions = {
  search ({ commit, rootGetters }, query) {
    const words = query.toLowerCase().split(' ').filter(item => item)
    const documents = rootGetters['documents/indexed']

    const matches = documents.filter(document => {
      const documentWords = document.text.toLowerCase().split(' ').filter(item => item)
      return words.every(value => documentWords.some(word => word.startsWith(value)))
    })

    const ids = matches.map(document => document.id)
    commit('documents/pushQueried', ids, { root: true })
  },

  sync ({ dispatch, rootGetters }) {
    rootGetters['documents/all'].forEach(document => {
      dispatch('graph/save', document, { root: true })
    })
  }
}

export default actions
