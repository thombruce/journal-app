import router from '@/router'

import { v4 as uuidv4 } from 'uuid'

import SEA from 'gun/sea'

import { user, scope } from '@/gun'

const actions = {
  index ({ commit, getters }) {
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
          commit('insert', document)
        }
      })
  },

  show ({ commit }, id) {
    commit('setCurrent', id)
  },

  create ({ dispatch, commit }, document) {
    const id = uuidv4()
    const timestamp = new Date().getTime()

    document = {
      ...{ id },
      ...document,
      ...{ createdAt: timestamp, updatedAt: timestamp }
    }

    commit('insert', document)
    dispatch('save', document)
    router.push({ name: 'EditDocument', params: { id: document.id } })
  },

  update ({ dispatch, commit, state }, document) {
    const timestamp = new Date().getTime()

    document = {
      ...state.list[document.id],
      ...document,
      ...{ updatedAt: timestamp }
    }

    commit('insert', document)
    dispatch('save', document)
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
    commit('delete', id)

    user.get(scope)
      .get('documents')
      .get(id)
      .put(null, (ack) => {
        if (ack.err) {
          // TODO: Handle error
        } else {
          router.push({ name: 'Documents' })
        }
      })
  },

  clear ({ commit }) {
    commit('clear')
  }
}

export default actions
