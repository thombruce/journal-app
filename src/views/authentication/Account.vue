<template lang="pug">
VForm(ref="form" :model="user" @submit.prevent="changePassword()")
  VCard
    VCardText
      h2.text-h5 Account

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
      VBtn(:to="{ name: 'Documents' }" text small) Back
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
    ...mapActions('user', [
      'update'
    ]),
    changePassword () {
      this.update(this.user)
    }
  }
}
</script>
