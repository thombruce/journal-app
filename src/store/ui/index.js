// import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  drawer: true
})

const ui = {
  namespaced: true,
  state,
  getters,
  // actions,
  mutations
}

export default ui
