import Dexie from 'dexie'
import 'dexie-observable'

export class Database extends Dexie {
  constructor () {
    super('database')

    this.version(1).stores({
      documents: '$$id,content,text,createdAt,updatedAt'
    })

    this.documents = this.table('documents')
  }
}
