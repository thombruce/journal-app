import Gun from 'gun/gun'

import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'

// import 'gun/lib/unset' // See: src/store/graph/actions.js footnote [1]

import 'gun/sea'

import store from './store'

/* Variables */
const scope = process.env.VUE_APP_NAMESPACE || 'com.thombruce.journal'
const peers = process.env.VUE_APP_PEERS && process.env.VUE_APP_PEERS.split(',')

/* Global Initialization */

const gun = Gun({ peers, localStorage: false })
const user = gun.user().recall({ sessionStorage: true }, () => {
  store.dispatch('account/authenticated')
})

/* Export */

export {
  gun,
  user,
  scope
}

export default gun
