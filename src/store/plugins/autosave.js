import { user } from '@/gun'

import { debouncedSave as graphSave } from '../graph/functions'
import { debouncedSave as localSave } from '../local/functions'

const autosave = store => {
  store.subscribe((mutation, _state) => {
    if (mutation.type === 'documents/update') {
      user.is ? graphSave(mutation.payload) : localSave(mutation.payload)
    }
  })
}

export default autosave
