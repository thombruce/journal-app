import Vue from 'vue'

const mutations = {
  push (state, documents) {
    documents = documents.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

    state.list = { ...state.list, ...documents }
  },
  insert (state, payload) {
    Vue.set(state.list, payload.id, payload)
  },
  delete (state, id) {
    Vue.delete(state.list, id)
  }
}

export default mutations
