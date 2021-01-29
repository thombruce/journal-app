import Vue from 'vue'

Vue.filter('formatDate', val => new Date(val).toLocaleDateString())

Vue.filter('truncate', (text, length) => {
  if (text && text.length > length) return text.substring(0, length) + '...'
  return text
})
