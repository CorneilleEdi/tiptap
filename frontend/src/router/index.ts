const NProgress = require("nprogress");
import { firebaseService } from "@/shared/services/firebase/firebase.service";
import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import { default as routesNames, default as RoutesNames } from "./routes-names.router";
import { Routes } from "./routes.router";
Vue.use(VueRouter);

// Turn off loading spinner
NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: Routes,
});

const requiresAuthGuard = (to: Route, from: Route, next: any): boolean => {
  const currentUser = firebaseService.getCurrentUser();
  const isAuth = to.matched.some((record) => record.meta.auth);

  if (isAuth && !currentUser) {
    //next({ name: "auth", query: { redirect: to.fullPath } });
    next({ name: routesNames.authentication });
    return true;
  } else if (!isAuth && !currentUser) {
    next();
    return true;
  } else {
    next();
  }

  return false;
};




router.beforeEach((to, from, next) => {
  NProgress.start();
  if (requiresAuthGuard(to, from, next)) {
    return;
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export { RoutesNames };
export default router;
