import _ from 'lodash'

import { Database } from '@/dexie.js'

const db = new Database()

const debouncedSave = _.debounce(async function (document) {
  if (await db.documents.get(document.id)) {
    db.documents.update(document.id, document)
  } else {
    db.documents.add(document)
  }
}, 500, { maxWait: 2000 })

export { debouncedSave }
