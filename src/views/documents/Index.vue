<template lang="pug">
  div(class="templates")
    VContainer
      h2 Documents

      RouterLink(:to="{ name: 'NewDocument' }") New document

      VDataTable(:headers="headers" :items="documents" :items-per-page="5")
        template(v-slot:item.actions="{ item }")
          VBtn(icon :to="{ name: 'ShowDocument', params: { id: item.id } }")
            VIcon(small) mdi-eye

          VBtn(icon :to="{ name: 'EditDocument', params: { id: item.id } }")
            VIcon(small) mdi-pencil

          VBtn(icon @click="destroy(item.id)")
            VIcon(small) mdi-delete
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: 'Content', value: 'content' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },

  computed: {
    ...mapGetters('documents', {
      documents: 'all'
    })
  },

  created () {
    this.index()
  },

  methods: {
    ...mapActions('documents', [
      'index',
      'destroy'
    ])
  }
}
</script>
