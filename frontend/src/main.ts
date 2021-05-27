import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { auth } from "./shared/config/firebase.config";
import store from "./store";

Vue.config.productionTip = false;
export const eventBus = new Vue();

let app: unknown = null;

auth.onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
