import { user } from '@/gun'

const getters = {
  authenticated () {
    return user.is
  }
}

export default getters
