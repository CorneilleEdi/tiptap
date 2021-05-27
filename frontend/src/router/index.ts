const NProgress = require("nprogress");
import Vue from "vue";
import VueRouter from "vue-router";
import RoutesNames from "./routes-names.router";
import { Routes } from "./routes.router";
Vue.use(VueRouter);

// Turn off loading spinner
NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export { RoutesNames };
export default router;
