import router from '@/router'

import { gun, user } from '@/gun'

const actions = {
  login ({ commit }, { username, password }) {
    commit('clearErrors')
    user.auth(username, password, (ack) => {
      if (!ack.err) router.push({ name: 'Documents' })
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
    user.auth(username, password, (ack) => {
      if (!ack.err) router.push({ name: 'Documents' })
    }, { change: newPassword })
  },

  logout ({ commit, dispatch }) {
    commit('clearErrors')
    user.leave()
    if (!user._.sea) {
      dispatch('documents/clear', null, { root: true })
      router.push({ name: 'Login' })
    }
  }
}

export default actions
