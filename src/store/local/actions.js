import { Database } from '@/dexie.js'

import { save } from './functions'

const db = new Database()

const actions = {
  index ({ commit }) {
    db.documents
      .toArray(documents => {
        // Convert documents from Array to Object: { [id]: { ...document }, [id]: { ...document } }
        return documents.reduce((obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
      })
      .then(documents => {
        // Insert documents Object into state memory
        commit('documents/push', documents, { root: true })
      })
  },

  show ({ commit }, id) {
    db.documents
      .get(id)
      .then(document => {
        if (document) commit('documents/insert', document, { root: true })
      })
  },

  async search ({ commit }, query) {
    const words = query.toLowerCase().split(' ').filter(item => item)

    const documentsArray = words.length > 0 ? await db.searchDocuments(words) : []

    // Convert documents from Array to Object: { [id]: { ...document }, [id]: { ...document } }
    const documents = documentsArray.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

    commit('documents/push', documents, { root: true })
    const ids = documentsArray.map(document => document.id)
    commit('documents/pushQueried', ids, { root: true })
  },

  save (_, document) {
    save(document)
  },

  destroy (_, id) {
    db.documents.delete(id)
  },

  clear (_) {
    db.documents.clear()
  },

  sync ({ dispatch }) {
    db.documents
      .toArray()
      .then(documents => {
        documents.forEach(document => {
          delete document.textWords
          dispatch('graph/save', document, { root: true })
        })
        dispatch('clear')
      })
  }
}

export default actions
