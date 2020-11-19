import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import allRoutes from "./allRoutes"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login
  },
  
  // {
    // path: "/",
    // // name: "home",
    // component:Home,
    // children:allRoutes
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ "../pages/Home")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
