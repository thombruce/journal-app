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
    commit('setCurrent', id) // TODO: Clear current when destroyed or navigated away from.
  },

  create ({ dispatch, commit }, document) {
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
    dispatch('save')
    commit('editor/markAsModified', null, { root: true })

    router.push({ name: 'EditDocument', params: { id: document.id } })
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
  }
}

export default actions
