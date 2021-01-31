import { Database } from '@/dexie.js'

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

  async save (_, document) {
    if (await db.documents.get(document.id)) {
      db.documents.update(document.id, document)
    } else {
      db.documents.add(document)
    }
  },

  destroy (_, id) {
    db.documents.delete(id)
  }
}

export default actions
