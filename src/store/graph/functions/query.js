import { user, scope } from '@/gun'

import { decrypt } from './encrypt'

const index = function (callback) {
  user.get(scope)
    .get('trees')
    .get('timestamps')
    // This works now, but we need to implement pagination for the full
    // benefit.
    .get({ '.': { '<': new Date().getTime(), '-': 1 }, '%': 50000 })
    .map()
    .get('modifiedAt')
    .map()
    .on(async (document) => {
      if (document) {
        document = await decrypt(document)
        callback(document)
      }
    })
}

const show = function (id, callback) {
  user.get(scope)
    .get('documents')
    .get(id)
    .once(async (document) => {
      if (document) {
        document = await decrypt(document)
        callback(document)
      }
    })
}

const search = function (query, callback) {
  const words = query.toLowerCase().split(' ').filter(item => item)

  user.get(scope)
    .get('documents')
    .map()
    .on(async (document) => {
      if (document) {
        document = await decrypt(document)

        const documentWords = document.text.toLowerCase().split(' ').filter(item => item)

        if (words.every(value => documentWords.some(word => word.startsWith(value)))) {
          callback(document)
        }
      }
    })
}

export { index, show, search }
