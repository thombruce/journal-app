import { user, scope } from '@/gun'

const timestamps = ['createdAt', 'modifiedAt']

const createTimestamps = function (document, documentNode) {
  // Store node reference in the time tree for createdAt and modifiedAt.
  timestamps.forEach(timestamp => {
    insertTimestamp(document, documentNode, timestamp)
  })
}

const updateTimestamps = function (document, documentNode, previouslyModifiedAt) {
  // Nullify the previous modifiedAt.
  nullTimestamp(document, 'modifiedAt', previouslyModifiedAt)
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
    .set(documentNode)
}

const nullTimestamps = function (document, atTimestamp) {
  timestamps.forEach(timestamp => {
    nullTimestamp(document, timestamp, atTimestamp)
  })
}

const nullTimestamp = function (document, timestamp, atTimestamp) {
  // Nullify timestamp.
  user.get(scope)
    .get('trees')
    .get('timestamps')
    .get(atTimestamp || document[timestamp])
    .get(timestamp)
    .get(document._['#'])
    .put(null)
}

export {
  createTimestamps,
  updateTimestamps,
  insertTimestamp,
  nullTimestamps,
  nullTimestamp
}
