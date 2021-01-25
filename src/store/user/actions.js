import router from '@/router'

import { user } from '@/gun'

const actions = {
  login (_, { username, password }) {
    user.auth(username, password, (ack) => {
      console.log(user)
      if (!ack.err) router.push({ name: 'Documents' })
    })
  },

  create ({ dispatch }, { username, password }) {
    user.create(username, password, (ack) => {
      if (!ack.err) dispatch('login', { username, password })
    })
  },

  logout (_) {
    user.leave()
    if (user._.sea) router.push({ name: 'Login' })
  },

  destroy (_, { username, password }) {
    user.delete(username, password, (ack) => {
      if (ack.ok) router.push({ name: 'Login' })
    })
  }
}

export default actions
