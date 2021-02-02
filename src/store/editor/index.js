import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  editor: null,
  modified: false
})

const editor = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default editor
