import { createRouter, createWebHistory } from 'vue-router'

// import HomePage from "../views/HomePage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import LoginPage from "@/views/LoginPage.vue"
import FavoritePage from "@/views/FavoritePage.vue"
import DetailFoodPage from "@/views/DetailFoodPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/register",
      name: "RegisterPage",
      component: RegisterPage,
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
    },
    {
      path: "/favorite",
      name: "FavoritePage",
      component: FavoritePage,
    },
    {
      path: "/food/:id",
      name: "DetailFoodPage",
      component: DetailFoodPage,
    }
  ]
})

// NAVIGATION GUARD
router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("access_token") && to.path === "/login") {
    next({ path: "/" });
  } 
  if (localStorage.getItem("access_token") && to.path === "/register") {
    next({ path: "/" });
  }
  if (!localStorage.getItem("access_token") && to.path === "/favorite") {
    next({ path: "/" });
  } 
  next()
});

export default router;
