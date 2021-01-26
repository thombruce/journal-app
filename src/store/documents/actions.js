import { v4 as uuidv4 } from 'uuid'

import SEA from 'gun/sea'

import { user } from '@/gun'

const actions = {
  index ({ commit }) {
    user.get('documents')
      .map()
      .on(async (data) => {
        if (data) {
          data = {
            ...data,
            ...{ content: await SEA.decrypt(data.content, user._.sea) }
          }
          commit('insert', data)
        }
      })
  },

  show ({ commit }, id) {
    user.get('documents')
      .get(id)
      .on(async (data) => {
        if (data) {
          data = {
            ...data,
            ...{ content: await SEA.decrypt(data.content, user._.sea) }
          }
          commit('insert', data)
        }
      })
  },

  async create (_, document) {
    const id = uuidv4()
    const timestamp = new Date().getTime()

    document = {
      ...{ id },
      ...document,
      ...{ content: await SEA.encrypt(document.content, user._.sea) },
      ...{ createdAt: timestamp, updatedAt: timestamp }
    }

    user.get('documents')
      .get(document.id)
      .put(document)
  },

  async update ({ state }, document) {
    const timestamp = new Date().getTime()

    document = {
      ...state.list[document.id],
      ...document,
      ...{ content: await SEA.encrypt(document.content, user._.sea) },
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
