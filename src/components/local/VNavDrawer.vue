<template lang="pug">
  VNavigationDrawer(
    v-model="drawer"
    app
    clipped
    :mobile-breakpoint="$vuetify.breakpoint.thresholds.sm"
  )
    template(v-slot:prepend)
      VNavSearch

    VList
      VListItemGroup(
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="50"
      )
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

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import { createHelpers } from 'vuex-map-fields'

import VNavSearch from '@/components/local/VNavSearch'

const { mapFields } = createHelpers({
  getterType: 'ui/getField',
  mutationType: 'ui/updateField'
})

export default {
  components: {
    VNavSearch
  },

  computed: {
    ...mapState('documents', [
      'query'
    ]),
    ...mapGetters('documents', {
      documents: 'all'
    }),
    ...mapFields([
      'drawer'
    ]),
    isElectron () {
      return isElectron()
    },
    offset () {
      const lastDoc = this.documents[this.documents.length - 1]
      return lastDoc && lastDoc.modifiedAt
    }
  },

  created () {
    this.toggleOnMobile()
  },

  methods: {
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
    ...mapActions('documents', [
      'index'
    ]),
    toggleOnMobile () {
      if (this.$vuetify.breakpoint.smAndDown) this.toggleDrawer()
    },
    loadMore () {
      if (!this.query) this.index()
    }
  }
}
</script>
