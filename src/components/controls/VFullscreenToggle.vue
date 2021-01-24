<template lang="pug">
v-btn(@click="fullScreenMode = !fullScreenMode" icon)
  v-icon(v-if="!fullScreenMode") mdi-arrow-expand
  v-icon(v-else) mdi-arrow-collapse
</template>

<script>
export default {
  data () {
    return {
      fullScreenMode: false
    }
  },
  watch: {
    fullScreenMode: function () {
      if (this.fullScreenMode === true) {
        this.openFullscreen()
      } else {
        this.closeFullscreen()
      }
    }
  },
  methods: {
    openFullscreen: function () {
      var elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
    },
    closeFullscreen: function () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }
}
</script>
