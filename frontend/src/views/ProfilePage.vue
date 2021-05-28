<template>
  <div>
    <div
      class="
        header
        v-card v-card--flat
        v-sheet
        theme--light
        rounded-0
        secondary
        py-1
        border
      "
    >
      <div class="container body-2">Profile page</div>
    </div>
    <v-divider />
    <v-container class="mt-16">
      <div class="d-flex">
        <h1>Profile of {{ user.name }}</h1>
        <v-btn
          class="white--text ml-2"
          color="primary"
          depressed
          outlined
          @click="openUpdateProfileDialog()"
        >
          <svg
            class="mr-2"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.41999 20.579C4.13948 20.5785 3.87206 20.4603 3.68299 20.253C3.49044 20.0475 3.39476 19.7695 3.41999 19.489L3.66499 16.795L14.983 5.48103L18.52 9.01703L7.20499 20.33L4.51099 20.575C4.47999 20.578 4.44899 20.579 4.41999 20.579ZM19.226 8.31003L15.69 4.77403L17.811 2.65303C17.9986 2.46525 18.2531 2.35974 18.5185 2.35974C18.7839 2.35974 19.0384 2.46525 19.226 2.65303L21.347 4.77403C21.5348 4.9616 21.6403 5.21612 21.6403 5.48153C21.6403 5.74694 21.5348 6.00146 21.347 6.18903L19.227 8.30903L19.226 8.31003Z"
              fill="currentColor"
            ></path>
          </svg>

          Update profile
        </v-btn>
      </div>

      <v-divider />

      <h5 class="mt-8">Informations</h5>

      <profile-image />

      <v-card class="my-6" max-width="900" outlined>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
            <v-list-item-subtitle>{{ user.about }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Phone number</v-list-item-title>
            <v-list-item-subtitle>{{ user.phoneNumber }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>User since</v-list-item-title>
            <v-list-item-subtitle>{{
              convertDate(user.createdAt)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-divider />
      <div class="mt-8">
        <v-btn
          :loading="logoutLoading"
          @click="openLogoutConfirmationDialog()"
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

    <confirmation-dialog
      :show="showLogoutConfirmationDialog"
      title="Do you really want to logout?"
      content="this action will log you out of the platform"
      positive="Logout"
      negative="Cancel"
      @positiveClick="logoutUser()"
      @negativeClick="closeLogoutConfirmationDialog()"
    />
    <update-profile-dialog
      :show="showUpdateProfileDialog"
      @negativeClick="closeUpdateProfileDialog()"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { DateUtil } from "../common/utils/date.util";
import { LOGOUT } from "../store/types/actions.type";
import ConfirmationDialog from "../components/dialogs/ConfirmationDialog";
import UpdateProfileDialog from "../components/profile/UpdateProfileDialog";
import ProfileImage from "../components/profile/ProfileImage";

export default {
  name: "ProfilePage",
  components: { ConfirmationDialog, UpdateProfileDialog, ProfileImage },

  data() {
    return {
      showLogoutConfirmationDialog: false,
      showUpdateProfileDialog: false,
      logoutLoading: false,
    };
  },

  computed: {
    ...mapGetters({ user: "user", isAuthenticated: "isAuthenticated" }),
  },

  methods: {
    convertDate(milli) {
      return DateUtil.milliToDate(milli);
    },

    openLogoutConfirmationDialog() {
      this.showLogoutConfirmationDialog = true;
    },

    closeLogoutConfirmationDialog() {
      this.showLogoutConfirmationDialog = false;
    },
    openUpdateProfileDialog() {
      this.showUpdateProfileDialog = true;
    },

    closeUpdateProfileDialog() {
      this.showUpdateProfileDialog = false;
    },

    async logoutUser() {
      console.log("logout");
      this.closeLogoutConfirmationDialog();
      try {
        await this.$store.dispatch(LOGOUT);

        this.logoutLoading = false;

        this.$router.push("/");
      } catch (error) {
        this.logoutLoading = false;
      }
    },
  },
};
</script>
