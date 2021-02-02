import Dexie from 'dexie'
import 'dexie-observable'

export class Database extends Dexie {
  constructor () {
    super('database')

    this.version(1).stores({
      documents: '$$id,content,text,createdAt,updatedAt,*textWords'
    })

    this.documents = this.table('documents')

    this.documents.hook('creating', function (_primKey, obj, _trans) {
      if (typeof obj.text === 'string') obj.textWords = getAllWords(obj.text)
    })

    this.documents.hook('updating', function (mods, _primKey, _obj, _trans) {
      if (Object.prototype.hasOwnProperty.call(mods, 'text')) {
        if (typeof mods.text === 'string') {
          return { textWords: getAllWords(mods.text) }
        } else {
          return { textWords: [] }
        }
      }
    })
  }

  // Full Text Search (Multiple Words)
  // Based on: https://github.com/dfahlander/Dexie.js/issues/281#issuecomment-229228163
  searchDocuments (words) {
    return this.transaction('r', this.documents, function * () {
      const results = yield Dexie.Promise.all(
        words.map(
          word =>
            this.documents
              .where('textWords')
              .startsWithIgnoreCase(word)
              .distinct()
              .primaryKeys()
        )
      )

      const reduced = results
        .reduce((a, b) => {
          const set = new Set(b)
          return a.filter(k => set.has(k))
        })

      return yield this.documents.where(':id').anyOf(reduced).toArray()
    })
  }
}

function getAllWords (text) {
  var allWordsIncludingDups = text.split(' ').filter(item => item)
  var wordSet = allWordsIncludingDups.reduce(function (prev, current) {
    prev[current] = true
    return prev
  }, {})
  return Object.keys(wordSet)
}
