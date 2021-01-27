import Gun from 'gun/gun'
import 'gun/sea'

const peers = process.env.VUE_APP_PEERS && process.env.VUE_APP_PEERS.split(',')

const gun = Gun(peers)

const user = gun.user() // .recall({ sessionStorage: true })

export { gun, user }

export default gun
