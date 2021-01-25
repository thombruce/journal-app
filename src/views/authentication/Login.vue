<template lang="pug">
VContainer
  VForm(ref="form" :model="user" @submit.prevent="onSubmit()")
    VTextField(v-model="user.username" label="Username")
    VTextField(v-model="user.password" label="Password" type="password")
    VBtn(color="primary" type="submit") Submit
    RouterLink(:to="{ name: 'SignUp' }") Sign up
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
