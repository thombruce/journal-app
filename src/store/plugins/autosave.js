import { user } from '@/gun'

import { debouncedSave as graphSave } from '../graph/functions'

const autosave = store => {
  store.subscribe((mutation, _state) => {
    if (mutation.type === 'documents/update') {
      if (user.is) graphSave(mutation.payload)
    }
  })
}

export default autosave
