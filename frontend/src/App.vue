<template>
  <v-app>
    <router-view />
    <v-snackbar
      bottom
      v-model="show"
      absolute
      :color="error ? 'red' : 'primary'"
      :multi-line="true"
    >
      {{ title }}
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventBus } from "./main";
import { INotificationEventPayload, NotificationsUtil } from "./shared/utils/notifications.util";

@Component({
  name: "App",
  components: {},
})
export default class App extends Vue {
  show = false;
  title = "";
  message = "";
  error = false;

  created() {
    eventBus.$on(NotificationsUtil.NOTIFICATION_EVENT, (data: INotificationEventPayload) => {
      this.show = true;
      this.title = data.title;
      this.message = data.message || "";
      this.error = data.error;
    });
  }

  showSnackbar() {
    this.show = true;
  }
}
</script>
