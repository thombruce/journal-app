import _ from 'lodash'

import SEA from 'gun/sea'

import { user, scope } from '@/gun'

const timestamps = ['createdAt', 'updatedAt']

/* Main Functions */

const debouncedSave = _.debounce(function (document) {
  save(document)
}, 500, { maxWait: 2000 })

const save = async function (document) {
  document = await encryptDocument(document)

  // First, get the document as it exists in graph.
  user.get(scope)
    .get('documents')
    .get(document.id)
    .once((prev) => {
      // Then, insert the modified document.
      user.get(scope)
        .get('documents')
        .get(document.id)
        .put(document, () => {
          // Retrieve the inserted node
          const documentNode = user.get(scope)
            .get('documents')
            .get(document.id)
          // Store or update time tree.
          prev ? updateTimestamps(document, documentNode, prev) : createTimestamps(document, documentNode)
        })
    })
}

/* Support Functions */

const createTimestamps = function (document, documentNode) {
  // Store node reference in the time tree for createdAt and updatedAt.
  timestamps.forEach(timestamp => {
    insertTimestamp(document, documentNode, timestamp)
  })
}

const updateTimestamps = function (document, documentNode, prev) {
  // Nullify the previous updatedAt.
  insertTimestamp(prev, null, 'updatedAt')
  // Store node reference in the time tree for new updatedAt.
  insertTimestamp(document, documentNode, 'updatedAt')
}

const insertTimestamp = function (document, documentNode, timestamp) {
  // Store node reference in the time tree for given timestamp.
  user.get(scope)
    .get('trees')
    .get('timestamps')
    .get(document[timestamp])
    .get(timestamp)
    .get(document.id)
    .put(documentNode)
}

const encryptDocument = async function (document) {
  const encrypted = {
    ...document,
    ...{
      content: await SEA.encrypt(document.content, user._.sea),
      text: await SEA.encrypt(document.text, user._.sea)
    }
  }
  return encrypted
}

export { debouncedSave }
