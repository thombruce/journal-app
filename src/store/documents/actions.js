import { v4 as uuidv4 } from 'uuid'

import { user } from '@/gun'

const actions = {
  index ({ commit }) {
    user.get('documents')
      .map()
      .on((data) => {
        if (data) commit('insert', data)
      })
  },

  show ({ commit }, id) {
    user.get('documents')
      .get(id)
      .on((data) => {
        if (data) commit('insert', data)
      })
  },

  create (_, document) {
    const id = uuidv4()
    const timestamp = new Date().getTime()

    document = {
      ...{ id },
      ...document,
      ...{ createdAt: timestamp, updatedAt: timestamp }
    }

    user.get('documents')
      .get(document.id)
      .put(document)
  },

  update ({ state }, document) {
    const timestamp = new Date().getTime()

    document = {
      ...state.list[document.id],
      ...document,
      ...{ updatedAt: timestamp }
    }

    user.get('documents')
      .get(document.id)
      .put(document)
  },

  destroy ({ commit }, id) {
    commit('delete', id)

    user.get('documents')
      .get(id)
      .put(null)
  },

  empty ({ commit }) {
    commit('empty')
  }
}

export default actions
