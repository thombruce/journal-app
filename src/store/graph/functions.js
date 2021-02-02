import _ from 'lodash'

import SEA from 'gun/sea'

import { user, scope } from '@/gun'

const timestamps = ['createdAt', 'updatedAt']

const save = async function (document) {
  document = {
    ...document,
    ...{
      content: await SEA.encrypt(document.content, user._.sea),
      text: await SEA.encrypt(document.text, user._.sea)
    }
  }

  // TODO: Refactor - this seems incredibly verbose
  // First, get the document as it exists in graph.
  user.get(scope)
    .get('documents')
    .get(document.id)
    .once((prev) => {
      // If document exists, store previous updatedAt.
      const previouslyUpdatedAt = prev ? prev.updatedAt : null
      // Then, insert the modified document.
      user.get(scope)
        .get('documents')
        .get(document.id)
        .put(document, () => {
          // Retrieve the newly saved document node.
          const documentNode = user.get(scope)
            .get('documents')
            .get(document.id)

          // Nullify the previous updatedAt.
          if (previouslyUpdatedAt) {
            user.get(scope)
              .get('trees')
              .get('timestamps')
              .get(previouslyUpdatedAt)
              .get('updatedAt')
              .get(document.id)
              .put(null)
          }

          // Store node reference in the time tree for createdAt and updatedAt.
          timestamps.forEach(timestamp => {
            user.get(scope)
              .get('trees')
              .get('timestamps')
              .get(document[timestamp])
              .get(timestamp)
              .get(document.id)
              .put(documentNode)
          })
        })
    })
}

const debouncedSave = _.debounce(function (document) {
  save(document)
}, 500, { maxWait: 2000 })

export { debouncedSave }
