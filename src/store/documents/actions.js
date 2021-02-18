import { user } from '@/plugins/helvellyn-gun'

import router from '@/router'

import { v4 as uuidv4 } from 'uuid'

const actions = {
  index ({ dispatch, getters, rootGetters }) {
    if (user.authenticated) {
      const lastDoc = getters.all[getters.all.length - 1]
      const offset = lastDoc && lastDoc.modifiedAt
      dispatch('graph/index', { offset }, { root: true })
    }
  },

  search ({ dispatch, state, rootGetters }) {
    if (user.authenticated) {
      dispatch('graph/search', state.query, { root: true })
    } else {
      dispatch('local/search', state.query, { root: true })
    }
  },

  show ({ dispatch, commit, rootGetters }, id) {
    if (user.authenticated) {
      dispatch('graph/show', id, { root: true })
    }
    commit('setCurrent', id)
    if (!user.authenticated) {
      dispatch('editor/initializeEditor', null, { root: true })
    }
  },

  create ({ dispatch, commit, rootGetters }, document) {
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
    //
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

  destroy ({ dispatch, commit, rootGetters }, id) {
    if (user.authenticated) {
      dispatch('graph/destroy', id, { root: true })
    }

    commit('delete', id)

    router.push({ name: 'Documents' })
  },

  save ({ dispatch, getters, rootGetters }) {
    const document = getters.current
    if (document && user.authenticated) {
      dispatch('graph/save', document, { root: true })
    }
  },

  clear ({ commit }) {
    commit('clear')
  },

  updateQuery ({ dispatch, commit }, query) {
    commit('setQuery', query)
    dispatch('search')
  }
}

export default actions
