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

import VDarkmodeToggle from './components/controls/VDarkmodeToggle'
import VFullscreenToggle from './components/controls/VFullscreenToggle'

export default {
  name: 'App',

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
  }
}
</script>
