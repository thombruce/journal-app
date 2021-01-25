import { v4 as uuidv4 } from 'uuid'

import gun from '@/gun.js'

const actions = {
  index ({ commit }) {
    gun.get('documents')
      .map()
      .on((data) => {
        if (data) commit('insert', data)
      })
  },

  show ({ commit }, id) {
    gun.get('documents')
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

    gun.get('documents')
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

    gun.get('documents')
      .get(document.id)
      .put(document)
  },

  destroy ({ commit }, id) {
    commit('delete', id)

    gun.get('documents')
      .get(id)
      .put(null)
  }
}

export default actions
