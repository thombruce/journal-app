import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/database.js'

const db = new Database()

const actions = {
  async index ({ commit, getters }) {
    const documents = await db.documents
      .toArray()

    commit('push', documents)

    return getters.all
  },

  async show ({ commit, getters }, id) {
    const document = await db.documents
      .get(id)

    commit('insert', document)

    return getters.find(id)
  },

  new (_, document) {
    const id = uuidv4()
    const timestamp = new Date().getTime()

    document = {
      ...{
        id,
        content: '',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      ...document
    }

    return document
  },

  async create ({ dispatch, commit, getters }, document) {
    document = await dispatch('new', document)

    await db.documents.add(document)
    commit('insert', document)

    return getters.find(document.id)
  },

  async update ({ state, commit, getters }, document) {
    const timestamp = new Date().getTime()

    document = {
      ...state.list[document.id],
      ...document,
      ...{ updatedAt: timestamp }
    }

    await db.documents.update(document.id, document)
    commit('insert', document)

    return getters.find(document.id)
  },

  async destroy ({ commit }, id) {
    await db.documents.delete(id)
    commit('delete', id)

    return true
  }
}

export default actions
