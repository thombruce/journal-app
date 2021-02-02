import Vue from 'vue'

const mutations = {
  push (state, documents) {
    state.list = { ...state.list, ...documents }
  },

  pushQueried (state, ids) {
    state.queried = [...state.queried, ...ids]
  },

  insert (state, payload) {
    Vue.set(state.list, payload.id, payload)
  },

  update (state, payload) {
    Vue.set(state.list, payload.id, payload)
  },

  setCurrent (state, id) {
    state.currentId = id
  },

  delete (state, id) {
    Vue.delete(state.list, id)
  },

  clear (state) {
    state.list = {}
  },

  setQuery (state, query) {
    state.query = query
    state.queried = []
  }
}

export default mutations
