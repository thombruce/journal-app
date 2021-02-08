import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import documents from './documents'
import graph from './graph'
import local from './local'
import editor from './editor'

import autosave from './plugins/autosave'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    documents,
    graph,
    local,
    editor
  },
  plugins: [autosave]
})
