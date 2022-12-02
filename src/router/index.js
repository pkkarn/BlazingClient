import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Blaze from "@/components/BlazingDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/blaze",
      name: "blaze",
      props: true,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/BlazingDashboard.vue"),
    },
  ],
});

export default router;
