<template>
  <v-tabs v-model="tab">
    <v-tab>
      <v-badge color="pink" :content="userQuestions.length">Questions </v-badge>
    </v-tab>

    <v-tab
      ><v-badge color="pink" :content="userAnswers.length || 0"
        >Answers
      </v-badge></v-tab
    >

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-layout row wrap>
            <v-flex
              v-for="question in userQuestions"
              :key="question.uid"
              xs12
              sm12
              md6
              lg6
            >
              <question-list-item :question="question" class="mx-2" />
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card color="basil" flat>
          <v-card-text>{{ userAnswers }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import { mapGetters } from "vuex";
import QuestionListItem from "../QuestionListItem.vue";

export default {
  name: "QuestionAnswersTab",
  components: { QuestionListItem },

  data() {
    return {
      tab: null,
      text1:
        "Ullam quas exercitationem cum quia laudantium corporis laudantium..",
      text2: "Unde optio corrupti..",
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      userQuestions: "userQuestions",
      userAnswers: "userAnswers",
    }),
  },

  methods: {},
};
</script>

<style scoped></style>
