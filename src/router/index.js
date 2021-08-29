import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import BgImage from "../assets/bg.jpg";

const routes = [
  {
    path: '/app',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    alias: '/login',  
    name: 'Login',
    component: Login,
    meta: { bgImage: BgImage }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { bgImage: BgImage }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach(to => {
  if (to.meta && to.meta.bgImage) {
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundImage = `url(${to.meta.bgImage})`;
  } else {
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundPosition = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundImage = "";
  }
});

export default router
