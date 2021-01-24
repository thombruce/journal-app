const getters = {
  all: (state) => {
    return Object.values(state.list)
  },
  find: (state) => (id) => {
    return state.list[id]
  }
}

export default getters
