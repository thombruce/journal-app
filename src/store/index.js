import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import user from './user'
import documents from './documents'
import editor from './editor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    user,
    documents,
    editor
  }
})
