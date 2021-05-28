<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="true"
      class="ma-0"
      height="7"
      style="top: -2px"
    ></v-progress-linear>
    <slot />
    <v-snackbar top v-model="show">
      {{ message }}
      <v-btn color="error" @click.native="show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { eventBus } from "../main";
export default {
  name: "AppLayout",
  data() {
    return {
      loading: false,
      show: false,
      message: "",
    };
  },
  created() {
    eventBus.$on("showSnackbar", (data) => {
      this.show = true;
      this.message = data.text;
    });
    eventBus.$on("showLoading", () => {
      this.loading = true;
    });
    eventBus.$on("hideLoading", () => {
      this.loading = false;
    });
  },
  methods: {
    showSnackbar() {
      this.show = true;
    },
  },
};
</script>

<style scoped>
.v-progress-linear {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
</style>
