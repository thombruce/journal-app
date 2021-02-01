import router from '@/router'

import { gun, user } from '@/gun'

const actions = {
  login ({ dispatch, commit }, { username, password }) {
    commit('clearErrors')
    user.auth(username, password, (ack) => {
      dispatch('authenticated', ack)
    })
  },

  create ({ commit, dispatch }, { username, password }) {
    commit('clearErrors')
    gun.get('~@' + username).once((data) => {
      if (!data) {
        user.create(username, password, (ack) => {
          if (!ack.err) dispatch('login', { username, password })
        })
      } else {
        commit('addError', { username: 'User already exists' })
      }
    })
  },

  update ({ commit }, { username, password, newPassword }) {
    commit('clearErrors')
    user.auth(username, password, (_ack) => {
      // if (ack.err) doSomethingWithError()
    }, { change: newPassword })
  },

  authenticated ({ dispatch, commit }, ack) {
    commit('setUser', ack.put)
    dispatch('graph/init', null, { root: true })
    dispatch('local/sync', null, { root: true })
  },

  logout ({ commit }) {
    commit('clearErrors')
    commit('setUser', null)
    user.leave()
    router.push({ name: 'Documents' })
  }
}

export default actions
