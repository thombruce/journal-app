<template lang="pug">
  VDialog(v-model="dialog" width="500")
    template(v-slot:activator="{ on, attrs }")
      VBtn(
        icon
        v-bind="attrs"
        v-on="on"
      )
        VIcon(v-if="authenticated") mdi-account
        VIcon(v-else) mdi-account-off

    VCard
      component(:is="layout" v-on:switch-view="switchView()" v-on:close-dialog="dialog = false")
</template>

<script>
import { mapGetters } from 'vuex'

import VAccountForm from './VAccountMenu/VAccountForm'
import VLoginForm from './VAccountMenu/VLoginForm'
import VSignupForm from './VAccountMenu/VSignupForm'

export default {
  components: {
    VAccountForm,
    VLoginForm,
    VSignupForm
  },

  data () {
    return {
      dialog: false,
      loggedOutView: 'login'
    }
  },

  computed: {
    ...mapGetters('account', [
      'authenticated'
    ]),

    layout () {
      return 'v-' + this.view + '-form'
    },

    view () {
      return this.authenticated ? 'account' : this.loggedOutView
    }
  },

  methods: {
    switchView () {
      this.loggedOutView = this.loggedOutView === 'login' ? 'signup' : 'login'
    }
  }
}
</script>
