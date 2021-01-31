import Vue from 'vue'

const mutations = {
  push (state, documents) {
    state.list = { ...state.list, ...documents }
  },

  insert (state, payload) {
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
  }
}

export default mutations
