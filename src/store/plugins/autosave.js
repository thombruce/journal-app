import { debouncedSave as graphSave } from '../graph/functions'
import { debouncedSave as localSave } from '../local/functions'

const autosave = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'documents/update') {
      state.account.user ? graphSave(mutation.payload) : localSave(mutation.payload)
    }
  })
}

export default autosave
