import Vue from 'vue'

const mutations = {
  addError (state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      const arr = state.errors[key] || []
      arr.push(value)
      Vue.set(state.errors, key, arr)
    }
  },
  clearErrors (state) {
    state.errors = {}
  }
}

export default mutations
