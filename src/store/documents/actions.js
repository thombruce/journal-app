import router from '@/router'

import { v4 as uuidv4 } from 'uuid'

const actions = {
  index ({ dispatch, rootState }) {
    if (rootState.account.user) {
      dispatch('graph/index', null, { root: true })
    } else {
      dispatch('local/index', null, { root: true })
    }
  },

  show ({ commit }, id) {
    commit('setCurrent', id)
  },

  create ({ dispatch, commit, rootState }, document) {
    const id = uuidv4()
    const timestamp = new Date().getTime()

    document = {
      ...{ id },
      ...document,
      ...{ createdAt: timestamp, updatedAt: timestamp }
    }

    commit('insert', document)

    if (rootState.account.user) {
      dispatch('graph/save', document, { root: true })
    } else {
      dispatch('local/save', document, { root: true })
    }

    router.push({ name: 'EditDocument', params: { id: document.id } })
  },

  update ({ dispatch, commit, state, rootState }, document) {
    const timestamp = new Date().getTime()

    document = {
      ...state.list[document.id],
      ...document,
      ...{ updatedAt: timestamp }
    }

    commit('insert', document)

    if (rootState.account.user) {
      dispatch('graph/save', document, { root: true })
    } else {
      dispatch('local/save', document, { root: true })
    }
  },

  destroy ({ dispatch, commit, rootState }, id) {
    commit('delete', id)

    if (rootState.account.user) {
      dispatch('graph/destroy', id, { root: true })
    } else {
      dispatch('local/destroy', id, { root: true })
    }

    router.push({ name: 'Documents' })
  },

  clear ({ commit }) {
    commit('clear')
  }
}

export default actions
