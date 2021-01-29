<template lang="pug">
  VDialog(v-model="dialog" width="500")
    template(v-slot:activator="{ on, attrs }")
      slot(name="button" :on="on" :attrs="attrs")
        VBtn(
          text
          v-bind="attrs"
          v-on="on"
        )
          | Click

    VCard
      slot(name="dialog")
        VCardTitle.headline
          | Are you sure?
        VCardText
          | You won't be able to undo this action.

      VDivider

      VCardActions
        VSpacer
        VBtn(
          color="primary"
          text
          @click="dialog = false"
        )
          | Cancel
        VBtn(
          color="error"
          text
          @click="confirmAction()"
        )
          | Confirm
</template>

<script>
export default {
  props: [
    'action'
  ],

  data () {
    return {
      dialog: false
    }
  },

  methods: {
    confirmAction () {
      this.action()
      this.dialog = false
    }
  }
}
</script>
