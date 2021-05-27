<template>
  <v-card xs10 class="mx-auto d-flex justify-center my-8" flat>
    <v-progress-circular
      class="center"
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Loading",
  components: {},
})
export default class Loading extends Vue {}
</script>
