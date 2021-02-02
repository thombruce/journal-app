import _ from 'lodash'

import { Database } from '@/dexie.js'

const db = new Database()

const debouncedSave = _.debounce(async function (document) {
  save(document)
}, 500, { maxWait: 2000 })

const save = function (document) {
  db.documents.update(document.id, document)
}

export { debouncedSave, save }
