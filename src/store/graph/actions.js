import SEA from 'gun/sea'

import { user, scope } from '@/gun'

const timestamps = ['createdAt', 'updatedAt']

const actions = {
  init () {
    // Radix tree queries seem to interfere with .set() if we don't
    // first initialize the queried objects. So do that here.
    // See also [1]. Solution derived from:
    // https://github.com/amark/gun/issues/690#issuecomment-455115069
    user.get(scope).get('trees').get('timestamps').put({})
  },

  index ({ commit }) {
    user.get(scope)
      .get('trees')
      .get('timestamps')
      .get({ '.': { '<': new Date().getTime(), '-': 1 }, '%': 100000 }) // 100000 appears to be the max byte limit.
      .map()
      .get('createdAt')
      .map()
      .on(async (document) => {
        if (document) {
          document = {
            ...document,
            ...{
              content: await SEA.decrypt(document.content, user._.sea),
              text: await SEA.decrypt(document.text, user._.sea)
            }
          }
          commit('documents/insert', document, { root: true })
        }
      })
  },

  // TODO: Debounce save functions.
  async save (_, document) {
    document = {
      ...document,
      ...{
        content: await SEA.encrypt(document.content, user._.sea),
        text: await SEA.encrypt(document.text, user._.sea)
      }
    }

    // TODO: Refactor - this seems incredibly verbose
    // First, get the document as it exists in graph.
    user.get(scope)
      .get('documents')
      .get(document.id)
      .once((prev) => {
        // If document exists, store previous updatedAt.
        const previouslyUpdatedAt = prev ? prev.updatedAt : null
        // Then, insert the modified document.
        user.get(scope)
          .get('documents')
          .get(document.id)
          .put(document, () => {
            // Retrieve the newly saved document node.
            const documentNode = user.get(scope)
              .get('documents')
              .get(document.id)

            // Nullify the previous updatedAt.
            if (previouslyUpdatedAt) {
              user.get(scope)
                .get('trees')
                .get('timestamps')
                .get(previouslyUpdatedAt)
                .get('updatedAt')
                .get(document.id)
                .put(null)
            }

            // Store node reference in the time tree for createdAt and updatedAt.
            timestamps.forEach(timestamp => {
              user.get(scope)
                .get('trees')
                .get('timestamps')
                .get(document[timestamp])
                .get(timestamp)
                .get(document.id)
                .put(documentNode)
            })
          })
      })
  },

  destroy ({ commit }, id) {
    // TODO: Refactor - this seems incredibly verbose
    // First, get the document as it exists in graph.
    user.get(scope)
      .get('documents')
      .get(id)
      .once((document) => {
        // Retrieve the document node.
        const documentNode = user.get(scope)
          .get('documents')
          .get(id)

        // Nullify node reference in the time tree for createdAt and updatedAt.
        timestamps.forEach(timestamp => {
          user.get(scope)
            .get('trees')
            .get('timestamps')
            .get(document[timestamp])
            .get(timestamp)
            .get(document.id)
            .put(null)
        })

        // Nullify the main document.
        documentNode.put(null)
      })
  }
}

export default actions

// [1] We no longer use (.set() / .unset()) due to other unexpected
//     behaviour. Deletions from the Radix Tree via unset were, for some
//     reason, successful only during same session; they failed after a page
//     refresh causing data to be stuck in the list.
//     The use of (.get(id).put(node) / .get(id).put(null)) seems to be
//     more reliable, and the behaviour is precisely what we would expect
//     (.set() / .unset()) to be.
