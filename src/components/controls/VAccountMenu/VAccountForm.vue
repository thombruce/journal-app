<template lang="pug">
  VForm(:model="user" @submit.prevent="changePassword()")
    VCardTitle.headline
      | Account
    VCardText
      VTextField(
        v-model="user.username"
        label="Username"
        readonly
        hint="This can't be changed."
      )
      h3 Change password
      VTextField(v-model="user.password" label="Password" type="password")
      VTextField(
        v-model="user.newPassword"
        label="New password"
        type="password"
        hint="Remember, you won't be able to recover your account if you forget this."
      )
    VCardActions
      VSpacer
      VBtn(color="primary" type="submit") Update password
      VBtn(color="error" @click="logout()") Logout
</template>

<script>
import { user } from '@/gun'

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      user: {
        username: user.is.alias,
        password: '',
        newPassword: ''
      }
    }
  },

  methods: {
    ...mapActions('account', [
      'update',
      'logout'
    ]),
    changePassword () {
      this.update(this.user)
      this.$emit('close-dialog')
    }
  }
}
</script>
