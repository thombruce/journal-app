import router from '@/router'

import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/dexie.js'
const db = new Database()

const actions = {
  index ({ dispatch, rootState }) {
    if (rootState.account.user) {
      dispatch('graph/index', null, { root: true })
    } else {
      dispatch('local/index', null, { root: true })
    }
  },

  search ({ dispatch, state, rootState }) {
    if (rootState.account.user) {
      dispatch('graph/search', state.query, { root: true })
    } else {
      dispatch('local/search', state.query, { root: true })
    }
  },

  show ({ dispatch, commit, rootState }, id) {
    if (rootState.account.user) {
      dispatch('graph/show', id, { root: true })
    } else {
      dispatch('local/show', id, { root: true })
    }
    commit('setCurrent', id) // TODO: Clear current when destroyed or navigated away from.
  },

  create ({ dispatch, commit, rootState }, document) {
    const id = uuidv4()
    const timestamp = new Date().getTime()

    document = {
      ...{ id },
      ...document,
      ...{
        createdAt: timestamp,
        updatedAt: timestamp,
        modifiedAt: timestamp
      }
    }

    commit('insert', document)
    commit('setCurrent', id)
    if (!rootState.account.user) db.documents.add(document)
    dispatch('save')
    commit('editor/markAsModified', null, { root: true })

    router.push({ name: 'EditDocument', params: { id: document.id, new: true } })
  },

  update ({ commit, state, rootState }, document) {
    const timestamp = new Date().getTime()

    const modifiedTimestamps = {
      ...{ updatedAt: timestamp },
      ...(rootState.editor.modified ? {} : { modifiedAt: timestamp })
    }

    document = {
      ...state.list[document.id],
      ...document,
      ...modifiedTimestamps
    }

    commit('update', document)

    return true
  },

  destroy ({ dispatch, commit, rootState }, id) {
    if (rootState.account.user) {
      dispatch('graph/destroy', id, { root: true })
    } else {
      dispatch('local/destroy', id, { root: true })
    }

    commit('delete', id)

    router.push({ name: 'Documents' })
  },

  save ({ dispatch, getters, rootState }) {
    const document = getters.current
    if (document) {
      if (rootState.account.user) {
        dispatch('graph/save', document, { root: true })
      } else {
        dispatch('local/save', document, { root: true })
      }
    }
  },

  clear ({ commit }) {
    commit('clear')
  },

  async updateQuery ({ dispatch, commit }, query) {
    commit('setQuery', query)
    dispatch('search')
  }
}

export default actions
