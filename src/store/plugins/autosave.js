import { debouncedSave as graphSave } from '../graph/functions'

const autosave = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'documents/update') {
      if (state.account.authenticated) graphSave(mutation.payload)
    }
  })
}

export default autosave
