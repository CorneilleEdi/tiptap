<template>
  <v-dialog persistent v-model="show" max-width="350">
    <v-card>
      <v-card-title class="text--mini font-weight-bold">{{
        title
      }}</v-card-title>

      <v-card-text v-html="content"> </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary_dark"
          text
          class="font-weight-bold"
          @click="onNegativeClicked()"
        >
          {{ negative }}
        </v-btn>

        <v-btn
          elevation="1"
          color="error darken-1 white--text"
          class="font-weight-bold"
          @click="onPositiveClicked()"
        >
          {{ positive }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    positive: {
      type: String,
      required: true,
    },
    negative: {
      type: String,
      required: true,
    },
  },
  methods: {
    onNegativeClicked() {
      this.$emit("negativeClick");
    },
    onPositiveClicked() {
      this.$emit("positiveClick");
    },
  },
};
</script>

<style scoped></style>
