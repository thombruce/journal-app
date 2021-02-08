import SEA from 'gun/sea'

import { user } from '@/plugins/helvellyn-vue'

const encrypt = async function (document) {
  const encrypted = {
    ...document,
    ...{
      content: await SEA.encrypt(document.content, user._.sea),
      text: await SEA.encrypt(document.text, user._.sea)
    }
  }
  return encrypted
}

const decrypt = async function (document) {
  const decrypted = {
    ...document,
    ...{
      content: await SEA.decrypt(document.content, user._.sea),
      text: await SEA.decrypt(document.text, user._.sea)
    }
  }
  return decrypted
}

export { encrypt, decrypt }
