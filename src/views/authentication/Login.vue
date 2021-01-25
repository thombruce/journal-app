<template lang="pug">
VForm(ref="form" :model="user" @submit.prevent="onSubmit()")
  VCard
    VCardText
      h2 Login
      VTextField(v-model="user.username" label="Username")
      VTextField(v-model="user.password" label="Password" type="password")
    VCardActions
      VSpacer
      VBtn(color="primary" type="submit") Login
      VBtn(:to="{ name: 'SignUp' }" text small) Don't have an account?
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
    ...mapActions('user', [
      'login'
    ]),
    onSubmit () {
      this.login(this.user)
    }
  }
}
</script>
