<template>
  <v-app>
    <v-card tile flat class="white--text theme--light">
      <v-app-bar class="primary darken-2" flat>
        <v-toolbar-title class="white--text font-weight-bold"
          >TipTap</v-toolbar-title
        >
        <v-spacer></v-spacer>

        <v-btn
          v-if="user"
          class="white--text theme--light"
          outlined
          to="/profile"
        >
          Profile

          <v-avatar class="ml-2" v-if="profileImage" color="primary" size="24">
            <img :src="profileImage" :alt="name"
          /></v-avatar>

          <v-icon v-else color="white" class="ml-2">mdi-account</v-icon>
        </v-btn>

        <v-btn v-else class="white--text theme--light" outlined to="/login">
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

<script>
export default {
  name: "Home",

  data() {
    return {
      user: null,
    };
  },
};
</script>
