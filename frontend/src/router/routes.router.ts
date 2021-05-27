import AuthenticationPage from "@/views/authentication/AuthenticationPage.vue";
import HomePage from "@/views/HomePage.vue";
import { RouteConfig } from "vue-router";
import routesNames from "./routes-names.router";

export const Routes: Array<RouteConfig> = [
  {
    path: "",
    name: "",
    component: HomePage,
    children: [
      {
        path: "",
        name: routesNames.questions,
        component: () => import(/* webpackChunkName: "questions" */ "@/views/QuestionsPage.vue"),

      },
      {
        path: "profile",
        name: routesNames.profile,
        component: () => import(/* webpackChunkName: "profile" */ "@/views/ProfilePage.vue"),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/authentication",
    name: routesNames.authentication,
    component: AuthenticationPage,
  },
];
