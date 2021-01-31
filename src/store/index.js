import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import account from './account'
import documents from './documents'
import graph from './graph'
import local from './local'
import editor from './editor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    account,
    documents,
    graph,
    local,
    editor
  }
})
