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

<script>
export default {
  name: "Loading",

  data() {
    return {};
  },

  methods: {},
};
</script>
