<template>
  <div>
    <div v-if="user.profileImage">
      <p class="mt-2">Click the image for options</p>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on" class="my-12 ml-12">
            <v-avatar
              class="mt-6"
              v-if="user.profileImage"
              color="primary"
              size="128"
            >
              <img :src="user.profileImage" :alt="user.name"
            /></v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ user.name }}</h3>
              <p class="caption mt-1">
                {{ user.email || user.phoneNumber }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="deleteImage()">
                Remove image
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="$refs.inputUpload.click()">
                Change image
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>
    <div v-else class="mt-2">
      <v-avatar
        color="primary"
        size="128"
        @click="$refs.inputUpload.click()"
        style="cursor: pointer"
      >
        <v-icon dark size="32"> mdi-image-plus </v-icon>
      </v-avatar>
    </div>

    <input
      v-show="false"
      accept="image/png, image/jpeg, image/jpg"
      ref="inputUpload"
      type="file"
      @change="onSelect"
    />

    <v-col cols="2" v-show="loading">
      <v-progress-linear
        color="deep-purple accent-4"
        indeterminate
        rounded
        height="6"
        width="24"
      ></v-progress-linear>
    </v-col>
  </div>
</template>

<script>
import {
  DELETE_PROFILE_IMAGE,
  UPDATE_PROFILE_IMAGE,
} from "../../store/types/actions.type";
import { mapGetters } from "vuex";
import { eventBus } from "../../main";
export default {
  name: "ProfileImage",

  data() {
    return {
      loading: false,
      file: "",
    };
  },
  computed: {
    ...mapGetters({ user: "user" }),
  },

  methods: {
    onNegativeClicked() {
      this.$emit("negativeClick");
    },
    onPositiveClicked() {
      this.$emit("positiveClick");
    },
    onSelect() {
      const file = this.$refs.inputUpload.files[0];
      this.checkImageSize(file);
    },
    checkImageSize(f) {
      if (f && f.name) {
        if (f.size >= 1000000) {
          eventBus.$emit("showSnackbar", {
            text: `file to big. Choose file below 1MB`,
          });
          this.file = "";
        } else {
          this.file = f;
          console.log("update image");

          this.updatePicture().then().catch();
        }
      }
    },
    async deleteImage() {
      this.loading = true;
      try {
        await this.$store.dispatch(DELETE_PROFILE_IMAGE);
      } catch (error) {
        eventBus.$emit("showSnackbar", {
          text: `Delete image error. Please retry`,
        });
      } finally {
        this.loading = false;
      }
    },
    async updatePicture() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("image", this.file);

        console.log("updating image");
        await this.$store.dispatch(UPDATE_PROFILE_IMAGE, formData);

        this.file = "";
      } catch (error) {
        eventBus.$emit("showSnackbar", {
          text: `Upload image error. Please retry`,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
