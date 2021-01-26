import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  errors: {}
})

const documents = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default documents
