const getters = {
  all: (state, _getters, _rootState, _rootGetters) => {
    const documents = Object.values(state.list)

    return documents.sort((a, b) => {
      return b.updatedAt - a.updatedAt
    })
  },

  current: (state) => {
    return state.list[state.currentId]
  }
}

export default getters
