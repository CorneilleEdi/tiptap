<template>
  <div>
    <v-card outlined class="my-2">
      <v-card-title>Q: {{ question.title }}</v-card-title>
      <v-card-subtitle>{{ question.content }}</v-card-subtitle>
      <v-card-subtitle class="pt-0">
        <v-chip
          v-for="topic in question.topics"
          class="mr-2"
          label
          :key="topic"
        >
          {{ topic }}
        </v-chip>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "QuestionListItem",

  props: {
    question: {
      require: true,
    },
  },

  data() {},
  computed: {},

  methods: {},
};
</script>

<style scoped></style>
