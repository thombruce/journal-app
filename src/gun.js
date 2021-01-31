import Gun from 'gun/gun'
import 'gun/sea'

import store from './store'

/* Variables */

const peers = process.env.VUE_APP_PEERS && process.env.VUE_APP_PEERS.split(',')
const scope = process.env.VUE_APP_NAMESPACE || 'journal'

/* Global Initialization */

const gun = Gun(peers)
const user = gun.user().recall({ sessionStorage: true }, (ack) => {
  store.commit('account/setUser', ack.put)
})

/* Export */

export {
  gun,
  user,
  scope
}

export default gun
