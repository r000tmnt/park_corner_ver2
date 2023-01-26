<template>
    <v-row justify="center" align="center">
        <CommissionTypeTable class="child_container" />
    </v-row>
</template>

<script>
import api from '../../server/axios.ts';

export default {
  name: 'adminPage',
  layout: 'back',
  methods: {

  },

  mounted() {
    // api.get('/test')
  }
}
</script>
