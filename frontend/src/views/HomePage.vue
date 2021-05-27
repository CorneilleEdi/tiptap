<template>
  <v-app>
    <v-card tile flat class="white--text theme--light">
      <v-app-bar class="primary darken-2" flat>
        <v-toolbar-title class="white--text font-weight-bold">TipTap</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn class="white--text theme--light" outlined to="/profile">
          Profile
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
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "HomePage",
  components: {},
})
export default class HomePage extends Vue {}
</script>
