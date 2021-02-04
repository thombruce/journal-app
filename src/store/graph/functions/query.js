import { user, scope } from '@/gun'

import { decrypt } from './encrypt'

const index = function (args, callback) {
  const offset = args.offset || new Date().getTime()

  user.get(scope)
    .get('trees', tree => tree)
    .get('timestamps')
    .get({ '.': { '<': offset, '-': 1 }, '%': 50000 })
    .once(timestamps => timestamps)
    .map()
    .get('modifiedAt')
    .map()
    .once(async (document) => {
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
