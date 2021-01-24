<template lang="pug">
VForm(ref="form" :model="document" @submit.prevent="onSubmit()")
  VTextarea(label="Content" v-model="document.content")

  VBtn(color="primary" type="submit") Submit
</template>

<script>
export default {
  props: [
    'document',
    'submit'
  ],
  methods: {
    onSubmit () {
      this.submit(this.document)
      this.$router.push({ name: 'Documents' })
    }
  }
}
</script>
