<template lang="pug">
VForm(ref="form" :model="user" @submit.prevent="onSubmit()")
  VCard
    VCardText
      h2 Sign up
      VTextField(v-model="user.username" label="Username")
      VTextField(v-model="user.password" label="Password" type="password")
    VCardActions
      VSpacer
      VBtn(color="primary" type="submit") Sign up
      VBtn(:to="{ name: 'Login' }" text small) Already have an account?
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
      'create',
      'login'
    ]),
    onSubmit () {
      this.create(this.user)
    }
  }
}
</script>
