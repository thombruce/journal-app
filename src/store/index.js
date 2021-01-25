import Vue from 'vue'
import Vuex from 'vuex'

import documents from './documents'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    documents,
    user
  }
})
