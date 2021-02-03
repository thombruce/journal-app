import _ from 'lodash'

import save from './save'

const debouncedSave = _.debounce(function (document) {
  save(document)
}, 500, { leading: true, maxWait: 2000 })

export default debouncedSave
