const getters = {
  all: (state, getters, _rootState, _rootGetters) => {
    const documents = state.query !== '' ? getters.queried : getters.indexed

    return documents.sort((a, b) => {
      return b.updatedAt - a.updatedAt
    })
  },

  indexed: (state, _getters, _rootState, _rootGetters) => {
    return Object.values(state.list)
  },

  queried: (state) => {
    return Object.values(state.list).filter(
      document => state.queried.includes(document.id)
    )
  },

  current: (state) => {
    return state.list[state.currentId]
  }
}

export default getters
