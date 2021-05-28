<template>
  <div>
    <v-card outlined class="my-2">
      <v-card-subtitle>{{ question.content }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AnswerListItem",

  props: {
    answer: {
      require: true,
    },
  },

  data() {},
  computed: {},

  methods: {},
};
</script>

<style scoped></style>
