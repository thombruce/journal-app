import { user, scope } from '@/gun'

import { encrypt } from './encrypt'
import { createTimestamps, updateTimestamps } from './timestamps'

const save = async function (document) {
  document = await encrypt(document)

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

export default save
