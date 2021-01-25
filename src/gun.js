import Gun from 'gun/gun'
import 'gun/sea'

const gun = Gun()

const user = gun.user() // .recall({ sessionStorage: true })

export { gun, user }

export default gun
