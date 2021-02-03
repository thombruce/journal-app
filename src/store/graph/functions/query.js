import { user, scope } from '@/gun'

import { decrypt } from './encrypt'

const index = function (callback) {
  user.get(scope)
    .get('trees')
    .get('timestamps')
    // TODO: Uncomment lex to deactivate; Investigate why order is incorrect.
    .get({ '.': { '<': new Date().getTime(), '-': 1 }, '%': 100000 }) // 100000 appears to be the max byte limit.
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

export { index, search }
