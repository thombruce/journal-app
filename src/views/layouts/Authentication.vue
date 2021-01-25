<template lang="pug">
  VApp
    VDarkmodeToggle.d-none
    VMain
      VContainer(fill-height)
        VRow(justify="center")
          VCol(cols="12" sm="9" md="6")
            RouterView
</template>

<script>
import VDarkmodeToggle from '@/components/controls/VDarkmodeToggle'

export default {
  components: {
    VDarkmodeToggle
  }
}
</script>
