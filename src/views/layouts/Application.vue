<template lang="pug">
  VApp

    VNavigationDrawer(app temporary v-model="drawer")
      VList(nav)
        VListItemGroup(v-model="group")
          VListItem(to="/" link)
            VListItemContent
              VListItemTitle Home

          VListItem(to="/documents/new" link)
            VListItemContent
              VListItemTitle New Document
      template(v-slot:append)
        .pa-2
          VBtn.mb-2(block :to="{ name: 'Account' }") Account
          VBtn(color="error" block @click="logout()") Logout

    VAppBar(
      app
      color="primary"
      dark
    )
      VAppBarNavIcon(@click.stop="drawer = !drawer")

      VToolbarTitle
        | Documents

      VSpacer

      VDarkmodeToggle

      VFullscreenToggle(v-if="!isElectron")

    VMain
      RouterView
</template>

<script>
import isElectron from 'is-electron'

import { mapActions } from 'vuex'

import VDarkmodeToggle from '@/components/controls/VDarkmodeToggle'
import VFullscreenToggle from '@/components/controls/VFullscreenToggle'

export default {
  components: {
    VDarkmodeToggle,
    VFullscreenToggle
  },

  data () {
    return {
      drawer: false,
      group: null
    }
  },

  computed: {
    isElectron () {
      return isElectron()
    }
  },

  watch: {
    group () {
      this.drawer = false
    }
  },

  methods: {
    ...mapActions('user', [
      'logout'
    ])
  }
}
</script>
