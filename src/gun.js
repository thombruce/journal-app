import Gun from 'gun/gun'

import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'

// import 'gun/lib/unset' // See: src/store/graph/actions.js footnote [1]

import 'gun/sea'

import store from './store'

/* Variables */
const scope = process.env.VUE_APP_NAMESPACE || 'journal'
const peers = process.env.VUE_APP_PEERS && process.env.VUE_APP_PEERS
  .split(',')
  .reduce((obj, item) => {
    obj[item] = {}
    return obj
  }, {})

/* Global Initialization */

const gun = Gun({ peers, localStorage: false })
const user = gun.user().recall({ sessionStorage: true }, (ack) => {
  store.dispatch('account/authenticated', ack)
})

/* Export */

export {
  gun,
  user,
  scope
}

export default gun
