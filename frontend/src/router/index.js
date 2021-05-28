import NProgress from "nprogress";
import Vue from "vue";
import VueRouter from "vue-router";
import { FirebaseService } from "../common/services/firebase.service";
import Home from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [{
      path: "",
      name: "questions",
      component: () => import(/* webpackChunkName: "questions" */ "@/views/QuestionsPage.vue"),

    }, {
      path: "profile",
      name: "profile",
      component: () => import(/* webpackChunkName: "profile" */ "@/views/ProfilePage.vue"),
      meta: {
        auth: true,
      },
    },]
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/auth/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let currentUser = FirebaseService.getCurrentUser();
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !currentUser) {
    next({ path: "/login" });
  } else {
    next();
  }
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;