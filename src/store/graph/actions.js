import SEA from 'gun/sea'

import { user, scope } from '@/gun'

const actions = {
  index ({ commit }) {
    user.get(scope)
      .get('documents')
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

  async save (_, document) {
    document = {
      ...document,
      ...{
        content: await SEA.encrypt(document.content, user._.sea),
        text: await SEA.encrypt(document.text, user._.sea)
      }
    }

    user.get(scope)
      .get('documents')
      .get(document.id)
      .put(document)
  },

  destroy ({ commit }, id) {
    user.get(scope)
      .get('documents')
      .get(id)
      .put(null, (ack) => {
        if (ack.err) {
          // TODO: Handle error
        } else {
          // TODO: Handle success
        }
      })
  }
}

export default actions
