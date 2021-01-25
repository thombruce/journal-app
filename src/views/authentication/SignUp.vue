<template lang="pug">
VContainer
  VForm(ref="form" :model="user" @submit.prevent="onSubmit()")
    VTextField(v-model="user.username" label="Username")
    VTextField(v-model="user.password" label="Password" type="password")
    VBtn(color="primary" type="submit") Submit
    RouterLink(:to="{ name: 'Login' }") Login
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
