<template lang="pug">
  VApp
    VNavDrawer

    VNavBar

    VMain
      RouterView

    VSnackbar(
      v-model="snackbar"
      :timeout="-1"
      color="error"
    )
      | Documents will not be encrypted until you sign in.
      template(v-slot:action="{ attrs }")
        VBtn(
          icon
          v-bind="attrs"
          @click="snackActive = false"
        )
          VIcon mdi-close
</template>

<script>
import { mapState } from 'vuex'

import VNavBar from '@/components/local/VNavBar.vue'
import VNavDrawer from '@/components/local/VNavDrawer'

export default {
  components: {
    VNavBar,
    VNavDrawer
  },
  data () {
    return {
      snackActive: true
    }
  },
  computed: {
    snackbar () {
      return this.user ? false : this.snackActive
    },
    ...mapState('account', [
      'user'
    ])
  }
}
</script>
