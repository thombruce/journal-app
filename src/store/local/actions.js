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
          dispatch('graph/save', document, { root: true })
        })
        dispatch('clear')
      })
  }
}

export default actions
