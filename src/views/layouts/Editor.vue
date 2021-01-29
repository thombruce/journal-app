<template lang="pug">
  VApp
    VNavDrawer

    VNavBar

    VMain
      RouterView
</template>

<script>
import VNavBar from '@/components/local/VNavBar.vue'
import VNavDrawer from '@/components/local/VNavDrawer'

export default {
  components: {
    VNavBar,
    VNavDrawer
  }
}
</script>
