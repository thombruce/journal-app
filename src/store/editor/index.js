import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  editor: null
})

const editor = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default editor
