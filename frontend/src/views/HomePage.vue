<template>
  <v-app>
    <v-card tile flat class="white--text theme--light">
      <v-app-bar class="primary darken-2" flat>
        <v-toolbar-title class="white--text font-weight-bold">TipTap</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn v-if="user" class="white--text theme--light" outlined to="/profile">
          Profile {{ name }}

          <v-avatar class="ml-2" v-if="profileImage" color="primary" size="24">
            <img :src="profileImage" :alt="name"
          /></v-avatar>

          <v-icon v-else color="white" class="ml-2">mdi-account</v-icon>
        </v-btn>

        <v-btn v-else class="white--text theme--light" outlined to="/authentication">
          Sign in
          <v-icon color="white" class="ml-2">mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { firebaseService } from "@/shared/services/firebase/firebase.service";
import { Component, Vue } from "vue-property-decorator";
import profileModule from "@/store/modules/profile.module";

@Component({
  name: "HomePage",
  components: {},
})
export default class HomePage extends Vue {
  user = firebaseService.getCurrentUser();
  name = profileModule.name;
  profileImage = profileModule.profileImage;

  mounted() {
    this.getCurrentUserProfile();
  }
  async getCurrentUserProfile() {
    await profileModule.fetchUserProfile();
  }
}
</script>
