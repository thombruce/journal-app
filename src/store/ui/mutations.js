import { updateField } from 'vuex-map-fields'

const mutations = {
  toggleDrawer (state) {
    state.drawer = !state.drawer
  },
  updateField
}

export default mutations
