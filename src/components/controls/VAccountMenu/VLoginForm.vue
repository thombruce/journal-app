<template lang="pug">
  VForm(:model="user" @submit.prevent="onSubmit()")
    VCardTitle.headline
      | Login
    VCardText
      VTextField(v-model="user.username" label="Username")
      VTextField(v-model="user.password" label="Password" type="password")
    VCardActions
      VSpacer
      VBtn(color="primary" type="submit") Login
      VBtn(text small @click="$emit('switch-view')") Don't have an account?
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions('account', [
      'login'
    ]),
    onSubmit () {
      this.login(this.user)
      this.$emit('close-dialog')
    }
  }
}
</script>
