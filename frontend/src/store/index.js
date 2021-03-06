import Vue from "vue";
import Vuex from "vuex";
// import modules
import auth from "./modules/auth.module";
import profile from "./modules/profile.module";
import qa from "./modules/qa.module";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    qa,
  },
});