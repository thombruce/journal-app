import router from '@/router'

import { user } from '@/gun'

const actions = {
  login (_, { username, password }) {
    user.auth(username, password, (ack) => {
      if (!ack.err) router.push({ name: 'Documents' })
    })
  },

  create ({ dispatch }, { username, password }) {
    user.create(username, password, (ack) => {
      if (!ack.err) dispatch('login', { username, password })
    })
  },

  update (_, { username, password, newPassword }) {
    user.auth(username, password, (ack) => {
      if (!ack.err) router.push({ name: 'Documents' })
    }, { change: newPassword })
  },

  logout (_) {
    user.leave()
    if (!user._.sea) router.push({ name: 'Login' })
  }
}

export default actions
