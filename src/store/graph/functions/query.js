import { userDb } from '@/plugins/helvellyn-gun'

import { decrypt } from './encrypt'

const index = function (args, callback) {
  const offset = args.offset || new Date().getTime()

  userDb
    .get('trees', () => {})
    .get('timestamps')
    .get({ '.': { '<': offset, '-': 1 }, '%': 50000 })
    .once(() => {})
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
  userDb
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

  userDb
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
