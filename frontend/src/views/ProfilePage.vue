<template>
  <div>
    <div class="header v-card v-card--flat v-sheet theme--light rounded-0 secondary py-1 border">
      <div class="container body-2">Profile page</div>
    </div>
    <v-divider />
    <v-container>
      <p>Profile of CorneilleEdi</p>
      <v-btn @click="logout" class="white--text subtitle-1" large color="red" depressed>
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
      </v-btn></v-container
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ProfilePage",
  components: {},
})
export default class ProfilePage extends Vue {
  logout() {
    console.log("logout");

    this.$router.push("/authentication");
  }
}
</script>
