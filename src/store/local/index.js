import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({})

const documents = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default documents
