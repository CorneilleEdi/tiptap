import Vue from "vue";
import App from "./App.vue";
import { auth } from "./common/firebase";
import ApiService from "./common/services/api.service";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
export const eventBus = new Vue();
ApiService.init();

let app = "";

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

