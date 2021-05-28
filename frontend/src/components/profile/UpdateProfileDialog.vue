<template>
  <v-dialog persistent v-model="show" max-width="350">
    <v-card>
      <v-card-title class="text--mini font-weight-bold"
        >Update user profile</v-card-title
      >

      <v-card-text>
        <v-form ref="updateProfileform" v-model="valid">
          <v-text-field
            name="name"
            label="Name"
            type="text"
            v-model="name"
            :rules="nameRules"
            required
            outlined
            class="pb-0"
            placeholder="name"
          ></v-text-field>

          <v-text-field
            name="about"
            label="About"
            type="text"
            v-model="about"
            required
            outlined
            class="pb-0"
            placeholder="Tell us something about you"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer> </v-spacer>

        <v-btn
          :disabled="loading"
          color="primary_dark"
          text
          class="font-weight-bold"
          @click="onNegativeClicked()"
        >
          Cancel
        </v-btn>

        <v-btn
          :loading="loading"
          elevation="1"
          color="primary darken-1 white--text"
          class="font-weight-bold"
          @click="submit()"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { UPDATE_PROFILE } from "../../store/types/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "UpdateProfileDialog",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      valid: false,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length >= 6 || "Name must be greater than 6 characters",
      ],
      about: "",
    };
  },
  computed: {
    ...mapGetters({ user: "user" }),
  },

  beforeMount() {
    this.name = this.user.name;
    this.about = this.user.about;
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    user(newValue, oldValue) {
      this.name = this.user.name;
      this.about = this.user.about;
    },
  },

  methods: {
    onNegativeClicked() {
      this.$emit("negativeClick");
    },
    onPositiveClicked() {
      this.$emit("positiveClick");
    },
    async submit() {
      if (this.$refs.updateProfileform.validate()) {
        this.loading = true;
        const name = this.name;
        const about = this.about;

        try {
          await this.$store.dispatch(UPDATE_PROFILE, {
            name,
            about,
          });
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }

        this.onNegativeClicked();
      }
    },
  },
};
</script>

<style scoped></style>
