<template>
  <div>
    <div class="header v-card v-card--flat v-sheet theme--light rounded-0 secondary py-1 border">
      <div class="container body-2">Questions</div>
    </div>
    <v-divider />
    <v-container>
      <p>Welcome to TipTap</p>
      <p>Just ask and you will have an answer</p>

      <v-form ref="form">
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="8">
            <v-text-field
              name="question"
              label="Question"
              type="text"
              dense
              outlined
              class="pb-0"
              placeholder="how to build a robot"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6" md="4">
            <v-btn class="white--text subtitle-1 mb-2 pt-0 ml-2" color="primary" depressed>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.677 19.607L12.962 13.891C10.4196 15.6985 6.91642 15.2564 4.90285 12.8739C2.88929 10.4915 3.03714 6.96361 5.24298 4.75802C7.44824 2.55147 10.9765 2.40298 13.3594 4.41644C15.7422 6.42989 16.1846 9.93347 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 5.00001C7.58868 4.99958 5.95267 6.3307 5.56745 8.18745C5.18224 10.0442 6.15369 11.9163 7.89366 12.6703C9.63362 13.4242 11.6639 12.8529 12.7552 11.3021C13.8466 9.75129 13.699 7.64734 12.402 6.26402L13.007 6.86402L12.325 6.18402L12.313 6.17202C11.5648 5.4192 10.5464 4.99715 9.48498 5.00001Z"
                  fill="currentColor"
                ></path>
              </svg>
              Find this question
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <!-- <loading /> -->
      <p>Questions found with the key "jdjdjdj"</p>
      <questions-list />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "@/components/Loading.vue";
import QuestionsList from "@/components/QuestionsList.vue";

@Component({
  name: "QuestionsPage",
  components: { Loading, QuestionsList },
})
export default class QuestionsPage extends Vue {}
</script>
