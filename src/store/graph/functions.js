import _ from 'lodash'

import SEA from 'gun/sea'

import { user, scope } from '@/gun'

const timestamps = ['createdAt', 'modifiedAt']

/* Main Functions */

const debouncedSave = _.debounce(function (document) {
  save(document)
}, 500, { leading: true, maxWait: 2000 })

const save = async function (document) {
  document = await encryptDocument(document)

  // First, get the document as it exists in graph.
  user.get(scope)
    .get('documents')
    .get(document.id)
    .once((prev) => {
      // Set previous modifiedAt value as a constant (updates in this callback update the prev object)
      const previouslyModifiedAt = prev && prev.modifiedAt
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
          if (prev && previouslyModifiedAt !== document.modifiedAt) {
            updateTimestamps(document, documentNode, previouslyModifiedAt)
          } else if (!prev) {
            createTimestamps(document, documentNode)
          }
        })
    })
}

/* Support Functions */

const createTimestamps = function (document, documentNode) {
  // Store node reference in the time tree for createdAt and modifiedAt.
  timestamps.forEach(timestamp => {
    insertTimestamp(document, documentNode, timestamp)
  })
}

const updateTimestamps = function (document, documentNode, previouslyModifiedAt) {
  // Nullify the previous modifiedAt.
  user.get(scope)
    .get('trees')
    .get('timestamps')
    .get(previouslyModifiedAt)
    .get('modifiedAt')
    .get(document.id)
    .put(null)
  // Store node reference in the time tree for new modifiedAt.
  insertTimestamp(document, documentNode, 'modifiedAt')
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

export { debouncedSave, save }
