<template>
  <app-layout>
    <v-content class="primary darken-2 primary--text darken-2--text">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-1">
              <v-card-title class="font-weight-bold">TipTap</v-card-title>
              <v-card-subtitle class="pb-0"
                >Ask and you will receive</v-card-subtitle
              >
              <v-card-subtitle>Connect to continue</v-card-subtitle>

              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                    required
                    outlined
                    class="pb-0"
                    placeholder="xxxxxxx@xxx.xxx"
                  ></v-text-field>

                  <v-btn
                    class="white--text subtitle-1 mb-2 pt-0"
                    block
                    large
                    color="primary darken-2"
                    outlined
                    depressed
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2"
                    >
                      <path
                        d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"
                        fill="currentColor"
                      ></path>
                    </svg>

                    Send me a magic link
                  </v-btn>

                  <v-card-text class="py-2">or</v-card-text>

                  <v-btn
                    @click="googleAuth"
                    class="white--text subtitle-1"
                    block
                    large
                    color="red"
                    depressed
                    :loading="googleAuthLoading"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2"
                    >
                      <path
                        d="M11.956 10.356V13.807H16.748C16.302 16 14.435 17.26 11.956 17.26C9.06851 17.2202 6.74862 14.8682 6.74862 11.9805C6.74862 9.09275 9.06851 6.74072 11.956 6.70098C13.1562 6.69954 14.3194 7.11605 15.246 7.87898L17.846 5.27898C14.8636 2.65705 10.508 2.31981 7.15752 4.45142C3.80707 6.58303 2.26698 10.6712 3.37821 14.4836C4.48943 18.296 7.98491 20.9164 11.956 20.914C16.423 20.914 20.485 17.665 20.485 11.98C20.4781 11.4326 20.411 10.8877 20.285 10.355L11.956 10.356Z"
                        fill="currentColor"
                      ></path>
                    </svg>

                    Continue with Google
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-card-text class="pb-2"
                ><p>
                  By sign up, you agree to the terms of service and privacy
                  policy.
                </p></v-card-text
              >
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </app-layout>
</template>
<script>
import AppLayout from "../AppLayout.vue";

export default {
  name: "Login",

  components: { AppLayout },
  data() {
    return {
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      googleAuthLoading: false,
    };
  },

  methods: {
    async logout() {
      console.log("logout");
    },
  },
};
</script>

<style scoped></style>
