<template>
  <div>
    <div class="header v-card v-card--flat v-sheet theme--light rounded-0 secondary py-1 border">
      <div class="container body-2">Profile page</div>
    </div>
    <v-divider />
    <v-container class="mt-16">
      <h1>Profile of {{ name }}</h1>

      <v-divider />

      <h5 class="mt-8">Informations</h5>

      <v-avatar class="mt-6" v-if="profileImage" color="primary" size="128">
        <img :src="profileImage" :alt="name"
      /></v-avatar>

      <v-card class="my-6" max-width="900" outlined>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Phone number</v-list-item-title>
            <v-list-item-subtitle>{{ phoneNumber }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-divider />
      <div class="mt-8">
        <v-btn
          :loading="logoutLoading"
          @click="logout"
          class="white--text subtitle-1"
          large
          color="red"
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
              d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
              fill="currentColor"
            ></path>
          </svg>

          Logout
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { NotificationsUtil } from "@/shared/utils/notifications.util";
import authModule from "@/store/modules/auth.module";
import profileModule from "@/store/modules/profile.module";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ProfilePage",
  components: {},
})
export default class ProfilePage extends Vue {
  logoutLoading = false;

  name = profileModule.name;
  email = profileModule.email;
  phoneNumber = profileModule.phoneNumber;
  profileImage = profileModule.profileImage;

  async logout() {
    console.log("logout");

    try {
      await authModule.logout();

      this.logoutLoading = false;

      this.$router.push("/authentication");
    } catch (error) {
      this.logoutLoading = false;
      NotificationsUtil.showError({ title: "Error", message: "Logout error" });
    }
  }
}
</script>
