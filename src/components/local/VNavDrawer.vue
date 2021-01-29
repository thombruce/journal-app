<template lang="pug">
  VNavigationDrawer(
    v-model="drawer"
    app
    clipped
    :mobile-breakpoint="$vuetify.breakpoint.thresholds.sm"
  )
    //- template(v-slot:prepend)
    //-   VNavSearch

    VList
      VListItemGroup
        VListItem(
          v-for="document in documents"
          :key="document.id"
          :to="{ name: 'EditDocument', params: { id: document.id } }"
          two-line
          link
          @click="toggleOnMobile()"
        )
          VListItemContent
            strong(v-if="document.text && document.text !== ''") {{ document.text | truncate(50) }}
            strong(v-else) Untitled Document
            div
              time(:datetime="document.updatedAt") {{ document.updatedAt | formatDate }}

    template(v-slot:append)
      .row.pa-2
        .col.d-flex.justify-center
          VDarkmodeToggle
        .col.d-flex.justify-center(v-if="!isElectron")
          VFullscreenToggle
</template>

<script>
import isElectron from 'is-electron'

import { mapGetters, mapMutations } from 'vuex'

import { createHelpers } from 'vuex-map-fields'

// import VNavSearch from '@/components/local/VNavSearch'

import VDarkmodeToggle from '@/components/controls/VDarkmodeToggle'
import VFullscreenToggle from '@/components/controls/VFullscreenToggle'

const { mapFields } = createHelpers({
  getterType: 'ui/getField',
  mutationType: 'ui/updateField'
})

export default {
  components: {
    // VNavSearch,
    VDarkmodeToggle,
    VFullscreenToggle
  },

  data () {
    return {
      busy: false
    }
  },

  computed: {
    ...mapGetters('documents', {
      documents: 'all'
    }),
    ...mapFields([
      'drawer'
    ]),
    isElectron () {
      return isElectron()
    }
  },

  created () {
    this.toggleOnMobile()
  },

  methods: {
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
    toggleOnMobile () {
      if (this.$vuetify.breakpoint.smAndDown) this.toggleDrawer()
    }
  }
}
</script>
